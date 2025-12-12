import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
}

export function CartSummary({ subtotal, shipping, discount, total }: CartSummaryProps) {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
                <div className="flex justify-between text-subtext-light dark:text-subtext-dark">
                    <span>Subtotal</span>
                    <span className="font-medium text-text-light dark:text-text-dark">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-subtext-light dark:text-subtext-dark">
                    <span>Shipping Estimate</span>
                    <span className="font-medium text-text-light dark:text-text-dark">৳{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary font-semibold">
                    <span>Save</span>
                    <span>৳{discount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">৳{total.toFixed(2)}</span>
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
