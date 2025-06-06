export const revalidate = 604800 // 👈 Revalida cada 60 segundos
import { getProductBySlug } from "@/action";
import { ProductMobileSliceshow, ProductSliceshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./AddToCart";
import { currencyFormat } from "@/utils";

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

        <p className="text-lg mb-5">{ currencyFormat(product.price)}</p>

        <AddToCart product={product}/>


        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}