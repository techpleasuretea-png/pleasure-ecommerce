import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { supabase } from "@/lib/supabaseClient";

export async function FeaturedProducts() {
    const { data: products } = await supabase
        .from('products')
        .select('*, product_images(image_url, is_primary)')
        .eq('is_featured', true)
        .limit(8);

    const getProductImage = (images: any[]) => {
        if (!images || images.length === 0) return "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3A-a4UULzqh-2SPbYejiaLkHE3RubV6okQS4ojcHCRPhJ_paUEKrXruRD5erHtgxWLXoQfc4z_c5xWUQMkczARbRsyNYdrwnR8j9PGiAxI8d1uBSlKD743u-NkXnxtMB9EnhyXGqbvE35qt7CLdn1-XWOxfulSdRjhidkms4oXRjNzO5r438VVLu10PF_rb2FgIPLvhWiF6r7e09nRXea6m6hUufATKbH-achi-5RFKf6ogP2j35Z7m7prz58IulwJpUyMdVlc4"; // Fallback image
        const primary = images.find((img: any) => img.is_primary);
        return primary ? primary.image_url : images[0].image_url;
    };

    return (
        <section className="py-16 pb-28 md:pb-16 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-display">Featured Products</h2>
                <Link href="/shop?featured=true" className="bg-primary/10 text-primary font-semibold py-2 px-4 rounded-lg text-sm hover:bg-primary/20 transition-colors">
                    See All
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products?.map((product: any) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        slug={product.slug} // Added slug
                        weight={product.weight}
                        price={Number(product.selling_price)}
                        originalPrice={product.mrp ? Number(product.mrp) : undefined}
                        discount={product.discount}
                        image={getProductImage(product.product_images)}
                        stock={product.stock}
                        created_at={product.created_at}
                    />
                ))}
            </div>
        </section>
    );
}
