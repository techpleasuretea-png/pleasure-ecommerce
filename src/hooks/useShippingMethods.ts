import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface ShippingMethod {
    id: string;
    name: string;
    cost: number;
    discount_threshold: number | null;
    discounted_cost: number | null;
}

export function useShippingMethods() {
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchShippingMethods = async () => {
            const supabase = createClient();
            try {
                const { data, error } = await supabase
                    .from("shipping_method")
                    .select("*")
                    .order("cost", { ascending: true });

                if (error) throw error;
                setShippingMethods(data || []);
            } catch (err) {
                console.error("Error fetching shipping methods:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShippingMethods();
    }, []);

    return { shippingMethods, isLoading, error };
}
