"use client";

import { use, useState } from "react";
import {
    ArrowLeft,
    Truck,
    CheckCircle2,
    Package,
    MapPin,
    CreditCard,
    Calendar,
    HelpCircle,
    Phone,
    MessageCircle,
    ChevronDown,
    ChevronUp,
    Copy
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data for a specific order
const orderData = {
    id: "ORD-3329",
    date: "Oct 24, 2025, 10:30 AM",
    status: "On the Way",
    trackingNumber: "TRK-889231002",
    items: [
        {
            id: 1,
            name: "Organic Avocados",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo",
            price: 5.99,
            quantity: 2,
            unit: "kg"
        },
        {
            id: 2,
            name: "Sourdough Bread",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4",
            price: 4.50,
            quantity: 1,
            unit: "pcs"
        },
        {
            id: 3,
            name: "Wild-Caught Salmon",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMpbXKMQJF9FLP_tSEiqFMxcBfGIA2thlOXd4f9YcbQT10Wuk2j13tsBCrQyzYrqEZFDCeo-fDUhy6Ujs6l6wG0QL4FeNSkaPQnRRVvD8Htx22Hg5M-ZPu1hUOpgYmJix1z_h5fe5uGTapm77FUCOvWKsEx0SHERUw6XCm7g3WCaWoV126ePVB3NYt0H1jDsq1k881XFGjIzCKD2_Z5Qs6eHJYLJIPs_ivhpQYwTELBBa8Dc90-ILG6vRzWpWqquMtUzgpJq2tZc4",
            price: 23.98,
            quantity: 1,
            unit: "kg"
        },
    ],
    timeline: [
        { status: "Order Placed", date: "Oct 24, 10:30 AM", completed: true, icon: Package },
        { status: "Processing", date: "Oct 24, 11:45 AM", completed: true, icon: Calendar },
        { status: "On the Way", date: "Oct 25, 08:20 AM", completed: true, current: true, icon: Truck },
        { status: "Delivered", date: "Estimated Oct 25, 02:00 PM", completed: false, icon: CheckCircle2 },
    ],
    shippingAddress: {
        name: "Ashraful Alam",
        street: "House 12, Road 5, Dhanmondi",
        city: "Dhaka",
        postalCode: "1209",
        phone: "+880 1712 345678"
    },
    paymentMethod: {
        type: "Cash on Delivery",
        last4: null
    },
    summary: {
        subtotal: 34.47,
        delivery: 2.50,
        discount: 0.00,
        total: 36.97
    }
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();


    // In a real app, we would fetch order details based on `id`
    // const order = orders.find(o => o.id === id) || orderData;
    const order = orderData;

    return (
        <div className="space-y-6 pb-20 md:pb-0">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link
                    href="/dashboard/orders"
                    className="inline-flex items-center text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors text-base font-medium w-fit p-2 -ml-2"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Orders
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold font-display text-text-light dark:text-text-dark flex items-center gap-3">
                            Order #{id}

                            <button className="md:hidden ml-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Invoice
                            </button>
                        </h1>
                        <p className="text-xs md:text-sm text-subtext-light dark:text-subtext-dark mt-1">
                            Placed on {order.date}
                        </p>
                    </div>
                    <div className="hidden md:flex gap-2 md:gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Invoice
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Tracking Timeline */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-6">Order Status</h2>
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute top-[16px] md:top-[24px] left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-0" />

                            <div className="flex flex-row justify-between relative z-10">
                                {order.timeline.map((step, index) => {
                                    const isCompleted = step.completed;
                                    const isCurrent = step.current;
                                    const Icon = step.icon;

                                    return (
                                        <div key={index} className={`flex flex-col items-center gap-2 md:gap-3 flex-1 ${isCompleted || isCurrent ? 'text-primary' : 'text-gray-400 dark:text-gray-600'}`}>
                                            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 md:border-4 transition-all duration-300 bg-white dark:bg-surface-dark z-10 ${isCompleted ? 'border-primary text-primary' :
                                                isCurrent ? 'border-primary bg-primary text-white' :
                                                    'border-gray-200 dark:border-gray-700'
                                                }`}>
                                                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isCurrent ? 'text-white' : ''}`} />
                                            </div>
                                            <div className="pt-1 text-center pl-0">
                                                <p className={`font-bold text-[10px] md:text-base leading-tight ${isCompleted || isCurrent ? 'text-text-light dark:text-text-dark' : 'text-gray-400'}`}>
                                                    {step.status}
                                                </p>
                                                <p className="text-[10px] md:text-sm text-subtext-light dark:text-subtext-dark mt-0.5 hidden md:block">
                                                    {step.date}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Order Items ({order.items.length})</h2>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-50 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-text-light dark:text-text-dark text-sm md:text-base line-clamp-2">
                                                {item.name} <span className="text-subtext-light dark:text-subtext-dark font-normal text-xs">{item.unit}</span>
                                            </h3>
                                            <p className="text-xs md:text-sm text-subtext-light dark:text-subtext-dark mt-0.5 md:mt-1">
                                                {item.quantity} x ৳{item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="font-bold text-primary text-sm md:text-base">৳{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery & Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                                Delivery Details
                            </h2>
                            <div className="space-y-1 text-sm text-subtext-light dark:text-subtext-dark">
                                <p className="font-bold text-text-light dark:text-text-dark text-base mb-2">{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city} - {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.phone}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                                Payment Details
                            </h2>
                            <div className="space-y-1 text-sm text-subtext-light dark:text-subtext-dark">
                                <p>Payment Method</p>
                                <p className="font-bold text-text-light dark:text-text-dark text-base mb-2">{order.paymentMethod.type}</p>
                                <p className="flex items-center gap-2 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-500 w-fit px-3 py-1 rounded-full text-xs font-bold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Payment Pending (COD)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-6">Order Summary</h2>
                        <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark">Subtotal</span>
                                <span className="font-medium text-text-light dark:text-text-dark">৳{order.summary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark">Delivery Fee</span>
                                <span className="font-medium text-text-light dark:text-text-dark">৳{order.summary.delivery.toFixed(2)}</span>
                            </div>

                            {order.summary.discount > 0 && (
                                <div className="flex justify-between text-sm text-primary">
                                    <span>Discount</span>
                                    <span className="font-medium">-৳{order.summary.discount.toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <span className="font-bold text-text-light dark:text-text-dark">Total</span>
                            <span className="font-bold text-xl text-primary">৳{order.summary.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Help & Support */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-900 dark:text-indigo-300">Need Help?</h3>
                                <p className="text-sm text-indigo-700 dark:text-indigo-400/80 mt-1">
                                    If you have any issues with your order, feel free to contact us.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-surface-dark hover:bg-indigo-50 dark:hover:bg-indigo-900/20 py-3 rounded-xl text-indigo-700 dark:text-indigo-300 font-bold text-sm md:text-base transition-colors shadow-sm">
                                <MessageCircle className="w-5 h-5" />
                                Chat with Support
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 py-3 rounded-xl text-indigo-700 dark:text-indigo-300 font-bold text-sm md:text-base transition-colors">
                                <Phone className="w-5 h-5" />
                                Call Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Footer Status Timeline */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
                <div className="flex items-center justify-between px-6 py-4 overflow-x-auto no-scrollbar gap-8">
                    {order.timeline.map((step, index) => {
                        const isCompleted = step.completed;
                        const isCurrent = step.current;
                        const Icon = step.icon;
                        // Simplified logic for icon color/styling for footer
                        const activeColor = isCompleted || isCurrent ? 'text-primary' : 'text-gray-300 dark:text-gray-600';
                        const lineColor = isCompleted ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-700';

                        return (
                            <div key={index} className="flex flex-col items-center gap-1.5 min-w-[60px] relative">
                                {/* Connector Line (except for last item) */}
                                {index < order.timeline.length - 1 && (
                                    <div className={`absolute top-3 left-[calc(50%+12px)] w-[calc(100%+8px)] h-0.5 ${lineColor} -z-0`} />
                                )}

                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white dark:bg-surface-dark z-10 transition-colors ${isCompleted ? 'border-primary text-primary' :
                                    isCurrent ? 'border-primary bg-primary text-white' :
                                        'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600'
                                    }`}>
                                    <Icon className="w-3 h-3" />
                                </div>
                                <p className={`text-[10px] font-bold whitespace-nowrap ${isCompleted || isCurrent ? 'text-text-light dark:text-text-dark' : 'text-gray-400'}`}>
                                    {step.status}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
