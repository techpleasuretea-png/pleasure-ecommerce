"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlistItems, isLoading } = useWishlist();

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-10 px-4 flex items-center justify-center">
                <div className="animate-pulse text-primary font-semibold">Loading Wishlist...</div>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-10 px-4 max-w-[1600px] mx-auto">
                <h1 className="text-3xl font-bold font-display mb-8">My Wishlist</h1>
                <div className="text-center py-20 bg-surface-light dark:bg-surface-dark rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
                    <p className="text-subtext-light dark:text-subtext-dark mb-8">Explore our products and save your favorites!</p>
                    <Link href="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-all">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-10 px-4 max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">My Wishlist ({wishlistItems.length})</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {wishlistItems.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.product_id}
                        name={item.product.name}
                        weight="" // Weight usually not stored in wishlist relation, fetching product details might need it if important
                        price={item.product.price}
                        image={item.product.image}
                        stock={item.product.stock}
                    // Note: Wishlist items view may not need all props like discount/isNew if not fetched
                    />
                ))}
            </div>
        </div>
    );
}
