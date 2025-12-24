"use client";

import { useState } from "react";
import { User, Mail, Edit2, Check, X, Loader2 } from "lucide-react";
import { updateProfile } from "@/app/actions/profileActions";

interface ProfileFormProps {
    user: {
        name: string;
        email: string;
    } | null;
}

export default function ProfileForm({ user: initialUser }: ProfileFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: initialUser?.name || "",
        email: initialUser?.email || ""
    });
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Backup state for cancel
    const [editForm, setEditForm] = useState(user);

    const handleStartEdit = () => {
        setEditForm(user);
        setIsEditing(true);
        setMsg(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm(user);
        setMsg(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMsg(null);

        const formData = new FormData();
        formData.append("name", editForm.name);
        formData.append("email", editForm.email);

        const result = await updateProfile(formData);

        setIsLoading(false);

        if (result?.error) {
            setMsg({ type: 'error', text: result.error });
        } else {
            setUser(editForm);
            setIsEditing(false);
            setMsg({ type: 'success', text: "Profile updated successfully" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Profile</h2>
                {!isEditing && (
                    <button
                        onClick={handleStartEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-subtext-light dark:text-subtext-dark rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                )}
            </div>

            {msg && (
                <div className={`p-4 rounded-xl text-sm font-medium ${msg.type === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                    {msg.text}
                </div>
            )}

            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-subtext-light dark:text-subtext-dark mb-1">Full Name</p>
                            {isEditing ? (
                                <input
                                    required
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 -ml-3 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-text-light dark:text-text-dark"
                                />
                            ) : (
                                <p className="font-bold text-text-light dark:text-text-dark">{user.name || "Not set"}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-subtext-light dark:text-subtext-dark mb-1">Email Address</p>
                            {isEditing ? (
                                <input
                                    required
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-2 -ml-3 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-text-light dark:text-text-dark"
                                />
                            ) : (
                                <p className="font-bold text-text-light dark:text-text-dark">{user.email}</p>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex items-center gap-3 pt-2 justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-subtext-light dark:text-subtext-dark rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Check className="w-4 h-4" />
                                )}
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
