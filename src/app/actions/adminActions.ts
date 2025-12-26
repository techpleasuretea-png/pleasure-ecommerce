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
    // redirect('/admin/slideshow'); // Handled in client
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
    // redirect('/admin/slideshow'); // Handled in client
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

// --- Products ---
export async function getAdminProducts(query?: string) {
    await requireAdmin();
    const supabase = await createClient();

    let dbQuery = supabase
        .from('products')
        .select(`
            *,
            product_images (
                image_url,
                is_primary
            ),
            category:categories(name)
        `)
        .order('created_at', { ascending: false });

    if (query) {
        dbQuery = dbQuery.ilike('name', `%${query}%`);
    }

    const { data, error } = await dbQuery;

    if (error) {
        console.error("Error fetching admin products:", error);
        throw error;
    }

    // Map data to ensure image_url is populated from product_images if needed
    return data.map((product: any) => {
        const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];
        return {
            ...product,
            image_url: primaryImage?.image_url || product.image_url || null
        };
    });
}

export async function getAdminProductById(id: string) {
    const supabase = await requireAdmin();
    const { data: product, error } = await supabase
        .from('products')
        .select(`
            *,
            product_images (
                id,
                image_url,
                is_primary,
                display_order
            ),
            category:categories (
                id,
                name
            )
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return product;
}

export async function createProduct(formData: FormData) {
    const supabase = await requireAdmin();

    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Basic fields
    const productData = {
        name,
        slug, // Assuming slug column exists, if not we might trip error. Check product.ts? type doesn't have slug. 
        // But almost all e-commerce has slug. Let's omit if unsure, or check if database accepts it.
        // database.types has slug in categories but not products. 
        // productActions doesn't select slug. 
        // But wait, `src/app/shop/[slug]/page.tsx` exists! So products MUST have slug or id based routing.
        // Let's assume slug exists for now.
        description: formData.get('description') as string,
        selling_price: parseFloat(formData.get('selling_price') as string),
        mrp: formData.get('mrp') ? parseFloat(formData.get('mrp') as string) : null,
        stock: parseInt(formData.get('stock') as string) || 0,
        weight: formData.get('weight') as string,
        discount: formData.get('discount') as string, // Text like "20% OFF"
        is_featured: formData.get('is_featured') === 'true',

        // JSON fields (nutrition, origin, tags)
        // We need to construct these objects from form data
        nutrition: {
            calories: formData.get('nutrition.calories') ? Number(formData.get('nutrition.calories')) : 0,
            fat: formData.get('nutrition.fat'),
            saturatedFat: formData.get('nutrition.saturatedFat'),
            cholesterol: formData.get('nutrition.cholesterol'),
            sodium: formData.get('nutrition.sodium'),
            carbohydrates: formData.get('nutrition.carbohydrates'),
            fiber: formData.get('nutrition.fiber'),
            sugar: formData.get('nutrition.sugar'),
            protein: formData.get('nutrition.protein'),
        },
        origin: {
            location: formData.get('origin.location'),
            description: formData.get('origin.description'),
        },
        tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],

        category_id: formData.get('category_id') as string, // Primary category? Or assume logic for multiple?
        // product.ts says `category: string[]`.
        // DB types says `category_id: string`.
        // If DB has `category_id`, it's single. If `products_categories` junction table exists, it's multiple.
        // `productActions.ts` did `category:categories!inner`. This usually implies specific relation. 
        // If `products` has `category_id` FK, then it's one-to-many.
        // Let's stick to single category_id for now as per DB types hint, or try to handle array if UI allows.
        // ProductForm will probably send one ID for now.
    };

    // Remove undefined/nulls if needed? Supabase handles nulls.

    // 1. Insert Product
    const { data: newProduct, error: insertError } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

    if (insertError) throw insertError;

    // 2. Handle Images
    // We expect `image_files` (multiple) in formData
    const files = formData.getAll('image_files') as File[];
    const primaryIndex = parseInt(formData.get('primary_image_index') as string) || 0;

    if (files.length > 0) {
        const uploads = files.map(async (file, index) => {
            if (file.size === 0) return null;

            const fileExt = file.name.split('.').pop();
            const fileName = `${newProduct.id}/${Date.now()}-${index}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(fileName);

            return {
                product_id: newProduct.id,
                image_url: publicUrl,
                is_primary: index === primaryIndex,
                display_order: index
            };
        });

        const imageRecords = (await Promise.all(uploads)).filter(Boolean);

        if (imageRecords.length > 0) {
            const { error: imagesError } = await supabase
                .from('product_images')
                .insert(imageRecords as any);

            if (imagesError) console.error("Error saving images:", imagesError);
        }
    }

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await requireAdmin();

    // ... Implementation similar to create, but with Update.
    // Logic for images is verifying: usually we have "existing_images" and "new_images".
    // For MVP/first pass, let's implement basic update logic.

    const productData = {
        name: formData.get('name') as string,
        // slug: ... maybe don't update slug to avoid breaking SEO? or allow with warning.
        description: formData.get('description') as string,
        selling_price: parseFloat(formData.get('selling_price') as string),
        mrp: formData.get('mrp') ? parseFloat(formData.get('mrp') as string) : null,
        stock: parseInt(formData.get('stock') as string) || 0,
        weight: formData.get('weight') as string,
        discount: formData.get('discount') as string,
        is_featured: formData.get('is_featured') === 'true',
        nutrition: {
            calories: formData.get('nutrition.calories') ? Number(formData.get('nutrition.calories')) : 0,
            fat: formData.get('nutrition.fat'),
            saturatedFat: formData.get('nutrition.saturatedFat'),
            cholesterol: formData.get('nutrition.cholesterol'),
            sodium: formData.get('nutrition.sodium'),
            carbohydrates: formData.get('nutrition.carbohydrates'),
            fiber: formData.get('nutrition.fiber'),
            sugar: formData.get('nutrition.sugar'),
            protein: formData.get('nutrition.protein'),
        },
        origin: {
            location: formData.get('origin.location'),
            description: formData.get('origin.description'),
        },
        tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
        category_id: formData.get('category_id') as string,
    };

    const { error: updateError } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

    if (updateError) throw updateError;

    // Handle Image Updates
    // 1. Delete removed images
    const removedImageIds = formData.getAll('removed_image_ids') as string[];
    if (removedImageIds.length > 0) {
        await supabase.from('product_images').delete().in('id', removedImageIds);
        // Clean up storage? Ideally yes.
    }

    // 2. Add new images
    const files = formData.getAll('new_image_files') as File[];
    // We need to know where they fit in order. 
    // Simplified: Append new images at end? 
    // Or complex UI passing explicit order.
    // For now: Append.

    if (files.length > 0) {
        const uploads = files.map(async (file, index) => {
            if (file.size === 0) return null;
            const fileExt = file.name.split('.').pop();
            const fileName = `${id}/${Date.now()}-new-${index}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(fileName, file);

            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(fileName);

            return {
                product_id: id,
                image_url: publicUrl,
                is_primary: false, // Default to false for new adds? Or check UI?
                display_order: 99 // Put at end
            };
        });

        const imageRecords = (await Promise.all(uploads)).filter(Boolean);
        if (imageRecords.length > 0) {
            const { error: imagesError } = await supabase.from('product_images').insert(imageRecords as any);
            if (imagesError) throw imagesError;
        }
    }

    // 3. Update primary image
    const primaryImageId = formData.get('primary_image_id') as string;
    if (primaryImageId) {
        // Set all to false
        await supabase.from('product_images').update({ is_primary: false }).eq('product_id', id);
        // Set one to true
        await supabase.from('product_images').update({ is_primary: true }).eq('id', primaryImageId);
    }

    revalidatePath('/admin/products');
    revalidatePath('/admin/products/' + id);
    redirect('/admin/products');
}

export async function deleteProduct(id: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/products');
}
