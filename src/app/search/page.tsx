
import { Header } from "@/components/ui/Header";
import { SearchInput } from "@/components/ui/SearchInput";
import { Suspense } from "react";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { ShopMobileBar } from "@/components/shop/ShopMobileBar";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { Search } from "lucide-react";
import { ShopSort } from "@/components/shop/ShopSort";
import { supabase } from "@/lib/supabaseClient";
import { saveSearchQuery, getRecentSearches } from "@/app/actions/productActions";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        featured?: string;
        onSale?: string;
        sort?: string;
    }>;
}

export const revalidate = 0;

export default async function SearchPage(props: SearchPageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || "";
    const showFeatured = searchParams.featured === "true";
    const showOnSale = searchParams.onSale === "true";

    // Search History Logic
    let recentSearches: string[] = [];
    if (!query) {
        recentSearches = await getRecentSearches();
    } else {
        // Fire and forget save
        saveSearchQuery(query);
    }

    // Fetch products from Supabase
    // Ideally we would filter by query in the DB, but to match exact previous behavior and for simplicity with small dataset:
    const { data: productsData, error } = await supabase
        .from('products')
        .select(`
            *,
            product_images (
                image_url,
                is_primary
            )
        `);

    if (error) {
        console.error("Error fetching products:", error);
    }

    const products = productsData || [];

    // Fetch categories
    const { data: categoriesData } = await supabase
        .from('categories')
        .select('name, slug');
    const categories = categoriesData || [];

    // Filter products based on search query and other filters
    const filteredProducts = products.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
        if (!matchesQuery) return false;

        // Parse prices
        const price = parseFloat(product.selling_price);
        const originalPrice = parseFloat(product.mrp);

        if (showFeatured && !product.is_featured) return false;

        const isOnSale = !!product.discount || (originalPrice && originalPrice > price);
        if (showOnSale && !isOnSale) return false;

        return true;
    }).map((product) => {
        const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];

        return {
            id: product.id,
            name: product.name,
            weight: product.weight,
            price: parseFloat(product.selling_price),
            originalPrice: product.mrp ? parseFloat(product.mrp) : undefined,
            discount: product.discount,
            image: primaryImage?.image_url || "/placeholder.png",
            featured: product.is_featured,
            created_at: product.created_at,
            stock: product.stock,
            slug: product.slug,
        };
    });

    // Apply sorting in JS
    const sort = searchParams.sort || "popularity";
    if (sort === "price_asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
        filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    // popularity/default fallback

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        }>
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
                {/* Custom Search Header */}
                <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">
                        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        </Link>
                        <div className="flex-1 relative">
                            <SearchInput className="w-full" placeholder="Search..." autoFocus />
                        </div>
                    </div>
                </header>

                <main className="flex-1">
                    {!query ? (
                        // Blank Page / Recents View
                        <div className="max-w-screen-xl mx-auto px-4 py-6">
                            <div className="max-w-xl mx-auto">
                                <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-white px-2">Recent Searches</h1>
                                {recentSearches.length > 0 ? (
                                    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                                        {recentSearches.map((term, i) => (
                                            <Link
                                                key={i}
                                                href={`/search?q=${encodeURIComponent(term)}`}
                                                className="flex items-center gap-4 p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <Clock className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-700 dark:text-gray-200 font-medium">{term}</span>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                        <p>No recent searches</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Result View
                        <div className="max-w-screen-xl mx-auto px-4 py-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Desktop Sidebar - Optional in simplified view, but keeping for functionality if screen is large */}
                                <div className="hidden md:block w-64 shrink-0">
                                    <ShopSidebar categories={categories} />
                                </div>

                                {/* Main Content */}
                                <div className="flex-1">
                                    {/* Mobile Sort/Filter Bar - Custom inline version or reused */}
                                    <div className="md:hidden mb-4">
                                        <ShopMobileBar categories={categories} />
                                    </div>

                                    {/* Desktop Sort Dropdown & Results Header */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                        <div>
                                            <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                Results for "{query}"
                                            </h1>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {filteredProducts.length} items found
                                            </p>
                                        </div>

                                        <div className="hidden md:block">
                                            <ShopSort />
                                        </div>
                                    </div>

                                    {/* Product Grid */}
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {filteredProducts.map((product, idx) => (
                                                <ProductCard key={idx} {...product} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
                                            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                                Try checking for typos or using different keywords.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </Suspense>
    );
}
