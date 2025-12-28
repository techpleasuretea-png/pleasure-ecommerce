"use client";
import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlistItems, isLoading } = useWishlist();

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold font-display mb-6">My Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}</h1>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : wishlistItems.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-surface-dark rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-3">Your wishlist is empty</h2>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark mb-6">Explore our products and save your favorites!</p>
                    <Link href="/shop" className="bg-primary text-white font-bold py-2.5 px-6 rounded-lg hover:bg-green-600 transition-all text-sm">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {wishlistItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.product_id}
                            name={item.product.name}
                            slug={item.product.slug}
                            weight=""
                            price={item.product.price}
                            image={item.product.image}
                            stock={item.product.stock}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
