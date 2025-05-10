import express from "express";
import prisma from "@repo/db/client";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        // Log the payment information for debugging purposes
        console.log('Received payment information:', paymentInformation);
        console.log('Request body:', req.body);

        // Verify database connection
        await prisma.$connect();

        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount),
                    },
                },
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: 'Success',
                },
            }),
        ]);

        res.json({
            message: 'Captured',
        });
    } catch (e: any) {
        // Log the error for debugging purposes
        console.error('Error while processing webhook:', e);
        console.error('Error details:', {
            error: e,
            stack: e.stack,
            body: req.body
        });

        res.status(500).json({
            message: 'Error while processing webhook',
            error: e.message
        });
    } finally {
        await prisma.$disconnect();
    }
});

app.listen(3004, () => {
    console.log('Webhook server is running on port 3004');
});