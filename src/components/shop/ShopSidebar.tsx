"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
    name: string;
    slug: string;
}

interface ShopSidebarProps {
    categories: Category[];
    mobile?: boolean;
}

export function ShopSidebar({ categories, mobile = false }: ShopSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [featured, setFeatured] = useState(false);
    const [onSale, setOnSale] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        setFeatured(searchParams.get("featured") === "true");
        setOnSale(searchParams.get("onSale") === "true");

        const catParam = searchParams.get("category");
        if (catParam) {
            setSelectedCategories(catParam.split(","));
        } else {
            setSelectedCategories([]);
        }

        setMinPrice(searchParams.get("min") || "");
        setMaxPrice(searchParams.get("max") || "");
    }, [searchParams]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (minPrice) params.set("min", minPrice);
        else params.delete("min");

        if (maxPrice) params.set("max", maxPrice);
        else params.delete("max");

        // Sync other filters from state
        if (featured) params.set("featured", "true");
        else params.delete("featured");

        if (onSale) params.set("onSale", "true");
        else params.delete("onSale");

        if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
        else params.delete("category");

        router.push(`?${params.toString()}`);
    };

    const handleClearFilters = () => {
        setFeatured(false);
        setOnSale(false);
        setSelectedCategories([]);
        setShowAllCategories(false);
        setMinPrice("");
        setMaxPrice("");
        router.push("?");
    };

    const handleFilterChange = (key: string, value: boolean) => {
        if (key === "featured") setFeatured(value);
        if (key === "onSale") setOnSale(value);

        if (!mobile) {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, "true");
            } else {
                params.delete(key);
            }
            router.push(`?${params.toString()}`);
        }
    };

    const handleCategoryChange = (slug: string, checked: boolean) => {
        let newCategories = [...selectedCategories];
        if (checked) {
            if (!newCategories.includes(slug)) {
                newCategories.push(slug);
            }
        } else {
            newCategories = newCategories.filter(c => c !== slug);
        }
        setSelectedCategories(newCategories);

        if (!mobile) {
            const params = new URLSearchParams(searchParams.toString());
            if (newCategories.length > 0) {
                params.set("category", newCategories.join(","));
            } else {
                params.delete("category");
            }
            router.push(`?${params.toString()}`);
        }
    };

    if (mobile) {
        return (
            <aside className="w-full space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Filter by</h3>
                    <div className="flex flex-wrap gap-2">
                        {/* Featured Chip */}
                        <button
                            onClick={() => handleFilterChange("featured", !featured)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${featured
                                ? "bg-primary text-white border-primary"
                                : "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:border-primary"
                                }`}
                        >
                            Featured
                        </button>

                        {/* On Sale Chip */}
                        <button
                            onClick={() => handleFilterChange("onSale", !onSale)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${onSale
                                ? "bg-primary text-white border-primary"
                                : "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:border-primary"
                                }`}
                        >
                            Price Offer
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {/* Category Chips */}
                        {categories.slice(0, showAllCategories ? categories.length : 8).map((category) => (
                            <button
                                key={category.slug}
                                onClick={() => handleCategoryChange(category.slug, !selectedCategories.includes(category.slug))}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedCategories.includes(category.slug)
                                    ? "bg-primary text-white border-primary"
                                    : "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:border-primary"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}

                        {/* Show More Chips Button */}
                        {categories.length > 8 && (
                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                className="px-4 py-2 rounded-full text-sm font-medium border bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {showAllCategories ? "Show Less" : `+${categories.length - 8} More`}
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Price Range</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">৳</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                                className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <span className="text-subtext-light dark:text-subtext-dark">-</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">৳</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                                className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleClearFilters}
                        className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleApplyFilters}
                        className="flex-[2] bg-primary text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-md shadow-primary/20 active:scale-95"
                    >
                        Apply Filters
                    </button>
                </div>
            </aside>
        );
    }

    // Desktop Layout (Standard)
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
                    {categories.slice(0, showAllCategories ? categories.length : 5).map((category) => (
                        <label key={category.slug} className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    className="peer h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark cursor-pointer appearance-none checked:bg-primary checked:border-primary border transition-all"
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.slug)}
                                    onChange={(e) => handleCategoryChange(category.slug, e.target.checked)}
                                />
                                <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="ml-2 text-subtext-light dark:text-subtext-dark group-hover:text-primary transition-colors">{category.name}</span>
                        </label>
                    ))}
                </div>
                {categories.length > 5 && (
                    <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className="text-primary text-sm font-semibold mt-3 hover:underline focus:outline-none"
                    >
                        {showAllCategories ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4 text-[#333333] dark:text-white">Price Range</h3>
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">৳</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                            className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <span className="text-subtext-light dark:text-subtext-dark">-</span>
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">৳</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                            className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleClearFilters}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={handleApplyFilters}
                    className="flex-[2] bg-primary text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-md shadow-primary/20 active:scale-95"
                >
                    Apply Filters
                </button>
            </div>
        </aside>
    );
}
