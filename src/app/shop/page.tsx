import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { ShopMobileBar } from "@/components/shop/ShopMobileBar";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { ChevronDown } from "lucide-react";

import { products } from "@/data/products";

interface ShopPageProps {
    searchParams: {
        featured?: string;
        onSale?: string;
    };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
    const showFeatured = searchParams.featured === "true";
    const showOnSale = searchParams.onSale === "true";

    const filteredProducts = products.filter((product) => {
        if (showFeatured && !product.featured) return false;
        if (showOnSale && !product.discount && (!product.originalPrice || product.originalPrice <= product.price)) return false;
        return true;
    });

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 pb-24 md:pb-8">
                {/* Mobile Filters Bar */}
                <ShopMobileBar />

                <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-4 md:py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Desktop Sidebar */}
                        <div className="hidden md:block w-80 shrink-0">
                            <ShopSidebar />
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
