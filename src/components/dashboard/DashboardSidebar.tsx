"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MapPin, User, LogOut, Phone } from "lucide-react";

const sidebarItems = [
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

export function DashboardSidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <div className="w-full md:w-64 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 h-fit">
            <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold text-lg">G</span>
                </div>
                <div>
                    <h3 className="font-bold text-sm text-text-light dark:text-text-dark">Guest User</h3>
                    <p className="text-xs text-subtext-light dark:text-subtext-dark">Welcome back!</p>
                </div>
            </div>

            <nav className="space-y-1 mb-6">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${isActive
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-subtext-light dark:text-subtext-dark"}`} />
                            <span className="font-medium text-sm">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="rounded-2xl bg-primary/5 p-4 text-center border border-primary/10">
                    <p className="mb-3 text-xs font-bold text-primary uppercase tracking-wide">Customer Support</p>
                    <a
                        href="tel:+8801914532441"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Phone className="w-4 h-4" />
                        Call for Order
                    </a>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-bold text-subtext-light dark:text-subtext-dark hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>
        </div>
    );
}
