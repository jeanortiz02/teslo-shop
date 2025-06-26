"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "No estas logueado",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                  title: true,
                  slug: true,

                  ProductImage: {
                    select: {
                      url: true
                    },
                    take: 1
                  }
              },
            },
          },
        },
      },
    });


    if (!order) throw `${id} no existe`;

    if ( session.user.role === 'user') {
      if (order.userId !== session.user.id) {
        throw "No tienes permisos para ver esta orden";
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener la orden",
    };
  }
};
