import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";


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
          <ProductsInCart/>
          </div>

          {/* Order Summary */}

          <div className="bg-white shadow-xl p-7 rounded-xl h-fit">
            <h2 className="text-2xl mb-2">Resumen de la compra</h2>

            
              <OrderSummary/>
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
  );
}