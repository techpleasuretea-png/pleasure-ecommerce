import { MapPin, Truck, CreditCard, CheckCircle, Circle, Phone, Plus, Pencil, Trash2, Star } from "lucide-react";
import { useState } from "react";
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
    isLoggedIn?: boolean;
    addresses?: any[];
    phones?: any[];
    selectedAddressId?: string;
    selectedPhoneId?: string;
    onAddressSelect?: (id: string) => void;
    onPhoneSelect?: (id: string) => void;
    onAddressDelete?: (id: string, e: React.MouseEvent) => void;
    onPhoneDelete?: (id: string, e: React.MouseEvent) => void;
    onAddressUpdate?: (id: string, val: string) => void;
    onPhoneUpdate?: (id: string, val: string) => void;
    onAddressSetDefault?: (id: string, e: React.MouseEvent) => void;
    onPhoneSetDefault?: (id: string, e: React.MouseEvent) => void;
    onAddressAdd?: (val: string) => void;
    onPhoneAdd?: (val: string) => void;
}

export function CheckoutForm({
    shippingMethod,
    onShippingChange,
    shippingMethods,
    subtotal,
    formData,
    onFormDataChange,
    isLoggedIn,
    addresses = [],
    phones = [],
    selectedAddressId,
    selectedPhoneId,
    onAddressSelect,
    onPhoneSelect,
    onAddressDelete,
    onPhoneDelete,
    onAddressUpdate,
    onPhoneUpdate,
    onAddressSetDefault,
    onPhoneSetDefault,
    onAddressAdd,
    onPhoneAdd
}: CheckoutFormProps) {

    // Local state for editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    const startEditing = (id: string, currentValue: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingId(id);
        setEditValue(currentValue);
    };

    const cancelEditing = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingId(null);
        setEditValue("");
    };

    const saveEditing = (id: string, type: 'address' | 'phone', e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'address' && onAddressUpdate) onAddressUpdate(id, editValue);
        if (type === 'phone' && onPhoneUpdate) onPhoneUpdate(id, editValue);
        setEditingId(null);
    };

    const handleKeyDown = (id: string, type: 'address' | 'phone', e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveEditing(id, type, e as unknown as React.MouseEvent);
        }
    };

    return (
        <div className="space-y-8">
            {/* Delivery Information */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Truck className="text-primary w-6 h-6" />
                    Delivery Information
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Input - Always Manual */}
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

                        {/* Mobile - Selection or Input */}
                        <div>
                            <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-2" htmlFor="mobile">Mobile Number</label>
                            {isLoggedIn ? (
                                <div className="space-y-3">
                                    {phones.map((phone) => (
                                        <div key={phone.id} className={`flex items-center justify-between p-3 rounded-lg border ${selectedPhoneId === phone.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                                            <label className="flex items-center gap-3 cursor-pointer flex-1">
                                                <input
                                                    type="radio"
                                                    name="mobile_select"
                                                    className="text-primary focus:ring-primary"
                                                    checked={selectedPhoneId === phone.id}
                                                    onChange={() => onPhoneSelect?.(phone.id)}
                                                    disabled={editingId === phone.id}
                                                />
                                                {editingId === phone.id ? (
                                                    <input
                                                        type="text"
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(phone.id, 'phone', e)}
                                                        className="w-full text-sm p-1 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                                                        onClick={(e) => e.stopPropagation()}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span className="text-sm text-text-light dark:text-text-dark">
                                                        {phone.phone_number}
                                                        {phone.is_default && <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded">Default</span>}
                                                    </span>
                                                )}
                                            </label>
                                            <div className="flex items-center gap-1 ml-2">
                                                {editingId === phone.id ? (
                                                    <>
                                                        <button onClick={(e) => saveEditing(phone.id, 'phone', e)} className="text-green-600 hover:text-green-700 text-xs font-medium px-2 py-1">Save</button>
                                                        <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-600 text-xs font-medium px-2 py-1">Cancel</button>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        {!phone.is_default && (
                                                            <button
                                                                onClick={(e) => onPhoneSetDefault?.(phone.id, e)}
                                                                className="text-gray-400 hover:text-yellow-500 font-medium p-1 hover:bg-yellow-50 rounded-full transition-colors"
                                                                title="Make Default"
                                                            >
                                                                <Star className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button onClick={(e) => startEditing(phone.id, phone.phone_number, e)} className="text-blue-500 hover:text-blue-600 font-medium p-1 hover:bg-blue-50 rounded-full transition-colors" title="Edit">
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={(e) => onPhoneDelete?.(phone.id, e)} className="text-red-500 hover:text-red-600 font-medium p-1 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${selectedPhoneId === 'new' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                                        <input
                                            type="radio"
                                            name="mobile_select"
                                            className="text-primary focus:ring-primary"
                                            checked={selectedPhoneId === 'new'}
                                            onChange={() => onPhoneSelect?.('new')}
                                        />
                                        <span className="flex items-center gap-2 text-sm text-text-light dark:text-text-dark">
                                            <Plus className="w-4 h-4" /> Add New Mobile Number
                                        </span>
                                    </label>
                                    {selectedPhoneId === 'new' && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                className="flex-1 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                                id="mobile"
                                                placeholder="+880 1XXX XXXXXX"
                                                type="tel"
                                                value={formData.mobile}
                                                onChange={onFormDataChange}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        onPhoneAdd?.(formData.mobile);
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={(e) => { e.preventDefault(); onPhoneAdd?.(formData.mobile); }}
                                                className="bg-primary text-white p-3 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={(e) => { e.preventDefault(); onPhoneSelect?.(phones.length > 0 ? phones[0].id : ''); }}
                                                className="bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <input
                                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    id="mobile"
                                    placeholder="+880 1XXX XXXXXX"
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={onFormDataChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* Address - Selection or Input */}
                    <div>
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-2" htmlFor="address">Delivery Address</label>
                        {isLoggedIn ? (
                            <div className="space-y-3">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className={`flex items-center justify-between p-3 rounded-lg border ${selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                                        <label className="flex items-center gap-3 cursor-pointer flex-1 items-start">
                                            <input
                                                type="radio"
                                                name="address_select"
                                                className="text-primary focus:ring-primary mt-1"
                                                checked={selectedAddressId === addr.id}
                                                onChange={() => onAddressSelect?.(addr.id)}
                                                disabled={editingId === addr.id}
                                            />
                                            {editingId === addr.id ? (
                                                <textarea
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(addr.id, 'address', e)}
                                                    className="w-full text-sm p-2 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                                    rows={2}
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="text-sm text-text-light dark:text-text-dark flex-1">
                                                    {addr.address_line}
                                                    {addr.is_default && <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded">Default</span>}
                                                </span>
                                            )}
                                        </label>
                                        <div className="flex items-start gap-1 ml-2 mt-0.5">
                                            {editingId === addr.id ? (
                                                <>
                                                    <button onClick={(e) => saveEditing(addr.id, 'address', e)} className="text-green-600 hover:text-green-700 text-xs font-medium px-2 py-1">Save</button>
                                                    <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-600 text-xs font-medium px-2 py-1">Cancel</button>
                                                </>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    {!addr.is_default && (
                                                        <button
                                                            onClick={(e) => onAddressSetDefault?.(addr.id, e)}
                                                            className="text-gray-400 hover:text-yellow-500 font-medium p-1 hover:bg-yellow-50 rounded-full transition-colors"
                                                            title="Make Default"
                                                        >
                                                            <Star className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button onClick={(e) => startEditing(addr.id, addr.address_line, e)} className="text-blue-500 hover:text-blue-600 font-medium p-1 hover:bg-blue-50 rounded-full transition-colors" title="Edit">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={(e) => onAddressDelete?.(addr.id, e)} className="text-red-500 hover:text-red-600 font-medium p-1 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${selectedAddressId === 'new' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                                    <input
                                        type="radio"
                                        name="address_select"
                                        className="text-primary focus:ring-primary"
                                        checked={selectedAddressId === 'new'}
                                        onChange={() => onAddressSelect?.('new')}
                                    />
                                    <span className="flex items-center gap-2 text-sm text-text-light dark:text-text-dark">
                                        <Plus className="w-4 h-4" /> Add New Address
                                    </span>
                                </label>
                                {selectedAddressId === 'new' && (
                                    <div className=" space-y-2 mt-2">
                                        <textarea
                                            className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                            id="address"
                                            placeholder="House no, Road no, Area, City"
                                            rows={3}
                                            value={formData.address}
                                            onChange={onFormDataChange}
                                        ></textarea>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={(e) => { e.preventDefault(); onAddressSelect?.(addresses.length > 0 ? addresses[0].id : ''); }}
                                                className="bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={(e) => { e.preventDefault(); onAddressAdd?.(formData.address); }}
                                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <textarea
                                className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                id="address"
                                placeholder="House no, Road no, Area, City"
                                rows={3}
                                value={formData.address}
                                onChange={onFormDataChange}
                            ></textarea>
                        )}
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
                </div>
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
