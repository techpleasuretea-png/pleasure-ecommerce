"use client";

import Link from "next/link";
import { ShoppingBag, Search, Store } from "lucide-react";

export function MobileBottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 pb-safe">
            <div className="flex h-24 items-center justify-between px-8">
                <Link
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors duration-200"
                    href="/shop"
                >
                    <Store className="w-6 h-6" />
                    <span className="text-xs font-medium">Shop</span>
                </Link>
                <Link
                    className="flex h-16 w-[60%] items-center justify-center gap-4 rounded-full bg-primary px-6 text-white shadow-lg shadow-primary/30"
                    href="/cart"
                >
                    <div className="relative">
                        <ShoppingBag className="w-8 h-8" />
                        <div className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                            3
                        </div>
                    </div>
                    <div className="text-lg font-bold">৳1018</div>
                </Link>
                <Link
                    className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
                    href="/search"
                >
                    <Search className="w-6 h-6" />
                    <span className="text-xs font-medium">Search</span>
                </Link>
            </div>
        </nav>
    );
}
