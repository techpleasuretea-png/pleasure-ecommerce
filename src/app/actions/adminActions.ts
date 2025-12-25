"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Middleware/Check ---
async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        throw new Error("Forbidden");
    }

    return supabase;
}

// --- Slideshows ---
export async function getAdminSlideshows() {
    await requireAdmin();
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('slideshow')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
}

export async function createSlideshow(formData: FormData) {
    const supabase = await requireAdmin();

    // Handle image upload if needed, assuming image_url is passed for now or handled client-side upload
    // For simplicity, we assume image_url is a string (uploaded via client SDK)
    const rawData = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        image_url: formData.get('image_url') as string,
        button_text: formData.get('button_text') as string,
        button_link: formData.get('button_link') as string,
        is_active: formData.get('is_active') === 'true',
        order_index: parseInt(formData.get('order_index') as string) || 0,
    };

    const { error } = await supabase.from('slideshow').insert(rawData);
    if (error) throw error;

    revalidatePath('/admin/slideshow');
    revalidatePath('/'); // Homepage
    redirect('/admin/slideshow');
}

export async function updateSlideshow(id: string, formData: FormData) {
    const supabase = await requireAdmin();

    const rawData = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        image_url: formData.get('image_url') as string,
        button_text: formData.get('button_text') as string,
        button_link: formData.get('button_link') as string,
        is_active: formData.get('is_active') === 'true',
        order_index: parseInt(formData.get('order_index') as string) || 0,
    };

    const { error } = await supabase.from('slideshow').update(rawData).eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/slideshow');
    revalidatePath('/');
    redirect('/admin/slideshow');
}

export async function deleteSlideshow(id: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase.from('slideshow').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/slideshow');
    revalidatePath('/');
}

// --- Categories ---
export async function getAdminCategories() {
    await requireAdmin(); // Ensure admin
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    return data;
}

export async function createCategory(formData: FormData) {
    const supabase = await requireAdmin();
    const rawData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string, // Should probably auto-generate if empty
        image_url: formData.get('image_url') as string,
    };
    const { error } = await supabase.from('categories').insert(rawData);
    if (error) throw error;
    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await requireAdmin();
    const rawData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        image_url: formData.get('image_url') as string,
    };
    const { error } = await supabase.from('categories').update(rawData).eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/categories');
}

// --- Shipping Rules ---
export async function getShippingRules() {
    await requireAdmin();
    const supabase = await createClient();
    const { data, error } = await supabase.from('shipping_rules').select('*').order('created_at');
    if (error) throw error;
    return data;
}

export async function createShippingRule(formData: FormData) {
    const supabase = await requireAdmin();
    const rawData = {
        name: formData.get('name') as string,
        cost: parseFloat(formData.get('cost') as string),
        min_order_value: formData.get('min_order_value') ? parseFloat(formData.get('min_order_value') as string) : null,
        max_order_value: formData.get('max_order_value') ? parseFloat(formData.get('max_order_value') as string) : null,
        is_active: formData.get('is_active') === 'true',
    };
    const { error } = await supabase.from('shipping_rules').insert(rawData);
    if (error) throw error;
    revalidatePath('/admin/shipping');
    redirect('/admin/shipping');
}

export async function updateShippingRule(id: string, formData: FormData) {
    const supabase = await requireAdmin();
    const rawData = {
        name: formData.get('name') as string,
        cost: parseFloat(formData.get('cost') as string),
        min_order_value: formData.get('min_order_value') ? parseFloat(formData.get('min_order_value') as string) : null,
        max_order_value: formData.get('max_order_value') ? parseFloat(formData.get('max_order_value') as string) : null,
        is_active: formData.get('is_active') === 'true',
    };
    const { error } = await supabase.from('shipping_rules').update(rawData).eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/shipping');
    redirect('/admin/shipping');
}

export async function deleteShippingRule(id: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase.from('shipping_rules').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/shipping');
}

// --- Orders ---
export async function getAdminOrders() {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            profiles (full_name, email)
        `)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function getAdminOrderById(id: string) {
    const supabase = await requireAdmin();
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_number,
            profiles (full_name, email),
            order_items (
                id,
                quantity,
                price,
                products (
                    name,
                    product_images (
                        image_url
                    )
                )
            ),
            shipping_method:shipping_method_id (
                name,
                cost
            ),
            user_addresses (
                address_line
            )
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function updateOrderStatus(id: string, formData: FormData) {
    const supabase = await requireAdmin();
    const status = formData.get('status') as string;

    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);
    revalidatePath(`/admin/orders/${id}`);
    revalidatePath(`/dashboard/orders/${id}`); // Update user view
}

// --- Dashboard Stats ---
export async function getAdminStats() {
    const supabase = await requireAdmin();

    const [
        { count: totalOrders, error: ordersError },
        { data: revenueData, error: revenueError },
        { count: totalProducts, error: productsError },
        { data: recentOrders, error: recentError }
    ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount'),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*, profiles(full_name)').order('created_at', { ascending: false }).limit(5)
    ]);

    if (ordersError) throw ordersError;
    if (revenueError) throw revenueError;
    if (productsError) throw productsError;
    if (recentError) throw recentError;

    const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

    return {
        totalOrders: totalOrders || 0,
        totalRevenue,
        totalProducts: totalProducts || 0,
        recentOrders: recentOrders || []
    };
}
