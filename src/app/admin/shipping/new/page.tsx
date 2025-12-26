import { ShippingForm } from "@/components/admin/ShippingForm";
import { createShippingMethod } from "@/app/actions/adminActions";

export default function NewShippingMethodPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Add Shipping Method</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Create a new shipping option.</p>
            </div>

            <ShippingForm action={createShippingMethod} />
        </div>
    );
}
