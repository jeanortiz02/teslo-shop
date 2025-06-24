import { prisma } from "@/lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function Main() {
    console.log("Eliminando datos existentes...");
    await prisma.orderAddress.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});

    await prisma.userAddress.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.country.deleteMany({});


    await prisma.productImage.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    // Eliminar datos existentes

    const { products, users, categories } = initialData;


    await prisma.user.createMany({
        data: users
        
    });
    
    // Insertar Paises
    await prisma.country.createMany({
        data: countries,
        skipDuplicates: true
    });

    // Insertar Cateogrias
    const categoriesData = categories.map( category => ({ name: category}));
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