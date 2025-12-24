"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface WishlistItem {
    id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        image: any;
        price: number;
        slug: string;
        stock: number;
    };
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    addToWishlist: (product: any) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchWishlist = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setWishlistItems([]);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("wishlist_items")
                .select(`
                    id,
                    product_id,
                    product:products (
                        id,
                        name,
                        selling_price,
                        stock,
                        slug,
                        product_images!inner(image_url)
                    )
                `)
                .eq("user_id", user.id);

            if (error) {
                console.error("Error fetching wishlist:", error);
            } else if (data) {
                // Transform data to match simplified shape if needed
                const formattedItems = data.map((item: any) => ({
                    id: item.id,
                    product_id: item.product_id,
                    product: {
                        id: item.product.id,
                        name: item.product.name,
                        price: item.product.selling_price,
                        slug: item.product.slug,
                        stock: item.product.stock,
                        image: item.product.product_images?.[0]?.image_url || "/placeholder.png"
                    }
                }));
                setWishlistItems(formattedItems);
            }
            setIsLoading(false);
        };

        fetchWishlist();

        // Subscribe to changes
        const channel = supabase
            .channel('wishlist_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'wishlist_items' },
                () => {
                    fetchWishlist();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    const addToWishlist = async (product: any) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        // Optimistic update
        const tempId = Math.random().toString();
        const optimisticItem: WishlistItem = {
            id: tempId,
            product_id: product.id,
            product: {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                slug: product.slug || "", // Fallback if slug is missing
                stock: product.stock || 0
            }
        };

        setWishlistItems((prev) => [...prev, optimisticItem]);

        const { error } = await supabase
            .from("wishlist_items")
            .insert({
                user_id: user.id,
                product_id: product.id
            });

        if (error) {
            console.error("Error adding to wishlist:", error);
            // Revert optimistic update
            setWishlistItems((prev) => prev.filter((item) => item.id !== tempId));
        }
    };

    const removeFromWishlist = async (productId: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Optimistic update
        const itemToRemove = wishlistItems.find((item) => item.product_id === productId);
        setWishlistItems((prev) => prev.filter((item) => item.product_id !== productId));

        const { error } = await supabase
            .from("wishlist_items")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", productId);

        if (error) {
            console.error("Error removing from wishlist", error);
            // Revert optimistic update
            if (itemToRemove) {
                setWishlistItems((prev) => [...prev, itemToRemove]);
            }
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item.product_id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, isLoading }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
