
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("User is not authenticated");
  }

  const userId = Number(session.user.id);

  // First, check if balance exists for this user
  let balance = await prisma.balance.findFirst({
    where: {
      userId: userId
    }
  });

  // If no balance, create a new balance
  if (!balance) {
    balance = await prisma.balance.create({
      data: {
        userId: userId,
        amount: 0, // initial balance
        locked: 0, // initial locked amount
      }
    });
  }

  return {
    amount: (balance?.amount || 0) / 100,
    locked: (balance?.locked || 0) / 100
  };
}

export default getBalance;
