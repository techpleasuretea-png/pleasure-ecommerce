"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Store } from "lucide-react";

export function MobileBottomNav() {
    const pathname = usePathname();

    // Hide on Order Details page (e.g. /dashboard/orders/ORD-123) where we have a custom footer
    if (pathname?.startsWith("/dashboard/orders/")) {
        return null;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border pb-safe">
            <div className="flex h-16 items-center justify-between px-6">
                <Link
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200"
                    href="/shop"
                >
                    <Store className="w-6 h-6" />
                    <span className="text-xs font-medium">Shop</span>
                </Link>
                <Link
                    className="flex h-11 w-[60%] items-center justify-center gap-3 rounded-full bg-primary px-4 text-white shadow-lg shadow-primary/30"
                    href="/cart"
                >
                    <div className="relative">
                        <ShoppingBag className="w-5 h-5" />
                        <div className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                            3
                        </div>
                    </div>
                    <div className="text-base font-bold">৳1018</div>
                </Link>
                <Link
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary"
                    href="/search"
                >
                    <Search className="w-6 h-6" />
                    <span className="text-xs font-medium">Search</span>
                </Link>
            </div>
        </nav>
    );
}
