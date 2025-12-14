import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                <Image
                    src={images[selectedImage]}
                    alt="Product Image"
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    20% Off
                </div>
            </div>
            {/* Thumbnails (Desktop) */}
            <div className="hidden md:flex gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? "border-primary" : "border-transparent hover:border-gray-200"
                            }`}
                    >
                        <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>
            {/* Mobile Dots (if needed for slider, though simple scroll or single image is okay for now) */}
        </div>
    );
}
