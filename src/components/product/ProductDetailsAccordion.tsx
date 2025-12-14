"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { ChevronDown, Globe, Leaf } from "lucide-react";

interface ProductDetailsAccordionProps {
    product: Product;
}

export function ProductDetailsAccordion({ product }: ProductDetailsAccordionProps) {
    return (
        <div className="mt-2 space-y-1">
            <AccordionItem title="Description" defaultOpen>
                <div className="pb-4 pt-0 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {product.description}
                </div>
            </AccordionItem>

            <AccordionItem title="Origin">
                <div className="pb-4 pt-0">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-[#333333] dark:text-white">{product.origin.location}</p>
                            <p className="text-sm text-gray-500">{product.origin.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionItem>

            <AccordionItem title="Nutrition Info">
                <div className="pb-4 pt-0">
                    <div className="space-y-2">
                        <NutritionRow label="Calories" value={product.nutrition.calories} />
                        <NutritionRow label="Total Fat" value={product.nutrition.fat} />
                        <NutritionRow label="Dietary Fiber" value={product.nutrition.fiber} />
                        <NutritionRow label="Protein" value={product.nutrition.protein} />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-xs text-gray-400">Values based on 100g serving</span>
                    </div>
                </div>
            </AccordionItem>

            <AccordionItem title="Customer Reviews">
                <div className="pb-4 pt-0">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-base font-bold text-gray-500">Recent Feedback</h4>
                        <button className="text-primary text-sm font-bold">See All ({product.reviews})</button>
                    </div>
                    {/* Placeholder review */}
                    <p className="text-sm text-text-light dark:text-text-dark">Reviews content...</p>
                </div>
            </AccordionItem>

        </div>
    );
}

function AccordionItem({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen || false);

    return (
        <details className="group border-b border-gray-100 dark:border-gray-800" open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
            <summary className="flex w-full items-center justify-between py-4 font-bold text-[#333333] dark:text-white cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                {title}
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </summary>
            {children}
        </details>
    );
}

function NutritionRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex justify-between items-center text-base border-b border-dashed border-gray-100 dark:border-gray-700 pb-2">
            <span className="text-gray-500 dark:text-gray-400">{label}</span>
            <span className="font-bold text-[#333333] dark:text-white">{value}</span>
        </div>
    )
}
