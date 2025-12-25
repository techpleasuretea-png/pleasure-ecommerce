import Link from "next/link";
import { getAdminStats } from "@/app/actions/adminActions";
import { ArrowRight, Package, DollarSign, ShoppingBag } from "lucide-react";

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Admin Overview</h1>
                    <p className="text-subtext-light dark:text-subtext-dark">Welcome to your store's control panel.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-16 h-16 text-primary" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-2">Total Orders</h3>
                        <p className="text-3xl font-black text-primary">{stats.totalOrders}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <DollarSign className="w-16 h-16 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-2">Total Revenue</h3>
                        <p className="text-3xl font-black text-green-600 dark:text-green-500">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <Package className="w-16 h-16 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-sm font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-2">Total Products</h3>
                        <p className="text-3xl font-black text-blue-600 dark:text-blue-500">{stats.totalProducts}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Recent Orders</h3>
                    <Link href="/admin/orders" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {stats.recentOrders && stats.recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/10">
                                    <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Order No.</th>
                                    <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Customer</th>
                                    <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {stats.recentOrders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="p-4">
                                            <Link href={`/admin/orders/${order.id}`} className="font-mono font-bold text-sm text-primary hover:underline">
                                                #{order.order_number || order.id.slice(0, 8)}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-sm text-text-light dark:text-text-dark">
                                            {order.recipient_name || order.profiles?.full_name || "Guest"}
                                        </td>
                                        <td className="p-4 text-sm text-subtext-light dark:text-subtext-dark">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-2 py-1 rounded text-xs font-bold capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    order.status === 'shipping' || order.status === 'shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-mono font-bold text-sm text-text-light dark:text-text-dark">
                                            ${order.total_amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                        No recent orders found.
                    </div>
                )}
            </div>
        </div>
    );
}
