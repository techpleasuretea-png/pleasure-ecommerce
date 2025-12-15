"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMobileTabs } from "@/components/dashboard/DashboardMobileTabs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-8 pt-8 pb-32 md:py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <aside className="hidden md:block md:w-64 flex-shrink-0">
                        <DashboardSidebar />
                    </aside>

                    <div className="flex-1 min-w-0">
                        {/* Mobile Tabs - Visible only on mobile */}
                        <DashboardMobileTabs />

                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
