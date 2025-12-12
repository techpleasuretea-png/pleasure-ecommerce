"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartMobileCheckout } from "@/components/cart/CartMobileCheckout";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const initialItems = [
    {
        id: 1,
        name: "Organic Avocados",
        weight: "500g",
        price: 280,
        originalPrice: 350,
        savings: 70,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo",
        quantity: 1
    },
    {
        id: 2,
        name: "Organic Milk",
        weight: "1L",
        price: 238,
        originalPrice: 286,
        savings: 48,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtUIriRHMO78Lha6iwa0djf40KrA7NUKzm65pZn7NmyUTbERKiDAsYeidSD_j3nyKWQf3KGxcIQQfDrA7BsrbKfzORwZUv8Gz4H9tY3FFL489kPbsurGIdMPxYiVbcsW3UiuFAcVOvpK1nAWgGTdg0mXv1YFHQMpZADGc0yqyhaO4w1vcPGg0xjrGrFUxS-B84PNsvXB7P1l-_MQ17WFgbZEK7YoKYGSwmWQyqKHLqHKjJZsPfTe6HwEchNm8M6d864DJGIUFmfJ8",
        quantity: 2
    },
    {
        id: 3,
        name: "Sourdough Bread",
        weight: "1 loaf",
        price: 525,
        originalPrice: 575,
        savings: 50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4",
        quantity: 1
    }
];

export default function CartPage() {
    const [items, setItems] = useState(initialItems);

    const updateQuantity = (id: number, delta: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 50;
    const discount = items.reduce((acc, item) => acc + (item.savings || 0) * item.quantity, 0);
    const total = subtotal + shipping;
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden flex-none bg-surface-light dark:bg-surface-dark px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-20 sticky top-0">
                <Link href="/shop" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-text-light dark:text-text-dark" />
                </Link>
                <h1 className="text-xl font-semibold text-text-light dark:text-text-dark absolute left-1/2 transform -translate-x-1/2">
                    Shopping Cart
                </h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 px-4 md:px-8 py-8 max-w-screen-xl mx-auto w-full pb-32 md:pb-8">
                <h1 className="hidden md:block text-3xl font-bold mb-8 font-display">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Cart Items List */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-transparent md:bg-surface-light md:dark:bg-surface-dark rounded-xl overflow-hidden">
                            {/* Desktop Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-subtext-light dark:text-subtext-dark">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Subtotal</div>
                            </div>

                            {/* Items */}
                            {items.map(item => (
                                <CartItem
                                    key={item.id}
                                    {...item}
                                    onIncrement={() => updateQuantity(item.id, 1)}
                                    onDecrement={() => updateQuantity(item.id, -1)}
                                    onRemove={() => removeItem(item.id)}
                                />
                            ))}

                            {items.length === 0 && (
                                <div className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                    Your cart is empty.
                                </div>
                            )}
                        </div>

                        <div className="hidden md:flex mt-4 justify-between items-center">
                            <Link href="/shop" className="text-primary font-semibold text-sm hover:underline">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Sidebar Summary */}
                    <div className="hidden lg:block w-full lg:w-1/3">
                        <CartSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            discount={discount}
                            total={total}
                        />
                    </div>
                </div>
            </main>

            {/* Mobile Footer (Checkout Bar) */}
            <CartMobileCheckout
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                count={count}
            />

            {/* Desktop Footer */}
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
