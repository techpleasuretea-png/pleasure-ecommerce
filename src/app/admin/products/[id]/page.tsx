import { updateProduct, getAdminCategories, getAdminProductById } from "@/app/actions/adminActions";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = params;

    // Fetch parallel
    const [product, categories] = await Promise.all([
        getAdminProductById(id).catch(() => null),
        getAdminCategories()
    ]);

    if (!product) {
        notFound();
    }

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
                    <h1 className="text-2xl font-black text-text-light dark:text-text-dark">Edit Product</h1>
                    <p className="text-subtext-light dark:text-subtext-dark text-sm">Update product details</p>
                </div>
            </div>

            <ProductForm
                categories={categories}
                initialData={product}
                action={updateProduct.bind(null, product.id)}
            />
        </div>
    );
}
