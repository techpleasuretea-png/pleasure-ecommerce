import { SlideshowForm } from "@/components/admin/SlideshowForm";
import { createSlideshow } from "@/app/actions/adminActions";

export default function NewSlideshowPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Add New Slide</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Create a new slide for the homepage.</p>
            </div>

            <SlideshowForm action={createSlideshow} />
        </div>
    );
}
