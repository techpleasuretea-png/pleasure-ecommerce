'use server';

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface OrderItemInput {
    product_id: string;
    quantity: number;
    price: number;
}

interface CreateOrderInput {
    userId: string;
    items: OrderItemInput[];
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    shippingMethodId: string;
    paymentMethod: string;
    name: string;
    mobile: string;
    address: string;
    isAnonymous: boolean;
}

export async function createOrder(data: CreateOrderInput) {
    const supabase = await createClient();

    try {
        // 1. Create or Update Address
        // For simplicity, we'll create a new address record for now if it doesn't match an existing one strictly,
        // or just insert it as a new record linked to the user.
        // If it's an anonymous user, we still might want to store the address with the order directly, 
        // but our schema has `shipping_address_id`. Let's create an address record first.

        let addressId: string;

        // Note: For anonymous users, we might not have a distinct user_id in `user_addresses` if RLS forbids it,
        // but here we assume the passed `userId` (which might be the anon ID) works if RLS allows.
        // If `user_addresses.user_id` references `auth.users`, it should be fine.

        const { data: addressData, error: addressError } = await supabase
            .from('user_addresses')
            .insert({
                user_id: data.userId,
                address_line: data.address,
                is_default: false
            })
            .select('id')
            .single();

        if (addressError) {
            console.error("Error creating address:", addressError);
            throw new Error(`Failed to create address: ${addressError.message}`);
        }
        addressId = addressData.id;

        // 2. Create Order
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: data.userId,
                shipping_address_id: addressId,
                status: 'pending',
                total_amount: data.total,
                total_discount: data.discount,
                shipping_cost: data.shippingCost,
                recipient_name: data.name,
                recipient_mobile: data.mobile,
                payment_method: data.paymentMethod,
                shipping_method_id: data.shippingMethodId
            })
            .select('id')
            .single();

        if (orderError) {
            console.error("Error creating order:", orderError);
            throw new Error(`Failed to create order: ${orderError.message}`);
        }

        const orderId = orderData.id;

        // 3. Create Order Items
        const orderItems = data.items.map(item => ({
            order_id: orderId,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error("Error creating order items:", itemsError);
            // In a real app, we might want to rollback the order creation here
            throw new Error(`Failed to create order items: ${itemsError.message}`);
        }

        return { success: true, orderId };

    } catch (error: any) {
        console.error("Create Order Exception:", error);
        return { success: false, error: error.message };
    }
}
