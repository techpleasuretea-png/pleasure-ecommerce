import { getDeliveryDetails } from "@/app/actions/deliveryActions";
import DeliveryDetailsManager from "@/components/dashboard/DeliveryDetailsManager";
import { redirect } from "next/navigation";

export default async function DeliveryDetailsPage() {
    const { addresses, phones } = await getDeliveryDetails();

    return (
        <DeliveryDetailsManager addresses={addresses} phones={phones} />
    );
}
