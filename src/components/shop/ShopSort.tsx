"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function ShopSort() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "popularity";

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "popularity") {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="hidden md:flex justify-end items-center mb-6">
            <div className="relative">
                <select
                    value={currentSort}
                    onChange={handleSortChange}
                    className="appearance-none w-48 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-text-light dark:text-text-dark"
                >
                    <option value="popularity">Sort by popularity</option>
                    <option value="price_asc">Sort by price: low to high</option>
                    <option value="price_desc">Sort by price: high to low</option>
                    <option value="newest">Sort by new arrivals</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext-light dark:text-subtext-dark pointer-events-none" />
            </div>
        </div>
    );
}
