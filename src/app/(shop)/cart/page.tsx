import { Title } from "@/components";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]


export default function CartPage() {

  // redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">


      <div className="flex flex-col w-[1000px]">

        <Title title="Carrito"/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas item</span>
            <Link href={'/'} className="underline mb-5">Continúa comprando</Link>
          

          {/* Items del carrito */}
          {
            productsInCart.map(product => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3}/>

                  <button className="underline mt-3 hover:cursor-pointer">
                    Remover
                  </button>
                </div>
              </div>
            ))
          }
          </div>

          {/* Order Summary */}

          <div className="bg-white shadow-xl p-7 rounded-xl h-fit">
            <h2 className="text-2xl mb-2">Resumen de la compra</h2>

            <div className="grid grid-cols-2 gap-2">
              <span>No. Productos</span>
              <span className="text-right">{`3 Artículos`}</span>


              <span>Subtotal</span>
              <span className="text-right">{`DOP $100.00`}</span>

              <span>Impuestos (18%)</span>
              <span className="text-right">{`DOP $18.00`}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">{`DOP $118.00`}</span>
            </div>

            <div>
              <Link
                href={'/checkout/address'}>
                <button className="flex btn-primary w-full justify-center uppercase font-bold my-3 rounded-lg hover:cursor-pointer">
                  Checkout
                </button>
              </Link>
            </div>
           
          </div>
        
        
        
        </div>

      </div>


    </div>
  );
}