"use client";

import { motion, useInView, UseInViewOptions, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    mode?: "fade-up" | "fade-in" | "slide-in" | "scale-up" | "blur-in";
    delay?: number;
    duration?: number;
    viewport?: UseInViewOptions;
}

export function ScrollReveal({
    children,
    width = "fit-content",
    mode = "fade-up",
    delay = 0,
    duration = 0.5,
    className,
    viewport = { once: true, margin: "-10%" },
    ...props
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    const variants = {
        "fade-up": {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
        },
        "fade-in": {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        "slide-in": {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
        },
        "scale-up": {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
        },
        "blur-in": {
            hidden: { opacity: 0, filter: "blur(10px)" },
            visible: { opacity: 1, filter: "blur(0px)" },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[mode]}
            transition={{ duration, delay, ease: "easeOut" }}
            className={cn(width === "100%" ? "w-full" : "w-fit", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
