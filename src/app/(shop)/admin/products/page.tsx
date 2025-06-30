export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImage } from "@/action";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";

import Link from "next/link";

interface Props {
  searchParams?: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = Number((await searchParams)?.page) || 1;

  const { products, totalPages } = await getPaginatedProductsWithImage({
    page,
  });

  return (
    <>
      <Title title="Gestion de Productos" />

      <div className="flex justify-end mb-5">
        <Link href={"/admin/product/new"} className="btn-primary">
          {/* <IoCardOutline className="mr-2" /> */}
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Género
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                    {product.title}
                  </Link>
                </td>
                <td className=" text-sm font-bold  text-gray-900  px-6 py-4 whitespace-nowrap">
                  { currencyFormat(product.price) }
                </td>
                <td className=" text-sm font-light  text-gray-900  px-6 py-4 whitespace-nowrap">
                  { product.gender }
                </td>
                <td className=" text-sm font-bold  text-gray-900  px-6 py-4 whitespace-nowrap">
                  { product.inStock }
                </td>
                <td className=" text-sm font-bold  text-gray-900  px-6 py-4 whitespace-nowrap">
                  { product.sizes.join(", ") }
                </td>
                
              </tr>
            ))}

            {/* <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <IoCardOutline className="text-red-800" />
                <span className="mx-2 text-red-800">No Pagada</span>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>
            </tr> */}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
