import getBalance from "./getBalance";
import Card from './card';
import Greeting from './greeting';
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import prisma from "@repo/db/client";
import TransactionLineChart from "./lineChart";
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    
    // Get received transactions (OnRamp)
    const receivedTxns = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    });

    // Get sent transactions (P2P)
    const sentTxns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: userId
        }
    });

    // Get received P2P transactions
    const receivedP2PTxns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: userId
        }
    });

    const formattedReceivedTxns = receivedTxns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        type: 'received' as const
    }));

    const formattedSentTxns = sentTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        status: 'Success',
        provider: 'P2P Transfer',
        type: 'sent' as const
    }));

    const formattedReceivedP2PTxns = receivedP2PTxns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        status: 'Success',
        provider: 'P2P Transfer',
        type: 'received' as const
    }));

    // Combine all transactions and sort by time
    return [...formattedReceivedTxns, ...formattedSentTxns, ...formattedReceivedP2PTxns]
        .sort((a, b) => b.time.getTime() - a.time.getTime());
}

export default async function Dashboard() 
{
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    const session = await getServerSession(authOptions);
    const username = session?.user?.name || "User";

    return (
        <div className="p-6 w-full">
            <Greeting username={username} />
            <div className="items-center justify-center">
                <Card balance={balance} />
                </div>
                <div className="flex flex-row gap-6">
                    <TransactionLineChart transactions={transactions} />
                    <OnRampTransactions transactions={transactions} />
                </div>
        </div>
    );
}