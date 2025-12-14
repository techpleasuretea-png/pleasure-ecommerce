"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-64 flex-shrink-0">
                        <DashboardSidebar />
                    </aside>
                    <div className="flex-1 min-w-0">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
