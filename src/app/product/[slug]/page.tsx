"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Menu, User, Star, Minus, Plus, ChevronDown, Globe, Leaf,
    Store, ShoppingBag, Search, ShoppingCart, ArrowLeft, Heart, Share2
} from "lucide-react";

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
    const [quantity, setQuantity] = useState(1);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
    const [isOriginOpen, setIsOriginOpen] = useState(false);
    const [isNutritionOpen, setIsNutritionOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);

    // Mock Data (In reality, fetch based on slug)
    const product = {
        name: "Organic Avocados",
        weight: "2 pcs",
        price: 280,
        originalPrice: 350,
        discount: "save ৳70",
        rating: 4.5,
        reviews: 86,
        description: "Hand-picked, creamy organic avocados grown in the rich soils of the Bandarban Hill Tracts. These avocados are rich in heart-healthy monounsaturated fats and are perfect for making guacamole, salads, or spreading on toast. Free from synthetic pesticides.",
        origin: "Bandarban, BD",
        nutrition: {
            calories: 160,
            fat: "15g",
            fiber: "7g",
            sugars: "0.7g",
            protein: "2g"
        },
        images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD2xPfqM2FnFiY6H-qglQ1zw01lEfz5cO_WGAv-lvWTk9JjyXTh7uR4a0VoUPm2hiAz0qecbfIj5ve_XCV_AeURBQMPZuuVJcUOBdfD9sf1Q0XkiGVuhPePg647icHlbtFYusbcfOw1LugLO3EnQuOOHM__P1bcSqTTE2y-RoX7XJ6NalvHrmM73s2LSqjY1YQPJtvLOOxIn_dfkIaIklUpStG7KaWiOHcAgfBJLvZFFnT0x5PIAFyL6jp54tXZDU-RwlOh6u2JOzUk"]
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display pb-24 md:pb-0">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-20 bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 flex items-center justify-between p-4">
                <button className="p-2"><Menu className="w-6 h-6" /></button>
                <h1 className="text-lg font-bold">Organico</h1>
                <button className="p-2"><User className="w-6 h-6" /></button>
            </header>

            <main className="flex-1 mx-auto max-w-screen-xl w-full p-4 md:p-8">

                {/* Breadcrumb (Desktop) */}
                <div className="hidden md:flex items-center gap-2 text-sm text-subtext-light dark:text-subtext-dark mb-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-primary">Shop</Link>
                    <span>/</span>
                    <Link href="/fruits" className="hover:text-primary">Fruits</Link>
                    <span>/</span>
                    <span className="text-text-light dark:text-text-white font-semibold">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Section */}
                    <div>
                        <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                20% Off
                            </div>
                        </div>
                        {/* Thumbnails (Desktop) */}
                        <div className="hidden md:flex gap-4 mt-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors bg-gray-50">
                                    <img src={product.images[0]} alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight">{product.name} <span className="text-lg md:text-2xl font-medium text-subtext-light">{product.weight}</span></h1>

                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
                                ))}
                            </div>
                            <span className="text-sm font-bold">{product.rating}</span>
                            <span className="text-sm text-subtext-light dark:text-subtext-dark">({product.reviews} reviews)</span>
                        </div>

                        <div className="mt-6 flex items-baseline gap-3">
                            <p className="text-3xl md:text-4xl font-extrabold text-primary">৳{product.price}</p>
                            <p className="text-lg md:text-xl text-subtext-light dark:text-subtext-dark line-through font-medium">৳{product.originalPrice}</p>
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase">{product.discount}</span>
                        </div>

                        {/* Actions (Desktop) */}
                        <div className="hidden md:block mt-8 border-t border-b border-gray-100 dark:border-gray-800 py-6">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 border border-gray-200 dark:border-gray-700">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 hover:text-primary shadow-sm transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-lg font-bold w-6 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white hover:bg-primary/90 shadow-sm transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                                    Add to Cart
                                </button>
                                <button className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-colors">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Details Accordions */}
                        <div className="mt-8 space-y-2">
                            <div className="border-b border-gray-100 dark:border-gray-800">
                                <button onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} className="flex w-full items-center justify-between py-4 font-bold text-lg">
                                    Description
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isDescriptionOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isDescriptionOpen && (
                                    <div className="pb-4 text-subtext-light dark:text-subtext-dark text-sm leading-relaxed">
                                        {product.description}
                                    </div>
                                )}
                            </div>
                            <div className="border-b border-gray-100 dark:border-gray-800">
                                <button onClick={() => setIsOriginOpen(!isOriginOpen)} className="flex w-full items-center justify-between py-4 font-bold text-lg">
                                    Origin
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isOriginOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isOriginOpen && (
                                    <div className="pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-primary">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{product.origin}</p>
                                                <p className="text-xs text-subtext-light">Sourced directly from farmers</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="border-b border-gray-100 dark:border-gray-800">
                                <button onClick={() => setIsNutritionOpen(!isNutritionOpen)} className="flex w-full items-center justify-between py-4 font-bold text-lg">
                                    Nutrition Info
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isNutritionOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isNutritionOpen && (
                                    <div className="pb-4 space-y-2">
                                        {Object.entries(product.nutrition).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 dark:border-gray-700 pb-2 last:border-0 lowercase">
                                                <span className="text-subtext-light capitalize">{key}</span>
                                                <span className="font-bold">{value}</span>
                                            </div>
                                        ))}
                                        <div className="mt-3 flex items-center gap-2">
                                            <Leaf className="w-5 h-5 text-primary" />
                                            <span className="text-xs text-subtext-light">Values based on 100g serving</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Actions (Inline) - Quantity Only */}
                        <div className="md:hidden mt-6 flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-base font-bold">Quantity</span>
                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 border border-gray-100 dark:border-gray-700">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow-sm hover:text-primary">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-base font-bold w-4 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white shadow-sm hover:bg-primary/90">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Add to Cart Buttons */}
                        <div className="md:hidden mt-6 grid grid-cols-2 gap-3">
                            <button className="h-12 rounded-xl border-2 border-primary bg-transparent text-primary text-base font-bold flex items-center justify-center hover:bg-primary/5">
                                Add to Cart
                            </button>
                            <button className="h-12 rounded-xl bg-primary text-white text-base font-bold flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* You May Also Like */}
                <div className="mt-16 mb-4 border-t border-gray-100 dark:border-gray-800 pt-8">
                    <h3 className="text-xl font-bold mb-6">You May Also Like</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:grid md:grid-cols-4 md:overflow-visible md:mx-0 md:px-0">
                        {/* Mock Related Products */}
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="min-w-[160px] w-[160px] md:w-auto bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 md:border-transparent md:hover:shadow-lg transition-all group">
                                <div className="relative h-32 md:h-48 bg-white dark:bg-gray-700">
                                    <img src={product.images[0]} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">25% Off</div>
                                </div>
                                <div className="p-3 flex flex-col">
                                    <h4 className="text-sm md:text-base font-bold truncate">Organic Product</h4>
                                    <span className="text-xs text-subtext-light mt-0.5">1 kg</span>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <p className="text-base font-extrabold text-primary">৳60</p>
                                        <p className="text-xs text-subtext-light line-through">৳80</p>
                                    </div>
                                    <button className="mt-3 w-full h-8 rounded-lg bg-primary text-white text-xs md:text-sm font-bold shadow-sm hover:bg-primary/90 flex items-center justify-center">
                                        Buy
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Desktop Footer */}
            <div className="hidden md:block">
                <Footer />
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
                <div className="mx-auto flex h-20 items-center justify-around px-4 pb-2">
                    <Link href="/shop" className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary">
                        <Store className="w-6 h-6" />
                        <span className="text-xs font-medium">Shop</span>
                    </Link>
                    <Link href="/cart" className="flex h-14 w-[60%] items-center justify-center gap-3 rounded-full bg-primary px-6 text-white shadow-lg shadow-primary/30 transform -translate-y-2">
                        <div className="relative">
                            <ShoppingBag className="w-6 h-6" />
                            <div className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">3</div>
                        </div>
                        <div className="text-lg font-bold">৳1018</div>
                    </Link>
                    <div className="flex flex-col items-center gap-1 text-gray-500">
                        <Search className="w-6 h-6" />
                        <span className="text-xs font-medium">Search</span>
                    </div>
                </div>
            </nav>
        </div>
    );
}
