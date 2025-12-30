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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getOrderById } from "@/app/actions/orderActions";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { success, order, error } = await getOrderById(id);

    if (!success || !order) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-xl font-bold text-red-500 mb-2">Order Not Found</h1>
                <p className="text-gray-500 mb-6">Could not find order with ID #{id}</p>
                <Link href="/dashboard/orders" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Orders
                </Link>
            </div>
        );
    }

    // Map DB status to timeline steps
    // Simple mapping for now
    const currentStatus = order.status?.toLowerCase();
    const timeline = [
        { status: "Order Placed", date: new Date(order.created_at).toLocaleString(), completed: true, icon: Package },
        { status: "Processing", date: "", completed: currentStatus !== "pending" && currentStatus !== "cancelled", icon: Calendar },
        { status: "On the Way", date: "", completed: currentStatus === "shipped" || currentStatus === "delivered", current: currentStatus === "shipped", icon: Truck },
        { status: "Delivered", date: "", completed: currentStatus === "delivered", current: currentStatus === "delivered", icon: CheckCircle2 },
    ];

    const address = order.user_addresses?.address_line || "Address not available";

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
                            Order #{order.order_number || order.id.slice(0, 8)}
                            <button className="md:hidden ml-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Invoice
                            </button>
                        </h1>
                        <p className="text-xs md:text-sm text-subtext-light dark:text-subtext-dark mt-1">
                            Placed on {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Tracking Timeline */}
                    <div className="hidden md:block bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-6">Order Status</h2>
                        <div className="relative">
                            <div className="absolute top-[16px] md:top-[24px] left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-0" />
                            <div className="flex flex-row justify-between relative z-10">
                                {timeline.map((step, index) => {
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
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Order Items ({order.order_items.length})</h2>
                        <div className="space-y-4">
                            {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-50 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex-shrink-0">
                                        <Image
                                            src={item.products?.product_images?.[0]?.image_url || "/placeholder.png"}
                                            alt={item.products?.name || "Product"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-text-light dark:text-text-dark text-sm md:text-base line-clamp-2">
                                                {item.products?.name}
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
                                <p className="font-bold text-text-light dark:text-text-dark text-base mb-2">{order.recipient_name}</p>
                                <p>{address}</p>
                                <p>{order.recipient_mobile}</p>
                            </div>

                            {/* Delivery Boy Details */}
                            {order.delivery_boy_name && (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Truck className="w-3 h-3" />
                                        Delivery Agent
                                    </p>
                                    <div className="text-sm">
                                        <p className="font-bold text-text-light dark:text-text-dark">{order.delivery_boy_name}</p>
                                        <p className="text-subtext-light dark:text-subtext-dark">{order.delivery_boy_phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                                Payment Details
                            </h2>
                            <div className="space-y-1 text-sm text-subtext-light dark:text-subtext-dark">
                                <p>Payment Method</p>
                                <p className="font-bold text-text-light dark:text-text-dark text-base mb-2">{order.payment_method}</p>
                                <p className="flex items-center gap-2 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-500 w-fit px-3 py-1 rounded-full text-xs font-bold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {order.status === 'delivered' ? 'Paid' : 'Payment Pending'}
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
                                <span className="font-medium text-text-light dark:text-text-dark">৳{(order.total_amount - order.shipping_cost + (order.total_discount || 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark">Delivery Fee</span>
                                <span className="font-medium text-text-light dark:text-text-dark">৳{order.shipping_cost?.toFixed(2)}</span>
                            </div>

                            {order.total_discount > 0 && (
                                <div className="flex justify-between text-sm text-primary">
                                    <span>Discount</span>
                                    <span className="font-medium">-৳{order.total_discount.toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <span className="font-bold text-text-light dark:text-text-dark">Total</span>
                            <span className="font-bold text-xl text-primary">৳{order.total_amount.toFixed(2)}</span>
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
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 z-[100] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
                <div className="flex items-center justify-between px-6 py-4 relative">
                    <div className="absolute top-[28px] left-6 right-6 h-0.5 bg-gray-100 dark:bg-gray-700 -z-0" />
                    {timeline.map((step, index) => {
                        const isCompleted = step.completed;
                        const isCurrent = step.current;
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex flex-col items-center gap-1.5 relative z-10 flex-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted ? 'border-primary bg-primary text-white' :
                                    isCurrent ? 'border-primary bg-primary text-white' :
                                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-300 dark:text-gray-600'
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
