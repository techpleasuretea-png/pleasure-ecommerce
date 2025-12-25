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
    existingAddressId?: string; // New optional field
}

export async function createOrder(data: CreateOrderInput) {
    const supabase = await createClient();

    try {
        let addressId: string;

        // 1. Determine Address ID
        if (data.existingAddressId) {
            // Use existing address
            addressId = data.existingAddressId;
        } else {
            // Create new address
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
        }

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

export async function getUserOrders() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "User not authenticated" };
    }

    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                created_at,
                status,
                total_amount,
                order_items (
                    id,
                    quantity,
                    price,
                    products (
                        name,
                        product_images (
                            image_url
                        )
                    )
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching user orders:", error);
            throw new Error(`Failed to fetch orders: ${error.message}`);
        }

        return { success: true, orders };
    } catch (error: any) {
        console.error("Get User Orders Exception:", error);
        return { success: false, error: error.message };
    }
}

export async function getOrderById(orderId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "User not authenticated" };
    }

    try {
        const { data: order, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_number,
                order_items (
                    id,
                    quantity,
                    price,
                    products (
                        name,
                        product_images (
                            image_url
                        )
                    )
                ),
                shipping_method (
                    name,
                    cost
                ),
                user_addresses (
                    address_line
                )
            `)
            .eq('id', orderId)
            .eq('user_id', user.id)
            .single();

        if (error) {
            console.error("Error fetching order:", error);
            return { success: false, error: "Order not found" };
        }

        return { success: true, order };
    } catch (error: any) {
        console.error("Get Order By ID Exception:", error);
        return { success: false, error: error.message };
    }
}
