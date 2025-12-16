"use client";

import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ShopSidebar } from "./ShopSidebar";
import { useSearchParams, useRouter } from "next/navigation";

interface Category {
    name: string;
    slug: string;
}

interface ShopMobileBarProps {
    categories: Category[];
}

export function ShopMobileBar({ categories }: ShopMobileBarProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "popularity";

    // Close drawers when URL changes
    useEffect(() => {
        setIsFilterOpen(false);
        setIsSortOpen(false);
    }, [searchParams]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isFilterOpen || isSortOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isFilterOpen, isSortOpen]);

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "popularity") {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }
        router.push(`?${params.toString()}`);
        setIsSortOpen(false);
    };

    const sortOptions = [
        { label: "Sort by popularity", value: "popularity" },
        { label: "Sort by price: low to high", value: "price_asc" },
        { label: "Sort by price: high to low", value: "price_desc" },
        { label: "Sort by new arrivals", value: "newest" },
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 py-4 md:hidden">
                <div className="flex gap-2 w-full">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                    <button
                        onClick={() => setIsSortOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
                    >
                        <ArrowUpDown className="w-5 h-5" />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark md:hidden flex flex-col">
                    <div className="flex items-center justify-end px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 pt-0 pb-24">
                        <ShopSidebar categories={categories} mobile={true} />
                    </div>
                </div>
            )}

            {/* Sort Drawer */}
            {isSortOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 md:hidden flex items-end justify-center" onClick={() => setIsSortOpen(false)}>
                    <div
                        className="w-full bg-background-light dark:bg-background-dark rounded-t-2xl p-6 shadow-xl space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sort By</h3>
                            <button
                                onClick={() => setIsSortOpen(false)}
                                className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSortChange(option.value)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${currentSort === option.value
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <span>{option.label}</span>
                                    {currentSort === option.value && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
