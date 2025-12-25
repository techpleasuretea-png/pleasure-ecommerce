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
        .eq('is_deleted', false)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

    const { data: phones } = await supabase
        .from('user_phones')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_deleted', false)
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

    const { data, error } = await supabase
        .from('user_addresses')
        .insert({
            user_id: user.id,
            address_line: address,
            is_default: isDefault
        })
        .select()
        .single();

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    revalidatePath("/checkout");
    return { success: true, id: data.id };
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
    revalidatePath("/checkout");
    return { success: true };
}

export async function deleteAddress(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    // Check if used in orders
    const { count, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('shipping_address_id', id);

    if (countError) {
        // If column doesn't exist or other error, fallback to soft delete to be safe? 
        // Or strictly strictly follow user: if error, fail?
        // Let's assume safely: if we can't verify, we don't hard delete?
        // Actually, let's log and try soft delete if checking fails to be safe.
        console.error("Error checking order usage:", countError);
        return { error: "Failed to verify usage" };
    }

    if (count && count > 0) {
        // Soft delete
        const { error } = await supabase
            .from('user_addresses')
            .update({ is_deleted: true })
            .eq('id', id)
            .eq('user_id', user.id);
        if (error) return { error: error.message };
    } else {
        // Hard delete
        const { error } = await supabase
            .from('user_addresses')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);
        if (error) return { error: error.message };
    }

    revalidatePath("/dashboard/delivery-details");
    revalidatePath("/checkout");
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
    revalidatePath("/checkout");
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

    const { data, error } = await supabase
        .from('user_phones')
        .insert({
            user_id: user.id,
            phone_number: phone,
            is_default: isDefault
        })
        .select()
        .single();

    if (error) return { error: error.message };
    revalidatePath("/dashboard/delivery-details");
    revalidatePath("/checkout");
    return { success: true, id: data.id };
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
    revalidatePath("/checkout");
    return { success: true };
}

export async function deletePhone(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    // Get phone number first
    const { data: phone, error: fetchError } = await supabase
        .from('user_phones')
        .select('phone_number')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !phone) return { error: "Phone not found" };

    // Check if used in orders (recipient_mobile)
    const { count, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_mobile', phone.phone_number);

    if (countError) {
        console.error("Error checking phone usage:", countError);
        return { error: "Failed to verify usage" };
    }

    if (count && count > 0) {
        // Soft delete
        const { error } = await supabase
            .from('user_phones')
            .update({ is_deleted: true })
            .eq('id', id)
            .eq('user_id', user.id);
        if (error) return { error: error.message };
    } else {
        // Hard delete
        const { error } = await supabase
            .from('user_phones')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);
        if (error) return { error: error.message };
    }

    revalidatePath("/dashboard/delivery-details");
    revalidatePath("/checkout");
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
    revalidatePath("/checkout");
    return { success: true };
}
