"use client";

import { deleteProduct } from "@/app/actions/adminActions";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteProductButtonProps {
    productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure you want to delete this product?")) return;

        startTransition(async () => {
            await deleteProduct(productId);
        });
    };

    return (
        <form onSubmit={handleDelete}>
            <button
                type="submit"
                disabled={isPending}
                className="p-2 bg-red-50 dark:bg-red-900/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-red-500 disabled:opacity-50"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </form>
    );
}
