"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// --- Fetch Data ---

export async function getDeliveryDetails() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { addresses: [], phones: [] };

    const { data: addresses } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

    const { data: phones } = await supabase
        .from('user_phones')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

    return {
        addresses: addresses || [],
        phones: phones || []
    };
}

// --- Address Actions ---

export async function addAddress(address: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    // Check if it's the first address, if so make it default
    const { count } = await supabase
        .from('user_addresses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

    const isDefault = count === 0;

    const { error } = await supabase
        .from('user_addresses')
        .insert({
            user_id: user.id,
            address_line: address,
            is_default: isDefault
        });

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

export async function updateAddress(id: string, address: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from('user_addresses')
        .update({ address_line: address })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

export async function deleteAddress(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from('user_addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

export async function setDefaultAddress(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    // Batch update: unset all, then set one
    // Note: RPC would be better for atomicity, but simple updates work for now

    // 1. Unset all defaults
    await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);

    // 2. Set new default
    const { error } = await supabase
        .from('user_addresses')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

// --- Phone Actions ---

export async function addPhone(phone: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { count } = await supabase
        .from('user_phones')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

    const isDefault = count === 0;

    const { error } = await supabase
        .from('user_phones')
        .insert({
            user_id: user.id,
            phone_number: phone,
            is_default: isDefault
        });

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

export async function updatePhone(id: string, phone: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from('user_phones')
        .update({ phone_number: phone })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

export async function deletePhone(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
        .from('user_phones')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}

export async function setDefaultPhone(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    await supabase
        .from('user_phones')
        .update({ is_default: false })
        .eq('user_id', user.id);

    const { error } = await supabase
        .from('user_phones')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    return { success: true };
}
