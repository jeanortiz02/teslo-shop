import { prisma } from "@/lib/prisma";
import { initialData } from "./seed";

async function Main() {

    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    // Eliminar datos existentes


    // Insertar Cateogrias
    const categoriesData = initialData.categories.map( category => ({ name: category}));
    await prisma.category.createMany({
        data: categoriesData,
        skipDuplicates: true
    });


    const categoriesDb = await prisma.category.findMany();

    const categoriesMap = categoriesDb.reduce( (map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>) // <string = shirt, string = id>

    // console.log(categoriesMap);

    const { products } = initialData;
    // Products 
    // const {images, type, ...product1} = initialData.products[0];

    // await prisma.product.create({
    //     data: {
    //         ...product1,
    //         categoryId: categoriesMap[type],
    //     }
    // })

    products.forEach( async product => {
        const { images, type, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            }
        })

        // Images
        const imageData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imageData
        })
    })

    console.log("Seed Ejecutado correctamente...");
}


( () => {
    if ( process.env.NODE_ENV === "production") return;
     Main();
})();