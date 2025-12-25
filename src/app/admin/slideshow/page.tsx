import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { getAdminSlideshows, deleteSlideshow } from "@/app/actions/adminActions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function SlideshowListPage() {
    const slideshows = await getAdminSlideshows();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Slideshows</h1>
                    <p className="text-subtext-light dark:text-subtext-dark">Manage homepage hero slides.</p>
                </div>
                <Link
                    href="/admin/slideshow/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Slide
                </Link>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/10">
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Order</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Image</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Title</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {slideshows && slideshows.length > 0 ? (
                                slideshows.map((slide) => (
                                    <tr key={slide.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="p-4 font-medium text-text-light dark:text-text-dark">
                                            {slide.order_index}
                                        </td>
                                        <td className="p-4">
                                            <div className="w-24 h-12 rounded-lg overflow-hidden relative bg-gray-100">
                                                <img
                                                    src={slide.image_url}
                                                    alt={slide.title || "Slide"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-text-light dark:text-text-dark text-sm">{slide.title || "No Title"}</p>
                                            <p className="text-xs text-subtext-light dark:text-subtext-dark">{slide.subtitle}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${slide.is_active
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                }`}>
                                                {slide.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/slideshow/${slide.id}`}
                                                    className="p-2 text-subtext-light dark:text-subtext-dark hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <DeleteButton id={slide.id} action={deleteSlideshow} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-subtext-light dark:text-subtext-dark">
                                        No slides found. Click "Add Slide" to create one.
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
