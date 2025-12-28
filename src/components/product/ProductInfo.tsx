import { Star } from "lucide-react";
import { Product } from "@/types/product";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { name, weight, rating, reviews, price, originalPrice } = product;

    return (
        <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight font-display">
                {name} - <span className="font-medium text-subtext-light">{weight}</span>
            </h1>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="flex text-amber-400 text-base md:text-lg">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                        />
                    ))}
                </div>
                <span className="text-subtext-light dark:text-subtext-dark text-sm hover:text-primary cursor-pointer">({reviews} Customer reviews)</span>
            </div>

            <div className="flex items-baseline gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl font-bold text-primary">৳{price}</span>
                {originalPrice && originalPrice > price && (
                    <span className="text-xl text-subtext-light dark:text-subtext-dark line-through">
                        ৳{originalPrice}
                    </span>
                )}
            </div>
        </div>
    );
}
