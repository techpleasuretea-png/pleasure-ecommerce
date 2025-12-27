"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MobileHeader } from "../mobile/MobileHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";


import { useAuth } from "@/context/AuthContext";

function HeaderContent() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // const [searchQuery, setSearchQuery] = useState(""); // Removed as it's now internal to SearchInput
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth(); // Use global auth context
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();

    const isNewArrivals = searchParams.get("newArrivals") === "true";
    const isOnSale = searchParams.get("onSale") === "true";
    const isShop = pathname.startsWith("/shop") && !isNewArrivals && !isOnSale;

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Removed local useEffect for user fetching

    // Removed handleSearch as it's now handled by SearchInput

    return (
        <header className="hidden md:block py-4 px-4 md:px-8 bg-background-light dark:bg-background-dark sticky top-0 z-50 shadow-sm md:shadow-none">
            <div className="mx-auto max-w-[1600px]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.svg" alt="Pleasure Logo" width={120} height={40} className="h-10 w-auto" />
                        </div>

                        <nav className="flex items-center gap-6 text-sm font-medium">
                            <Link
                                className={`${pathname === "/" ? "text-primary font-semibold" : "hover:text-primary"} transition-colors`}
                                href="/"
                            >
                                Home
                            </Link>
                            <Link
                                className={`${isShop ? "text-primary font-semibold" : "hover:text-primary"} transition-colors`}
                                href="/shop"
                            >
                                Shop
                            </Link>
                            <Link
                                className={`${isNewArrivals ? "text-primary font-semibold" : "hover:text-primary"} transition-colors`}
                                href="/shop?newArrivals=true"
                            >
                                New Arrivals
                            </Link>
                            <Link
                                className={`${isOnSale ? "text-primary font-semibold" : "hover:text-primary"} transition-colors`}
                                href="/shop?onSale=true"
                            >
                                Offers
                            </Link>
                        </nav>
                    </div>

                    {/* Desktop Actions */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <SearchInput className="w-64" placeholder="Search products..." />
                        </div>

                        <div className="flex flex-col items-end text-sm">
                            <span className="text-subtext-light dark:text-subtext-dark text-xs">Call for Order</span>
                            <span className="font-bold text-primary">01914532441</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {loading ? (
                                // Loading skeleton or empty space
                                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                            ) : user ? (
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors flex items-center gap-2"
                                    title="Go to Dashboard"
                                >
                                    <User className="w-6 h-6 text-primary" />
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </Link>
                            )}

                            <Link
                                href="/dashboard/wishlist"
                                className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors relative"
                            >
                                <Heart className="w-6 h-6" />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            <div
                                className="flex items-center gap-2 cursor-pointer p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg transition-colors"
                                onClick={() => router.push('/cart')}
                            >
                                <div className="relative">
                                    <ShoppingBag className="w-6 h-6" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <div className="hidden xl:block text-sm">
                                    <span className="text-xs text-subtext-light dark:text-subtext-dark block">Cart</span>
                                    <p className="font-semibold">৳{totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function Header() {
    return (
        <>
            <div className="md:hidden">
                <MobileHeader />
            </div>

            <Suspense fallback={<div className="h-20 bg-background-light dark:bg-background-dark" />}>
                <HeaderContent />
            </Suspense>
        </>
    );
}
