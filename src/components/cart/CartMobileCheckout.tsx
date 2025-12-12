"use client";

import { ShoppingBag, Search, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CartMobileCheckoutProps {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    count: number;
}

export function CartMobileCheckout({ subtotal, shipping, discount, total, count }: CartMobileCheckoutProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex-none bg-surface-light dark:bg-surface-dark rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-gray-100 dark:border-gray-800 md:hidden">
            <div className="px-5 pt-4 pb-2">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wide">Order Summary</span>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full transition-colors"
                    >
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                    </button>
                </div>

                {isExpanded && (
                    <div className="space-y-2 mb-4 animate-in slide-in-from-bottom-2 fade-in duration-200">
                        <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                            <span>Subtotal</span>
                            <span className="font-medium text-text-light dark:text-text-dark">৳{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-primary">
                            <span>Less Save Amount</span>
                            <span className="font-medium">- ৳{discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark border-b border-gray-100 dark:border-gray-800 pb-2">
                            <span>Delivery</span>
                            <span className="font-medium text-text-light dark:text-text-dark">৳{shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                            <span className="font-bold text-lg text-text-light dark:text-text-dark">Total</span>
                            <span className="font-bold text-lg text-text-light dark:text-text-dark">৳{total.toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="px-4 pb-4 bg-surface-light dark:bg-surface-dark">
                <div className="flex items-center gap-4">
                    <button className="flex-1 bg-primary hover:bg-primary-dark transition-colors text-white rounded-full py-3.5 px-6 shadow-lg shadow-green-200/50 dark:shadow-none flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <ShoppingBag className="w-6 h-6" />
                                <span className="absolute -top-1.5 -right-1.5 bg-white text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>
                            </div>
                            <span className="font-semibold text-lg">Checkout</span>
                        </div>
                        <span className="font-medium bg-white/20 px-2 py-0.5 rounded text-sm group-hover:bg-white/30 transition-colors">৳{total.toFixed(2)}</span>
                    </button>
                    <button className="flex flex-col items-center justify-center w-12 h-12 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        <Search className="w-6 h-6" />
                        <span className="text-[10px] mt-0.5">Search</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
