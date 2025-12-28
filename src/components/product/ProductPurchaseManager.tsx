"use client";

import { useState } from "react";
import { ProductActions } from "./ProductActions";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductPurchaseManager({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const { addItemWithAuth } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();

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

    const handleAddToWishlist = async () => {
        await addToWishlist({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0],
            stock: product.stock
        });
    };

    const isOutOfStock = product.stock === 0;
    const inWishlist = isInWishlist(product.id);

    return (
        <ProductActions
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={() => console.log("Buy now")}
            isOutOfStock={isOutOfStock}
            onAddToWishlist={handleAddToWishlist}
            isInWishlist={inWishlist}
        />
    );
}
