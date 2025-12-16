
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { ShopMobileBar } from "@/components/shop/ShopMobileBar";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { Search } from "lucide-react";
import { ShopSort } from "@/components/shop/ShopSort";
import { supabase } from "@/lib/supabaseClient";

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
            name: product.name,
            weight: product.weight,
            price: parseFloat(product.selling_price),
            originalPrice: product.mrp ? parseFloat(product.mrp) : undefined,
            discount: product.discount,
            image: primaryImage?.image_url || "/placeholder.png",
            featured: product.is_featured,
            created_at: product.created_at
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
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 pb-24 md:pb-8">
                {/* Mobile Filters Bar - Reused from Shop */}
                <ShopMobileBar categories={categories} />

                <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-4 md:py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Desktop Sidebar - Reused from Shop */}
                        <div className="hidden md:block w-80 shrink-0">
                            <ShopSidebar categories={categories} />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Desktop Sort Dropdown & Results Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {query ? `Search results for "${query}"` : "All Products"}
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Found {filteredProducts.length} items
                                    </p>
                                </div>

                                <ShopSort />
                            </div>

                            {/* Product Grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 md:gap-6">
                                    {filteredProducts.map((product, idx) => (
                                        <ProductCard key={idx} {...product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                        We couldn't find any products matching "{query}". Try checking for typos or using different keywords.
                                    </p>
                                </div>
                            )}
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
    );
}
