"use client"

import { useState } from "react"
import { updateTransactionMessage } from "../app/lib/actions/updateTransactionMessage"

interface TransactionNoteProps {
    transactionId: number
    initialMessage: string | null
}

export const TransactionNote = ({ transactionId, initialMessage }: TransactionNoteProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [message, setMessage] = useState(initialMessage || "")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            await updateTransactionMessage(transactionId, message)
            setIsEditing(false)
        } catch (error) {
            console.error("Failed to update message:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isEditing) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg w-96">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter note"
                        rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            {message && (
                <div className="text-xs text-gray-500">
                    {message}
                </div>
            )}
            <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
                title="Add note"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
} 