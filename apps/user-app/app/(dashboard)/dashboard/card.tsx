import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getBalance from "./getBalance";
export default function card(){
    return(
        <div className = "items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="mb-4">
                <p className="text-gray-600 text-sm">Current Balance</p>
                <h2 className="text-3xl font-bold">₹10,000</h2>
            </div>
        </div>
        </div>
    )
}