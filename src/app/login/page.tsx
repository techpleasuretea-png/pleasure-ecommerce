"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-16">
                <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-display mb-2">Welcome Back</h1>
                        <p className="text-subtext-light dark:text-subtext-dark text-sm">
                            Login to access your account and organic favorites.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-subtext-light dark:text-subtext-dark" htmlFor="email">
                                Email or Mobile Number
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                <input
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    id="email"
                                    type="text"
                                    placeholder="example@mail.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-subtext-light dark:text-subtext-dark" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                <input
                                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <input
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                    id="remember"
                                    type="checkbox"
                                />
                                <label className="text-subtext-light dark:text-subtext-dark cursor-pointer select-none" htmlFor="remember">
                                    Remember me
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-primary font-medium hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30 text-base">
                            Login
                        </button>

                        <p className="text-center mt-8 text-sm text-subtext-light dark:text-subtext-dark">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-primary font-bold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
