"use client";

import { ChevronDown, Star, MapPin, Leaf, Award } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Review {
    id: string;
    author: string;
    date: string;
    rating: number;
    comment: string;
    avatar?: string;
}

interface ProductDetailsContentProps {
    description: string;
    origin: string;
    nutrition: {
        calories: number;
        fat: string;
        fiber: string;
        sugars: string;
        protein: string;
    };
    reviews: Review[];
}

export function ProductDetailsContent({ description, origin, nutrition, reviews }: ProductDetailsContentProps) {
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
    const [openSection, setOpenSection] = useState<string[]>(["description"]);

    const toggleSection = (section: string) => {
        setOpenSection(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 ${i < rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                    />
                ))}
            </div>
        );
    };

    const NutritionContent = () => (
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl h-fit border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-text-light dark:text-text-dark">Nutrition Facts</h3>
            <p className="text-xs text-subtext-light dark:text-subtext-dark mb-4">Per 100g serving</p>
            <div className="space-y-3 text-sm text-text-light dark:text-text-dark">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span>Calories</span>
                    <span className="font-semibold">{nutrition.calories}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span>Total Fat</span>
                    <span className="font-semibold">{nutrition.fat}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span>Dietary Fiber</span>
                    <span className="font-semibold">{nutrition.fiber}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span>Sugars</span>
                    <span className="font-semibold">{nutrition.sugars}</span>
                </div>
                <div className="flex justify-between pt-2">
                    <span>Protein</span>
                    <span className="font-semibold">{nutrition.protein}</span>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-subtext-light dark:text-subtext-dark">
                <Leaf className="w-4 h-4 text-primary" />
                <span>Values based on 100g serving</span>
            </div>
        </div>
    );

    const ReviewsList = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h4 className="font-bold text-lg text-text-light dark:text-text-dark">Customer Feedback</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-amber-400 gap-1">{renderStars(5)}</div>
                        <span className="text-sm text-subtext-light dark:text-subtext-dark">Based on {reviews.length} reviews</span>
                    </div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">Write a Review</button>
            </div>
            {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                {review.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h5 className="font-bold text-sm text-text-light dark:text-text-dark">{review.author}</h5>
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        <span className="text-xs text-subtext-light dark:text-subtext-dark">{review.date}</span>
                    </div>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark leading-relaxed">{review.comment}</p>
                </div>
            ))}
        </div>
    );

    const DescriptionContent = () => (
        <div className="space-y-8 text-subtext-light dark:text-subtext-dark leading-relaxed">
            <p>{description}</p>

            <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/10">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Why Choose Organico?
                </h3>
                <ul className="space-y-3">
                    {["100% Organic & Non-GMO", "Sustainably farmed", "Hand-picked for quality", "Rich in Vitamins C, E, K, and B-6"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Origin</h3>
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="bg-white dark:bg-black/20 p-2.5 rounded-lg text-primary">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold text-text-light dark:text-text-dark text-base">{origin}</p>
                        <p className="text-sm mt-1">Sourced directly from certified organic family orchards.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-8">
            {/* Desktop Tabs Layout */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-800 mb-8">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-4 text-lg font-semibold border-b-2 transition-colors ${activeTab === "description"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-subtext-light dark:text-subtext-dark hover:text-primary"
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`pb-4 text-lg font-semibold border-b-2 transition-colors ${activeTab === "reviews"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-subtext-light dark:text-subtext-dark hover:text-primary"
                                }`}
                        >
                            Reviews ({reviews.length})
                        </button>
                    </div>

                    {activeTab === "description" ? <DescriptionContent /> : <ReviewsList />}
                </div>

                {/* Desktop Sidebar (Nutrition) */}
                <div className="space-y-6">
                    <NutritionContent />
                </div>
            </div>

            {/* Mobile Accordion Layout */}
            <div className="md:hidden flex flex-col gap-2">
                {/* Description Accordion */}
                <div className="border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => toggleSection("description")}
                        className="w-full flex items-center justify-between py-4 font-bold text-text-light dark:text-text-dark text-left"
                    >
                        <span>Description</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openSection.includes("description") ? "rotate-180" : ""}`} />
                    </button>
                    {openSection.includes("description") && (
                        <div className="pb-4 text-sm text-subtext-light dark:text-subtext-dark leading-relaxed">
                            {description}
                            <div className="mt-4 pt-4 border-t border-dashed border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold text-text-light dark:text-text-dark mb-2">Why Choose Organico?</h4>
                                <ul className="space-y-1">
                                    {["100% Organic & Non-GMO", "Sustainably farmed"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Origin Accordion */}
                <div className="border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => toggleSection("origin")}
                        className="w-full flex items-center justify-between py-4 font-bold text-text-light dark:text-text-dark text-left"
                    >
                        <span>Origin</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openSection.includes("origin") ? "rotate-180" : ""}`} />
                    </button>
                    {openSection.includes("origin") && (
                        <div className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-primary">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-text-light dark:text-text-dark">{origin}</p>
                                    <p className="text-[10px] text-subtext-light dark:text-subtext-dark">Sourced directly from farmers</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Nutrition Accordion */}
                <div className="border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => toggleSection("nutrition")}
                        className="w-full flex items-center justify-between py-4 font-bold text-text-light dark:text-text-dark text-left"
                    >
                        <span>Nutrition Info</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openSection.includes("nutrition") ? "rotate-180" : ""}`} />
                    </button>
                    {openSection.includes("nutrition") && (
                        <div className="pb-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b border-dashed border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="text-subtext-light dark:text-subtext-dark">Calories</span>
                                    <span className="font-bold text-text-light dark:text-text-dark">{nutrition.calories}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="text-subtext-light dark:text-subtext-dark">Total Fat</span>
                                    <span className="font-bold text-text-light dark:text-text-dark">{nutrition.fat}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="text-subtext-light dark:text-subtext-dark">Protein</span>
                                    <span className="font-bold text-text-light dark:text-text-dark">{nutrition.protein}</span>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <Leaf className="w-4 h-4 text-primary" />
                                <span className="text-xs text-subtext-light dark:text-subtext-dark">Values based on 100g serving</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews Accordion (Mobile Only) */}
                <div className="border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => toggleSection("reviews")}
                        className="w-full flex items-center justify-between py-4 font-bold text-text-light dark:text-text-dark text-left"
                    >
                        <span>Customer Reviews</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openSection.includes("reviews") ? "rotate-180" : ""}`} />
                    </button>
                    {openSection.includes("reviews") && (
                        <div className="pb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xs font-bold text-subtext-light dark:text-subtext-dark">Recent Feedback</h4>
                                <button className="text-primary text-xs font-bold">See All ({reviews.length})</button>
                            </div>
                            <div className="space-y-3">
                                {reviews.slice(0, 2).map((review) => (
                                    <div key={review.id} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                                                    {review.author.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-xs font-bold text-text-light dark:text-text-dark">{review.author}</span>
                                            </div>
                                            <span className="text-[10px] text-subtext-light dark:text-subtext-dark">{review.date}</span>
                                        </div>
                                        <div className="flex text-amber-400 gap-0.5 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                            ))}
                                        </div>
                                        <p className="text-xs text-subtext-light dark:text-subtext-dark font-medium">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
