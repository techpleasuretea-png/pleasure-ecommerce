import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
    id: number;
    name: string;
    weight: string;
    price: number;
    originalPrice?: number;
    savings?: number;
    image: string;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}

export function CartItem({ id, name, weight, price, originalPrice, savings, image, quantity, onIncrement, onDecrement, onRemove }: CartItemProps) {
    return (
        <div className="group relative">
            {/* Desktop View (Grid Row) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 items-center last:border-0 bg-surface-light dark:bg-surface-dark">
                <div className="col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-light dark:text-text-dark">{name} - {weight}</h3>
                        {savings && (
                            <div className="mt-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    Save ৳{savings.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <button onClick={onRemove} className="text-red-500 text-sm flex items-center gap-1 mt-2 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" /> Remove
                        </button>
                    </div>
                </div>
                <div className="col-span-2 text-center">
                    <span className="font-medium text-text-light dark:text-text-dark">৳{price.toFixed(2)}</span>
                </div>
                <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button onClick={onDecrement} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-subtext-light dark:text-subtext-dark">
                            <Minus className="w-4 h-4" />
                        </button>
                        <input className="w-12 text-center border-none bg-transparent p-0 text-sm focus:ring-0" readOnly type="number" value={quantity} />
                        <button onClick={onIncrement} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-subtext-light dark:text-subtext-dark">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="col-span-2 text-right">
                    <span className="font-bold text-primary text-lg">৳{(price * quantity).toFixed(2)}</span>
                </div>
            </div>

            {/* Mobile View (Card) */}
            <div className="md:hidden bg-surface-light dark:bg-surface-dark rounded-xl p-3 shadow-sm flex gap-4 items-center mb-4">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-medium text-text-light dark:text-text-dark truncate">{name}</h3>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-primary font-semibold text-lg">৳{price.toFixed(2)}</span>
                                {savings && <span className="text-subtext-light dark:text-subtext-dark text-xs">(Save ৳{savings})</span>}
                            </div>
                        </div>
                        <button onClick={onRemove} className="text-subtext-light dark:text-subtext-dark hover:text-red-500 transition-colors p-1">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <button onClick={onDecrement} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-medium w-4 text-center">{quantity}</span>
                        <button onClick={onIncrement} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
