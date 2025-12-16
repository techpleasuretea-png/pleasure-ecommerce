"use client";

import { ShoppingBag, MapPin, CreditCard, Clock, XCircle, LogOut } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold font-display text-text-light dark:text-text-dark">Overview</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark uppercase font-bold tracking-wider">Total Orders</p>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">12</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark uppercase font-bold tracking-wider">Pending</p>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">1</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                            <XCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark uppercase font-bold tracking-wider">Cancel Order</p>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">0</h3>
                        </div>
                    </div>
                </div>


            </div>

            <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-text-light dark:text-text-dark">Recent Activity</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-50 dark:border-gray-800 last:pb-0 last:border-0">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-subtext-light dark:text-subtext-dark flex-shrink-0">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-text-light dark:text-text-dark truncate">Order #ORD-3329</h4>
                                <span className="text-primary font-bold">৳34.47</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-subtext-light dark:text-subtext-dark">
                                <span>Oct 24, 2025</span>
                                <span>•</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    Delivered
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pb-6 border-b border-gray-50 dark:border-gray-800 last:pb-0 last:border-0">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-subtext-light dark:text-subtext-dark flex-shrink-0">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-text-light dark:text-text-dark truncate">Order #ORD-3328</h4>
                                <span className="text-primary font-bold">৳125.00</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-subtext-light dark:text-subtext-dark">
                                <span>Oct 20, 2025</span>
                                <span>•</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    Delivered
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
