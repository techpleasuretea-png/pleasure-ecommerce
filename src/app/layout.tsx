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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} font-display antialiased`}>
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

