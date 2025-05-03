import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getBalance from "./getBalance";
export default function transactionCard(){
    return(
        <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
            {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="border-b pb-3">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">
                            {transaction.type === 'sent' ? `To ${transaction.to}` : `From ${transaction.from}`}
                        </span>
                        <span className={`font-semibold ${
                            transaction.type === 'sent' 
                                ? 'text-red-500' 
                                : 'text-green-500'
                        }`}>
                            {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
            ))}
        </div>
    </div>
    )
}