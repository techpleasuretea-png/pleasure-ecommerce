"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface OrderStatusUpdateProps {
    orderId: string;
    currentStatus: string;
    action: (id: string, formData: FormData) => Promise<void>;
}

export function OrderStatusUpdate({ orderId, currentStatus, action }: OrderStatusUpdateProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Available statuses
    const statuses = [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            await action(orderId, formData);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex-1">
                <label className="block text-xs font-bold text-subtext-light dark:text-subtext-dark mb-1.5 uppercase tracking-wider">Update Status</label>
                <div className="relative">
                    <select
                        name="status"
                        defaultValue={currentStatus}
                        disabled={isLoading}
                        className="w-full appearance-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark text-sm rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-subtext-light dark:text-subtext-dark">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="self-end pb-0.5">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="h-[42px] px-5 bg-primary text-white rounded-lg font-bold text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
                </button>
            </div>
        </form>
    );
}
