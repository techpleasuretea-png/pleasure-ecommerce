"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export interface CartItem {
    id: string; // Product UUID
    name: string;
    slug: string; // Added slug
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

    // Ref to track which items need syncing
    const dirtyItemsRef = useRef<Set<string>>(new Set());
    const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [cartId, setCartId] = useState<string | null>(null);

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
                    let { data: cartData } = await supabase
                        .from("carts")
                        .select("id")
                        .eq("user_id", user.id)
                        .single();

                    // If no cart exists, create one immediately
                    if (!cartData) {
                        const { data: newCart } = await supabase
                            .from("carts")
                            .insert({ user_id: user.id })
                            .select("id")
                            .single();
                        cartData = newCart;
                    }

                    if (cartData) {
                        setCartId(cartData.id);
                        const { data: items, error: itemsError } = await supabase
                            .from("cart_items")
                            .select(`
                                quantity,
                                products (
                                    id,
                                    name,
                                    slug,
                                    weight,
                                    selling_price,
                                    product_images (image_url)
                                )
                            `)
                            .eq("cart_id", cartData.id);

                        if (itemsError) console.error("Error fetching cart items:", itemsError);

                        if (items) {
                            // Map using 'products' instead of 'product' alias
                            const formattedItems: CartItem[] = items.map((item: any) => ({
                                id: item.products.id,
                                name: item.products.name,
                                slug: item.products.slug,
                                weight: item.products.weight,
                                price: item.products.selling_price,
                                image: item.products.product_images?.[0]?.image_url || "/placeholder.png",
                                quantity: item.quantity,
                            }));
                            setCartItems(formattedItems);
                        } else {
                            setCartItems([]);
                        }
                    }
                } catch (error) {
                    console.error("Error loading cart from Supabase:", error);
                }
            } else {
                // Guest or Anonymous User: Load from LocalStorage
                setCartId(null);
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

    // 3. Persist cart changes (LocalStorage + Debounced Sync)
    useEffect(() => {
        if (isLoading) return;

        if (!user || user.is_anonymous) {
            // Guest: Persist to LocalStorage
            localStorage.setItem("organico_cart", JSON.stringify(cartItems));
        } else {
            // Connected User: Debounced Sync to Supabase
            if (dirtyItemsRef.current.size > 0) {
                if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

                syncTimeoutRef.current = setTimeout(async () => {
                    if (!cartId) return;

                    const itemsToSync = Array.from(dirtyItemsRef.current);
                    dirtyItemsRef.current.clear();

                    for (const productId of itemsToSync) {
                        const item = cartItems.find(i => i.id === productId);

                        try {
                            if (item && item.quantity > 0) {
                                // Upsert (Update or Insert) - relying on UNIQUE(cart_id, product_id)
                                const { error } = await supabase
                                    .from("cart_items")
                                    .upsert({
                                        cart_id: cartId,
                                        product_id: productId,
                                        quantity: item.quantity
                                    }, { onConflict: 'cart_id, product_id' });

                                if (error) console.error(`Error syncing product ${productId}:`, error);
                            } else {
                                // Delete if not found in cartItems (meaning quantity reached 0 and was filtered out)
                                const { error } = await supabase
                                    .from("cart_items")
                                    .delete()
                                    .match({ cart_id: cartId, product_id: productId });

                                if (error) console.error(`Error deleting product ${productId}:`, error);
                            }
                        } catch (err) {
                            console.error(`Exception syncing product ${productId}:`, err);
                        }
                    }
                }, 500); // 500ms debounce
            }
        }
    }, [cartItems, user, isLoading, cartId, supabase]);

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

        // Mark for sync (if user is logged in)
        if (user && !user.is_anonymous) {
            dirtyItemsRef.current.add(product.id);
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
                    setIsAuthChecked(true);
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

        // Mark for sync
        if (user && !user.is_anonymous) {
            dirtyItemsRef.current.add(productId);
        }
    };

    const removeFromCart = async (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));

        // Mark for sync (deletion handled in sync loop by checking existence in cartItems)
        if (user && !user.is_anonymous) {
            dirtyItemsRef.current.add(productId);
        }
    };

    const clearCart = async () => {
        setCartItems([]);
        // Explicit clear is safer for 'clearCart' action.
        if (!user || user.is_anonymous) {
            localStorage.removeItem("organico_cart");
        } else {
            try {
                if (cartId) {
                    await supabase.from("cart_items").delete().eq("cart_id", cartId);
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
