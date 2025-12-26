"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming cn is in lib/utils, if not I will use clsx/tailwind-merge directly or check utils location

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    children?: ReactNode;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
    (
        {
            className,
            children,
            isLoading,
            disabled,
            variant = "primary",
            size = "md",
            onClick,
            whileTap,
            whileHover,
            ...props
        },
        ref
    ) => {
        const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

        const variants = {
            primary: "bg-primary text-white hover:bg-green-600 shadow-md shadow-primary/20",
            secondary: "bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-800",
            outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
            ghost: "bg-transparent text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-4 py-2.5 text-sm",
            lg: "px-6 py-3 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={!isLoading && !disabled ? (whileTap || { scale: 0.95 }) : undefined}
                whileHover={!isLoading && !disabled ? (whileHover || { scale: 1.02, filter: "brightness(1.05)" }) : undefined}
                disabled={isLoading || disabled}
                onClick={onClick}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {children}
            </motion.button>
        );
    }
);

AnimatedButton.displayName = "AnimatedButton";
