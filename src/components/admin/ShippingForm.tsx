"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ShippingFormProps {
    initialData?: {
        name: string;
        cost: number;
        discount_threshold?: number | null;
        discounted_cost?: number | null;
    };
    action: (formData: FormData) => Promise<void>;
}

export function ShippingForm({ initialData, action }: ShippingFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        console.log("Client: Submitting shipping form data:", Object.fromEntries(formData.entries()));
        try {
            await action(formData);
            router.refresh(); // Refresh server data
            router.push("/admin/shipping");
        } catch (error) {
            console.error("Error saving shipping method:", error);
            alert(`Failed to save shipping method: ${(error as Error).message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Method Name <span className="text-red-500">*</span></label>
                    <input
                        name="name"
                        defaultValue={initialData?.name || ""}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., Standard Shipping"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Shipping Cost <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        step="0.01"
                        name="cost"
                        defaultValue={initialData?.cost || 0}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Free/Discount Threshold</label>
                    <input
                        type="number"
                        step="0.01"
                        name="discount_threshold"
                        defaultValue={initialData?.discount_threshold || ""}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Order value for discount"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Discounted Cost</label>
                    <input
                        type="number"
                        step="0.01"
                        name="discounted_cost"
                        defaultValue={initialData?.discounted_cost || ""}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Cost after threshold (e.g. 0)"
                    />
                </div>

            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 rounded-xl font-bold border border-gray-200 dark:border-gray-700 text-subtext-light dark:text-subtext-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Save Method
                </button>
            </div>
        </form>
    );
}
