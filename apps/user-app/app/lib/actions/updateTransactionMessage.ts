"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function updateTransactionMessage(transactionId: number, message: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    try {
        await prisma.onRampTransaction.update({
            where: {
                id: transactionId,
                userId: Number(session.user.id)
            },
            data: {
                message
            }
        });

        return {
            message: "Message updated successfully"
        }
    } catch (error) {
        return {
            message: "Failed to update message"
        }
    }
} 