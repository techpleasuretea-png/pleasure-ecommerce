"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileTabs } from "@/components/admin/AdminMobileTabs";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push('/login?next=/admin');
                    return;
                }

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (profile?.role !== 'admin') {
                    router.push('/');
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error("Auth check failed", error);
                router.push('/');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-8 pt-8 pb-32 md:py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <aside className="hidden md:block md:w-64 flex-shrink-0">
                        <AdminSidebar />
                    </aside>

                    <div className="flex-1 min-w-0">
                        {/* Mobile Tabs - Visible only on mobile */}
                        <AdminMobileTabs />

                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
