"use client";

import { ArrowRight, Truck } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
}

export function CartSummary({ subtotal, shipping, discount, total }: CartSummaryProps) {
    // Hardcoded threshold for now as per requirement "more than 1000, cost will be 0".
    // In a real app, we might fetch this from the shipping methods or config.
    const FREE_SHIPPING_THRESHOLD = 1000;
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
    const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Free Shipping Progress */}
            {!isFreeShipping && (
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Add <span className="font-bold">৳{amountToFreeShipping.toFixed(0)}</span> more to get free shipping!
                    </p>
                    <div className="h-2 w-full bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {isFreeShipping && (
                <div className="mb-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-300 flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        You've unlocked <span className="font-bold">Free Shipping!</span>
                    </p>
                </div>
            )}

            <div className="space-y-4 text-sm">
                <div className="flex justify-between text-subtext-light dark:text-subtext-dark">
                    <span>Subtotal</span>
                    <span className="font-medium text-text-light dark:text-text-dark">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-subtext-light dark:text-subtext-dark">
                    <span>Shipping Estimate</span>
                    <span className="font-medium text-text-light dark:text-text-dark">
                        {isFreeShipping ? <span className="text-green-600 line-through mr-2">৳{shipping.toFixed(2)}</span> : null}
                        {isFreeShipping ? <span className="text-green-600">Free</span> : <span><span className="text-xs text-subtext-light font-normal">from</span> ৳{shipping.toFixed(2)}</span>}
                    </span>
                </div>
                <div className="flex justify-between text-primary font-semibold">
                    <span>Save</span>
                    <span>৳{discount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">৳{isFreeShipping ? (subtotal - discount).toFixed(2) : total.toFixed(2)}</span>
                </div>
            </div>
            <Link href="/checkout" className="w-full mt-6 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Payment Icons Placeholder */}
            <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale">
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}
