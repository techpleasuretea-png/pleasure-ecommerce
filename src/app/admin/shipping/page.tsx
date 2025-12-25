import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { getShippingRules, deleteShippingRule } from "@/app/actions/adminActions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ShippingListPage() {
    const rules = await getShippingRules();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Shipping Rules</h1>
                    <p className="text-subtext-light dark:text-subtext-dark">Manage shipping costs and conditions.</p>
                </div>
                <Link
                    href="/admin/shipping/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Rule
                </Link>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Name</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Cost</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Min Value</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Max Value</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {rules && rules.length > 0 ? (
                                rules.map((rule) => (
                                    <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="p-4">
                                            <p className="font-bold text-text-light dark:text-text-dark text-sm">{rule.name}</p>
                                        </td>
                                        <td className="p-4 font-mono text-sm">
                                            ${rule.cost}
                                        </td>
                                        <td className="p-4 font-mono text-sm">
                                            {rule.min_order_value ? `$${rule.min_order_value}` : '-'}
                                        </td>
                                        <td className="p-4 font-mono text-sm">
                                            {rule.max_order_value ? `$${rule.max_order_value}` : '-'}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${rule.is_active
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                }`}>
                                                {rule.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/shipping/${rule.id}`}
                                                    className="p-2 text-subtext-light dark:text-subtext-dark hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <DeleteButton id={rule.id} action={deleteShippingRule} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                        No shipping rules found. Click "Add Rule" to create one.
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
