'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import Link from "next/link";
import { ProductImage } from "@/components";


export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
    const removeProductCart = useCartStore((state) => state.removeProductCart);
    const productsInCart = useCartStore((state) => state.cart);

    useEffect(() => {
      setLoaded(true);
    }, []);

    if (!loaded) {
      return <div>Loading...</div>;
    }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={ `product-${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
          />

          <div>
            <Link
              href={ `/product/${product.slug}` }
              className="hover:underline hover:cursor-pointer"
            >
              {product.size} - {product.title}
            </Link>
            <p>{product.price}</p>
            <QuantitySelector quantity={product.quantity} onQuantityChanged={  (quantity) => updateProductQuantity(product, quantity) } />

            <button 
              onClick={ () => removeProductCart(product) } 
              className="underline mt-3 hover:cursor-pointer"
              >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
