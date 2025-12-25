import { CategoryForm } from "@/components/admin/CategoryForm";
import { updateCategory } from "@/app/actions/adminActions";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!category) {
        notFound();
    }

    const updateAction = updateCategory.bind(null, category.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Edit Category</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Make changes to the category.</p>
            </div>

            <CategoryForm initialData={category} action={updateAction} />
        </div>
    );
}
