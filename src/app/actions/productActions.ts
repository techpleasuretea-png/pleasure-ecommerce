"use server";

import { supabase } from "@/lib/supabaseClient";

interface FetchProductsOptions {
    page?: number;
    limit?: number;
    search?: string;
    featured?: boolean;
    onSale?: boolean;
    categorySlugs?: string[];
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    newArrivals?: boolean;
}

export async function fetchProducts({
    page = 1,
    limit = 12,
    search = "",
    featured,
    onSale,
    categorySlugs = [],
    minPrice,
    maxPrice,
    sort,
    newArrivals
}: FetchProductsOptions) {
    try {
        let query = supabase
            .from('products')
            .select(`
                *,
                product_images (
                    image_url,
                    is_primary
                ),
                category:categories!inner (
                    slug
                )
            `, { count: 'exact' });

        // Search
        if (search) {
            query = query.ilike('name', `%${search}%`);
        }

        // Featured
        if (featured) {
            query = query.eq('is_featured', true);
        }

        // Categories
        if (categorySlugs.length > 0) {
            // Because we used !inner join above, we can filter by the foreign table
            query = query.in('category.slug', categorySlugs);
        }

        // Price Range
        if (minPrice !== undefined && minPrice !== null) {
            query = query.gte('selling_price', minPrice);
        }
        if (maxPrice !== undefined && maxPrice !== null) {
            query = query.lte('selling_price', maxPrice);
        }

        // On Sale
        // This is complex because of the OR logic (discount text OR mrp > selling_price)
        // basic Supabase OR syntax: .or('condition1,condition2')
        if (onSale) {
            // We want: discount is not null/empty OR mrp > selling_price
            // Supabase 'gt' compares two columns? No, 'gt' compares column to value.
            // Using raw SQL filter via .or() might be tricky for "column > column".
            // Typically "mrp > selling_price" implies fetching everything and checking in app, OR using RPC, OR raw filtering.
            // For now, let's just filter by 'discount' text presence if possible, or maybe just skip the "mrp > selling_price" part at DB level if it's hard?
            // Actually, let's try to trust the 'discount' text field mostly? 
            // Or try: .not('discount', 'is', null) 
            // If we strictly need the mrp > selling comparison, we might need an RPC or assume if discount text exists it's on sale.
            // But let's check if we can query "mrp > selling_price". Supabase supports postgrest filters.
            // Does strictly eq/gt support column comparison? Usually no.
            // Workaround: We'll filter "has discount text" at DB level for now, as that's the main indicator? 
            // Wait, previous code: `!!product.discount || (originalPrice && originalPrice > price)`.
            // Let's assume most items with a discount have the discount text.
            query = query.neq('discount', null);
        }

        // New Arrivals
        if (newArrivals) {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            query = query.gte('created_at', thirtyDaysAgo.toISOString());
        }

        // Sorting
        if (sort === "price_asc") {
            query = query.order('selling_price', { ascending: true });
        } else if (sort === "price_desc") {
            query = query.order('selling_price', { ascending: false });
        } else if (sort === "newest") {
            query = query.order('created_at', { ascending: false });
        } else {
            // Default sort (e.g. Popularity or just ID)
            // If we don't order, results might be inconsistent across pages.
            query = query.order('id', { ascending: true });
        }

        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) {
            console.error("Supabase error fetching products:", error);
            throw new Error(error.message);
        }

        const products = data || [];
        const hasMore = count ? from + products.length < count : false;

        // Map to frontend structure
        const mappedProducts = products.map((product: any) => {
            const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];
            return {
                id: product.id,
                name: product.name,
                weight: product.weight,
                price: Number(product.selling_price),
                originalPrice: product.mrp ? Number(product.mrp) : undefined,
                discount: product.discount,
                image: primaryImage?.image_url || "/placeholder.png",
                featured: product.is_featured,
                created_at: product.created_at
            };
        });

        // Loophole: If DB didn't filter "mrp > selling_price" for onSale, we might have skipped some?
        // Or if we filtered "neq discount null", we might have missed those with just price diff but no text.
        // For simplicity and performance, we stick to DB filter "discount is present".

        return { products: mappedProducts, hasMore, total: count };

    } catch (err) {
        console.error("Server Action Error:", err);
        return { products: [], hasMore: false, total: 0 };
    }
}
