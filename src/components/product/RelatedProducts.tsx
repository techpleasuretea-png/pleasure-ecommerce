import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";

export function RelatedProducts() {
    // Mock data for related products
    const relatedProducts = [
        {
            id: "related-1",
            name: "Sourdough Bread",
            slug: "sourdough-bread",
            weight: "500g",
            price: 6.50,
            originalPrice: 7.65,
            discount: "15% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4"
        },
        {
            id: "related-2",
            name: "Free-Range Eggs",
            slug: "free-range-eggs",
            weight: "1 dozen",
            price: 7.99,
            originalPrice: 8.88,
            discount: "10% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxbKs9pCH2Ka4kHpk_m1Ivt1Ou2krDDLnEjLgXZZAtFxIoUcoLbhLqzVOxEiVjcalpJNdWs5h8zpWqzsBDih-S2cqmQsZ6DF8G16d3CDH1xdZ6IFD3XVHruE5GcRG_WQ5-OJfN6kDfffgYenXPI4VRhDUgLkHiG7sCD3hyM4SVrzH2jyM0r2I5CuhtCnTSf7fji7fJ6mg-iLrNWUCrHxu4YHWejJcXrkx6nm2i934phwbc5PLqpNh_a28u7s0vAgucRx-clxI5_w",
            stock: 0
        },
        {
            id: "related-3",
            name: "Juicy Strawberries",
            slug: "juicy-strawberries",
            weight: "500g",
            price: 5.50,
            originalPrice: 7.33,
            discount: "25% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yri64ddnMB4myFp2Wrj5j7BZYIGSlBUI9X7BqnfXktqTHEopk7TEXYMDSZtvYSFzPHg4jdjCOpHj9tyiymxQIqhi6hAgsqmxPPi12uFcfBQXaC2P6SuaPuL4cRtsctuUPvDN8l1yrBgYILYbf17OhrZW9WmFYUtc5kO_Msc5wO7ijnrRjCvxkF1oD3xp-GPwU4fsFnm6cOypprDiVFbOKIx0wLATKoLDv_NzfP6qVzpHl2ikDu5Giff3XvAsT6vg21knuzQqQA8"
        },
        {
            id: "related-4",
            name: "Organic Whole Milk",
            slug: "organic-whole-milk",
            weight: "1L",
            price: 3.99,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtUIriRHMO78Lha6iwa0djf40KrA7NUKzm65pZn7NmyUTbERKiDAsYeidSD_j3nyKWQf3KGxcIQQfDrA7BsrbKfzORwZUv8Gz4H9tY3FFL489kPbsurGIdMPxYiVbcsW3UiuFAcVOvpK1nAWgGTdg0mXv1YFHQMpZADGc0yqyhaO4w1vcPGg0xjrGrFUxS-B84PNsvXB7P1l-_MQ17WFgbZEK7YoKYGSwmWQyqKHLqHKjJZsPfTe6HwEchNm8M6d864DJGIUFmfJ8",
            stock: 10
        }
    ];

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display text-[#333333] dark:text-white">You May Also Like</h2>
                <a href="#" className="text-primary font-semibold hover:underline flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
                {relatedProducts.map((p, i) => (
                    <ProductCard key={i} {...p} />
                ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="flex lg:hidden gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {relatedProducts.map((p, i) => (
                    <div key={i} className="min-w-[220px] w-[220px] snap-start">
                        <ProductCard {...p} />
                    </div>
                ))}
            </div>
        </section>
    );
}
