"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CheckCircle, Truck, CreditCard, ArrowRight, ArrowLeft, Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data - In a real app, this would be fetched based on the order ID
const orderDetails = {
    id: "ORD-3329",
    date: "Oct 24, 2025",
    total: 34.47,
    subtotal: 29.47,
    shipping: 5.00,
    paymentMethod: "Credit Card",
    items: [
        {
            id: 1,
            name: "Organic Avocados",
            weight: "500g",
            price: 9.98,
            quantity: 2,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo"
        },
        {
            id: 2,
            name: "Sourdough Bread",
            weight: "500g",
            price: 6.50,
            quantity: 1,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4"
        },
        {
            id: 3,
            name: "Wild-Caught Salmon",
            weight: "200g",
            price: 12.99,
            quantity: 1,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMpbXKMQJF9FLP_tSEiqFMxcBfGIA2thlOXd4f9YcbQT10Wuk2j13tsBCrQyzYrqEZFDCeo-fDUhy6Ujs6l6wG0QL4FeNSkaPQnRRVvD8Htx22Hg5M-ZPu1hUOpgYmJix1z_h5fe5uGTapm77FUCOvWKsEx0SHERUw6XCm7g3WCaWoV126ePVB3NYt0H1jDsq1k881XFGjIzCKD2_Z5Qs6eHJYLJIPs_ivhpQYwTELBBa8Dc90-ILG6vRzWpWqquMtUzgpJq2tZc4"
        }
    ]
};

import { createClient } from "@/lib/supabase/client";

export default function OrderConfirmationPage() {
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.is_anonymous) {
                setIsAnonymous(true);
            }
        };
        checkUser();
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden flex-none bg-white dark:bg-surface-dark px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-20">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-text-light dark:text-text-dark" />
                </Link>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark absolute left-1/2 transform -translate-x-1/2">Organia</h1>
                <div className="w-10"></div>
            </header>

            {/* Desktop Content */}
            <main className="hidden md:block flex-1 px-4 md:px-8 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full mb-6 text-primary">
                            <CheckCircle className="w-16 h-16" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">Order Confirmed!</h1>
                        <p className="text-lg text-subtext-light dark:text-subtext-dark">Thank you for your purchase. Your order <span className="font-semibold text-text-light dark:text-text-dark">#{orderDetails.id}</span> has been received.</p>
                    </div>

                    {/* Guest: Create Account Prompt */}
                    {isAnonymous && (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-1">Save your order history!</h3>
                                <p className="text-sm text-subtext-light dark:text-subtext-dark">Create an account to track this order easily and speed up future checkouts.</p>
                            </div>
                            <Link href="/signup" className="flex-shrink-0 bg-primary text-white font-bold py-2.5 px-6 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                Create Account
                            </Link>
                        </div>
                    )}

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800 mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                            <div>
                                <p className="text-subtext-light dark:text-subtext-dark mb-1">Order Number</p>
                                <p className="font-semibold">#{orderDetails.id}</p>
                            </div>
                            <div>
                                <p className="text-subtext-light dark:text-subtext-dark mb-1">Date</p>
                                <p className="font-semibold">{orderDetails.date}</p>
                            </div>
                            <div>
                                <p className="text-subtext-light dark:text-subtext-dark mb-1">Total</p>
                                <p className="font-semibold text-primary">৳{orderDetails.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-subtext-light dark:text-subtext-dark mb-1">Payment Method</p>
                                <p className="font-semibold">{orderDetails.paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800 mb-8">
                        <Truck className="text-blue-500 w-8 h-8" />
                        <div className="flex-1">
                            <p className="font-semibold text-text-light dark:text-text-dark">Estimated Delivery</p>
                            <p className="text-sm text-subtext-light dark:text-subtext-dark">Friday, Oct 25th, 2025</p>
                        </div>
                        <a className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline" href="#">Track Order</a>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-10">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg">Order Details</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {orderDetails.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                                            <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base">{item.name} - {item.weight}</p>
                                            <p className="text-sm text-subtext-light dark:text-subtext-dark">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">৳{item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm text-subtext-light dark:text-subtext-dark">
                                    <span>Subtotal</span>
                                    <span>৳{orderDetails.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-subtext-light dark:text-subtext-dark">
                                    <span>Shipping</span>
                                    <span>৳{orderDetails.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-text-light dark:text-text-dark pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <span>Total</span>
                                    <span className="text-primary">৳{orderDetails.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link href="/" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 px-12 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30">
                            Continue Shopping
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Mobile Content */}
            <main className="md:hidden flex-1 overflow-y-auto w-full p-6 flex flex-col items-center justify-center space-y-8">
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-green-200 dark:shadow-none">
                        <Check className="text-white w-12 h-12" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Order Placed Successfully!</h2>
                    <p className="text-text-muted-light dark:text-text-muted-dark">Your order <span className="text-text-light dark:text-text-dark font-semibold">#{orderDetails.id}</span> has been placed.</p>
                </div>

                {isAnonymous && (
                    <div className="w-full bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                        <h3 className="font-bold text-primary mb-1">Don't lose your order!</h3>
                        <p className="text-xs text-subtext-light dark:text-subtext-dark mb-3">Create an account to track this order.</p>
                        <Link href="/signup" className="block w-full bg-primary text-white font-bold py-2 rounded-lg text-sm">
                            Create Account
                        </Link>
                    </div>
                )}

                <div className="w-full bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 space-y-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                            <Truck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold text-text-muted-light dark:text-text-muted-dark tracking-wide">Estimated Delivery</p>
                            <p className="text-sm font-semibold text-text-light dark:text-text-dark mt-1">Tomorrow, 10:00 AM - 2:00 PM</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 border-dashed"></div>

                    <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs uppercase font-bold text-text-muted-light dark:text-text-muted-dark tracking-wide">Payment Method</p>
                                <p className="text-sm font-semibold text-text-light dark:text-text-dark mt-1">Cash on Delivery</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase font-bold text-text-muted-light dark:text-text-muted-dark tracking-wide">Total Amount</p>
                            <p className="text-lg font-bold text-primary mt-1">৳{orderDetails.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4 pt-4">
                    <button className="w-full bg-white dark:bg-transparent border-2 border-primary text-primary hover:bg-green-50 dark:hover:bg-green-900/20 font-bold rounded-2xl py-4 px-6 transition-colors duration-200">
                        View Order Details
                    </button>
                    <Link href="/" className="flex items-center justify-center w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl py-4 px-6 shadow-lg shadow-green-200/50 dark:shadow-none transition-all duration-200 transform active:scale-[0.98]">
                        Continue Shopping
                    </Link>
                </div>
            </main>

            {/* Desktop Footer */}
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
