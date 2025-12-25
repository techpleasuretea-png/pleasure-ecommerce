import Link from "next/link";
import { Eye } from "lucide-react";
import { getAdminOrders } from "@/app/actions/adminActions";

export default async function AdminOrdersPage() {
    const orders = await getAdminOrders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Orders</h1>
                    <p className="text-subtext-light dark:text-subtext-dark">View and manage customer orders.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Order No.</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Total</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="p-4">
                                            <span className="font-mono font-bold text-sm text-primary">#{order.order_number || order.id.slice(0, 8)}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-text-light dark:text-text-dark text-sm">{order.recipient_name || order.profiles?.full_name || "Guest"}</span>
                                                <span className="text-xs text-subtext-light dark:text-subtext-dark">{order.profiles?.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-subtext-light dark:text-subtext-dark">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
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
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
