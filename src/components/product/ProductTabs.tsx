import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProductTabsProps {
    description: string;
    origin: string;
    nutrition: {
        calories: number;
        fat: string;
        fiber: string;
        sugars: string;
        protein: string;
    };
}

export function ProductTabs({ description, origin, nutrition }: ProductTabsProps) {
    const [openSection, setOpenSection] = useState<string | null>("description");

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Description */}
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection("description")}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 font-bold text-left"
                >
                    <span>Product Description</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSection === "description" ? "rotate-180" : ""}`} />
                </button>
                {openSection === "description" && (
                    <div className="p-4 text-subtext-light dark:text-subtext-dark leading-relaxed">
                        {description}
                    </div>
                )}
            </div>

            {/* Origin */}
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection("origin")}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 font-bold text-left"
                >
                    <span>Origin</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSection === "origin" ? "rotate-180" : ""}`} />
                </button>
                {openSection === "origin" && (
                    <div className="p-4 text-subtext-light dark:text-subtext-dark">
                        <div className="flex items-center gap-2">
                            {/* Map Icon or similar here */}
                            <span>{origin}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Nutrition */}
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection("nutrition")}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 font-bold text-left"
                >
                    <span>Nutrition Facts</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSection === "nutrition" ? "rotate-180" : ""}`} />
                </button>
                {openSection === "nutrition" && (
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                                <div className="text-xs text-subtext-light uppercase tracking-wider mb-1">Calories</div>
                                <div className="font-bold text-primary">{nutrition.calories}</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                                <div className="text-xs text-subtext-light uppercase tracking-wider mb-1">Fat</div>
                                <div className="font-bold text-primary">{nutrition.fat}</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                                <div className="text-xs text-subtext-light uppercase tracking-wider mb-1">Fiber</div>
                                <div className="font-bold text-primary">{nutrition.fiber}</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                                <div className="text-xs text-subtext-light uppercase tracking-wider mb-1">Protein</div>
                                <div className="font-bold text-primary">{nutrition.protein}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
