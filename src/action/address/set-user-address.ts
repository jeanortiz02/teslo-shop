"use server";

import { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddres = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddres,
    }
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo grabar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    const AddressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    };



    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: AddressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId: userId,
      },
      data: AddressToSave,
    });

    return updatedAddress; 


  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la direccion");
  }
};
