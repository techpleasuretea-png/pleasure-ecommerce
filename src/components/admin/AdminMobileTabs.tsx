"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Layers, Truck, Image } from "lucide-react";

const tabs = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: Layers,
    },
    {
        title: "Slideshows",
        href: "/admin/slideshow",
        icon: Image,
    },
    {
        title: "Shipping",
        href: "/admin/shipping",
        icon: Truck,
    },
];

export function AdminMobileTabs() {
    const pathname = usePathname();

    return (
        <div className="md:hidden w-full overflow-x-auto border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark mb-6 -mx-4 px-4 sticky top-0 z-10 no-scrollbar">
            <div className="flex min-w-full">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${isActive
                                ? "border-primary text-primary"
                                : "border-transparent text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-bold">{tab.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
