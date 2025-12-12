import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductCard } from "./ProductCard";

const products = [
    {
        name: "Organic Avocados",
        weight: "500g",
        price: 4.99,
        originalPrice: 6.24,
        discount: "20% OFF",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4AOL0hx5pyRE3HN25hiE7N9icMOhtBtUA_Ho3LGyymtDGplAkrvO2EupuEo6nUBO56DfM0Lye2VfEKEzOFbhaDwnmkacRhApAxlVrIVbeqJfnjTy9HVbpNtLZQNb6x2vGb7o3p1M2AA6cNQuY9a9MI9l-BgSkyGl3-MISLRhkW_Wp9Gy_FXsvmu-yexYhCTJHXeXaO2IVoC0HP6mD8I1RtOdktSszxQIKfkRgX7913wA0t_3ff8Sxh-yTgnjwWOlyXr-O0qwsOqo"
    },
    {
        name: "Sourdough Bread",
        weight: "500g",
        price: 6.50,
        originalPrice: 7.65,
        discount: "15% OFF",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4"
    },
    {
        name: "Free-Range Eggs",
        weight: "1 dozen",
        price: 7.99,
        originalPrice: 8.88,
        discount: "10% OFF",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxbKs9pCH2Ka4kHpk_m1Ivt1Ou2krDDLnEjLgXZZAtFxIoUcoLbhLqzVOxEiVjcalpJNdWs5h8zpWqzsBDih-S2cqmQsZ6DF8G16d3CDH1xdZ6IFD3XVHruE5GcRG_WQ5-OJfN6kDfffgYenXPI4VRhDUgLkHiG7sCD3hyM4SVrzH2jyM0r2I5CuhtCnTSf7fji7fJ6mg-iLrNWUCrHxu4YHWejJcXrkx6nm2i934phwbc5PLqpNh_a28u7s0vAgucRx-clxI5_w"
    },
    {
        name: "Juicy Strawberries",
        weight: "500g",
        price: 5.50,
        originalPrice: 7.33,
        discount: "25% OFF",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yri64ddnMB4myFp2Wrj5j7BZYIGSlBUI9X7BqnfXktqTHEopk7TEXYMDSZtvYSFzPHg4jdjCOpHj9tyiymxQIqhi6hAgsqmxPPi12uFcfBQXaC2P6SuaPuL4cRtsctqUPvDN8l1yrBgYILYbf17OhrZW9WmFYUtc5kO_Msc5wO7ijnrRjCvxkF1oD3xp-GPwU4fsFnm6cOypprDiVFbOKIx0wLATKoLDv_NzfP6qVzpHl2ikDu5Giff3XvAsT6vg21knuzQqQA8"
    }
];

export function FeaturedProducts() {
    return (
        <section className="py-16 pb-28 md:pb-16 px-4 md:px-8 max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-display">Featured Products</h2>
                <Link href="/shop" className="bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg text-sm hover:bg-primary/20 transition-colors">
                    See All
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, idx) => (
                    <ProductCard key={idx} {...product} />
                ))}
            </div>
        </section>
    );
}
