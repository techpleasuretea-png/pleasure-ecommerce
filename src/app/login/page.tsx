"use client";

import { ArrowLeft, Leaf, User, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden flex-none bg-white dark:bg-surface-dark px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-20">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft className="text-text-light dark:text-text-dark w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark absolute left-1/2 transform -translate-x-1/2">
                    Organico
                </h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex items-center justify-center p-6 md:px-8 md:py-16">
                <div className="w-full max-w-sm md:max-w-md mx-auto md:bg-white md:dark:bg-surface-dark md:p-8 md:rounded-2xl md:shadow-xl md:border md:border-gray-100 md:dark:border-gray-800 transition-all">
                    <div className="text-center space-y-2 mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                            <Leaf className="w-10 h-10 text-primary" fill="currentColor" />
                        </div>
                        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">Welcome Back</h2>
                        <p className="text-subtext-light dark:text-subtext-dark">Login to access your account and organic favorites.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark" htmlFor="identity">
                                Email or Mobile Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                </div>
                                <input
                                    className="w-full bg-surface-light dark:bg-surface-dark/50 md:dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                                    id="identity"
                                    placeholder="example@mail.com"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                </div>
                                <input
                                    className="w-full bg-surface-light dark:bg-surface-dark/50 md:dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-12 py-3.5 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                                    id="password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark transition-colors w-5 h-5" />
                                    ) : (
                                        <Eye className="text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark transition-colors w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <input id="remember" type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" />
                                <label htmlFor="remember" className="text-subtext-light dark:text-subtext-dark cursor-pointer select-none">Remember me</label>
                            </div>
                            <Link className="font-medium text-primary hover:text-green-600 transition-colors" href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        <button className="w-full bg-primary hover:bg-green-600 transition-colors text-white rounded-xl py-3.5 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-base font-bold">
                            Login
                        </button>

                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            <span className="flex-shrink-0 mx-4 text-subtext-light dark:text-subtext-dark text-xs uppercase">Or</span>
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="w-full bg-transparent border border-gray-200 dark:border-gray-700 text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl py-3.5 flex items-center justify-center gap-2 text-base font-semibold transition-all"
                        >
                            Continue as Guest
                        </button>
                    </form>

                    <div className="pt-6 text-center">
                        <p className="text-sm text-subtext-light dark:text-subtext-dark">
                            Don't have an account?
                            <Link className="text-primary font-bold hover:underline ml-1" href="/create-account">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
