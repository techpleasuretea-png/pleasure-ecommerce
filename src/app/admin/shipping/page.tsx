import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { getShippingMethods, deleteShippingMethod } from "@/app/actions/adminActions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ShippingListPage() {
    const methods = await getShippingMethods();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Shipping Methods</h1>
                    <p className="text-subtext-light dark:text-subtext-dark">Manage shipping options and costs.</p>
                </div>
                <Link
                    href="/admin/shipping/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Method
                </Link>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Method Name</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Cost</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Free/Discount Above</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Discounted Cost</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {methods && methods.length > 0 ? (
                                methods.map((method) => (
                                    <tr key={method.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="p-4">
                                            <p className="font-bold text-text-light dark:text-text-dark text-sm">{method.name}</p>
                                        </td>
                                        <td className="p-4 font-mono text-sm">
                                            ${method.cost}
                                        </td>
                                        <td className="p-4 font-mono text-sm">
                                            {method.discount_threshold ? `$${method.discount_threshold}` : '-'}
                                        </td>
                                        <td className="p-4 font-mono text-sm">
                                            {method.discount_threshold ? `$${method.discounted_cost ?? 0}` : '-'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/shipping/${method.id}`}
                                                    className="p-2 text-subtext-light dark:text-subtext-dark hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <DeleteButton id={method.id} action={deleteShippingMethod} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                        No shipping methods found. Click "Add Method" to create one.
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
