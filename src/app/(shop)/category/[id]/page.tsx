import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;
interface Props {
  params: {
    id: Category
  }
}

export default async function({ params } : Props) {

  const { id } = await params;

  const products = seedProducts.filter( product => product.gender === id);
  const label : Record<Category, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Unisex'
  }

  // if (id == 'kid') {
  //   notFound();
    
  // }


  return (
    <>
      <Title title={`Articulos de ${label[id]}`} subtitle={`Todos los productos`} className="mb-2"/>

      <ProductGrid products={products}/>
    </>
  );
}