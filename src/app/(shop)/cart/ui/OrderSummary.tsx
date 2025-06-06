"use client";
import { useEffect, useState } from 'react';
import { useCartStore } from '../../../../store/cart/cart-store';
import { useShallow } from 'zustand/shallow';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);
    const { itemsInCart, subTotal, tax, total} = useCartStore(useShallow((state) => state.getSummaryInformation() ));

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <div>Loading...</div>;
    }
  return (

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

  );
};
