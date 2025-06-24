"use client";

import { placeOrder } from "@/action";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {

  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { itemsInCart, subTotal, tax, total} = useCartStore(useShallow((state) => state.getSummaryInformation() ));


  const cart = useCartStore((state) => state.cart);


    useEffect(() => {
        setLoaded(true);
    }, [])
    
    const onPlaceOrder = async () => {
      setIsPlacingOrder(true);

      // await sleep(2);

      const productsToOrder = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      }));

      console.log({ address, productsToOrder });

      // TODO: Server Actions
      const resp = await placeOrder(productsToOrder, address);
      console.log({ resp });

      setIsPlacingOrder(false);
    }

    if (!loaded) {
        return <div>Loading...</div>;
    }


  return (
    <div className="bg-white shadow-xl p-7 rounded-xl">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{ address.firstName } { address.lastName }</p>
        <p>{ address.address}</p>
        <p>{ address.address2 }</p>
        <p>{ address.city }</p>
        <p>{ address.country }</p>
        <p>{ address.postalCode}</p>
        <p>{ address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full bg-gray-200 mb-10 h-0.5 rounded"></div>

      <h2 className="text-2xl mb-2 font-bold">Resumen de la compra</h2>

     <div className="grid grid-cols-2 gap-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? `${itemsInCart} producto` : `${itemsInCart} articulos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (18%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>

      <div>
        {/* Disclaimer */}
        <p className="text-sm text-gray-500 mt-5">
          Al hacer clic en <span className="font-bold">{"Hacer orden"}</span>,
          aceptas los
          <a className="underline font-bold" href="#">
            {" "}
            términos y condiciones de la tienda
          </a>
          . La información de tu tarjeta de crédito será procesada por nuestro
          proveedor de pagos. No compartiremos tu información personal. Puedes
          cancelar tu orden en cualquier momento antes de que sea procesada.
          <br />
        </p>

        {/* href="/orders/1>" */}
        {/* <p className="text-red-500">Error de creación</p> */}


          <button 
          onClick={onPlaceOrder}
          // disabled={!!isPlacingOrder}
          className={ clsx(
            "flex btn-primary w-full justify-center mt-5 hover:cursor-pointer",
            {
              'btn-disabled' : isPlacingOrder
            }
          )}>
            Colocar orden
          </button>

      </div>
    </div>
  );
};
