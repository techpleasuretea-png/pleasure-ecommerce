import { Check, Lock } from "lucide-react";

interface CheckoutOrderSummaryProps {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    items: Array<{
        id: number;
        name: string;
        weight: string;
        price: number;
        image: string;
        quantity: number;
    }>;
    onPlaceOrder: () => void;
    isLoading?: boolean;
}

export function CheckoutOrderSummary({ subtotal, shipping, discount, total, items, onPlaceOrder, isLoading }: CheckoutOrderSummaryProps) {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Items List */}
            <div className="mb-6 space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                            <img alt={item.name} className="h-full w-full object-cover object-center" src={item.image} />
                        </div>
                        <div className="flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-sm font-medium text-text-light dark:text-text-dark">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">৳{item.price.toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-xs text-subtext-light dark:text-subtext-dark">{item.weight}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-xs">
                                <p className="text-subtext-light dark:text-subtext-dark">Qty {item.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between text-subtext-light dark:text-subtext-dark">
                    <span>Subtotal</span>
                    <span className="font-medium text-text-light dark:text-text-dark">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-subtext-light dark:text-subtext-dark">
                    <span>Shipping</span>
                    <span className="font-medium text-text-light dark:text-text-dark">৳{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary font-semibold">
                    <span>Discount</span>
                    <span>-৳{discount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">৳{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Place Order Button */}
            <button
                onClick={onPlaceOrder}
                disabled={isLoading}
                className="w-full mt-6 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? "Processing..." : "Place Order"}
                {!isLoading && <Check className="w-4 h-4" />}
            </button>

            <p className="text-xs text-center text-subtext-light dark:text-subtext-dark mt-4 flex items-center justify-center gap-1">
                <Lock className="w-4 h-4" /> Secure Checkout
            </p>
        </div>
    );
}
