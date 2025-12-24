"use client";

import { Plus, ShoppingCart, Minus, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
    id: string; // Added ID to props
    name: string;
    weight: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    stock?: number; // Added stock prop
    created_at?: string; // Added created_at prop
}

export function ProductCard({ id, name, weight, price, originalPrice, discount, image, created_at, stock }: ProductCardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { cartItems, addToCart, updateQuantity, isLoading: isCartLoading, addItemWithAuth } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();

    // Calculate isNew
    const isNew = created_at ? (new Date().getTime() - new Date(created_at).getTime()) / (1000 * 3600 * 24) <= 30 : false;

    // Context quantity as source of truth for reactivity
    const cartItem = cartItems.find(item => item.id === id);
    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItemWithAuth({ id, name, weight, price, image });
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(id, 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(id, -1);
    };
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden group border border-transparent hover:border-gray-100 dark:hover:border-gray-800 hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {discount && (
                    <div className="absolute top-2 left-2 z-10 flex h-6 items-center justify-center rounded-full bg-red-500 px-2.5">
                        <p className="text-xs font-bold text-white">{discount}</p>
                    </div>
                )}
                {isNew && !discount && (
                    <div className="absolute top-2 left-2 z-10 flex h-6 items-center justify-center rounded-full bg-primary px-2.5">
                        <p className="text-xs font-bold text-white">New</p>
                    </div>
                )}
                {isNew && discount && (
                    <div className="absolute top-2 right-2 z-10 flex h-6 items-center justify-center rounded-full bg-primary px-2.5">
                        <p className="text-xs font-bold text-white">New</p>
                    </div>
                )}

            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg leading-tight mb-1">{name} - <span className="text-subtext-light dark:text-subtext-dark font-normal">{weight}</span></h3>
                <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-primary font-bold text-xl">৳{price.toFixed(2)}</p>
                    {originalPrice && (
                        <p className="text-subtext-light dark:text-subtext-dark text-sm line-through">৳{originalPrice.toFixed(2)}</p>
                    )}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3 mt-4">
                    {stock !== undefined && stock <= 0 ? (
                        <button
                            onClick={() => addToWishlist({ id, name, weight, price, image, stock })}
                            className="w-full bg-surface-light dark:bg-surface-dark border border-primary text-primary font-bold py-2.5 rounded-lg text-sm hover:bg-primary hover:text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Heart className={`w-4 h-4 ${isInWishlist(id) ? 'fill-current' : ''}`} />
                            {isInWishlist(id) ? "In Wishlist" : "Add to Wishlist"}
                        </button>
                    ) : quantity === 0 ? (
                        <>
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-primary text-white font-bold py-2.5 rounded-lg text-sm hover:bg-green-600 shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                            </button>
                            <button className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
                                Buy Now
                            </button>
                        </>
                    ) : (
                        <div className="w-full flex items-center justify-between bg-primary/10 dark:bg-primary/20 rounded-lg p-1 animate-in zoom-in-95 duration-200 overflow-hidden">
                            <button
                                onClick={handleDecrement}
                                className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-surface-dark text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-primary px-4 tabular-nums">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white hover:bg-green-600 transition-all shadow-md shadow-primary/20"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Buttons */}
                <div className="flex md:hidden items-center gap-2 mt-3">
                    {stock !== undefined && stock <= 0 ? (
                        <button
                            onClick={() => addToWishlist({ id, name, weight, price, image, stock })}
                            className="flex-1 bg-surface-light dark:bg-surface-dark border border-primary text-primary font-bold h-10 rounded-lg text-sm hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Heart className={`w-5 h-5 ${isInWishlist(id) ? 'fill-current' : ''}`} />
                            {isInWishlist(id) ? "In Wishlist" : "Add to Wishlist"}
                        </button>
                    ) : quantity === 0 ? (
                        <>
                            <button className="flex-1 bg-primary text-white font-bold h-10 rounded-lg text-sm hover:bg-opacity-90 active:scale-95 transition-all">Buy</button>
                            <button
                                onClick={handleAddToCart}
                                className="h-10 w-10 flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-between bg-primary/10 dark:bg-primary/20 rounded-lg p-1 animate-in slide-in-from-right-2 duration-300">
                            <button
                                onClick={handleDecrement}
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-surface-dark text-primary shadow-sm"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-primary tabular-nums">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white shadow-md"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
