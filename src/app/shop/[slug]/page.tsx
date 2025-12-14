"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ShopMobileBar } from "@/components/shop/ShopMobileBar";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductDetailsTabs } from "@/components/product/ProductDetailsTabs";
import { ProductDetailsAccordion } from "@/components/product/ProductDetailsAccordion";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Product } from "@/types/product";

// Mock Data for the product
const productData: Product = {
    id: "1",
    name: "Organic Avocados",
    weight: "500g",
    price: 4.99,
    originalPrice: 6.24,
    discount: "20% OFF",
    images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo"
    ],
    description: "Creamy, rich, and harvested at the peak of freshness. Our organic avocados are perfect for guacamole, toast, or slicing into salads. Grown without synthetic pesticides for a pure, natural taste. Packed with heart-healthy monounsaturated fats, fiber, and potassium, these avocados are a nutritional powerhouse.",
    rating: 4.5,
    reviews: 124,
    sku: "AVO-500-ORG",
    category: ["Fruits", "Organic"],
    tags: ["Fresh", "Healthy", "Keto", "Vegan"],
    nutrition: {
        calories: 160,
        fat: "15g",
        saturatedFat: "2.1g",
        cholesterol: "0mg",
        sodium: "7mg",
        carbohydrates: "9g",
        fiber: "7g",
        sugar: "0.7g",
        protein: "2g"
    },
    origin: {
        location: "Bandarban, BD",
        description: "Sourced from certified organic family orchards in the volcanic highlands, ensuring optimal climate for creamy texture and rich flavor."
    }
};

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
    const [quantity, setQuantity] = useState(1);

    // In a real app, we would fetch product data based on params.slug
    const product = productData;

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 pb-24 md:pb-8">
                {/* Mobile Header/Nav could go here if different from global header */}

                {/* Breadcrumbs (Desktop) */}
                <div className="hidden md:block mx-auto max-w-screen-xl px-4 md:px-8 py-4">
                    <nav className="flex text-sm text-subtext-light dark:text-subtext-dark mb-4">
                        <a href="#" className="hover:text-primary">Home</a>
                        <span className="mx-2">/</span>
                        <a href="#" className="hover:text-primary">Shop</a>
                        <span className="mx-2">/</span>
                        <a href="#" className="hover:text-primary">Fruits</a>
                        <span className="mx-2">/</span>
                        <span className="text-text-light dark:text-text-dark font-medium">{product.name}</span>
                    </nav>
                </div>

                <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-4 md:py-8">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
                        {/* Left Column: Image Gallery */}
                        <div className="w-full lg:w-1/2">
                            <ProductImageGallery images={product.images} discount={product.discount} />
                        </div>

                        {/* Right Column: Info & Actions */}
                        <div className="w-full lg:w-1/2">
                            <ProductInfo product={product} />

                            {/* Desktop-only Description Preview */}
                            <p className="hidden md:block text-subtext-light dark:text-subtext-dark leading-relaxed mt-4">
                                {product.description}
                            </p>

                            <ProductActions
                                quantity={quantity}
                                setQuantity={setQuantity}
                                onAddToCart={() => console.log("Added to cart")}
                                onBuyNow={() => console.log("Buy now")}
                            />

                            {/* Mobile Accordions (Only visible on mobile) */}
                            <div className="block lg:hidden mt-8">
                                <ProductDetailsAccordion product={product} />
                            </div>
                        </div>
                    </div>

                    {/* Desktop Tabs (Only visible on desktop) */}
                    <div className="hidden lg:block">
                        <ProductDetailsTabs product={product} />
                    </div>

                    {/* Related Products */}
                    <RelatedProducts />
                </div>
            </main>

            {/* Sticky Mobile Footer (if needed specific to product, otherwise global) */}
            {/* The design implies a specific bottom bar for shop but often product details has its own 'Add to Cart' bar. 
                The reference mobile design shows a sticky bottom nav but the Add to Cart is inline. 
                If existing ShopMobileFooter is suitable we keep it, or we implement a product-specific one if requested.
                For now keeping existing structure.
            */}
            <ShopMobileFooter />

            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
