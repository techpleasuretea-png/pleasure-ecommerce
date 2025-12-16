import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Fallback/Mapping for colors based on category name (case-insensitive keys recommended if possible, but strict here for now)
const CATEGORY_STYLES: Record<string, string> = {
    "Fruits": "bg-[#FFF2E5] dark:bg-[#5C3A20]",
    "Vegetables": "bg-[#EAF3E6] dark:bg-[#2B4022]",
    "Dairy": "bg-[#E6F4FF] dark:bg-[#1E435F]",
    "Bakery": "bg-[#FEF5E5] dark:bg-[#5C4520]",
    "Meat": "bg-[#FBE8E5] dark:bg-[#5C2B20]",
    "Drinks": "bg-[#E7F6F0] dark:bg-[#205C41]",
    "Snacks": "bg-[#F0F0F0] dark:bg-[#4A4A4A]",
    "Seafood": "bg-[#E5F5FA] dark:bg-[#1F5466]",
    "Pantry": "bg-[#FFF8E1] dark:bg-[#5C5320]",
    "Spices": "bg-[#F3E5F5] dark:bg-[#4A205C]",
};

const DEFAULT_STYLE = "bg-gray-50 dark:bg-gray-800";

export async function CategoryGrid() {
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .limit(5); // Get top 5 to match design (5 items + "See All" card = 6 slots)

    const displayCategories = categories || [];

    return (
        <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-display">Shop by Category</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                {displayCategories.map((cat) => {
                    const colorClass = CATEGORY_STYLES[cat.name] || DEFAULT_STYLE;

                    return (
                        <Link key={cat.id} href={`/category/${cat.slug}`} className="text-center group block">
                            <div className={`${colorClass} w-24 h-24 md:w-36 md:h-36 mx-auto rounded-full flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300 shadow-sm group-hover:shadow-md`}>
                                {/* Using standard img tag as per previous implementation to avoid setup with next/image for external URLs if not configured */}
                                <img
                                    src={cat.image_url || ''}
                                    alt={`${cat.name} category icon`}
                                    className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-sm"
                                />
                            </div>
                            <p className="mt-3 md:mt-4 text-sm md:text-base font-medium group-hover:text-primary transition-colors">{cat.name}</p>
                        </Link>
                    );
                })}

                <Link href="/categories" className="text-center group flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 md:w-36 md:h-36 mx-auto rounded-full flex items-center justify-center transform group-hover:-translate-y-2 transition-all duration-300 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 group-hover:shadow-md">
                        <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="mt-3 md:mt-4 text-sm md:text-base font-medium group-hover:text-primary transition-colors">See All</p>
                </Link>
            </div>
        </section>
    );
}
