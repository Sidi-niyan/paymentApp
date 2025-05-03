import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getBalance from "./getBalance";
export default function greeting(){
    return(
        <div className="mb-6">
        <p className="text-gray-500 text-sm">Hi, John Doe</p>
        <h1 className="text-2xl font-bold mt-2">Welcome to Paygo</h1>
    </div>
    )
}