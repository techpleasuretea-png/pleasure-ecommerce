import { updateProduct, getAdminCategories, getAdminProductById } from "@/app/actions/adminActions";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;

    // Fetch parallel
    let product = null;
    let categories = [];
    let error = null;

    try {
        const results = await Promise.all([
            getAdminProductById(id),
            getAdminCategories()
        ]);
        product = results[0];
        categories = results[1];
    } catch (e: any) {
        console.error("Error loading edit page:", e);
        error = e;
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
                <p className="font-mono text-sm bg-red-100 p-4 rounded dark:text-red-900 border border-red-200">
                    {error.message || JSON.stringify(error)}
                </p>
            </div>
        );
    }

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
