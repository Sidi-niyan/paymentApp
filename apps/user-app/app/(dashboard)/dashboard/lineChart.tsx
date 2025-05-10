'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TransactionLineChart({
  transactions
}: {
  transactions: {
    time: Date;
    amount: number;
    type: 'sent' | 'received';
  }[]
}) {
  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => a.time.getTime() - b.time.getTime());

  // Calculate running balance
  let balance = 0;
  const chartData = sortedTransactions.map(t => {
    balance += t.type === 'received' ? t.amount : -t.amount;
    return {
      time: t.time.toLocaleDateString(),
      balance: balance / 100 // Convert from paisa to rupees
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h3 className="text-xl font-semibold mb-4">Balance History</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Balance (₹)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Balance']}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
