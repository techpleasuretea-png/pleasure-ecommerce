import { SlideshowForm } from "@/components/admin/SlideshowForm";
import { updateSlideshow } from "@/app/actions/adminActions";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditSlideshowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: slide } = await supabase
        .from('slideshow')
        .select('*')
        .eq('id', id)
        .single();

    if (!slide) {
        notFound();
    }

    const updateAction = updateSlideshow.bind(null, slide.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Edit Slide</h1>
                <p className="text-subtext-light dark:text-subtext-dark">Make changes to the slide.</p>
            </div>

            <SlideshowForm initialData={slide} action={updateAction} />
        </div>
    );
}
