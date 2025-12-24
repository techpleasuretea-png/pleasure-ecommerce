"use client";

import React, { useState } from "react";
import { MapPin, Phone, Plus, Edit2, Trash2, CheckCircle, Loader2 } from "lucide-react";
import {
    addAddress, updateAddress, deleteAddress, setDefaultAddress,
    addPhone, updatePhone, deletePhone, setDefaultPhone
} from "@/app/actions/deliveryActions";

// Types mapping to DB shape roughly, but adapted for UI
type DataItem = {
    id: string;
    value: string;
    isDefault: boolean;
};

// --- Reusable Info Section ---

const InfoSection = ({
    title,
    items,
    icon: Icon,
    onAdd,
    onEdit,
    onDelete,
    onSetDefault,
    isAdding,
    onCancel,
    onSave,
    editingId,
    placeholder,
    isLoading
}: {
    title: string;
    items: DataItem[];
    icon: any;
    onAdd: () => void;
    onEdit: (item: DataItem) => void;
    onDelete: (id: string) => void;
    onSetDefault: (id: string) => void;
    isAdding: boolean;
    onCancel: () => void;
    onSave: (value: string) => void;
    editingId: string | null;
    placeholder: string;
    isLoading: boolean;
}) => {
    const [inputValue, setInputValue] = useState("");

    React.useEffect(() => {
        if (editingId) {
            const item = items.find(i => i.id === editingId);
            if (item) setInputValue(item.value);
        } else {
            setInputValue("");
        }
    }, [editingId, items, isAdding]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(inputValue);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark">{title}</h3>
                {!isAdding && (
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add New
                    </button>
                )}
            </div>

            {isAdding ? (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-subtext-light dark:text-subtext-dark mb-1.5 uppercase tracking-wide">
                                {editingId ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}
                            </label>
                            <input
                                required
                                autoFocus
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                placeholder={placeholder}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isLoading}
                                className="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-subtext-light dark:text-subtext-dark rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border transition-all ${item.isDefault
                                ? 'border-primary ring-1 ring-primary/10'
                                : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.isDefault ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-subtext-light'
                                        }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        {item.isDefault && (
                                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary mb-1">
                                                DEFAULT
                                            </span>
                                        )}
                                        <p className="font-medium text-sm text-text-light dark:text-text-dark break-all">{item.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-1.5 text-subtext-light hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                        title="Edit"
                                        disabled={isLoading}
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-1.5 text-subtext-light hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete"
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {!item.isDefault && (
                                <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
                                    <button
                                        onClick={() => onSetDefault(item.id)}
                                        className="text-[11px] font-bold text-subtext-light hover:text-primary transition-colors flex items-center gap-1.5"
                                        disabled={isLoading}
                                    >
                                        <CheckCircle className="w-3 h-3" />
                                        Set as Default
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center py-6 px-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
                            <p className="text-xs text-subtext-light dark:text-subtext-dark">No items added yet</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Main Manager Component ---

export default function DeliveryDetailsManager({
    addresses: initialAddresses,
    phones: initialPhones
}: {
    addresses: any[],
    phones: any[]
}) {
    // Transform DB data to UI data
    const addresses: DataItem[] = initialAddresses.map(a => ({
        id: a.id,
        value: a.address_line,
        isDefault: a.is_default
    }));

    const phones: DataItem[] = initialPhones.map(p => ({
        id: p.id,
        value: p.phone_number,
        isDefault: p.is_default
    }));

    // UI States
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
    const [isAddingMobile, setIsAddingMobile] = useState(false);
    const [editingMobileId, setEditingMobileId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- Address Handlers ---
    const handleSaveAddress = async (value: string) => {
        setIsLoading(true);
        if (editingAddressId) {
            await updateAddress(editingAddressId, value);
        } else {
            await addAddress(value);
        }
        setIsLoading(false);
        setIsAddingAddress(false);
        setEditingAddressId(null);
    };

    const handleDeleteAddress = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        await deleteAddress(id);
        setIsLoading(false);
    };

    const handleSetDefaultAddress = async (id: string) => {
        setIsLoading(true);
        await setDefaultAddress(id);
        setIsLoading(false);
    };

    // --- Phone Handlers ---
    const handleSavePhone = async (value: string) => {
        setIsLoading(true);
        if (editingMobileId) {
            await updatePhone(editingMobileId, value);
        } else {
            await addPhone(value);
        }
        setIsLoading(false);
        setIsAddingMobile(false);
        setEditingMobileId(null);
    };

    const handleDeletePhone = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        await deletePhone(id);
        setIsLoading(false);
    };

    const handleSetDefaultPhone = async (id: string) => {
        setIsLoading(true);
        await setDefaultPhone(id);
        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Delivery Details</h2>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {/* InfoSection for Addresses */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <InfoSection
                        title="Saved Addresses"
                        items={addresses}
                        icon={MapPin}
                        isAdding={isAddingAddress}
                        editingId={editingAddressId}
                        placeholder="Enter full address"
                        isLoading={isLoading}
                        onAdd={() => { setIsAddingAddress(true); setEditingAddressId(null); }}
                        onEdit={(item) => { setIsAddingAddress(true); setEditingAddressId(item.id); }}
                        onDelete={handleDeleteAddress}
                        onSetDefault={handleSetDefaultAddress}
                        onCancel={() => { setIsAddingAddress(false); setEditingAddressId(null); }}
                        onSave={handleSaveAddress}
                    />
                </div>

                {/* InfoSection for Mobiles */}
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <InfoSection
                        title="Saved Mobile Numbers"
                        items={phones}
                        icon={Phone}
                        isAdding={isAddingMobile}
                        editingId={editingMobileId}
                        placeholder="Enter mobile number"
                        isLoading={isLoading}
                        onAdd={() => { setIsAddingMobile(true); setEditingMobileId(null); }}
                        onEdit={(item) => { setIsAddingMobile(true); setEditingMobileId(item.id); }}
                        onDelete={handleDeletePhone}
                        onSetDefault={handleSetDefaultPhone}
                        onCancel={() => { setIsAddingMobile(false); setEditingMobileId(null); }}
                        onSave={handleSavePhone}
                    />
                </div>
            </div>
        </div>
    );
}
