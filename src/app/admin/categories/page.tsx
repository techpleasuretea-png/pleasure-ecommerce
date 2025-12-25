import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { getAdminCategories, deleteCategory } from "@/app/actions/adminActions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function CategoriesListPage() {
    const categories = await getAdminCategories();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Categories</h1>
                    <p className="text-subtext-light dark:text-subtext-dark">Manage product categories.</p>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Category
                </Link>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Image</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Name</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Slug</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                {category.image_url ? (
                                                    <img
                                                        src={category.image_url}
                                                        alt={category.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-xs text-gray-500">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-text-light dark:text-text-dark text-sm">{category.name}</p>
                                        </td>
                                        <td className="p-4">
                                            <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">{category.slug}</code>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}`}
                                                    className="p-2 text-subtext-light dark:text-subtext-dark hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <DeleteButton id={category.id} action={deleteCategory} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                        No categories found. Click "Add Category" to create one.
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
