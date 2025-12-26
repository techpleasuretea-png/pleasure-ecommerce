import { getAdminProducts } from "@/app/actions/adminActions";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default async function AdminProductsPage() {
    const products = await getAdminProducts();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-text-light dark:text-text-dark">Products</h1>
                    <p className="text-subtext-light dark:text-subtext-dark text-sm">Manage your inventory</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add New Product
                </Link>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext-light dark:text-subtext-dark" />
                        <input
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/30 text-left">
                                <th className="px-6 py-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider w-20">Image</th>
                                <th className="px-6 py-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {products && products.length > 0 ? (
                                products.map((product: any) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <Image
                                                    src={product.image_url || "/placeholder.png"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-text-light dark:text-text-dark">{product.name}</div>
                                            <div className="text-xs text-subtext-light dark:text-subtext-dark truncate max-w-[200px]">{product.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-subtext-light dark:text-subtext-dark">
                                                {product.category?.name || "Uncategorized"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-text-light dark:text-text-dark">
                                            Tk {product.selling_price}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${product.stock > 10
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                : product.stock > 0
                                                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                                }`}>
                                                {product.stock} in stock
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white rounded-lg transition-colors text-subtext-light dark:text-subtext-dark"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                {/* Requires client component for delete usually, or wrap in form */}
                                                <DeleteProductButton productId={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-subtext-light dark:text-subtext-dark">
                                        No products found. Add your first product!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Placeholder) */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                    <p className="text-xs text-subtext-light dark:text-subtext-dark">Showing all products</p>
                </div>
            </div>
        </div>
    );
}
