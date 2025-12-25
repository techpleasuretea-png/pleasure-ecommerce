import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileTabs } from "@/components/admin/AdminMobileTabs";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?next=/admin');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, role, email')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        redirect('/');
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-8 pt-8 pb-32 md:py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <aside className="hidden md:block md:w-64 flex-shrink-0">
                        <AdminSidebar user={profile} />
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
