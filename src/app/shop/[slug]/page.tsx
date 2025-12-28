import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ShopMobileFooter } from "@/components/shop/ShopMobileFooter";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductPurchaseManager } from "@/components/product/ProductPurchaseManager";
import { ProductDetailsTabs } from "@/components/product/ProductDetailsTabs";
import { ProductDetailsAccordion } from "@/components/product/ProductDetailsAccordion";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getProductBySlug } from "@/app/actions/productActions";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function ProductDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 pb-24 md:pb-8">
                {/* Breadcrumbs (Desktop) */}
                <div className="hidden md:block mx-auto max-w-screen-xl px-4 md:px-8 py-4">
                    <nav className="flex text-sm text-subtext-light dark:text-subtext-dark mb-4">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/shop" className="hover:text-primary">Shop</Link>
                        <span className="mx-2">/</span>
                        {product.category && product.category.length > 0 && (
                            <>
                                <Link href={`/shop?category=${product.category[0].toLowerCase().replace(' ', '-')}`} className="hover:text-primary">{product.category[0]}</Link>
                                <span className="mx-2">/</span>
                            </>
                        )}
                        <span className="text-text-light dark:text-text-dark font-medium">{product.name}</span>
                    </nav>
                </div>

                <div className="mx-auto max-w-screen-xl px-2 md:px-8 py-2 md:py-8">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
                        {/* Left Column: Image Gallery */}
                        <div className="w-full lg:w-1/2">
                            <ProductImageGallery images={product.images} discount={product.discount} />
                        </div>

                        {/* Right Column: Info & Actions */}
                        <div className="w-full lg:w-1/2">
                            <ProductInfo product={product} />

                            {/* Desktop-only Description Preview */}
                            <p className="hidden md:block text-subtext-light dark:text-subtext-dark leading-relaxed mt-4">
                                {product.description}
                            </p>

                            <ProductPurchaseManager product={product} />

                            {/* Mobile Accordions (Only visible on mobile) */}
                            <div className="block lg:hidden mt-8">
                                <ProductDetailsAccordion product={product} />
                            </div>
                        </div>
                    </div>

                    {/* Desktop Tabs (Only visible on desktop) */}
                    <div className="hidden lg:block">
                        <ProductDetailsTabs product={product} />
                    </div>

                    {/* Related Products */}
                    <RelatedProducts />
                </div>
            </main>

            <ShopMobileFooter />

            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
