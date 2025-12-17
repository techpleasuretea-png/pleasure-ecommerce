"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../actions/authActions";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

            <main className="flex-1 overflow-y-auto no-scrollbar p-6">
                <div className="max-w-md mx-auto h-full flex flex-col">
                    <div className="mt-4 mb-8">
                        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Create Account</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark mt-2">
                            Enter your details to sign up for a new account
                        </p>
                    </div>


                    <form className="space-y-5" action={async (formData) => {
                        const res = await signup(formData);
                        if (res?.error) {
                            alert(res.error);
                        }
                    }}>
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1.5" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                                id="email"
                                name="email"
                                placeholder="example@email.com"
                                type="email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1.5" htmlFor="mobile">
                                Mobile Number
                            </label>
                            <input
                                className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                                id="mobile"
                                name="mobile"
                                placeholder="017xxxxxxxx"
                                type="tel"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1.5" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400 pr-10"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1.5" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400 pr-10"
                                    id="confirm-password"
                                    name="confirm-password"
                                    placeholder="••••••••"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                className="w-full bg-primary hover:bg-primary-dark transition-colors text-white rounded-full py-4 px-6 shadow-lg shadow-green-200/50 dark:shadow-none flex items-center justify-center gap-2 group active:scale-[0.98] transform duration-100"
                                type="submit"
                            >
                                <span className="font-bold text-lg">Create Account</span>
                            </button>
                        </div>
                    </form>

                    <div className="mt-auto py-8 text-center">
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            Already have an account?
                            <Link href="/login" className="text-primary font-bold hover:text-primary-dark transition-colors ml-1">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
