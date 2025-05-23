import express from "express";
const db = require("@repo/db/client");
const app = express();

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

    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
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
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error while processing webhook:', e);

    res.status(500).json({
      message: 'Error while processing webhook',
    });
  }



})

app.listen(3004);