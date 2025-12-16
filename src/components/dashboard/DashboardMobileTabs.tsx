"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MapPin, User } from "lucide-react";

const tabs = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Orders",
        href: "/dashboard/orders",
        icon: ShoppingBag,
    },
    {
        title: "Delivery Details",
        href: "/dashboard/delivery-details",
        icon: MapPin,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export function DashboardMobileTabs() {
    const pathname = usePathname();

    // Hide tabs on order details page
    if (pathname.startsWith("/dashboard/orders/") && pathname !== "/dashboard/orders") {
        return null;
    }

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
