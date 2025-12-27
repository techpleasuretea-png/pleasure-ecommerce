"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { Star, Globe } from "lucide-react";

interface ProductDetailsTabsProps {
    product: Product;
}

export function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

    return (
        <div className="mb-16">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8 flex flex-wrap gap-x-8 gap-y-2">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`pb-4 border-b-2 font-semibold text-lg transition-colors ${activeTab === "description"
                        ? "border-primary text-primary"
                        : "border-transparent text-subtext-light dark:text-subtext-dark hover:text-primary"
                        }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-4 border-b-2 font-semibold text-lg transition-colors ${activeTab === "reviews"
                        ? "border-primary text-primary"
                        : "border-transparent text-subtext-light dark:text-subtext-dark hover:text-primary"
                        }`}
                >
                    Reviews ({product.reviews})
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {activeTab === "description" ? (
                    <>
                        <div className="md:col-span-2 space-y-6 text-subtext-light dark:text-subtext-dark leading-relaxed">
                            <p>{product.description}</p>

                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-6">Why Choose {product.name}?</h3>
                            {/* This could be dynamic based on product data or static for now */}
                            <ul className="list-disc pl-5 space-y-2">
                                <li>100% Organic & Non-GMO</li>
                                <li>Sustainably farmed</li>
                                <li>Hand-picked for quality</li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-4">Origin</h3>
                                <div className="flex items-start gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div className="bg-white dark:bg-black/20 p-3 rounded-lg text-primary">
                                        <Globe className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-light dark:text-text-dark text-lg">{product.origin?.location || "Unknown"}</p>
                                        <p className="text-sm mt-1">{product.origin?.description || "No origin description available."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl h-fit">
                            <h3 className="font-bold text-lg mb-4">Nutrition Facts</h3>
                            <p className="text-xs text-subtext-light dark:text-subtext-dark mb-4">Per 100g serving</p>
                            <div className="space-y-3 text-sm">
                                <NutritionRow label="Calories" value={product.nutrition?.calories} bold />
                                <NutritionRow label="Total Fat" value={product.nutrition?.fat} bold />
                                <NutritionRow label="Cholesterol" value={product.nutrition?.cholesterol} bold />
                                <NutritionRow label="Sodium" value={product.nutrition?.sodium} bold />
                                <NutritionRow label="Total Carbohydrates" value={product.nutrition?.carbohydrates} bold />
                                <NutritionRow label="Dietary Fiber" value={product.nutrition?.fiber} indent />
                                <NutritionRow label="Protein" value={product.nutrition?.protein} bold />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="md:col-span-3">
                        {/* Placeholder for reviews */}
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="font-bold">Recent Reviews</h3>
                        </div>
                        <p className="text-subtext-light">Reviews content would go here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function NutritionRow({ label, value, bold, indent }: { label: string; value: string | number | undefined; bold?: boolean; indent?: boolean }) {
    if (!value) return null; // Hide if no value
    return (
        <div className={`flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 ${indent ? "pl-4 text-subtext-light dark:text-subtext-dark" : ""}`}>
            <span>{label}</span>
            <span className={bold ? "font-semibold" : ""}>{value}</span>
        </div>
    )
}
