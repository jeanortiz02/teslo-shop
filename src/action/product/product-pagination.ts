'use server'

import { Gender } from "@/generated/prisma";
import { prisma } from "@/lib/prisma"

interface PaginatioOptions {
    page?: number;
    take?: number;
    gender?: Gender
}

export const getPaginatedProductsWithImage = async ( { page = 1, take = 12, gender } : PaginatioOptions) => {

    if ( isNaN(Number(page) ) ) page = 1;
    if ( page < 1 ) page = 1;


    try {

        // 1. Obtener los productos
        const products = await prisma.product.findMany({
            take : take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            },
            where: {
                gender: gender as Gender
            }
        })


        // 2. Obtener el total de paginas
        const totalCountPages = Math.ceil(await prisma.product.count({
            where: {
                gender: gender
            }
        }) / take);
        // console.log(products);
        return {
            currentPage: page,
            totalPages: totalCountPages,
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
