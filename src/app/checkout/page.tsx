"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import { CheckoutMobileBar } from "@/components/checkout/CheckoutMobileBar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { useCart } from "@/context/CartContext";
import { useShippingMethods } from "@/hooks/useShippingMethods";

export default function CheckoutPage() {
    const { cartItems } = useCart();
    const { shippingMethods, isLoading: isShippingLoading } = useShippingMethods();
    const [selectedShippingId, setSelectedShippingId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // Set default shipping method once loaded
    useEffect(() => {
        if (shippingMethods.length > 0 && !selectedShippingId) {
            setSelectedShippingId(shippingMethods[0].id);
        }
    }, [shippingMethods, selectedShippingId]);

    const router = useRouter();
    const supabase = createClient();

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate shipping based on selection & discount logic
    const selectedMethod = shippingMethods.find(m => m.id === selectedShippingId);
    let shippingCost = 0;

    if (selectedMethod) {
        if (selectedMethod.discount_threshold !== null && subtotal >= selectedMethod.discount_threshold) {
            shippingCost = selectedMethod.discounted_cost ?? 0;
        } else {
            shippingCost = selectedMethod.cost;
        }
    }

    const discount = 0;
    const total = subtotal + shippingCost - discount;

    const handlePlaceOrder = async () => {
        setIsLoading(true);
        try {
            // 1. Get Current User (Auth or Anonymous)
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                console.log("Placing order for user:", user.id, "Is Anonymous:", user.is_anonymous);
                // Here is where you would call the backend API to create the order
                // e.g. await createOrder({ userId: user.id, items: cartItems, total, shippingMethod: selectedShippingId });

                // For now, we simulate success and redirect
                // We'll assume the order is created with the current UserID.
            } else {
                console.error("No user found during checkout. This shouldn't happen with Auto-Guest.");
            }

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            router.push("/order-confirmation");
        } catch (error) {
            console.error("Error placing order:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden flex-none bg-white dark:bg-surface-dark px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-20 sticky top-0">
                <Link href="/cart" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-text-light dark:text-text-dark" />
                </Link>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark absolute left-1/2 transform -translate-x-1/2">
                    Checkout
                </h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 px-4 md:px-8 py-8 max-w-screen-xl mx-auto w-full pb-48 md:pb-8">
                <h1 className="hidden md:block text-3xl font-bold mb-8 font-display">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Checkout Form (Delivery & Payment) */}
                    <div className="w-full lg:w-2/3">
                        {isShippingLoading ? (
                            <div className="p-8 text-center">Loading shipping options...</div>
                        ) : (
                            <CheckoutForm
                                shippingMethod={selectedShippingId}
                                onShippingChange={setSelectedShippingId}
                                shippingMethods={shippingMethods}
                                subtotal={subtotal}
                            />
                        )}
                    </div>

                    {/* Desktop Sidebar Summary */}
                    <div className="hidden lg:block w-full lg:w-1/3">
                        <CheckoutOrderSummary
                            subtotal={subtotal}
                            shipping={shippingCost}
                            discount={discount}
                            total={total}
                            items={cartItems}
                            onPlaceOrder={handlePlaceOrder}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Bar */}
            <CheckoutMobileBar
                total={total}
                onPlaceOrder={handlePlaceOrder}
                isLoading={isLoading}
            />

            {/* Desktop Footer */}
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
