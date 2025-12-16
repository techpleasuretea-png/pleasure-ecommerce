"use client";



import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ShopSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [featured, setFeatured] = useState(false);
    const [onSale, setOnSale] = useState(false);

    useEffect(() => {
        setFeatured(searchParams.get("featured") === "true");
        setOnSale(searchParams.get("onSale") === "true");
    }, [searchParams]);

    const handleFilterChange = (key: string, value: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, "true");
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <aside className="w-full space-y-8">
            <div>
                <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Filter by</h3>
                <div className="space-y-2 text-sm">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                className="peer h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark cursor-pointer appearance-none checked:bg-primary checked:border-primary border transition-all"
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => handleFilterChange("featured", e.target.checked)}
                            />
                            <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="ml-2 text-subtext-light dark:text-subtext-dark group-hover:text-primary transition-colors">Featured Product</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                className="peer h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark cursor-pointer appearance-none checked:bg-primary checked:border-primary border transition-all"
                                type="checkbox"
                                checked={onSale}
                                onChange={(e) => handleFilterChange("onSale", e.target.checked)}
                            />
                            <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="ml-2 text-subtext-light dark:text-subtext-dark group-hover:text-primary transition-colors">Price Offer</span>
                    </label>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Categories</h3>
                <div className="space-y-2 text-sm">
                    {["Fruits", "Vegetables", "Dairy & Eggs", "Bakery", "Meat & Seafood", "Drinks", "Snacks", "Pantry"].map((category) => (
                        <label key={category} className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    className="peer h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark cursor-pointer appearance-none checked:bg-primary checked:border-primary border transition-all"
                                    type="checkbox"
                                />
                                <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-2 text-subtext-light dark:text-subtext-dark group-hover:text-primary transition-colors">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Price Range</h3>
                <div className="space-y-4">
                    <input
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        type="range"
                        min="0"
                        max="100"
                    />
                    <div className="flex justify-between text-sm text-subtext-light dark:text-subtext-dark font-medium">
                        <span>৳0</span>
                        <span>৳100</span>
                    </div>
                </div>
            </div>

            <button className="w-full bg-primary text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-md shadow-primary/20 active:scale-95">
                Apply Filters
            </button>
        </aside>
    );
}
