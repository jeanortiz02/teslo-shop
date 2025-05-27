import { getPaginatedProductsWithImage } from "@/action";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
// import { initialData } from "@/seed/seed";

// const products = initialData.products;

interface Props {
  searchParams?: {
    page?: string;
  }
}

export default async function Home( { searchParams }: Props ) {

   const page = Number((await searchParams)?.page) || 1;
  
  const {products} = await getPaginatedProductsWithImage({page});
  
  if ( products.length === 0 ) {
    redirect(`/`);
  }
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2"/>

      <ProductGrid products={products}/>
    </>
  );
}
