import { Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";



export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">


      <div className="flex flex-col w-[1000px]">

        <Title title="Verificar Orden"/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajusta tu compra</span>
            <Link href={'/cart'} className="underline mb-5">Editar Carrito</Link>
          

          {/* Items del carrito */}
           <ProductsInCart/>
          </div>

          {/* Order Summary */}

          <PlaceOrder/>
        
        
        
        </div>

      </div>


    </div>
  );
}