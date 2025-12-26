"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Image as ImageIcon, Plus, Info } from "lucide-react";
import Image from "next/image";

interface Category {
    id: string;
    name: string;
}

interface ProductFormProps {
    categories: Category[];
    initialData?: any; // Type strictly if possible, using Partial<Product>
    action: (formData: FormData) => Promise<void>;
}

export function ProductForm({ categories, initialData, action }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Images State
    const [existingImages, setExistingImages] = useState<any[]>(initialData?.product_images || []);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);

    // Helper to generate preview URLs for new files
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    // Tags
    const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") || "");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setNewImages(prev => [...prev, ...files]);

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setNewImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewImagePreviews(prev => {
            // Revoke old url to avoid memory leak
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const removeExistingImage = (id: string) => {
        setRemovedImageIds(prev => [...prev, id]);
        setExistingImages(prev => prev.filter(img => img.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        // Append Images
        newImages.forEach((file) => {
            // Assuming Create Mode: name="image_files"
            // Assuming Update Mode: name="new_image_files"
            // The server action 'createProduct' uses 'image_files'. 'updateProduct' uses 'new_image_files'.
            // We should check if we are creating or updating.
            // Or we can rely on parent to handle action logic?
            // The parent passes `action`. But `action` (server action) expects FormData with specific keys.
            // We can append to FormData before calling action?
            // Yes, but we need to know the key name. 
            // Let's decide based on initialData presence.
            const keyName = initialData ? 'new_image_files' : 'image_files';
            formData.append(keyName, file);
        });

        // Append Removed IDs
        removedImageIds.forEach(id => {
            formData.append('removed_image_ids', id);
        });

        // Tags
        // formData already has 'tags' from input. Checks out.

        // Primary Image Handling
        // We need to tell server which image is primary.
        // Complex if mixed sources. 
        // For MVP, if we click "Make Primary" on UI, we should update state.
        // Let's skip explicit primary selection UI for now and default to first image effectively?
        // Or adding simple radio button.

        try {
            await action(formData);
        } catch (error) {
            if ((error as any).digest?.startsWith('NEXT_REDIRECT')) {
                throw error;
            }
            console.error("Error saving product:", error);
            alert("Failed to save product. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Basic Information</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Product Name <span className="text-red-500">*</span></label>
                            <input
                                name="name"
                                defaultValue={initialData?.name || ""}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="e.g., Organic Green Tea"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Description</label>
                            <textarea
                                name="description"
                                defaultValue={initialData?.description || ""}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-y"
                                placeholder="Describe your product..."
                            />
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Product Images</h2>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-text-light dark:text-text-dark rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Images
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Existing Images */}
                            {existingImages.map((img) => (
                                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 dark:border-gray-700">
                                    <Image
                                        src={img.image_url}
                                        alt="Product"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(img.id)}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {img.is_primary && (
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded-md">
                                            Primary
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* New Images */}
                            {newImagePreviews.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-primary/50 ring-2 ring-primary/20">
                                    <Image
                                        src={url}
                                        alt="New upload"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Empty State */}
                            {existingImages.length === 0 && newImages.length === 0 && (
                                <div className="col-span-full py-8 text-center text-subtext-light dark:text-subtext-dark border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No images added yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details: Nutrition & Origin */}
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Detailed Specs</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-light dark:text-text-dark">Origin Location</label>
                                <input
                                    name="origin.location"
                                    defaultValue={initialData?.origin?.location || ""}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-light dark:text-text-dark">Origin Description</label>
                                <input
                                    name="origin.description"
                                    defaultValue={initialData?.origin?.description || ""}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-sm text-text-light dark:text-text-dark flex items-center gap-2">
                                Nutrition Facts
                                <Info className="w-4 h-4 text-subtext-light" />
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormInput label="Calories" name="nutrition.calories" type="number" defaultValue={initialData?.nutrition?.calories} />
                                <FormInput label="Protein" name="nutrition.protein" defaultValue={initialData?.nutrition?.protein} />
                                <FormInput label="Carbs" name="nutrition.carbohydrates" defaultValue={initialData?.nutrition?.carbohydrates} />
                                <FormInput label="Fat" name="nutrition.fat" defaultValue={initialData?.nutrition?.fat} />
                                <FormInput label="Fiber" name="nutrition.fiber" defaultValue={initialData?.nutrition?.fiber} />
                                <FormInput label="Sugar" name="nutrition.sugar" defaultValue={initialData?.nutrition?.sugar} />
                                <FormInput label="Sodium" name="nutrition.sodium" defaultValue={initialData?.nutrition?.sodium} />
                                <FormInput label="Cholesterol" name="nutrition.cholesterol" defaultValue={initialData?.nutrition?.cholesterol} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Pricing & Status */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Pricing</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Selling Price <span className="text-red-500">*</span></label>
                            <input
                                name="selling_price"
                                type="number"
                                step="0.01"
                                defaultValue={initialData?.selling_price || ""}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">MRP (Original Price)</label>
                            <input
                                name="mrp"
                                type="number"
                                step="0.01"
                                defaultValue={initialData?.mrp || ""}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Discount Label</label>
                            <input
                                name="discount"
                                defaultValue={initialData?.discount || ""}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="e.g. 20% OFF"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Inventory & Class</h2>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Stock Quantity</label>
                            <input
                                name="stock"
                                type="number"
                                defaultValue={initialData?.stock || "0"}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Weight / Unit</label>
                            <input
                                name="weight"
                                defaultValue={initialData?.weight || ""}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="e.g. 500g"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Category</label>
                            <select
                                name="category_id"
                                defaultValue={initialData?.category_id || ""}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-light dark:text-text-dark">Tags (comma separated)</label>
                            <input
                                name="tags"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="tea, organic, new"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                name="is_featured"
                                value="true"
                                defaultChecked={initialData?.is_featured}
                                id="is_featured"
                                className="w-5 h-5 rounded text-primary focus:ring-primary"
                            />
                            <label htmlFor="is_featured" className="text-sm font-bold text-text-light dark:text-text-dark">Featured Product</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-4 z-50 md:pl-72">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl font-bold border border-gray-200 dark:border-gray-700 text-subtext-light dark:text-subtext-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {initialData ? 'Update Product' : 'Create Product'}
                </button>
            </div>
        </form>
    );
}

function FormInput({ label, name, type = "text", defaultValue }: { label: string, name: string, type?: string, defaultValue?: any }) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-bold text-subtext-light dark:text-subtext-dark uppercase tracking-wide">{label}</label>
            <input
                name={name}
                type={type}
                defaultValue={defaultValue || ""}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
        </div>
    );
}
