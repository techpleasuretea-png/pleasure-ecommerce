"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MobileHeader } from "../mobile/MobileHeader";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [user, setUser] = useState<any>(null);
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();

    const isNewArrivals = searchParams.get("newArrivals") === "true";
    const isOnSale = searchParams.get("onSale") === "true";
    const isShop = pathname.startsWith("/shop") && !isNewArrivals && !isOnSale;

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    useEffect(() => {
        const checkUser = async () => {
            const { createClient } = await import("@/lib/supabase/client");
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
    }, [pathname]); // Re-check on route change to catch login/logout updates potentially

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <div className="md:hidden">
                <MobileHeader />
            </div>

            <header className="hidden md:block py-4 px-4 md:px-8 bg-background-light dark:bg-background-dark sticky top-0 z-50 shadow-sm md:shadow-none">
                <div className="mx-auto max-w-[1600px]">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Image src="/logo.svg" alt="Pleasure Logo" width={120} height={40} className="h-10 w-auto" />
                                {/* <span className="text-2xl font-bold font-display">Organico</span> */}
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
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5 pointer-events-none" />
                                <input
                                    className="w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                    placeholder="Search products..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>

                            <div className="flex flex-col items-end text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark text-xs">Call for Order</span>
                                <span className="font-bold text-primary">01914532441</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => router.push(user ? '/dashboard' : '/login')}
                                    className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors"
                                >
                                    <User className="w-6 h-6" />
                                </button>
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
        </>
    );
}
