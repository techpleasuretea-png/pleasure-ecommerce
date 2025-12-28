import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Pleasure - Daily Dose of Nature",
    description: "Daily Dose of Nature",
};

import { ThemeProvider } from "@/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} font-display antialiased bg-background text-foreground`}>
                <NextTopLoader
                    color="#20c533"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #20c533,0 0 5px #20c533"
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <WishlistProvider>
                            <CartProvider>
                                {children}
                            </CartProvider>
                        </WishlistProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

