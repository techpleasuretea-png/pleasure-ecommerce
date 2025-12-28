"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { fetchProducts } from "@/app/actions/productActions";
import { Loader2 } from "lucide-react";

interface Product {
    id: string;
    name: string;
    slug: string; // Added slug
    weight: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    featured?: boolean;
    created_at?: string;
    stock?: number;
}

interface ProductInfiniteListProps {
    initialProducts: Product[];
    searchParams: any; // Passed from page props
}

export function ProductInfiniteList({ initialProducts, searchParams }: ProductInfiniteListProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Reset state when filters change (key prop on parent handles this usually, but let's be safe)
    useEffect(() => {
        setProducts(initialProducts);
        setPage(1);
        setHasMore(initialProducts.length >= 12); // Heuristic
    }, [initialProducts]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;

        // Prepare filters from searchParams
        const filters = {
            page: nextPage,
            limit: 12,
            search: searchParams.q,
            featured: searchParams.featured === 'true',
            onSale: searchParams.onSale === 'true',
            categorySlugs: searchParams.category ? [searchParams.category] : [],
            minPrice: searchParams.min ? Number(searchParams.min) : undefined,
            maxPrice: searchParams.max ? Number(searchParams.max) : undefined,
            sort: searchParams.sort,
            newArrivals: searchParams.newArrivals === 'true'
        };

        const res = await fetchProducts(filters);

        if (res.products.length > 0) {
            setProducts(prev => [...prev, ...res.products]);
            setPage(nextPage);
            setHasMore(res.hasMore);
        } else {
            setHasMore(false);
        }
        setLoading(false);

    }, [page, hasMore, loading, searchParams]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { threshold: 0.5 } // Trigger when spinner is half visible
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadMore, hasMore]);


    return (
        <div>
            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        slug={product.slug}
                        weight={product.weight}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                        image={product.image}
                        created_at={product.created_at}
                        stock={product.stock}
                    />
                ))}
            </div>

            {/* Loading Indicator / Sentinel */}
            {(hasMore || loading) && (
                <div
                    ref={observerTarget}
                    className="flex justify-center items-center py-8 h-20"
                >
                    {loading && (
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    )}
                </div>
            )}

            {!hasMore && products.length > 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    You've reached the end
                </div>
            )}

            {products.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">
                    No products found.
                </div>
            )}
        </div>
    );
}
