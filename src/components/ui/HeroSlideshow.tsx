"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

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

    const validSlides = slides && slides.length > 0 ? slides : [];

    useEffect(() => {
        if (validSlides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % validSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [validSlides.length]);

    if (validSlides.length === 0) {
        return null;
    }

    const slide = validSlides[currentSlide];

    return (
        <div className="relative group w-full">

            {/* --- Mobile View --- */}
            {/* Keeping mobile simple but adding basic key animation for content refresh */}
            <div className="md:hidden pt-4 pb-2 px-4">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[220px]"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("${slide.image_url}")`,
                    }}
                >
                    <div className="relative z-10 p-5 text-white">
                        <motion.h2
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl font-bold mb-1"
                        >
                            {slide.title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm opacity-90 line-clamp-2"
                        >
                            {slide.subtitle}
                        </motion.p>
                        {slide.button_text && (
                            <div className="mt-3">
                                <Link href={slide.button_link || '/shop'}>
                                    <AnimatedButton size="sm" variant="secondary" className="bg-white text-primary border-none hover:bg-gray-100">
                                        {slide.button_text}
                                    </AnimatedButton>
                                </Link>
                            </div>
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
                </motion.div>
            </div>


            {/* --- Desktop View --- */}
            <div className="hidden md:flex justify-center w-full mx-auto max-w-[1600px] px-4 md:px-8 mt-4">
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden items-center justify-center text-center bg-gray-900">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={slide.image_url}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
                                <div className="overflow-hidden">
                                    <motion.h1
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="text-4xl md:text-6xl font-bold font-display leading-tight drop-shadow-md"
                                    >
                                        {slide.title}
                                    </motion.h1>
                                </div>
                                <motion.p
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mt-4 max-w-xl mx-auto text-lg text-gray-200 drop-shadow-sm"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                {slide.button_text && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="mt-8"
                                    >
                                        <Link href={slide.button_link || '/shop'}>
                                            <AnimatedButton size="lg" className="px-8 py-3 text-lg shadow-lg shadow-primary/30">
                                                {slide.button_text}
                                            </AnimatedButton>
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Desktop Navigation Arrows */}
                    {validSlides.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentSlide(prev => (prev - 1 + validSlides.length) % validSlides.length)}
                                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30 hover:scale-110 active:scale-95 shadow-lg"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                onClick={() => setCurrentSlide(prev => (prev + 1) % validSlides.length)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30 hover:scale-110 active:scale-95 shadow-lg"
                            >
                                <ChevronRight className="w-8 h-8" />
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
        </div>
    );
}
