import { Header } from "@/components/ui/Header";
import { Suspense } from "react";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { ShopMobileBar } from "@/components/shop/ShopMobileBar";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { ShopSort } from "@/components/shop/ShopSort";
import { supabase } from "@/lib/supabaseClient";
import { fetchProducts } from "@/app/actions/productActions";
import { ProductInfiniteList } from "@/components/shop/ProductInfiniteList";

interface ShopPageProps {
    searchParams: Promise<{
        featured?: string;
        onSale?: string;
        category?: string;
        min?: string;
        max?: string;
        sort?: string;
        q?: string;
        newArrivals?: string;
    }>;
}

export const revalidate = 0; // Ensure fresh data on every request

export default async function ShopPage(props: ShopPageProps) {
    const searchParams = await props.searchParams;
    const showFeatured = searchParams.featured === "true";
    const showOnSale = searchParams.onSale === "true";
    const showNewArrivals = searchParams.newArrivals === "true";
    const selectedCategories = searchParams.category ? searchParams.category.split(",") : [];
    const minPrice = searchParams.min ? parseFloat(searchParams.min) : null;
    const maxPrice = searchParams.max ? parseFloat(searchParams.max) : null;

    const sort = searchParams.sort || "popularity";

    // Fetch categories
    const { data: categoriesData } = await supabase
        .from('categories')
        .select('name, slug');
    const categories = categoriesData || [];

    // Prepare filters for initial fetch
    const filters = {
        page: 1,
        limit: 12,
        search: searchParams.q, // Not used in ShopPage usually but good to have
        featured: showFeatured,
        onSale: showOnSale,
        newArrivals: showNewArrivals,
        categorySlugs: selectedCategories,
        minPrice: minPrice !== null ? minPrice : undefined,
        maxPrice: maxPrice !== null ? maxPrice : undefined,
        sort: sort
    };

    // Fetch initial products
    const { products: initialProducts } = await fetchProducts(filters);

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        }>
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
                <Header />

                <main className="flex-1 pb-24 md:pb-8">
                    {/* Mobile Filters Bar */}
                    <ShopMobileBar categories={categories} />

                    <div className="mx-auto max-w-screen-xl px-2 md:px-8 py-4 md:py-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Desktop Sidebar */}
                            <div className="hidden md:block w-80 shrink-0">
                                <ShopSidebar categories={categories} />
                            </div>

                            {/* Main Content */}
                            <div className="flex-1">
                                {/* Desktop Sort Dropdown */}
                                <ShopSort />

                                {/* Product Grid */}
                                {/* Product List with Infinite Scroll */}
                                <ProductInfiniteList
                                    initialProducts={initialProducts}
                                    searchParams={searchParams}
                                    key={JSON.stringify(searchParams)}
                                />
                            </div>
                        </div>
                    </div>
                </main>

                {/* Shop Mobile Footer (Mobile Only) */}
                <ShopMobileFooter />

                {/* Global Footer (Desktop Only) */}
                <div className="hidden md:block">
                    <Footer />
                </div>
            </div>
        </Suspense>
    );
}
