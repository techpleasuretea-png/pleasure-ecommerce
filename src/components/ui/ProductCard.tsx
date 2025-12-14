import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    name: string;
    weight: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
}

export function ProductCard({ name, weight, price, originalPrice, discount, image }: ProductCardProps) {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden group border border-transparent hover:border-gray-100 dark:hover:border-gray-800 hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {discount && (
                    <div className="absolute top-2 left-2 z-10 flex h-6 items-center justify-center rounded-full bg-red-500 px-2.5">
                        <p className="text-xs font-bold text-white">{discount}</p>
                    </div>
                )}
                <button className="absolute bottom-3 right-3 bg-white dark:bg-surface-dark p-2 rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg leading-tight mb-1">{name} - <span className="text-subtext-light dark:text-subtext-dark font-normal">{weight}</span></h3>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-primary font-bold text-xl">৳{price.toFixed(2)}</p>
                    {originalPrice && (
                        <p className="text-subtext-light dark:text-subtext-dark text-sm line-through">৳{originalPrice.toFixed(2)}</p>
                    )}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3 mt-4">
                    <button className="w-full bg-primary text-white font-bold py-2.5 rounded-lg text-sm hover:bg-green-600 shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                    <button className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                        Buy Now
                    </button>
                </div>

                {/* Mobile Buttons */}
                <div className="flex md:hidden items-center gap-2 mt-3">
                    <button className="flex-1 bg-primary text-white font-bold h-10 rounded-lg text-sm hover:bg-opacity-90 active:scale-95 transition-all">Buy</button>
                    <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
