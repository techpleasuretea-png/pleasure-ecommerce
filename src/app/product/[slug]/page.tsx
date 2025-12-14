"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
    const [quantity, setQuantity] = useState(1);

    // Mock Data (In reality, fetch based on slug)
    const product = {
        name: "Organic Avocados",
        weight: "2 pcs",
        price: 280,
        originalPrice: 350,
        discount: "save ৳70",
        rating: 4.5,
        reviews: 86,
        description: "Hand-picked, creamy organic avocados grown in the rich soils of the Bandarban Hill Tracts. These avocados are rich in heart-healthy monounsaturated fats and are perfect for making guacamole, salads, or spreading on toast. Free from synthetic pesticides.",
        origin: "Bandarban, BD",
        nutrition: {
            calories: 160,
            fat: "15g",
            fiber: "7g",
            sugars: "0.7g",
            protein: "2g"
        },
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD2xPfqM2FnFiY6H-qglQ1zw01lEfz5cO_WGAv-lvWTk9JjyXTh7uR4a0VoUPm2hiAz0qecbfIj5ve_XCV_AeURBQMPZuuVJcUOBdfD9sf1Q0XkiGVuhPePg647icHlbtFYusbcfOw1LugLO3EnQuOOHM__P1bcSqTTE2y-RoX7XJ6NalvHrmM73s2LSqjY1YQPJtvLOOxIn_dfkIaIklUpStG7KaWiOHcAgfBJLvZFFnT0x5PIAFyL6jp54tXZDU-RwlOh6u2JOzUk",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuOXyTqf7u28s-4Wq9_8_1l_lG4c4y7tKzZ4W6xBjN3eY1t5_qC9_rO0aP8lXj6s5_bH3f5_kL9_zM2nB1vX6sC7_dF0gH4_aJ2kL5_mN8pQ3_wR6tY9_uI1oO4pS7aD2fG5_hJ8kL1_zX4cV7_bNrT3_qE6_yO9_wP2",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuP7jX4kL2_mN5_qR8sT1_vW3yZ6_uI9_oP4aJ2_bC5dE8fG1_hK4_lM7_nQ3_wR6tY9_uI1oO4pS7aD2fG5_hJ8kL1_zX4cV7_bNrT3_qE6_yO9_wP2_aJ2kL5_mN8pQ3_wR6tY9_uI1oO4pS7aD2fG5_hJ8kL1_zX4cV7"
        ]
    };

    const handleAddToCart = () => {
        console.log("Added to cart:", product.name, quantity);
    };

    const handleBuyNow = () => {
        console.log("Buy Now:", product.name, quantity);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display pb-24 md:pb-0">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-20 bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 flex items-center justify-between p-4">
                <Link href="/shop" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-text-light dark:text-text-dark" />
                </Link>
                <h1 className="text-lg font-bold text-text-light dark:text-text-dark">Details</h1>
                <button className="p-2 -mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <ShoppingBag className="w-6 h-6 text-text-light dark:text-text-dark" />
                </button>
            </header>

            <main className="flex-1 mx-auto max-w-screen-xl w-full p-4 md:p-8">

                {/* Breadcrumb (Desktop) */}
                <div className="hidden md:flex items-center gap-2 text-sm text-subtext-light dark:text-subtext-dark mb-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-primary">Shop</Link>
                    <span>/</span>
                    <Link href="/fruits" className="hover:text-primary">Fruits</Link>
                    <span>/</span>
                    <span className="text-text-light dark:text-text-white font-semibold">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Section */}
                    <div>
                        <ProductGallery images={product.images} />
                    </div>

                    {/* Content Section */}
                    <div>
                        <ProductInfo
                            name={product.name}
                            weight={product.weight}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                        />

                        <ProductActions
                            quantity={quantity}
                            setQuantity={setQuantity}
                            onAddToCart={handleAddToCart}
                            onBuyNow={handleBuyNow}
                        />

                        <ProductTabs
                            description={product.description}
                            origin={product.origin}
                            nutrition={product.nutrition}
                        />
                    </div>
                </div>

                <RelatedProducts />
            </main>

            {/* Mobile Bottom Bar (Fixed) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20 flex gap-3 shadow-lg shadow-gray-200/50 dark:shadow-none">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark font-bold py-3.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                    Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                >
                    Buy Now
                </button>
            </div>

            {/* Desktop Footer */}
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
