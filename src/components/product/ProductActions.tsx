import { Minus, Plus, ShoppingBag, Heart } from "lucide-react";

interface ProductActionsProps {
    product: any; // Using any to avoid type complexity for now, or use Product interface
    quantity: number;
    setQuantity: (q: number) => void;
    onAddToCart: () => void;
    onBuyNow: () => void;
}

export function ProductActions({ product, quantity, setQuantity, onAddToCart, onBuyNow }: ProductActionsProps) {
    return (
        <div className="flex flex-col gap-6 py-4 md:py-6 border-t border-b border-gray-100 dark:border-gray-800 my-6">
            <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#333333] dark:text-white md:hidden">Quantity</span>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl w-max bg-gray-50 dark:bg-transparent">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 hover:text-primary transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        className="w-12 text-center bg-transparent border-none focus:ring-0 p-0 text-text-light dark:text-text-dark font-semibold"
                        readOnly
                    />
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 hover:text-primary transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 md:mb-8 md:flex md:gap-4">
                <button
                    onClick={onAddToCart}
                    className="flex-1 font-semibold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all 
                    border-2 border-primary text-primary bg-transparent hover:bg-primary/5
                    md:bg-primary md:text-white md:border-transparent md:shadow-lg md:shadow-primary/20 md:hover:bg-opacity-90"
                >
                    <ShoppingBag className="w-5 h-5 hidden md:block" />
                    Add to Cart
                </button>
                <button
                    onClick={onBuyNow}
                    className="flex-1 font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center
                    bg-primary text-white shadow-lg shadow-primary/20 hover:bg-opacity-90
                    md:bg-transparent md:text-primary md:border-2 md:border-primary md:shadow-none md:hover:bg-primary md:hover:text-white"
                >
                    Buy Now
                </button>
            </div>

            <div className="space-y-3 text-sm text-subtext-light dark:text-subtext-dark border-gray-100 dark:border-gray-800">
                <div className="flex gap-2">
                    <span className="font-semibold text-text-light dark:text-text-dark min-w-[80px]">SKU:</span>
                    <span>{product.sku || "N/A"}</span>
                </div>
                {product.category && product.category.length > 0 && (
                    <div className="flex gap-2">
                        <span className="font-semibold text-text-light dark:text-text-dark min-w-[80px]">Category:</span>
                        {product.category.map((cat: string, idx: number) => (
                            <a key={idx} href="#" className="hover:text-primary transition-colors">{cat}{idx < product.category.length - 1 ? ", " : ""}</a>
                        ))}
                    </div>
                )}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex gap-2">
                        <span className="font-semibold text-text-light dark:text-text-dark min-w-[80px]">Tags:</span>
                        <span>{product.tags.join(", ")}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
