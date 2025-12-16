"use client";

import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ShopSidebar } from "./ShopSidebar";
import { useSearchParams } from "next/navigation";

interface Category {
    name: string;
    slug: string;
}

interface ShopMobileBarProps {
    categories: Category[];
}

export function ShopMobileBar({ categories }: ShopMobileBarProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const searchParams = useSearchParams();

    // Close drawer when URL changes (e.g. filters applied)
    useEffect(() => {
        setIsFilterOpen(false);
    }, [searchParams]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isFilterOpen]);

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
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
                        <ArrowUpDown className="w-5 h-5" />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark md:hidden flex flex-col">
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 pb-24">
                        <ShopSidebar categories={categories} mobile={true} />
                    </div>
                </div>
            )}
        </>
    );
}
