"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <div className="bg-surface-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Desktop Header */}
            <div className="hidden md:block">
                <Header />
            </div>

            {/* Mobile Header */}
            <header className="md:hidden flex-none bg-white dark:bg-surface-dark px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 z-20 sticky top-0">
                <Link href="/login" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ArrowLeft className="text-text-light dark:text-text-dark w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark absolute left-1/2 transform -translate-x-1/2">Organia</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow flex items-center justify-center p-6 md:px-8 md:py-16">
                <div className="w-full max-w-sm mx-auto md:max-w-md md:bg-white md:dark:bg-surface-dark md:p-8 md:rounded-2xl md:shadow-xl md:border md:border-gray-100 md:dark:border-gray-800">

                    <div className="text-center space-y-2 mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                            <span className="material-symbols-outlined text-4xl text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">Forgot Password</h2>
                        <p className="text-subtext-light dark:text-subtext-dark">
                            Enter your email address to receive a password reset link
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-text-light dark:text-text-dark" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                </div>
                                <input
                                    className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-4 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary transition-all placeholder-gray-400 shadow-sm"
                                    id="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-primary hover:bg-green-600 transition-colors text-white rounded-full py-4 px-6 shadow-lg shadow-green-200/50 dark:shadow-none flex items-center justify-center gap-2 group active:scale-[0.98] transform duration-100 text-lg font-bold mt-8">
                            Send Reset Link
                        </button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-subtext-light dark:text-subtext-dark">
                            Remember your password?
                            <Link href="/login" className="text-primary font-bold hover:underline ml-1">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Desktop Footer */}
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
