"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PlayCircle, ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
    images: string[];
    discount?: string;
}

export function ProductImageGallery({ images, discount }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full">
            {/* Main Image Container */}
            <div className="relative aspect-square bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden mb-4 group">
                <Image
                    src={images[selectedImage]}
                    alt="Product Image"
                    fill
                    className="object-cover"
                />

                {discount && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                        {discount}
                    </span>
                )}

                <button className="absolute right-4 top-4 p-2 bg-white/80 dark:bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ZoomIn className="w-5 h-5 text-text-light dark:text-text-dark" />
                </button>

                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition shadow-sm z-10"
                >
                    <ChevronLeft className="w-6 h-6 text-text-light dark:text-text-dark" />
                </button>

                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition shadow-sm z-10"
                >
                    <ChevronRight className="w-6 h-6 text-text-light dark:text-text-dark" />
                </button>
            </div>

            {/* Thumbnails (Desktop mainly, but responsive) */}
            <div className="hidden md:grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 relative ${selectedImage === idx ? "border-primary" : "border-transparent"
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className={`object-cover ${selectedImage === idx ? "" : "opacity-70"}`}
                        />
                    </button>
                ))}
                {/* Placeholder for video or extra image if needed */}
                <button className="aspect-square rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden bg-surface-light dark:bg-surface-dark flex items-center justify-center text-subtext-light">
                    <PlayCircle className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}
