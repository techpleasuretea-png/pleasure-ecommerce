import { createProduct, getAdminCategories } from "@/app/actions/adminActions";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
    const categories = await getAdminCategories();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-subtext-light dark:text-subtext-dark" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-text-light dark:text-text-dark">Add New Product</h1>
                    <p className="text-subtext-light dark:text-subtext-dark text-sm">Create a new product listing</p>
                </div>
            </div>

            <ProductForm
                categories={categories}
                action={createProduct}
            />
        </div>
    );
}
