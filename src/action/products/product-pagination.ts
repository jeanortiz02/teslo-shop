'use server'

import { prisma } from "@/lib/prisma"

interface PaginatioOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImage = async ( { page = 1, take = 10 } : PaginatioOptions) => {

    if ( isNaN(Number(page) ) ) page = 1;
    if ( page < 1 ) page = 1;


    try {
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            }
        })

        // console.log(products);
        return {
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        };
    } catch (error) {
        console.error("Error fetching paginated products:", error);
        throw new Error("Failed to fetch products");
    }
}