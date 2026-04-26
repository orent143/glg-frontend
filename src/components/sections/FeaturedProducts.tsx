"use client";
import Image from "next/image";
import { useState } from "react";
import featuredImage from "@/public/Rectangle11.png"

interface FeaturedProduct {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    badge?: string;
}

const featuredProducts: FeaturedProduct[] = [
    {
        id: 1,
        name: "Premium Wellness Package",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 120,
        discountedPrice: 89.99,
        discount: 25,
        badge: "FEATURED",
    },
    {
        id: 2,
        name: "Health Essentials Bundle",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 95,
        discountedPrice: 74.99,
        discount: 21,
        badge: "FEATURED",
    },
    {
        id: 3,
        name: "Complete Care Kit",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 150,
        discountedPrice: 109.99,
        discount: 27,
        badge: "FEATURED",
    },
    {
        id: 4,
        name: "Daily Supplement Stack",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 85,
        discountedPrice: 59.99,
        discount: 29,
        badge: "FEATURED",
    },
    {
        id: 5,
        name: "Premium Wellness Package",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 120,
        discountedPrice: 89.99,
        discount: 25,
        badge: "FEATURED",
    },
    {
        id: 6,
        name: "Health Essentials Bundle",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 95,
        discountedPrice: 74.99,
        discount: 21,
        badge: "FEATURED",
    },
    {
        id: 7,
        name: "Complete Care Kit",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 150,
        discountedPrice: 109.99,
        discount: 27,
        badge: "FEATURED",
    },
    {
        id: 8,
        name: "Daily Supplement Stack",
        image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
        originalPrice: 85,
        discountedPrice: 59.99,
        discount: 29,
        badge: "FEATURED",
    },
];

function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="group h-full">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-slate-300 hover:shadow-lg">
                {/* Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 overflow-hidden flex items-center justify-center flex-shrink-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Badge */}
                    {product.badge && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            {product.badge}
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 transition-all duration-300 hover:bg-slate-100 focus:outline-none"
                        aria-label="Add to wishlist"
                    >
                        <svg
                            className={`w-5 h-5 transition-colors ${isWishlisted ? "text-red-600 fill-red-600" : "text-slate-400"
                                }`}
                            fill={isWishlisted ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-3 leading-tight">
                        {product.name}
                    </h3>

                    {/* Pricing Section */}
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-900">
                            ${product.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-slate-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                            −{product.discount}%
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="mb-4 h-px bg-slate-100"></div>

                    {/* Quantity Selector & Add to Cart */}
                    <div className="flex gap-2 mt-auto">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span className="px-2 py-1.5 text-sm font-semibold text-slate-900 w-8 text-center border-l border-r border-slate-200">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex-1 bg-[#9C0000] hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold rounded-lg transition-all duration-300 py-2.5 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FeaturedProducts() {
    return (
        <section className="relative w-full py-16 md:py-24 lg:py-14 overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={featuredImage}
                    alt="Background"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Optional overlay (important for readability) */}
            <div className="absolute inset-0 bg-white/85 z-10"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 md:mb-16 flex justify-center">
                    <div className="max-w-2xl text-center z-20">
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                            Popular Selection
                        </p>
                        <h2 className="text-5xl md:text-6xl font-light text-[#C50000] mb-4 md:mb-6 tracking-tight">
                            Featured Collections
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
                            Discover our carefully curated selection of premium wellness products and everyday health essentials, handpicked for quality and value.
                        </p>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                    {featuredProducts.map((product) => (
                        <FeaturedProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-12 md:mt-16 text-center">
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#A70000] font-medium rounded-full hover:bg-[#9C0000] hover:text-white transition-colors">
                        View All Products
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
