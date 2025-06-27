
import { getOrderById } from "@/action";
import { OrderStatus, PaypalButton, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderbyPage({ params }: Props) {
  const { id } = await params;

  // Todo: Llamar el server Action
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  //Todo: Verificar
  // Redirect

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid ?? false} />

            {/* Items del carrito */}
            {order!.OrderItem.map((items) => (
              <div
                key={items.product.slug + "-" + items.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${items.product.ProductImage[0].url}`}
                  alt={items.product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{items.product.title}</p>
                  <p>
                     ${items.price} X {items.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(items.price * items.quantity)}
                  </p>

                  <button className="underline mt-3 hover:cursor-pointer">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}

          <div className="bg-white shadow-xl p-7 rounded-xl">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.city}</p>
              <p>{address!.countryId}</p>
              <p>{address!.postalCode}</p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full bg-gray-200 mb-10 h-0.5 rounded"></div>

            <h2 className="text-2xl mb-2 font-bold">Resumen de la compra</h2>

            <div className="grid grid-cols-2 gap-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? `${order?.itemsInOrder} producto`
                  : `${order?.itemsInOrder} articulos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Impuestos (18%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">

              {
                order?.isPaid ? (
                  <OrderStatus isPaid={order.isPaid ?? false} />
                ) : (
                  <div className="relative z-0">
                    <PaypalButton
                      amount={order!.total}
                      orderId={order!.id}
                    />
                  </div>
                  
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
