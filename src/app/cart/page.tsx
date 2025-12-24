"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartMobileCheckout } from "@/components/cart/CartMobileCheckout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useShippingMethods } from "@/hooks/useShippingMethods";

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, isLoading } = useCart();
    const { shippingMethods } = useShippingMethods();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Find minimum shipping cost
    let minShipping = 0;
    if (shippingMethods.length > 0) {
        minShipping = Math.min(...shippingMethods.map(m => m.cost));
    }

    // If cart is empty, shipping is 0. Otherwise use min shipping.
    const shipping = cartItems.length > 0 ? minShipping : 0;

    const discount = 0; // Discount calculation logic can be added later if needed
    const total = subtotal + shipping;
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
                            {isLoading ? (
                                <div className="p-12 text-center">Loading cart...</div>
                            ) : (
                                <>
                                    {cartItems.map(item => (
                                        <CartItem
                                            key={item.id}
                                            {...item}
                                            onIncrement={() => updateQuantity(item.id, 1)}
                                            onDecrement={() => updateQuantity(item.id, -1)}
                                            onRemove={() => removeFromCart(item.id)}
                                        />
                                    ))}

                                    {cartItems.length === 0 && (
                                        <div className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                            Your cart is empty.
                                        </div>
                                    )}
                                </>
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

