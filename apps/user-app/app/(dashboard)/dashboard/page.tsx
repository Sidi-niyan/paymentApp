import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getBalance from "./getBalance";

import chart from "./chart";
import 

export default function Dashboard() {

    const balance = getBalance();
    console.log("Balance" , balance);
    // Dummy data for the pie chart
    const balanceData = [
        { name: 'Locked Balance', value: 2500 },
        { name: 'Unlocked Balance', value: 7500 },
    ];

    const COLORS = ['#FF8042', '#00C49F'];

    // Add dummy transaction data
    const recentTransactions = [
        { id: 1, type: 'received', amount: 1500, from: 'Alice Smith', date: '2024-03-15' },
        { id: 2, type: 'sent', amount: 2000, to: 'Bob Johnson', date: '2024-03-14' },
        { id: 3, type: 'received', amount: 800, from: 'Charlie Brown', date: '2024-03-13' },
        { id: 4, type: 'sent', amount: 1200, to: 'Diana Prince', date: '2024-03-12' },
    ];

    return (
        // <div>
        //     Dashboard
        // </div>
        <div className="p-6 w-full">
            {/* User greeting section */}
            <div className="mb-6">
                <p className="text-gray-500 text-sm">Hi, John Doe</p>
                <h1 className="text-2xl font-bold mt-2">Welcome to Paygo</h1>
            </div>

            {/* Balance overview card */}
            <div className = "items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">Current Balance</p>
                    <h2 className="text-3xl font-bold">₹10,000</h2>
                </div>
            </div>

            {/* Balance distribution and transactions section */}
            <div className="flex flex-row gap-6">
                {/* Existing pie chart div with modified width */}
                <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-4">Balance Distribution</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={balanceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {balanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 text-sm">Locked Balance</p>
                            <p className="text-xl font-semibold">₹2,500</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 text-sm">Unlocked Balance</p>
                            <p className="text-xl font-semibold">₹7,500</p>
                        </div>
                    </div>
                </div>

                {/* New Recent Transactions Card */}
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
            </div>
            </div>
        </div>
    );
}