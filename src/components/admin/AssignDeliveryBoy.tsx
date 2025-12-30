"use client";

import { useState } from "react";
import { Loader2, Truck, Phone } from "lucide-react";
import toast from "react-hot-toast";

interface AssignDeliveryBoyProps {
    orderId: string;
    deliveryBoyName?: string | null;
    deliveryBoyPhone?: string | null;
    action: (id: string, formData: FormData) => Promise<void>;
}

export function AssignDeliveryBoy({ orderId, deliveryBoyName, deliveryBoyPhone, action }: AssignDeliveryBoyProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            await action(orderId, formData);
            toast.success("Delivery boy details updated successfully!");
        } catch (error) {
            console.error("Error updating delivery details:", error);
            toast.error("Failed to update delivery details. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                Delivery Boy Details
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-subtext-light dark:text-subtext-dark mb-1.5 uppercase tracking-wider">Name</label>
                    <input
                        type="text"
                        name="delivery_boy_name"
                        defaultValue={deliveryBoyName || ""}
                        placeholder="Delivery Boy Name"
                        className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark text-sm rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-subtext-light dark:text-subtext-dark mb-1.5 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                        <input
                            type="tel"
                            name="delivery_boy_phone"
                            defaultValue={deliveryBoyPhone || ""}
                            placeholder="Delivery Boy Phone"
                            className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark text-sm rounded-lg px-4 py-2.5 pl-10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-[42px] px-5 bg-primary text-white rounded-lg font-bold text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Details"}
                    </button>
                </div>
            </div>
        </form>
    );
}
