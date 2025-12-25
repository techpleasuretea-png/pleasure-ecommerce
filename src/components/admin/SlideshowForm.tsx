"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SlideshowFormProps {
    initialData?: {
        title: string | null;
        subtitle: string | null;
        image_url: string;
        button_text: string | null;
        button_link: string | null;
        is_active: boolean | null;
        order_index: number | null;
    };
    action: (formData: FormData) => Promise<void>;
}

export function SlideshowForm({ initialData, action }: SlideshowFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            await action(formData);
            // router.push("/admin/slideshow"); // Action should handle redirect
        } catch (error) {
            console.error("Error saving slideshow:", error);
            alert("Failed to save slideshow. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title || ""}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Slide Title"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Subtitle</label>
                    <input
                        name="subtitle"
                        defaultValue={initialData?.subtitle || ""}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Slide Subtitle"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Image URL <span className="text-red-500">*</span></label>
                    <input
                        name="image_url"
                        defaultValue={initialData?.image_url || ""}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-subtext-light dark:text-subtext-dark">Provide a direct link to the image.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Button Text</label>
                    <input
                        name="button_text"
                        defaultValue={initialData?.button_text || ""}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., Shop Now"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Button Link</label>
                    <input
                        name="button_link"
                        defaultValue={initialData?.button_link || ""}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., /shop"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Order Index</label>
                    <input
                        type="number"
                        name="order_index"
                        defaultValue={initialData?.order_index || 0}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>

                <div className="space-y-2 flex items-center justify-between md:col-span-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div>
                        <span className="block text-sm font-bold text-text-light dark:text-text-dark">Active Status</span>
                        <span className="text-xs text-subtext-light dark:text-subtext-dark">Show this slide on the homepage</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="is_active"
                            value="true"
                            defaultChecked={initialData?.is_active ?? true}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 rounded-xl font-bold border border-gray-200 dark:border-gray-700 text-subtext-light dark:text-subtext-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Save Slideshow
                </button>
            </div>
        </form>
    );
}
