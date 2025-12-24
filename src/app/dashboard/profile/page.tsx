import { getProfile } from "@/app/actions/profileActions";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const userProfile = await getProfile();

    if (!userProfile) {
        // Should not happen for authenticated routes like dashboard, but as a safeguard
        redirect("/login");
    }

    return (
        <ProfileForm
            user={{
                name: userProfile.full_name || "",
                email: userProfile.email || ""
            }}
        />
    );
}
