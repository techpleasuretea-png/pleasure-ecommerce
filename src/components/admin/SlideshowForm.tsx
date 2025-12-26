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
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url || null);
    const [removeImage, setRemoveImage] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRemoveImage(false);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        setRemoveImage(true);
        // Reset file input if needed (usually by key or ref, but simple state works for preview)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        if (removeImage) {
            formData.set('remove_image', 'true');
        }
        // existing_image_url is needed to keep the old image if no new file is chosen and not removed
        if (initialData?.image_url) {
            formData.set('existing_image_url', initialData.image_url);
        }

        try {
            await action(formData);
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
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Image</label>

                    {/* Hidden inputs to maintain state for server action */}
                    {/* We don't strictly need image_url input anymore if we rely on file upload, but keeping a fallback or just file input is fine. 
                        The server action checks for 'image_file'. 
                        To handle 'keep existing' vs 'remove', we use helper state.
                    */}

                    <div className="flex flex-col gap-4">
                        {previewUrl ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 group">
                                <img src={previewUrl} alt="Slide preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-subtext-light dark:text-subtext-dark hover:border-primary/50 transition-colors bg-gray-50 dark:bg-gray-800/50">
                                <span className="mb-2 text-sm">No image selected</span>
                            </div>
                        )}

                        <input
                            type="file"
                            name="image_file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-subtext-light dark:text-subtext-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        />
                        <p className="text-xs text-subtext-light dark:text-subtext-dark">Recommended size: 1920x1080px (16:9)</p>
                    </div>
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
