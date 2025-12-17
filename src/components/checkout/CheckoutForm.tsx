import { MapPin, Truck, CreditCard, CheckCircle, Circle, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface CheckoutFormProps {
    shippingMethod: string;
    onShippingChange: (value: string) => void;
}

export function CheckoutForm({ shippingMethod, onShippingChange }: CheckoutFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: ""
    });

    useEffect(() => {
        const loadUserData = async () => {
            const { createClient } = await import("@/lib/supabase/client");
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Fetch profile
                const { data: profile } = await supabase.from('profiles').select('full_name, mobile_number').eq('id', user.id).single();
                if (profile) {
                    setFormData(prev => ({
                        ...prev,
                        name: profile.full_name || "",
                        // If mobile number was stored in profile, use it. Codebase uses 'user_phones' table separately? 
                        // Let's just stick to profile.full_name for now as mobile might be complex.
                    }));
                }

                // Fetch mobile if available (optional enhancement)
                const { data: phoneData } = await supabase.from('user_phones').select('phone_number').eq('user_id', user.id).single();
                if (phoneData) {
                    setFormData(prev => ({ ...prev, mobile: phoneData.phone_number }));
                }
            }
        };
        loadUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Shipping Method - Desktop Friendly Structure but Responsive */}
                    <div className="pt-4">
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-3">Shipping Method</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-colors ${shippingMethod === 'inside-dhaka' ? 'bg-white dark:bg-background-dark ring-2 ring-primary border-transparent' : 'bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                                <input
                                    className="sr-only"
                                    name="shipping-option"
                                    type="radio"
                                    value="inside-dhaka"
                                    checked={shippingMethod === 'inside-dhaka'}
                                    onChange={(e) => onShippingChange(e.target.value)}
                                />
                                <span className="flex flex-1">
                                    <span className="flex flex-col">
                                        <span className="block text-sm font-medium text-text-light dark:text-text-dark">Inside Dhaka</span>
                                        <span className="mt-1 flex items-center text-sm text-subtext-light dark:text-subtext-dark">2-3 Days Delivery</span>
                                        <span className="mt-2 sm:mt-6 text-sm font-medium text-text-light dark:text-text-dark">৳60</span>
                                    </span>
                                </span>
                                {shippingMethod === 'inside-dhaka' ? (
                                    <CheckCircle className="text-primary absolute top-4 right-4 w-5 h-5" />
                                ) : (
                                    <Circle className="text-gray-300 dark:text-gray-600 absolute top-4 right-4 w-5 h-5" />
                                )}
                            </label>
                            <label className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-colors ${shippingMethod === 'outside-dhaka' ? 'bg-white dark:bg-background-dark ring-2 ring-primary border-transparent' : 'bg-white dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}>
                                <input
                                    className="sr-only"
                                    name="shipping-option"
                                    type="radio"
                                    value="outside-dhaka"
                                    checked={shippingMethod === 'outside-dhaka'}
                                    onChange={(e) => onShippingChange(e.target.value)}
                                />
                                <span className="flex flex-1">
                                    <span className="flex flex-col">
                                        <span className="block text-sm font-medium text-text-light dark:text-text-dark">Outside Dhaka</span>
                                        <span className="mt-1 flex items-center text-sm text-subtext-light dark:text-subtext-dark">3-5 Days Delivery</span>
                                        <span className="mt-2 sm:mt-6 text-sm font-medium text-text-light dark:text-text-dark">৳120</span>
                                    </span>
                                </span>
                                {shippingMethod === 'outside-dhaka' ? (
                                    <CheckCircle className="text-primary absolute top-4 right-4 w-5 h-5" />
                                ) : (
                                    <Circle className="text-gray-300 dark:text-gray-600 absolute top-4 right-4 w-5 h-5" />
                                )}
                            </label>
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
