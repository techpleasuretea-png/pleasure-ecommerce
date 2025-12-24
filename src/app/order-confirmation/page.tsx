"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CheckCircle, Truck, CreditCard, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface OrderDetails {
    id: string;
    date: string;
    total: number;
    subtotal: number;
    shipping: number;
    paymentMethod: string;
    items: Array<{
        id: string; // product_id or item_id
        name: string;
        weight: string; // might need to join product data
        price: number;
        quantity: number;
        image: string;
    }>;
    status: string;
}

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) {
                setError("No Order ID provided.");
                setIsLoading(false);
                return;
            }

            const supabase = createClient();

            // Check auth status
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.is_anonymous) {
                setIsAnonymous(true);
            }

            try {
                // Fetch Order with Items and Products
                // Using a join query
                const { data: order, error: orderError } = await supabase
                    .from('orders')
                    .select(`
                        id, created_at, total_amount, shipping_cost, payment_method, status,
                        order_items (
                            id, quantity, price,
                            product: products (
                                name,
                                product_images (
                                    image_url
                                )
                            )
                        )
                    `)
                    .eq('id', orderId)
                    .single();

                if (orderError) throw orderError;
                if (!order) throw new Error("Order not found");

                // Transform data to match UI
                // Calculate subtotal from items to be sure, or back-calculate
                // Total = Subtotal + Shipping - Discount (stored as total_amount)
                // Subtotal = sum(item.price * quantity)

                const items = order.order_items.map((item: any) => {
                    const productImages = item.product?.product_images as any[];
                    const imageUrl = productImages?.length > 0 ? productImages[0].image_url : "/placeholder.png";

                    return {
                        id: item.id,
                        name: item.product?.name || "Unknown Product",
                        weight: "N/A",
                        price: item.price,
                        quantity: item.quantity,
                        image: imageUrl
                    };
                });

                const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

                setOrderDetails({
                    id: order.id,
                    date: new Date(order.created_at).toLocaleDateString(),
                    total: order.total_amount,
                    subtotal: subtotal,
                    shipping: order.shipping_cost,
                    paymentMethod: order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method,
                    items: items,
                    status: order.status
                });

            } catch (err: any) {
                console.error("Error fetching order:", err);
                setError(`Failed to load order details: ${err.message || err}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark gap-4">
                <h1 className="text-2xl font-bold text-red-500">Error</h1>
                <p className="text-text-light dark:text-text-dark">{error || "Order not found"}</p>
                {/* Debug Info */}
                <p className="text-xs text-gray-500 font-mono mt-2">
                    Debug: Order ID ending in {orderId?.slice(-4)}
                </p>
                <Link href="/" className="text-primary hover:underline">Return Home</Link>
            </div>
        );
    }

    if (!orderDetails) return null;

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
                        <p className="text-lg text-subtext-light dark:text-subtext-dark">Thank you for your purchase. Your order <span className="font-semibold text-text-light dark:text-text-dark">#{orderDetails?.id?.slice(0, 8)}...</span> has been received.</p>
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
                                <p className="font-semibold truncate" title={orderDetails?.id}>#{orderDetails?.id?.slice(0, 8)}</p>
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
                            <p className="text-sm text-subtext-light dark:text-subtext-dark">3-5 Business Days</p>
                        </div>
                        {/* Tracking Link - simplified for now */}
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-50 cursor-not-allowed">Track Order</span>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 mb-10">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg">Order Details</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {orderDetails?.items?.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                                            <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base">{item.name}</p>
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
                    <p className="text-text-muted-light dark:text-text-muted-dark">Your order <span className="text-text-light dark:text-text-dark font-semibold">#{orderDetails.id.slice(0, 8)}</span> has been placed.</p>
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
                            <p className="text-sm font-semibold text-text-light dark:text-text-dark mt-1">3-5 Business Days</p>
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
                                <p className="text-sm font-semibold text-text-light dark:text-text-dark mt-1">{orderDetails.paymentMethod}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase font-bold text-text-muted-light dark:text-text-muted-dark tracking-wide">Total Amount</p>
                            <p className="text-lg font-bold text-primary mt-1">৳{orderDetails.total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4 pt-4">
                    {/* View Order Details button capability is now implied by the page content, maybe scroll to items? 
                         or just link to /dashboard/orders/[id] if authenticated? 
                         For now, leave as button or link to home */}
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

