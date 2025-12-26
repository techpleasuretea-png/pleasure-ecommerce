"use client";

import { Plus, ShoppingCart, Minus, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

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
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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
                        <AnimatedButton
                            variant={isInWishlist(id) ? "danger" : "outline"}
                            onClick={() => {
                                if (isInWishlist(id)) {
                                    removeFromWishlist(id);
                                } else {
                                    addToWishlist({ id, name, weight, price, image, stock });
                                }
                            }}
                            className="w-full"
                        >
                            <Heart className={`w-4 h-4 mr-2 ${isInWishlist(id) ? 'fill-current' : ''}`} />
                            {isInWishlist(id) ? "Remove from Wishlist" : "Add to Wishlist"}
                        </AnimatedButton>
                    ) : quantity === 0 ? (
                        <>
                            <AnimatedButton
                                onClick={handleAddToCart}
                                isLoading={isCartLoading}
                                className="w-full"
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                            </AnimatedButton>
                            <AnimatedButton variant="secondary" className="w-full">
                                Buy Now
                            </AnimatedButton>
                        </>
                    ) : (
                        <div className="w-full flex items-center justify-between bg-primary/10 dark:bg-primary/20 rounded-lg p-1 animate-in zoom-in-95 duration-200 overflow-hidden">
                            <AnimatedButton
                                onClick={handleDecrement}
                                variant="ghost"
                                size="sm"
                                disabled={isCartLoading}
                                className="w-10 h-10 bg-white dark:bg-surface-dark text-primary hover:bg-primary hover:text-white shadow-sm rounded-md p-0"
                            >
                                <Minus className="w-4 h-4" />
                            </AnimatedButton>
                            <span className="font-bold text-primary px-4 tabular-nums">{quantity}</span>
                            <AnimatedButton
                                onClick={handleIncrement}
                                size="sm"
                                disabled={isCartLoading}
                                className="w-10 h-10 shadow-md shadow-primary/20 rounded-md p-0"
                            >
                                <Plus className="w-4 h-4" />
                            </AnimatedButton>
                        </div>
                    )}
                </div>

                {/* Mobile Buttons */}
                <div className="flex md:hidden items-center gap-2 mt-3">
                    {stock !== undefined && stock <= 0 ? (
                        <AnimatedButton
                            variant={isInWishlist(id) ? "danger" : "outline"}
                            onClick={() => {
                                if (isInWishlist(id)) {
                                    removeFromWishlist(id);
                                } else {
                                    addToWishlist({ id, name, weight, price, image, stock });
                                }
                            }}
                            className="flex-1 h-10 text-sm"
                        >
                            <Heart className={`w-5 h-5 mr-2 ${isInWishlist(id) ? 'fill-current' : ''}`} />
                            {isInWishlist(id) ? "Remove" : "Add to Wishlist"}
                        </AnimatedButton>
                    ) : quantity === 0 ? (
                        <>
                            <AnimatedButton className="flex-1 h-10 text-sm">Buy</AnimatedButton>
                            <AnimatedButton
                                variant="outline"
                                onClick={handleAddToCart}
                                isLoading={isCartLoading}
                                className="h-10 w-10 p-0 flex items-center justify-center"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </AnimatedButton>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-between bg-primary/10 dark:bg-primary/20 rounded-lg p-1 animate-in slide-in-from-right-2 duration-300">
                            <AnimatedButton
                                onClick={handleDecrement}
                                variant="ghost"
                                size="sm"
                                disabled={isCartLoading}
                                className="w-8 h-8 bg-white dark:bg-surface-dark text-primary shadow-sm rounded-md p-0"
                            >
                                <Minus className="w-4 h-4" />
                            </AnimatedButton>
                            <span className="font-bold text-primary tabular-nums">{quantity}</span>
                            <AnimatedButton
                                onClick={handleIncrement}
                                size="sm"
                                disabled={isCartLoading}
                                className="w-8 h-8 shadow-md rounded-md p-0"
                            >
                                <Plus className="w-4 h-4" />
                            </AnimatedButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
