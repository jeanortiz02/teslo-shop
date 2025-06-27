import { getPaginatedProductsWithImage } from "@/action";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { Category } from "@/interfaces";
import { redirect } from "next/navigation";


interface Props {
  params: Promise<{ id: Gender }>
}

export default async function GenderByPage({ params } : Props) {

  const { id } = await params;
  const { products, totalPages} = await getPaginatedProductsWithImage({ gender: id})
  
  const productsFilteredByGender = products.filter( product => product.gender === id);

  if ( productsFilteredByGender.length === 0) {
    redirect(`/gender/${id}`)
  }

  const label : Record<Category, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Unisex'
  }



  return (
    <>
      <Title title={`Articulos de ${label[id]}`} subtitle={`Todos los productos`} className="mb-2"/>

      <ProductGrid products={productsFilteredByGender}/>
      <Pagination totalPages={totalPages - 1}/>
    </>
  );
}