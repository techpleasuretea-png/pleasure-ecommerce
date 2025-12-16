"use client";

import { X, User, ChevronRight, FileText, Headphones, Phone, LogOut } from "lucide-react";
import Link from "next/link";

interface MobileMenuSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    { name: "Fruits", slug: "fruits", icon: "🍎", color: "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400" },
    { name: "Vegetables", slug: "vegetables", icon: "🥦", color: "bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400" },
    { name: "Dairy & Eggs", slug: "dairy", icon: "🥛", color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400" },
    { name: "Bakery", slug: "bakery", icon: "🥖", color: "bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400" },
    { name: "Meat & Fish", slug: "meat,seafood", icon: "🍖", color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" },
    { name: "Snacks", slug: "snacks", icon: "🍪", color: "bg-purple-50 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400" },
    { name: "Beverages", slug: "drinks", icon: "🍹", color: "bg-teal-50 text-teal-500 dark:bg-teal-900/20 dark:text-teal-400" },
    { name: "Pantry", slug: "pantry", icon: "🥫", color: "bg-pink-50 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400" }, // Replaced Personal Care with Pantry
];

export function MobileMenuSidebar({ isOpen, onClose }: MobileMenuSidebarProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex w-full h-full">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className="relative flex h-full w-[80%] max-w-[300px] flex-col bg-white dark:bg-[#122013] shadow-2xl transition-transform duration-300">
                {/* Header with User Info and Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#333333] dark:text-white">Guest User</p>
                            <p className="text-xs text-gray-500">Welcome back!</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation (Categories) */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Categories</p>
                    </div>
                    <div className="space-y-1 pb-4">
                        {categories.map((cat, idx) => (
                            <Link
                                key={idx}
                                href={`/shop?category=${cat.slug}`}
                                className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-primary/5 active:bg-primary/10 text-[#333333] dark:text-white"
                                onClick={onClose}
                            >
                                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cat.color}`}>
                                    <span className="text-xl">{cat.icon}</span>
                                </div>
                                <span className="font-bold text-sm">{cat.name}</span>
                                <ChevronRight className="ml-auto w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-50 dark:border-gray-800/50 bg-white dark:bg-[#122013] shrink-0 z-10">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link
                            href="/orders"
                            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-3 transition-all border border-transparent hover:border-primary/20 text-[#333333] dark:text-white group"
                            onClick={onClose}
                        >
                            <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs text-center">Order History</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-3 transition-all border border-transparent hover:border-primary/20 text-[#333333] dark:text-white group"
                            onClick={onClose}
                        >
                            <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
                                <Headphones className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs text-center">Contact Us</span>
                        </Link>
                    </div>

                    <div className="mb-3 rounded-2xl bg-primary/5 p-4 text-center border border-primary/10">
                        <p className="mb-3 text-xs font-bold text-primary uppercase tracking-wide">Customer Support</p>
                        <a className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow-md transition-shadow" href="tel:+8801914532441">
                            <Phone className="w-4 h-4" />
                            Call for Order
                        </a>
                    </div>

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
