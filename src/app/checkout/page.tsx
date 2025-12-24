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
    const { cartItems, clearCart } = useCart();
    const { shippingMethods, isLoading: isShippingLoading } = useShippingMethods();
    const [selectedShippingId, setSelectedShippingId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: ""
    });

    const router = useRouter();
    const supabase = createClient();

    // Set default shipping method once loaded
    useEffect(() => {
        if (shippingMethods.length > 0 && !selectedShippingId) {
            setSelectedShippingId(shippingMethods[0].id);
        }
    }, [shippingMethods, selectedShippingId]);

    // Pre-fill user data
    useEffect(() => {
        const loadUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
                if (profile) {
                    setFormData(prev => ({
                        ...prev,
                        name: profile.full_name || "",
                    }));
                }
                const { data: phoneData } = await supabase.from('user_phones').select('phone_number').eq('user_id', user.id).limit(1).maybeSingle();
                if (phoneData) {
                    setFormData(prev => ({ ...prev, mobile: phoneData.phone_number }));
                }
                const { data: addressData } = await supabase.from('user_addresses').select('address_line').eq('user_id', user.id).order('is_default', { ascending: false }).limit(1).maybeSingle();
                if (addressData) {
                    setFormData(prev => ({ ...prev, address: addressData.address_line }));
                }
            }
        };
        loadUserData();
    }, []);


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

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handlePlaceOrder = async () => {
        if (!formData.name || !formData.mobile || !formData.address) {
            alert("Please fill in all delivery details.");
            return;
        }

        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("No user found");
                return;
            }

            // Import dynamically or at top. Since this is client component, we import server action?
            // Next.js allows importing server actions in client components.
            // But we need to make sure the import path is correct and it's treated as a module.
            const { createOrder } = await import("@/app/actions/orderActions");

            const orderInput = {
                userId: user.id,
                items: cartItems.map(item => ({
                    product_id: item.id, // Assuming item.id is the UUID from products table. CAREFUL: Cart might use different ID?
                    quantity: item.quantity,
                    price: item.price
                })),
                subtotal,
                shippingCost,
                discount,
                total,
                shippingMethodId: selectedShippingId,
                paymentMethod: "cod", // Hardcoded for now as per UI
                name: formData.name,
                mobile: formData.mobile,
                address: formData.address,
                isAnonymous: !!user.is_anonymous
            };

            const result = await createOrder(orderInput);

            if (result.success && result.orderId) {
                // Clear cart (if function available)
                await clearCart();
                router.push(`/order-confirmation?id=${result.orderId}`);
            } else {
                console.error("Order creation failed:", result.error);
                alert("Failed to place order. Please try again.");
            }

        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing the order.");
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
                                formData={formData}
                                onFormDataChange={handleFormDataChange}
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
