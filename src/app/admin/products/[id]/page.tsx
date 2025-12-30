import { getAdminProductById } from "@/app/actions/adminActions";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { ChevronLeft, Edit, Package, Tag, Layers, Scale, DollarSign, Activity } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ProductDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
    const { id } = await params;
    let product;

    try {
        product = await getAdminProductById(id);
    } catch (error) {
        console.error("Error loading product:", error);
    }

    if (!product) {
        notFound();
    }

    const {
        name,
        description,
        selling_price,
        mrp,
        stock,
        weight,
        category,
        product_images,
        is_featured,
        nutrition,
        origin,
        tags
    } = product;

    const primaryImage = product_images?.find((img: any) => img.is_primary) || product_images?.[0];
    const otherImages = product_images?.filter((img: any) => img.id !== primaryImage?.id) || [];

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-10">
            {/* Header / Nav */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-text-light dark:text-text-dark" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-text-light dark:text-text-dark">{name}</h1>
                            {is_featured && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold rounded-full border border-yellow-200 dark:border-yellow-800">
                                    Featured
                                </span>
                            )}
                        </div>
                        <p className="text-subtext-light dark:text-subtext-dark text-sm flex items-center gap-2 mt-1">
                            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-500">
                                ID: {id}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/products/${id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Product
                    </Link>
                    <div className="h-9">
                        <DeleteProductButton productId={id} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Images */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="aspect-square relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
                        <Image
                            src={primaryImage?.image_url || "/placeholder.png"}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {otherImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                            {otherImages.map((img: any) => (
                                <div key={img.id} className="aspect-square relative rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 hover:opacity-80 transition-opacity cursor-pointer">
                                    <Image
                                        src={img.image_url}
                                        alt="Product additional view"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 text-subtext-light dark:text-subtext-dark mb-1 text-xs uppercase font-bold tracking-wider">
                                <DollarSign className="w-3.5 h-3.5" /> Price
                            </div>
                            <div className="text-xl font-black text-text-light dark:text-text-dark">
                                ৳{selling_price}
                                {mrp && mrp > selling_price && (
                                    <span className="ml-2 text-xs font-medium text-gray-400 line-through">৳{mrp}</span>
                                )}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 text-subtext-light dark:text-subtext-dark mb-1 text-xs uppercase font-bold tracking-wider">
                                <Package className="w-3.5 h-3.5" /> Stock
                            </div>
                            <div className={`text-xl font-black ${stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {stock}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 text-subtext-light dark:text-subtext-dark mb-1 text-xs uppercase font-bold tracking-wider">
                                <Layers className="w-3.5 h-3.5" /> Category
                            </div>
                            <div className="text-lg font-bold text-text-light dark:text-text-dark truncate" title={category?.name}>
                                {category?.name || "None"}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 text-subtext-light dark:text-subtext-dark mb-1 text-xs uppercase font-bold tracking-wider">
                                <Scale className="w-3.5 h-3.5" /> Weight
                            </div>
                            <div className="text-lg font-bold text-text-light dark:text-text-dark">
                                {weight || "N/A"}
                            </div>
                        </div>
                    </div>

                    {/* Main Info */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                Description
                            </h2>
                            <div
                                className="prose dark:prose-invert prose-sm max-w-none text-subtext-light dark:text-subtext-dark"
                                dangerouslySetInnerHTML={{ __html: description || "<p>No description provided.</p>" }}
                            />
                        </div>

                        {/* Additional Meta */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <div>
                                <h3 className="text-sm font-bold text-text-light dark:text-text-dark mb-3">Origin</h3>
                                {origin?.location ? (
                                    <div className="space-y-1">
                                        <p className="text-sm text-subtext-light dark:text-subtext-dark"><span className="font-semibold text-text-light dark:text-text-dark">Location:</span> {origin.location}</p>
                                        {origin.description && <p className="text-sm text-subtext-light dark:text-subtext-dark">{origin.description}</p>}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Not specified</p>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
                                    <Tag className="w-4 h-4" /> Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags && tags.length > 0 ? (
                                        tags.map((tag: string, i: number) => (
                                            <span key={i} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium text-subtext-light dark:text-subtext-dark border border-gray-200 dark:border-gray-700">
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No tags</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Nutrition */}
                        {nutrition && (
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-sm font-bold text-text-light dark:text-text-dark mb-4">Nutrition Facts</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Calories</div>
                                        <div className="font-bold text-text-light dark:text-text-dark">{nutrition.calories}</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Protein</div>
                                        <div className="font-bold text-text-light dark:text-text-dark">{nutrition.protein || '0g'}</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Carbs</div>
                                        <div className="font-bold text-text-light dark:text-text-dark">{nutrition.carbohydrates || '0g'}</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Fat</div>
                                        <div className="font-bold text-text-light dark:text-text-dark">{nutrition.fat || '0g'}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
