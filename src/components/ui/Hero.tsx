import { supabase } from "@/lib/supabaseClient";
import { HeroSlideshow } from "@/components/ui/HeroSlideshow";

export async function Hero() {
    const { data: slides } = await supabase
        .from('slideshow')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

    if (!slides || slides.length === 0) {
        // Fallback if no slides found - could render null or a default static hero
        return null;
    }

    return <HeroSlideshow slides={slides} />;
}
