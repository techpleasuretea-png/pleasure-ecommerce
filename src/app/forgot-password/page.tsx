"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-16">
                <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-display mb-2">Forgot Password</h1>
                        <p className="text-subtext-light dark:text-subtext-dark text-sm">
                            Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-subtext-light dark:text-subtext-dark" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark w-5 h-5" />
                                <input
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    id="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-primary/30 text-base">
                            Send Reset Link
                        </button>

                        <div className="text-center mt-8 text-sm text-subtext-light dark:text-subtext-dark">
                            <Link href="/login" className="text-subtext-light dark:text-subtext-dark hover:text-primary flex items-center justify-center gap-2 font-medium transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
