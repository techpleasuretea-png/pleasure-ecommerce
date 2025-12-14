"use client";

import { ArrowLeft, Leaf, User, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-[max(884px,100dvh)] flex flex-col font-display overflow-hidden">
            <header className="flex-none bg-white dark:bg-surface-dark px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-20">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft className="text-text-light dark:text-text-dark w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark absolute left-1/2 transform -translate-x-1/2">
                    Organia
                </h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col justify-center">
                <div className="w-full max-w-sm mx-auto space-y-8">
                    <div className="text-center space-y-2 mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                            <Leaf className="w-10 h-10 text-primary" fill="currentColor" />
                        </div>
                        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">Welcome Back!</h2>
                        <p className="text-subtext-light dark:text-subtext-dark">Sign in to continue your healthy journey</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-text-light dark:text-text-dark" htmlFor="identity">
                                Email or Mobile Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                </div>
                                <input
                                    className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-4 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400 shadow-sm"
                                    id="identity"
                                    placeholder="example@mail.com or 017xxxxxxxx"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-text-light dark:text-text-dark" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                </div>
                                <input
                                    className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-12 py-4 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400 shadow-sm"
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
                                        <EyeOff className="text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors w-5 h-5" />
                                    ) : (
                                        <Eye className="text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link className="text-sm font-semibold text-primary hover:text-green-600 transition-colors" href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        <button className="w-full bg-primary hover:bg-green-600 transition-colors text-white rounded-full py-4 px-6 shadow-lg shadow-green-200/50 dark:shadow-none flex items-center justify-center gap-2 group active:scale-[0.98] transform duration-100 text-lg font-bold mt-4">
                            Login
                        </button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-subtext-light dark:text-subtext-dark">
                            Don't have an account?
                            <Link className="text-primary font-bold hover:underline ml-1" href="/create-account">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
