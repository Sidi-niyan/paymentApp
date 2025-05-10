
export default function card({balance}: {balance: any}){
    return(
        <div className = "items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="mb-4">
                <p className="text-gray-600 text-sm">Current Balance</p>
                <h2 className="text-3xl font-bold">₹{balance.amount}</h2>
            </div>
        </div>
        </div>
    )
}