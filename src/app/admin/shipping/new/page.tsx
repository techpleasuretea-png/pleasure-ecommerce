import { ShippingForm } from "@/components/admin/ShippingForm";
import { createShippingRule } from "@/app/actions/adminActions";

export default function NewShippingRulePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Add Shipping Rule</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Create a new shipping cost rule.</p>
            </div>

            <ShippingForm action={createShippingRule} />
        </div>
    );
}
