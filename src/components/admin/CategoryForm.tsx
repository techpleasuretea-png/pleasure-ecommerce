"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface CategoryFormProps {
    initialData?: {
        name: string;
        slug: string;
        image_url: string | null;
    };
    action: (formData: FormData) => Promise<void>;
}

export function CategoryForm({ initialData, action }: CategoryFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!initialData) { // Only auto-generate slug for new items
            const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement;
            if (slugInput) {
                slugInput.value = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        // If the image was removed (preview is null) but there was an initial image, 
        // we might need to signal explicitly to remove it. 
        // For now, let's assume if no file is uploaded and preview matches initial, we keep it.
        // If preview is null, we might want to send an empty image_url or a specific flag.
        // If file is uploaded, it will be in formData under 'image_file' (or whatever name we give the input).

        try {
            await action(formData);
        } catch (error) {
            // Ignore redirect errors which are actually success signals
            if ((error as any).digest?.startsWith('NEXT_REDIRECT')) {
                throw error;
            }
            console.error("Error saving category:", error);
            alert("Failed to save category. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Category Name <span className="text-red-500">*</span></label>
                    <input
                        name="name"
                        defaultValue={initialData?.name || ""}
                        required
                        onChange={handleNameChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., Electronics"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Slug <span className="text-red-500">*</span></label>
                    <input
                        name="slug"
                        defaultValue={initialData?.slug || ""}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="e.g., electronics"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-text-light dark:text-text-dark">Category Image</label>
                    <input
                        type="file"
                        name="image_file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {previewUrl ? (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden group border border-gray-200 dark:border-gray-700">
                            <Image
                                src={previewUrl}
                                alt="Category preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors"
                                >
                                    <Upload className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-md transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-subtext-light dark:text-subtext-dark"
                        >
                            <ImageIcon className="w-8 h-8 opacity-50" />
                            <span className="text-sm font-medium">Click to upload image</span>
                        </button>
                    )}
                    {/* Hidden input to pass the existing URL if no new file is selected, or to signal removal */}
                    <input type="hidden" name="existing_image_url" value={initialData?.image_url || ""} />
                    {/* We might strictly need logic in the server action to handle "if file, upload; else if existing matches, keep; else remove?" 
                       Actually, usually if file field is empty, we keep existing unless explicitly cleared. 
                       If I remove image, previewUrl is null. 
                       I can add a hidden input "remove_image" if previewUrl is null and initialData had one.
                   */}
                    {initialData?.image_url && !previewUrl && (
                        <input type="hidden" name="remove_image" value="true" />
                    )}
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
                    Save Category
                </button>
            </div>
        </form>
    );
}
