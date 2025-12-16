import { supabase } from "@/lib/supabaseClient";
import { CategoryGridClient } from "./CategoryGridClient";

export async function CategoryGrid() {
    const { data: categories } = await supabase
        .from('categories')
        .select('*');
    // Removed limit to get all categories for expanding functionality

    return <CategoryGridClient categories={categories || []} />;
}
