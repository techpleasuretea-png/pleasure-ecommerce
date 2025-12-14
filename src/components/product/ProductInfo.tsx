import { Star } from "lucide-react";

interface ProductInfoProps {
    name: string;
    weight: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice: number;
    discount: string;
}

export function ProductInfo({ name, weight, rating, reviews, price, originalPrice, discount }: ProductInfoProps) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight">
                {name} <span className="text-lg md:text-2xl font-medium text-subtext-light">{weight}</span>
            </h1>

            <div className="flex items-center gap-4">
                <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                        />
                    ))}
                </div>
                <span className="text-sm font-bold text-text-light dark:text-text-dark">{rating}</span>
                <span className="text-sm text-subtext-light dark:text-subtext-dark">({reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">৳{price}</span>
                {originalPrice > price && (
                    <span className="text-lg text-subtext-light dark:text-subtext-dark line-through decoration-red-500/50 decoration-2">
                        ৳{originalPrice}
                    </span>
                )}
            </div>
        </div>
    );
}
