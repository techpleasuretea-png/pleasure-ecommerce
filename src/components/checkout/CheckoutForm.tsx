import { MapPin, Truck, CreditCard, CheckCircle, Circle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { ShippingMethod } from "@/hooks/useShippingMethods";

interface CheckoutFormProps {
    shippingMethod: string;
    onShippingChange: (value: string) => void;
    shippingMethods: ShippingMethod[];
    subtotal: number;
    formData: {
        name: string;
        mobile: string;
        address: string;
    };
    onFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function CheckoutForm({ shippingMethod, onShippingChange, shippingMethods, subtotal, formData, onFormDataChange }: CheckoutFormProps) {

    return (
        <div className="space-y-8">
            {/* Delivery Information */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Truck className="text-primary w-6 h-6" />
                    Delivery Information
                </h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-2" htmlFor="name">Full Name</label>
                            <input
                                className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                id="name"
                                placeholder="John Doe"
                                type="text"
                                value={formData.name}
                                onChange={onFormDataChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-2" htmlFor="mobile">Mobile Number</label>
                            <input
                                className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                id="mobile"
                                placeholder="+880 1XXX XXXXXX"
                                type="tel"
                                value={formData.mobile}
                                onChange={onFormDataChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-2" htmlFor="address">Delivery Address</label>
                        <textarea
                            className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                            id="address"
                            placeholder="House no, Road no, Area, City"
                            rows={3}
                            value={formData.address}
                            onChange={onFormDataChange}
                        ></textarea>
                    </div>

                    {/* Shipping Method - Desktop Friendly Structure but Responsive */}
                    <div className="pt-4">
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-3">Shipping Method</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {shippingMethods.map((method) => {
                                const isFree = method.discount_threshold !== null && subtotal >= method.discount_threshold;
                                const displayCost = isFree ? 0 : method.cost;

                                return (
                                    <label
                                        key={method.id}
                                        className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-colors ${shippingMethod === method.id ? 'bg-white dark:bg-background-dark ring-2 ring-primary border-transparent' : 'bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                                    >
                                        <input
                                            className="sr-only"
                                            name="shipping-option"
                                            type="radio"
                                            value={method.id}
                                            checked={shippingMethod === method.id}
                                            onChange={(e) => onShippingChange(e.target.value)}
                                        />
                                        <span className="flex flex-1">
                                            <span className="flex flex-col">
                                                <span className="block text-sm font-medium text-text-light dark:text-text-dark">{method.name}</span>
                                                <span className="mt-1 flex items-center text-sm text-subtext-light dark:text-subtext-dark">
                                                    {/* We can clarify delivery times later if stored in DB, for now hardcode/omit or map id to time if needed */}
                                                    Standard Delivery
                                                </span>
                                                <div className="mt-2 sm:mt-6 text-sm font-medium text-text-light dark:text-text-dark flex items-center gap-2">
                                                    {isFree && <span className="text-subtext-light dark:text-subtext-dark line-through text-xs">৳{method.cost}</span>}
                                                    <span>{isFree ? "Free" : `৳${method.cost}`}</span>
                                                </div>
                                            </span>
                                        </span>
                                        {shippingMethod === method.id ? (
                                            <CheckCircle className="text-primary absolute top-4 right-4 w-5 h-5" />
                                        ) : (
                                            <Circle className="text-gray-300 dark:text-gray-600 absolute top-4 right-4 w-5 h-5" />
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </form>
            </div>

            {/* Payment Method */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="text-primary w-6 h-6" />
                    Payment Method
                </h2>
                <div className="space-y-4">
                    <label className="relative flex cursor-pointer rounded-lg border bg-white dark:bg-background-dark p-4 shadow-sm focus:outline-none ring-2 ring-primary border-transparent items-center justify-between">
                        <div className="flex items-center gap-4">
                            <input defaultChecked className="sr-only" name="payment-method" type="radio" value="cod" />
                            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary">
                                <Truck className="w-6 h-6" />
                            </div>
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-text-light dark:text-text-dark">Cash on Delivery (COD)</span>
                                <span className="mt-1 flex items-center text-sm text-subtext-light dark:text-subtext-dark">Pay with cash upon delivery.</span>
                            </span>
                        </div>
                        <CheckCircle className="text-primary w-6 h-6" />
                    </label>
                </div>
            </div>
        </div>
    );
}
