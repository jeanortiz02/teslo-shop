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


export default function() {
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
                  <p>DOP ${product.price} X 3</p>
                  <p className="font-bold">Subtotal: DOP ${product.price * 3}</p>
                  

                  <button className="underline mt-3 hover:cursor-pointer">
                    Remover
                  </button>
                </div>
              </div>
            ))
          }
          </div>

          {/* Order Summary */}

          <div className="bg-white shadow-xl p-7 rounded-xl">

            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Jean Carlos Ortiz</p>
              <p >Calle 1 #2</p>
              <p >Brisas del Este</p>
              <p >Santo Domingo Este</p>
              <p >Santo Domingo</p>
              <p >1447</p>
              <p >+1 809-123-4567</p>
            </div>

            {/* Divider */}
            <div className="w-full bg-gray-200 mb-10 h-0.5 rounded"></div>



            <h2 className="text-2xl mb-2 font-bold">Resumen de la compra</h2>

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

              {/* Disclaimer */}
              <p className="text-sm text-gray-500 mt-5">
                Al hacer clic en <span className="font-bold">{"Hacer orden"}</span>, aceptas los<a className="underline font-bold" href="#"> términos y condiciones de la tienda</a>. La información de tu tarjeta de crédito será procesada por nuestro proveedor de pagos. No compartiremos tu información personal. Puedes cancelar tu orden en cualquier momento antes de que sea procesada.
                <br />
                
              </p>
              <Link
                href={'/orders/1'}>
                <button className="flex btn-primary w-full justify-center mb-2 uppercase font-bold mt-5 rounded-lg hover:cursor-pointer">
                  Hacer orden
                </button>
              </Link>
            </div>
           
          </div>
        
        
        
        </div>

      </div>


    </div>
  );
}