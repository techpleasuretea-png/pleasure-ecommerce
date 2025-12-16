import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { ShopMobileBar } from "@/components/shop/ShopMobileBar";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ShopPageProps {
    searchParams: Promise<{
        featured?: string;
        onSale?: string;
        category?: string;
        min?: string;
        max?: string;
    }>;
}

export const revalidate = 0; // Ensure fresh data on every request

export default async function ShopPage(props: ShopPageProps) {
    const searchParams = await props.searchParams;
    const showFeatured = searchParams.featured === "true";
    const showOnSale = searchParams.onSale === "true";
    const selectedCategories = searchParams.category ? searchParams.category.split(",") : [];
    const minPrice = searchParams.min ? parseFloat(searchParams.min) : null;
    const maxPrice = searchParams.max ? parseFloat(searchParams.max) : null;

    // Fetch categories
    const { data: categoriesData } = await supabase
        .from('categories')
        .select('name, slug');
    const categories = categoriesData || [];

    // Fetch products from Supabase
    const { data: productsData, error } = await supabase
        .from('products')
        .select(`
            *,
            product_images (
                image_url,
                is_primary
            ),
            category:categories (
                slug
            )
        `);

    if (error) {
        console.error("Error fetching products:", error);
        // Handle error appropriately, maybe show an empty state or error message
    }

    const products = productsData || [];

    const filteredProducts = products.filter((product) => {
        // Parse prices from string to number for comparison
        const price = parseFloat(product.selling_price);
        const originalPrice = parseFloat(product.mrp);

        if (showFeatured && !product.is_featured) return false;

        // Logic for onSale: has discount text or original price > selling price
        const isOnSale = !!product.discount || (originalPrice && originalPrice > price);
        if (showOnSale && !isOnSale) return false;

        // Category logic
        if (selectedCategories.length > 0) {
            const productCategorySlug = product.category?.slug;
            if (!productCategorySlug || !selectedCategories.includes(productCategorySlug)) {
                return false;
            }
        }

        // Price range logic
        if (minPrice !== null && price < minPrice) return false;
        if (maxPrice !== null && price > maxPrice) return false;

        return true;
    }).map((product) => {
        // Map database fields to ProductCard props
        const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];

        return {
            name: product.name,
            weight: product.weight,
            price: parseFloat(product.selling_price),
            originalPrice: product.mrp ? parseFloat(product.mrp) : undefined,
            discount: product.discount,
            image: primaryImage?.image_url || "/placeholder.png", // Fallback image
            // Prop not present in ProductCard but used for logic
            featured: product.is_featured
        };
    });

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 pb-24 md:pb-8">
                {/* Mobile Filters Bar */}
                <ShopMobileBar categories={categories} />

                <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-4 md:py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Desktop Sidebar */}
                        <div className="hidden md:block w-80 shrink-0">
                            <ShopSidebar categories={categories} />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Desktop Sort Dropdown */}
                            <div className="hidden md:flex justify-end items-center mb-6">
                                <div className="relative">
                                    <select className="appearance-none w-48 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                                        <option>Sort by popularity</option>
                                        <option>Sort by price: low to high</option>
                                        <option>Sort by price: high to low</option>
                                        <option>Sort by new arrivals</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext-light dark:text-subtext-dark pointer-events-none" />
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 md:gap-6">
                                {filteredProducts.map((product, idx) => (
                                    <ProductCard key={idx} {...product} />
                                ))}
                            </div>
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
