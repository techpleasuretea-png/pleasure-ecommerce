"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MoveRight, MoveLeft } from "lucide-react";

export interface Slide {
    id: string;
    image_url: string;
    title: string;
    subtitle: string;
    button_text: string;
    button_link: string;
    order_index: number;
}

interface HeroSlideshowProps {
    slides: Slide[];
}

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Filter out dummy or invalid slides if necessary
    const validSlides = slides && slides.length > 0 ? slides : [];

    useEffect(() => {
        if (validSlides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % validSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [validSlides.length]);

    if (validSlides.length === 0) {
        // Fallback or empty state
        return null;
    }

    const slide = validSlides[currentSlide];

    return (
        <div className="relative group w-full">

            {/* --- Mobile View (container query style from original MobileHero) --- */}
            <div className="md:hidden pt-4 pb-2 px-4">
                <div
                    className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[220px] transition-all duration-500 ease-in-out"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("${slide.image_url}")`,
                    }}
                >
                    <div className="relative z-10 p-5 text-white">
                        <h2 className="text-xl font-bold mb-1">{slide.title}</h2>
                        <p className="text-sm opacity-90 line-clamp-2">{slide.subtitle}</p>
                        {slide.button_text && (
                            <Link
                                href={slide.button_link || '/shop'}
                                className="mt-3 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary active:scale-95 transition-transform"
                            >
                                {slide.button_text}
                            </Link>
                        )}
                    </div>

                    {/* Dots Mobile */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                        {validSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`size-1.5 rounded-full transition-all ${currentSlide === idx ? "bg-white w-4" : "bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {/* --- Desktop View --- */}
            <div className="hidden md:flex relative mt-4 h-[500px] w-full rounded-2xl overflow-hidden items-center justify-center text-center mx-auto md:mx-8 max-w-[1400px]">
                {validSlides.map((s, index) => (
                    <div
                        key={s.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        {/* Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={s.image_url}
                                alt={s.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
                            <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight drop-shadow-md">
                                {s.title}
                            </h1>
                            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-200 drop-shadow-sm">
                                {s.subtitle}
                            </p>

                            {s.button_text && (
                                <Link
                                    href={s.button_link || '/shop'}
                                    className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
                                >
                                    {s.button_text}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}

                {/* Desktop Navigation Arrows */}
                {validSlides.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentSlide(prev => (prev - 1 + validSlides.length) % validSlides.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
                        >
                            <MoveLeft size={32} />
                        </button>
                        <button
                            onClick={() => setCurrentSlide(prev => (prev + 1) % validSlides.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
                        >
                            <MoveRight size={32} />
                        </button>

                        {/* Desktop Dots */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30">
                            {validSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
