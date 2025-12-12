"use client";

import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

export function ShopMobileBar() {
    return (
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
            <div className="flex gap-2 w-full">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filters</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
                    <ArrowUpDown className="w-5 h-5" />
                    <span>Sort</span>
                </button>
            </div>
        </div>
    );
}
