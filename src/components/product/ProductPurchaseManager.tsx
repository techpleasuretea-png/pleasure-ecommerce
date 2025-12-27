"use client";

import { useState } from "react";
import { ProductActions } from "./ProductActions";
import { useCart } from "@/context/CartContext";

export function ProductPurchaseManager({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const { addItemWithAuth } = useCart();

    const handleAddToCart = () => {
        addItemWithAuth({
            id: product.id,
            name: product.name,
            slug: product.slug,
            weight: product.weight,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
        });
    };

    return (
        <ProductActions
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={() => console.log("Buy now")}
        />
    );
}
