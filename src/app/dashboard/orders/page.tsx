import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getUserOrders } from "@/app/actions/orderActions";
import Link from "next/link";

export default async function OrderHistoryPage() {
    const { success, orders, error } = await getUserOrders();

    if (!success || !orders) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Failed to load orders. Please try again later.</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark">No orders yet</h2>
                <p className="text-subtext-light dark:text-subtext-dark">Start shopping to see your orders here.</p>
                <Link href="/shop" className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold font-display text-text-light dark:text-text-dark">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order: any) => (
                    <div key={order.id} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Order #{order.order_number || order.id.slice(0, 8)}</h3>
                                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === "delivered" || order.status === "Delivered"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                                {order.order_items.map((item: any, index: number) => {
                                    const product = item.products;
                                    const image = product?.product_images?.[0]?.image_url || "/placeholder.png";
                                    return (
                                        <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-800">
                                            <Image
                                                src={image}
                                                alt={product?.name || "Product"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                            <div>
                                <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1 text-right">Total Amount</p>
                                <p className="text-xl font-bold text-primary text-right">৳{order.total_amount?.toFixed(2)}</p>
                            </div>
                            <Link href={`/dashboard/orders/${order.id}`} className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                View Details <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
