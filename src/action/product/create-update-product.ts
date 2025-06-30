"use server";
import { Gender, Product, Size } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((value) => value.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParse = productSchema.safeParse(data);

  if (!productParse.success) {
    console.log(productParse.error);
    return {
      ok: false,
    };
  }

  const product = productParse.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-");

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Actualizar producto
        product = await prisma.product.update({
          where: {
            id: id,
          },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
        // console.log(formData.getAll("images"));
      } else {
        // Crear producto
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Proceso de carga y guardado de imagenes
        // Recorrer las imagenes y guardarlas en cloudinary
        if (formData.getAll("images")) {
          const images = await uploadImages(
            formData.getAll("images") as File[]
          );

          if (!images) {
            throw new Error("No se pudo cargar las imagenes, rollingback");
          }

          await prisma.productImage.createMany({
              data: images.map( image => ({
                url: image!,
                productId: product.id
              }))
          })
        }

      return {
        product,
      };
    });

    // Todo: Revalidate path
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Revisar los logs no se pudo actualizar/crear",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
