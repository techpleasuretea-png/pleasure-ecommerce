import { ShippingForm } from "@/components/admin/ShippingForm";
import { updateShippingMethod } from "@/app/actions/adminActions";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditShippingMethodPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: method } = await supabase
        .from('shipping_method')
        .select('*')
        .eq('id', id)
        .single();

    if (!method) {
        notFound();
    }

    const updateAction = updateShippingMethod.bind(null, method.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Edit Shipping Method</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Make changes to the shipping option.</p>
            </div>

            <ShippingForm initialData={method} action={updateAction} />
        </div>
    );
}
