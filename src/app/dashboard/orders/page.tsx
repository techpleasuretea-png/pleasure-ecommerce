"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

// Mock Data
const orders = [
    {
        id: "ORD-3329",
        date: "Oct 24, 2025",
        status: "Delivered",
        total: 34.47,
        items: [
            { name: "Organic Avocados", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo" },
            { name: "Sourdough Bread", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4" },
            { name: "Wild-Caught Salmon", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMpbXKMQJF9FLP_tSEiqFMxcBfGIA2thlOXd4f9YcbQT10Wuk2j13tsBCrQyzYrqEZFDCeo-fDUhy6Ujs6l6wG0QL4FeNSkaPQnRRVvD8Htx22Hg5M-ZPu1hUOpgYmJix1z_h5fe5uGTapm77FUCOvWKsEx0SHERUw6XCm7g3WCaWoV126ePVB3NYt0H1jDsq1k881XFGjIzCKD2_Z5Qs6eHJYLJIPs_ivhpQYwTELBBa8Dc90-ILG6vRzWpWqquMtUzgpJq2tZc4" },
        ],
    },
    {
        id: "ORD-3328",
        date: "Oct 20, 2025",
        status: "Delivered",
        total: 125.00,
        items: [
            { name: "Organic Honey", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&auto=format&fit=crop" },
            { name: "Almond Milk", image: "https://images.unsplash.com/photo-1623592398565-38148b52588d?w=800&auto=format&fit=crop" },
        ],
    },
];

export default function OrderHistoryPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold font-display text-text-light dark:text-text-dark">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Order #{order.id}</h3>
                                    <p className="text-sm text-subtext-light dark:text-subtext-dark">{order.date}</p>
                                </div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === "Delivered"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                                {order.items.map((item, index) => (
                                    <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-800">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                            <div>
                                <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1 text-right">Total Amount</p>
                                <p className="text-xl font-bold text-primary text-right">৳{order.total.toFixed(2)}</p>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                View Details <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
