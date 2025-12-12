"use client";

import Image from "next/image";
import { Search, ShoppingBag, Menu, User, Phone } from "lucide-react";

import { useState } from "react";
import { MobileMenuSidebar } from "./MobileMenuSidebar";

export function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <MobileMenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <div className="flex items-center p-4 pb-2 justify-between">
                    <div className="flex size-12 shrink-0 items-center justify-start text-[#333333] dark:text-white">
                        <button
                            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#333333] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu className="w-8 h-8" />
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <Image src="/logo.svg" alt="Organico Logo" width={100} height={32} className="h-8 w-auto" />
                    </div>
                    <div className="flex shrink-0 items-center justify-end gap-3">
                        <a
                            className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-white shadow-sm transition-transform active:scale-95"
                            href="tel:+8801914532441"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="text-xs font-bold">Order</span>
                            <ShoppingBag className="w-4 h-4 ml-0.5" />
                        </a>
                        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#333333] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                            <User className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
