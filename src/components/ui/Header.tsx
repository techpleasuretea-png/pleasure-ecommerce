"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { MobileHeader } from "../mobile/MobileHeader";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="md:hidden">
                <MobileHeader />
            </div>

            <header className="hidden md:block py-4 px-4 md:px-8 bg-background-light dark:bg-background-dark sticky top-0 z-50 shadow-sm md:shadow-none">
                <div className="mx-auto max-w-screen-xl">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Image src="/logo.svg" alt="Organico Logo" width={120} height={40} className="h-10 w-auto" />
                                {/* <span className="text-2xl font-bold font-display">Organico</span> */}
                            </div>

                            <nav className="flex items-center gap-6 text-sm font-medium">
                                <Link className="text-primary font-semibold transition-colors" href="/">Home</Link>
                                <Link className="hover:text-primary transition-colors" href="/shop">Shop</Link>
                                <Link className="hover:text-primary transition-colors" href="/new-arrivals">New Arrivals</Link>
                                <Link className="hover:text-primary transition-colors" href="/offers">Offers</Link>
                            </nav>
                        </div>

                        {/* Desktop Actions */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                <input
                                    className="w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                    placeholder="Search products..."
                                    type="text"
                                />
                            </div>

                            <div className="flex flex-col items-end text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark text-xs">Call for Order</span>
                                <span className="font-bold text-primary">01914532441</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors">
                                    <User className="w-6 h-6" />
                                </button>
                                <button className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>

                                <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg transition-colors">
                                    <div className="relative">
                                        <ShoppingBag className="w-6 h-6" />
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
                                    </div>
                                    <div className="hidden xl:block text-sm">
                                        <span className="text-xs text-subtext-light dark:text-subtext-dark block">Cart</span>
                                        <p className="font-semibold">৳30.48</p>
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
