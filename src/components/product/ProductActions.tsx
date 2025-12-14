import { Minus, Plus, ShoppingBag, Heart } from "lucide-react";

interface ProductActionsProps {
    quantity: number;
    setQuantity: (q: number) => void;
    onAddToCart: () => void;
    onBuyNow: () => void;
}

export function ProductActions({ quantity, setQuantity, onAddToCart, onBuyNow }: ProductActionsProps) {
    return (
        <div className="flex flex-col gap-4 py-6 border-t border-b border-gray-100 dark:border-gray-800 my-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-full px-4 py-2">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 hover:text-primary transition-colors"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 hover:text-primary transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                <div className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                    In Stock
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                <button
                    onClick={onAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                </button>
                <button
                    onClick={onBuyNow}
                    className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary dark:hover:border-primary text-text-light dark:text-text-dark font-bold py-3.5 rounded-xl transition-all"
                >
                    Buy Now
                </button>
                <button className="p-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
                </button>
            </div>
        </div>
    );
}
