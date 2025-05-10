"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number, message: string) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    // Make API call to HDFC webhook
    const response = await fetch('http://localhost:3004/hdfcWebhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token,
            user_identifier: session?.user?.id,
            amount: amount * 100
        })
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to initiate transaction with bank');
    }
    
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100,
            message: message
        }
    });

    return {
        message: "Done"
    }
} 