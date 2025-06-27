'use server'

import { prisma } from "@/lib/prisma";

export const setTransactionId = async (transactionId: string, orderId: string) => {

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })


        if (!order) {
            throw new Error('No se encontro la orden');
        }


        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transaction: transactionId
            }
        })

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: "No se pudo actualizar id de la transaccion"
        }
    }
}