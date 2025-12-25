import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "@/app/actions/adminActions";

export default function NewCategoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Add New Category</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Create a new product category.</p>
            </div>

            <CategoryForm action={createCategory} />
        </div>
    );
}
