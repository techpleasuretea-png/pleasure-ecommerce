import { ArrowRight } from "lucide-react";

interface CheckoutMobileBarProps {
    total: number;
}

export function CheckoutMobileBar({ total }: CheckoutMobileBarProps) {
    return (
        <div className="flex-none bg-white dark:bg-surface-dark rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-gray-100 dark:border-gray-800 z-30 fixed bottom-0 left-0 right-0 md:hidden">
            <div className="px-5 py-4 safe-area-bottom">
                <div className="flex justify-between items-end mb-4 px-1">
                    <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        <p>Total Amount</p>
                        <p className="text-xs text-green-600 font-medium">Incl. Shipping</p>
                    </div>
                    <div className="text-2xl font-bold text-text-light dark:text-text-dark">
                        ৳{total.toFixed(2)}
                    </div>
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark transition-colors text-white rounded-full py-4 px-6 shadow-lg shadow-green-200/50 dark:shadow-none flex items-center justify-center gap-2 group active:scale-[0.98] transform duration-100">
                    <span className="font-bold text-lg">Place Order</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
