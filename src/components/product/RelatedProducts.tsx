import { ProductCard } from "@/components/ui/ProductCard";

export function RelatedProducts() {
    const relatedProducts = [
        {
            name: "Sourdough Bread",
            weight: "500g",
            price: 180,
            originalPrice: 200,
            discount: "10% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuOXyTqf7u28s-4Wq9_8_1l_lG4c4y7tKzZ4W6xBjN3eY1t5_qC9_rO0aP8lXj6s5_bH3f5_kL9_zM2nB1vX6sC7_dF0gH4_aJ2kL5_mN8pQ3_wR6tY9_uI1oO4pS7aD2fG5_hJ8kL1_zX4cV7_bNrT3_qE6_yO9_wP2"
        },
        {
            name: "Free-Range Eggs",
            weight: "1 dozen",
            price: 120,
            originalPrice: 150,
            discount: "20% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuP7jX4kL2_mN5_qR8sT1_vW3yZ6_uI9_oP4aJ2_bC5dE8fG1_hK4_lM7_nQ3_wR6tY9_uI1oO4pS7aD2fG5_hJ8kL1_zX4cV7_bNrT3_qE6_yO9_wP2_aJ2kL5_mN8pQ3_wR6tY9_uI1oO4pS7aD2fG5_hJ8kL1_zX4cV7"
        },
        {
            name: "Juicy Strawberries",
            weight: "500g",
            price: 220,
            originalPrice: 250,
            discount: "12% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuQ9kY6lM3_nO6_rS1uV2_wX4z0-1vJ0_pQ5bK3_cD6eF9gH2_iL5_mN8_oR4_xS7uZ0_vKw2pP5qE3gH6_iK9mL2_aY5dW8_cOtU4_rF7_zP0_xQ3_bK3_mN6_oQ4_xS7uZ0_v"
        },
        {
            name: "Organic Whole Milk",
            weight: "1L",
            price: 300,
            originalPrice: 320,
            discount: "5% OFF",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuR1lZ8mN5_oP7_tU2vW3_xY5a1-2wK1_qR6cL4_dE7fG0hI3_jM6_nO9_pS5_yT8vZ1_wLx3qQ6rF4hI7_jL0oM3_bZ6eX9_dPvV5_sG8_aQ1_yR4_cL4_nO7_pR5_yT8vZ1_w"
        },
    ];

    return (
        <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">You May Also Like</h2>
                <a href="#" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                    View All <span className="text-lg">→</span>
                </a>
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="flex md:hidden overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {relatedProducts.map((item, idx) => (
                    <div key={idx} className="min-w-[200px] flex-shrink-0">
                        <ProductCard {...item} />
                    </div>
                ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 gap-6">
                {relatedProducts.map((item, idx) => (
                    <ProductCard key={idx} {...item} />
                ))}
            </div>
        </div>
    );
}
