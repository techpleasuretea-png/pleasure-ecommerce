"use client";

import { Home, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function ShopMobileFooter() {
    const { cartItems } = useCart();

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 md:hidden">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Home - Left */}
                <Link href="/" className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                    <Home className="w-6 h-6" />
                    <span className="text-xs font-medium">Home</span>
                </Link>

                {/* Cart - Middle */}
                <Link href="/cart" className="flex h-11 w-[60%] items-center justify-center gap-3 rounded-full bg-primary px-4 text-white shadow-lg shadow-primary/30 active:scale-95 transition-all">
                    <div className="relative">
                        <ShoppingBag className="w-5 h-5" />
                        {totalItems > 0 && (
                            <div className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                                {totalItems}
                            </div>
                        )}
                    </div>
                    <div className="text-base font-bold">৳{totalPrice.toFixed(2)}</div>
                </Link>

                {/* Search - Right */}
                <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                    <Search className="w-6 h-6" />
                    <span className="text-xs font-medium">Search</span>
                </button>
            </div>
        </nav>
    );
}
