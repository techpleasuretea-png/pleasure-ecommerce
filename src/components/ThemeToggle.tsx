"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className={cn("w-9 h-9", className)} ></div>
    }

    return (
        <div className={cn("flex items-center gap-1 border border-border rounded-full p-1 bg-surface", className)} {...props}>
            <button
                onClick={() => setTheme("light")}
                className={cn(
                    "p-1.5 rounded-full transition-all hover:bg-muted text-muted-foreground",
                    theme === "light" && "bg-background text-foreground shadow-sm"
                )}
                aria-label="Light mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("system")}
                className={cn(
                    "p-1.5 rounded-full transition-all hover:bg-muted text-muted-foreground",
                    theme === "system" && "bg-background text-foreground shadow-sm"
                )}
                aria-label="System mode"
            >
                <Laptop className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={cn(
                    "p-1.5 rounded-full transition-all hover:bg-muted text-muted-foreground",
                    theme === "dark" && "bg-background text-foreground shadow-sm"
                )}
                aria-label="Dark mode"
            >
                <Moon className="h-4 w-4" />
            </button>
        </div>
    )
}
