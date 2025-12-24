"use server";

import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
    totalOrders: number;
    pendingOrders: number;
    cancelledOrders: number; // or "Cancel Order" count as per UI
    recentOrders: any[];
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    // Parallelize queries for better performance
    const [
        totalOrdersResult,
        pendingOrdersResult,
        cancelledOrdersResult,
        recentOrdersResult
    ] = await Promise.all([
        // 1. Total Orders Count
        supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id),

        // 2. Pending Orders Count
        supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', 'pending'),

        // 3. Cancelled Orders Count (assuming status is 'cancelled')
        supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', 'cancelled'),

        // 4. Recent Orders (Limit 5)
        supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)
    ]);

    return {
        totalOrders: totalOrdersResult.count || 0,
        pendingOrders: pendingOrdersResult.count || 0,
        cancelledOrders: cancelledOrdersResult.count || 0,
        recentOrders: recentOrdersResult.data || []
    };
}
