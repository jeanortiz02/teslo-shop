"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}
export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user?.id;

  // Verificar que el usuario tenga una sesión activa
  if (!userId) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  // Obtener la informacion de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((item) => item.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subtotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product)
        throw new Error(`Producto con ID ${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subtotal += subTotal;
      totals.tax += subTotal * 0.18; // 18% de impuesto
      totals.total += subTotal + subTotal * 0.18;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  // Crear la transaccion de la orden

  try {

    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        // Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((count, p) => count + p.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(
            `Producto con ID ${product.id} no tiene cantidad definida - 500`
          );
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity, // No hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en la existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `${product.title} no tiene suficiente inventario - 500`
          );
        }
      });

      //2. Crear la orden - Enzabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subtotal,
          tax: tax,
          total: total,
          isPaid: false,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Si el price es 0, entonces, lanzar un error
      if (order.total === 0) {
        throw new Error("El total de la orden no puede ser 0 - 500");
      }

      // 3. Crear la direccion de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: country,
        },
      });

      return {
        orden: order,
        updatedProducts: updatedProducts,
        ordenAddress: orderAddress,
      };
    });

    return {
      ok: true, 
      order: prismaTx.orden,
      prismaTx: prismaTx,
    }

  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
