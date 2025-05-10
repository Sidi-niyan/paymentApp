
export default function greeting({username}: {username: string}){
    return(
        <div className="mb-6">
        <p className="text-gray-500 text-sm">Hi, {username}</p>
        <h1 className="text-2xl font-bold mt-2">Welcome to Paygo</h1>
    </div>
    )
}