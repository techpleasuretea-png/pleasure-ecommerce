import { ShippingForm } from "@/components/admin/ShippingForm";
import { updateShippingRule } from "@/app/actions/adminActions";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditShippingRulePage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: rule } = await supabase
        .from('shipping_rules')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!rule) {
        notFound();
    }

    const updateAction = updateShippingRule.bind(null, rule.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Edit Shipping Rule</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Make changes to the shipping rule.</p>
            </div>

            <ShippingForm initialData={rule} action={updateAction} />
        </div>
    );
}
