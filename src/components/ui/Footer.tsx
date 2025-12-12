import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight, Send } from "lucide-react";
import Image from "next/image";
import { MobileBottomNav } from "../mobile/MobileBottomNav";

export function Footer() {
    return (
        <>
            <div className="md:hidden">
                <MobileBottomNav />
            </div>

            <footer className="hidden md:block bg-surface-light dark:bg-surface-dark pt-16 pb-8 border-t border-gray-100 dark:border-gray-800">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Brand Column */}
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Image src="/icon.svg" alt="Organico Logo" width={32} height={32} className="w-8 h-8" />
                                <span className="text-2xl font-bold font-display">Organico</span>
                            </div>
                            <p className="text-sm text-subtext-light dark:text-subtext-dark mb-6 leading-relaxed">
                                Freshness you can taste. Values you can trust. We bring nature's best directly to your kitchen.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-subtext-light hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-subtext-light hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-subtext-light hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>

                        {/* Shop Column */}
                        <div>
                            <h4 className="font-semibold mb-6 text-lg">Shop</h4>
                            <ul className="space-y-3 text-sm text-subtext-light dark:text-subtext-dark">
                                <li><Link href="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                                <li><Link href="/offers" className="hover:text-primary transition-colors">Offers</Link></li>
                                <li><Link href="/best-sellers" className="hover:text-primary transition-colors">Best Sellers</Link></li>
                                <li><Link href="/flash-sale" className="hover:text-primary transition-colors">Flash Sale</Link></li>
                            </ul>
                        </div>

                        {/* Categories Column */}
                        <div>
                            <h4 className="font-semibold mb-6 text-lg">Categories</h4>
                            <ul className="space-y-3 text-sm text-subtext-light dark:text-subtext-dark">
                                <li><Link href="/category/fruits" className="hover:text-primary transition-colors">Fruits</Link></li>
                                <li><Link href="/category/vegetables" className="hover:text-primary transition-colors">Vegetables</Link></li>
                                <li><Link href="/category/dairy" className="hover:text-primary transition-colors">Dairy</Link></li>
                                <li><Link href="/category/bakery" className="hover:text-primary transition-colors">Bakery</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter Column */}
                        <div>
                            <h4 className="font-semibold mb-6 text-lg">Get Fresh Updates</h4>
                            <p className="text-sm text-subtext-light dark:text-subtext-dark mb-4">
                                Sign up for our newsletter to get the latest on new products and sales.
                            </p>
                            <div className="flex">
                                <input
                                    className="w-full text-sm rounded-l-lg border-y border-l border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <button className="bg-primary text-white font-semibold py-2.5 px-4 rounded-r-lg text-sm hover:bg-green-600 transition-colors flex items-center justify-center">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-subtext-light dark:text-subtext-dark flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© 2025 Pleasure. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
