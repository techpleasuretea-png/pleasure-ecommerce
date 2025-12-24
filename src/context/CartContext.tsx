"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface CartItem {
    id: string; // Product UUID
    name: string;
    weight: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity">) => void;
    updateQuantity: (productId: string, delta: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    isLoading: boolean;
    user: any;
    addItemWithAuth: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const supabase = createClient();

    // 1. Listen for auth changes
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setIsAuthChecked(true);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsAuthChecked(true);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    // 2. Load initial cart based on user type
    useEffect(() => {
        if (!isAuthChecked) return;

        const loadCart = async () => {
            setIsLoading(true);
            if (user && !user.is_anonymous) {
                // Regular User: Load from Supabase
                try {
                    const { data: cartData } = await supabase
                        .from("carts")
                        .select("id")
                        .eq("user_id", user.id)
                        .single();

                    if (cartData) {
                        const { data: items, error: itemsError } = await supabase
                            .from("cart_items")
                            .select(`
                                quantity,
                                products (
                                    id,
                                    name,
                                    weight,
                                    selling_price,
                                    product_images (image_url)
                                )
                            `)
                            .eq("cart_id", cartData.id);

                        if (itemsError) console.error("Error fetching cart items:", itemsError);
                        console.log("Raw Cart Items Response:", items);

                        if (items) {
                            // Map using 'products' instead of 'product' alias
                            const formattedItems: CartItem[] = items.map((item: any) => ({
                                id: item.products.id,
                                name: item.products.name,
                                weight: item.products.weight,
                                price: item.products.selling_price,
                                image: item.products.product_images?.[0]?.image_url || "/placeholder.png",
                                quantity: item.quantity,
                            }));
                            setCartItems(formattedItems);
                        }
                    } else {
                        // User has no cart yet, ensure state is empty
                        setCartItems([]);
                    }
                } catch (error) {
                    console.error("Error loading cart from Supabase:", error);
                }
            } else {
                // Guest or Anonymous User: Load from LocalStorage
                const savedCart = localStorage.getItem("organico_cart");
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                } else {
                    setCartItems([]);
                }
            }
            setIsLoading(false);
        };

        loadCart();
    }, [user, supabase, isAuthChecked]);

    // 3. Persist cart changes
    useEffect(() => {
        if (isLoading) return;

        if (!user || user.is_anonymous) {
            // Guest: Persist to LocalStorage
            localStorage.setItem("organico_cart", JSON.stringify(cartItems));
        } else {
            // Regular User: We'll handle mutations individually for better reliability
            // but we could also do a debounce sync here if preferred.
        }
    }, [cartItems, user, isLoading]);

    const addToCart = async (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        const quantity = product.quantity || 1;
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...product, quantity }];
        });

        // Sync with Supabase if regular user
        if (user && !user.is_anonymous) {
            try {
                let { data: cart } = await supabase
                    .from("carts")
                    .select("id")
                    .eq("user_id", user.id)
                    .single();

                if (!cart) {
                    const { data: newCart } = await supabase
                        .from("carts")
                        .insert({ user_id: user.id })
                        .select()
                        .single();
                    cart = newCart;
                }

                if (cart) {
                    const { data: existingItem } = await supabase
                        .from("cart_items")
                        .select("id, quantity")
                        .eq("cart_id", cart.id)
                        .eq("product_id", product.id)
                        .single();

                    if (existingItem) {
                        await supabase
                            .from("cart_items")
                            .update({ quantity: existingItem.quantity + quantity })
                            .eq("id", existingItem.id);
                    } else {
                        await supabase
                            .from("cart_items")
                            .insert({
                                cart_id: cart.id,
                                product_id: product.id,
                                quantity: quantity
                            });
                    }
                }
            } catch (error) {
                console.error("Error syncing add to cart:", error);
            }
        }
    };

    const addItemWithAuth = async (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        // 1. Optimistic Update (Immediate Feedback)
        addToCart(product);

        // 2. Ensure Session Exists (Background)
        if (!user) {
            try {
                const { data, error } = await supabase.auth.signInAnonymously();
                if (error) console.error("Auto-Guest Error:", error);
                if (data?.user) {
                    setUser(data.user);
                    // The cart is already in LocalStorage via the useEffect loop triggered by cartItems change.
                    // When user updates here, the loadCart loop will see it's anonymous and KEEP using LocalStorage,
                    // preserving the item we just added.
                }
            } catch (e) {
                console.error("Auto-Guest Exception:", e);
            }
        }
    };

    const updateQuantity = async (productId: string, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    const newQty = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );

        // Sync with Supabase if regular user
        if (user && !user.is_anonymous) {
            try {
                const { data: cart } = await supabase
                    .from("carts")
                    .select("id")
                    .eq("user_id", user.id)
                    .single();

                if (cart) {
                    const { data: existingItem } = await supabase
                        .from("cart_items")
                        .select("id, quantity")
                        .eq("cart_id", cart.id)
                        .eq("product_id", productId)
                        .single();

                    if (existingItem) {
                        const newQty = existingItem.quantity + delta;
                        if (newQty <= 0) {
                            await supabase.from("cart_items").delete().eq("id", existingItem.id);
                        } else {
                            await supabase
                                .from("cart_items")
                                .update({ quantity: newQty })
                                .eq("id", existingItem.id);
                        }
                    }
                }
            } catch (error) {
                console.error("Error syncing quantity update:", error);
            }
        }
    };

    const removeFromCart = async (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));

        if (user && !user.is_anonymous) {
            try {
                const { data: cart } = await supabase
                    .from("carts")
                    .select("id")
                    .eq("user_id", user.id)
                    .single();

                if (cart) {
                    await supabase
                        .from("cart_items")
                        .delete()
                        .eq("cart_id", cart.id)
                        .eq("product_id", productId);
                }
            } catch (error) {
                console.error("Error syncing remove:", error);
            }
        }
    };

    const clearCart = async () => {
        setCartItems([]);
        if (!user || user.is_anonymous) {
            localStorage.removeItem("organico_cart");
        } else {
            try {
                const { data: cart } = await supabase
                    .from("carts")
                    .select("id")
                    .eq("user_id", user.id)
                    .single();

                if (cart) {
                    await supabase.from("cart_items").delete().eq("cart_id", cart.id);
                }
            } catch (error) {
                console.error("Error clearing cart on Supabase:", error);
            }
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, isLoading, user, addItemWithAuth }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
