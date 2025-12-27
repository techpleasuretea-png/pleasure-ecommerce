export interface Product {
    id: string;
    name: string;
    weight: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    slug: string;
    images: string[];
    description: string;
    rating: number;
    reviews: number;
    sku: string;
    category: string[];
    tags: string[];
    nutrition?: {
        calories?: number;
        fat?: string;
        saturatedFat?: string;
        cholesterol?: string;
        sodium?: string;
        carbohydrates?: string;
        fiber?: string;
        sugar?: string;
        protein?: string;
    };
    origin?: {
        location: string;
        description: string;
    };
    stock?: number; // Added stock
}
