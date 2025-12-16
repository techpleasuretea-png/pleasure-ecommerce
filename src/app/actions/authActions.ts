"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const phone = formData.get("mobile") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const supabase = await createClient();

    // Determine if it's email or phone signup
    // Note: Supabase implementation usually treats 'email' as the primary identity for `signUp`.
    // If using phone auth, we usually use `signInWithOtp` or need a specific phone auth flow.
    // However, the user request says "user will create account through either email or phone number"
    // AND "no verification... will require".
    // 
    // Standard Supabase `signUp` takes { email, password, phone, ... }.
    // If we provide both, it usually sends a confirmation to one.
    // Since we disabled verification, we can try to just use one as the primary identifier.

    // Strategy:
    // If email is provided, use email + password.
    // If phone is provided (and no email), use phone + password (requires Supabase Phone Auth enabled with "Confirm Phone" disabled).

    let authResponse;
    const isEmailSignup = !!email;
    const isPhoneSignup = !!phone && !email;

    if (isEmailSignup) {
        authResponse = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    // Start empty, we'll fill profiles table manually or via trigger if cleaner
                    // adhering to request "after authentication the data will pass to the profiles table"
                }
            }
        });
    } else if (isPhoneSignup) {
        authResponse = await supabase.auth.signUp({
            phone,
            password,
            options: {
                data: {}
            }
        });
    } else {
        return { error: "Please provide an email or phone number" };
    }

    if (authResponse.error) {
        return { error: authResponse.error.message };
    }

    const user = authResponse.data.user;
    if (!user) {
        // Should not happen if auto-confirm is on and error is null
        // If email confirm is on, user might be null or session null.
        // Assuming "No verification required" means we get a session immediately.
        return { error: "Signup successful but login failed. Please try logging in." };
    }

    // Insert into profiles
    const { error: profileError } = await supabase
        .from('profiles')
        .insert({
            id: user.id,
            email: email || null,
            full_name: null // or extract from form if added later
        });

    if (profileError) {
        console.error("Profile creation error:", profileError);
        // Continue anyway, or return error? Typically we want to finish auth.
    }

    // Insert into user_phones if phone provided
    if (phone) {
        const { error: phoneError } = await supabase
            .from('user_phones')
            .insert({
                user_id: user.id,
                phone_number: phone
            });

        if (phoneError) {
            console.error("User Phone creation error:", phoneError);
        }
    }

    redirect("/");
}

export async function login(formData: FormData) {
    const identity = formData.get("identity") as string; // Email or Phone
    const password = formData.get("password") as string;

    const supabase = await createClient();

    // Heuristic to check if identity is email or phone
    const isEmail = identity.includes("@");

    let error;

    if (isEmail) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: identity,
            password
        });
        error = signInError;
    } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
            phone: identity,
            password
        });
        error = signInError;
    }

    if (error) {
        return { error: error.message };
    }

    redirect("/");
}
