import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,   // This is interface, which is required in ts
        provider: string,
        type: 'sent' | 'received'
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => (
                <div key={`${t.time.getTime()}-${t.provider}`} className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            {t.type === 'received' ? 'Received INR' : 'Sent INR'}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center ${t.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'received' ? '+' : '-'} Rs {t.amount / 100}
                    </div>
                </div>
            ))}
        </div>
    </Card>
}