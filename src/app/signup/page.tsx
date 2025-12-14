"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-16">
                <div className="w-full max-w-[480px]">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-800">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold font-display mb-2 text-text-light dark:text-text-dark">Create Account</h1>
                            <p className="text-subtext-light dark:text-subtext-dark mt-2">Join us for a fresh start</p>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                    <input
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark" htmlFor="mobile">
                                    Mobile
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                    <input
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                        id="mobile"
                                        type="tel"
                                        placeholder="017 12 34 56 78"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                    <input
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark" htmlFor="confirm_password">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                    <input
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                        id="confirm_password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button className="w-full mt-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-base">
                                Create Account
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-subtext-light dark:text-subtext-dark">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
