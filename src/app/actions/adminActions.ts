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

    let imageUrl = null;
    const imageFile = formData.get('image_file') as File; // Expect 'image_file' from form

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from('slideshow')
            .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('slideshow')
            .getPublicUrl(fileName);

        imageUrl = publicUrl;
    }

    // Fallback to image_url if provided directly (though UI will prefer file)
    if (!imageUrl) {
        imageUrl = formData.get('image_url') as string;
    }

    const rawData = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        image_url: imageUrl,
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

    let imageUrl = formData.get('existing_image_url') as string;
    const removeImage = formData.get('remove_image') === 'true';
    const imageFile = formData.get('image_file') as File;

    if (removeImage) {
        imageUrl = "";
    }

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from('slideshow')
            .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('slideshow')
            .getPublicUrl(fileName);

        imageUrl = publicUrl;
    }

    // If no new file and no remove flag, keep existing. If remove flag, it's empty string (or null if you modify logic)
    // If user provided image_url string manually (optional fallback)
    if (!imageUrl && formData.get('image_url')) {
        imageUrl = formData.get('image_url') as string;
    }


    const rawData = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        image_url: imageUrl,
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

    let imageUrl = null;
    const imageFile = formData.get('image_file') as File;

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from('category-icons')
            .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('category-icons')
            .getPublicUrl(fileName);

        imageUrl = publicUrl;
    }

    const rawData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        image_url: imageUrl,
    };
    const { error } = await supabase.from('categories').insert(rawData);
    if (error) throw error;
    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await requireAdmin();

    let imageUrl = formData.get('existing_image_url') as string;
    const removeImage = formData.get('remove_image') === 'true';
    const imageFile = formData.get('image_file') as File;

    if (removeImage) {
        imageUrl = "";
    }

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
            .from('category-icons')
            .upload(fileName, imageFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('category-icons')
            .getPublicUrl(fileName);

        imageUrl = publicUrl;
    }

    const finalImageUrl = removeImage && (!imageFile || imageFile.size === 0) ? null : imageUrl;

    const rawData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        image_url: finalImageUrl,
    };

    const { error, data } = await supabase
        .from('categories')
        .update(rawData)
        .eq('id', id)
        .select();

    if (error) {
        throw error;
    }

    revalidatePath('/admin/categories');
    redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/categories');
}

// --- Shipping Methods ---
export async function getShippingMethods() {
    await requireAdmin();
    const supabase = await createClient();
    const { data, error } = await supabase.from('shipping_method').select('*').order('cost');
    if (error) throw error;
    return data;
}

export async function createShippingMethod(formData: FormData) {
    const supabase = await requireAdmin();
    const rawData = {
        name: formData.get('name') as string,
        cost: parseFloat(formData.get('cost') as string),
        discount_threshold: formData.get('discount_threshold') ? parseFloat(formData.get('discount_threshold') as string) : null,
        discounted_cost: formData.get('discounted_cost') ? parseFloat(formData.get('discounted_cost') as string) : null,
    };
    const { error } = await supabase.from('shipping_method').insert(rawData);
    if (error) throw error;
    revalidatePath('/admin/shipping');
    redirect('/admin/shipping');
}

export async function updateShippingMethod(id: string, formData: FormData) {
    const supabase = await requireAdmin();
    const rawData = {
        name: formData.get('name') as string,
        cost: parseFloat(formData.get('cost') as string),
        discount_threshold: formData.get('discount_threshold') ? parseFloat(formData.get('discount_threshold') as string) : null,
        discounted_cost: formData.get('discounted_cost') ? parseFloat(formData.get('discounted_cost') as string) : null,
    };
    const { error } = await supabase.from('shipping_method').update(rawData).eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/shipping');
    redirect('/admin/shipping');
}

export async function deleteShippingMethod(id: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase.from('shipping_method').delete().eq('id', id);
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
            profiles (full_name, email),
            order_items (quantity)
        `)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function getAdminOrderById(id: string) {
    const supabase = await requireAdmin();

    // 1. Fetch Order basic info + Profile
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
            *,
            order_number,
            profiles (full_name, email)
        `)
        .eq('id', id)
        .single();

    if (orderError) {
        console.error("Error fetching order base:", orderError);
        throw orderError;
    }

    // 2. Fetch Order Items + Products + Images
    const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select(`
            id,
            quantity,
            price,
            products (
                name,
                product_images (
                    image_url
                )
            )
        `)
        .eq('order_id', id);

    if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        // We throw here because items are critical
        throw itemsError;
    }

    // 3. Fetch Address if exists
    let userAddress = null;
    if (order.shipping_address_id) {
        const { data: address, error: addressError } = await supabase
            .from('user_addresses')
            .select('address_line')
            .eq('id', order.shipping_address_id)
            .single();

        if (addressError) {
            console.warn("Error fetching address:", addressError);
        } else {
            userAddress = address;
        }
    }

    // Combine results to match expected shape
    return {
        ...order,
        order_items: orderItems,
        user_addresses: userAddress
    };
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
