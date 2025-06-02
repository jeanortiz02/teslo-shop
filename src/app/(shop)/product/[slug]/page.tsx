export const revalidate = 604800 // 👈 Revalida cada 60 segundos
import { getProductBySlug } from "@/action";
import { ProductMobileSliceshow, ProductSliceshow, SizeSelector, StockLabel } from "@/components";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string}>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

  const { slug } = await params;
 
  // fetch post information
  const product = await getProductBySlug(slug);
 
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1] }`]
    }
  }
}
 


export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = await params;
  const product = await getProductBySlug(slug)


  if (!product) {
    notFound();
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2 ">

      {/* Mobile SliceShow */}  
        <ProductMobileSliceshow title={product.title} images={product.images} className="block md:hidden"/>

      {/* Desktop SliceShow */}
        <ProductSliceshow title={product.title} images={product.images} className="hidden md:block"/>
      </div>


      {/* Product Details */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug}/>
        <h1 className={ `${titleFont.className } antialiased font-bold text-lg`}>{product.title}</h1>

        <p className="text-lg mb-5">${ product.price}</p>

        {/* Selector de tallas */}
        <SizeSelector selectedSize={ product.sizes[0]} availableSizes={product.sizes} />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={5} />

        {/* Botton de agregar */}
        <button className="btn-primary my-5">Agregar al carrito </button>


        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}