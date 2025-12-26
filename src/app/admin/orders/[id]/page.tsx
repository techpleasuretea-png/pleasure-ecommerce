import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, User, MapPin, Phone, CreditCard, Calendar } from "lucide-react";
import { getAdminOrderById, updateOrderStatus } from "@/app/actions/adminActions";
import { notFound } from "next/navigation";
import { OrderStatusUpdate } from "@/components/admin/OrderStatusUpdate";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getAdminOrderById(id);

    if (!order) {
        notFound();
    }

    const address = order.user_addresses?.address_line || "Address not available";

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors text-sm font-bold w-fit"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Orders
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div>
                        <h1 className="text-2xl font-bold font-display text-text-light dark:text-text-dark flex items-center gap-3">
                            Order #{order.order_number || order.id?.slice(0, 8)}
                        </h1>
                        <p className="text-sm text-subtext-light dark:text-subtext-dark mt-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Placed on {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}
                        </p>
                    </div>

                    <div className="w-full lg:w-auto">
                        <OrderStatusUpdate orderId={order.id} currentStatus={order.status} action={updateOrderStatus} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Order Items & Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                            Order Items ({order.order_items.length})
                        </h2>
                        <div className="space-y-4">
                            {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 border-b border-gray-50 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex-shrink-0">
                                        <Image
                                            src={item.products?.product_images?.[0]?.image_url || "/placeholder.png"}
                                            alt={item.products?.name || "Product"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <div>
                                            <h3 className="font-bold text-text-light dark:text-text-dark text-sm line-clamp-2">
                                                {item.products?.name}
                                            </h3>
                                            <p className="text-xs text-subtext-light dark:text-subtext-dark mt-1">
                                                {item.quantity} x ৳{item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="font-bold text-text-light dark:text-text-dark text-sm">৳{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Payment Info */}
                <div className="space-y-6">
                    {/* Customer Details */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                            Customer Details
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-1">Name</p>
                                <p className="font-bold text-text-light dark:text-text-dark text-base">{order.recipient_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-1">Contact</p>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-text-light dark:text-text-dark">
                                        <Phone className="w-4 h-4 text-subtext-light dark:text-subtext-dark" />
                                        {order.recipient_mobile || "N/A"}
                                    </div>
                                    {order.profiles?.email && (
                                        <div className="flex items-center gap-2 text-text-light dark:text-text-dark opacity-80 text-xs">
                                            <span className="w-4 h-4 flex items-center justify-center">@</span>
                                            {order.profiles.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                            Shipping To
                        </h2>
                        <p className="text-sm text-text-light dark:text-text-dark leading-relaxed">
                            {address}
                        </p>
                    </div>

                    {/* Payment & Total */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                            Payment
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark">Method</span>
                                <span className="font-bold text-text-light dark:text-text-dark capitalize">{order.payment_method}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark">Subtotal</span>
                                <span className="font-bold text-text-light dark:text-text-dark">৳{(order.total_amount - order.shipping_cost + (order.total_discount || 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-subtext-light dark:text-subtext-dark">Shipping</span>
                                <span className="font-bold text-text-light dark:text-text-dark">৳{order.shipping_cost?.toFixed(2) || "0.00"}</span>
                            </div>
                            {order.total_discount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span className="font-bold">-৳{order.total_discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="font-bold text-text-light dark:text-text-dark">Total</span>
                                <span className="font-bold text-xl text-primary">৳{order.total_amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
