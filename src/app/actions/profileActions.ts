"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfile() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // If no profile exists yet (should exist from signup/login), return basic user info
    // or return partial data to pre-fill the form
    return {
        id: user.id,
        email: user.email, // from auth.users
        full_name: profile?.full_name || '',
        ...profile
    };
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const full_name = formData.get("name") as string;
    // Email updates usually require re-verification or special handling in Supabase Auth.
    // For now, we will mostly focus on updating profile fields. 
    // If the user tries to update email, we might need `supabase.auth.updateUser`.

    const email = formData.get("email") as string;
    let updateEmailError = null;

    if (email && email !== user.email) {
        // Attempt to update auth email
        const { error } = await supabase.auth.updateUser({ email });
        if (error) {
            updateEmailError = error.message;
        }
    }

    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: full_name,
            updated_at: new Date().toISOString()
        });

    if (profileError) {
        return { error: profileError.message };
    }

    revalidatePath("/dashboard/profile");

    if (updateEmailError) {
        return { error: `Profile updated, but email update failed: ${updateEmailError}` };
    }

    return { success: true };
}
