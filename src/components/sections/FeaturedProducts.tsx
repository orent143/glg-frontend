"use client";
import Image from "next/image";
import { useState } from "react";
import featuredImage from "@/public/Rectangle11.png";

interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  badge?: string;
  category?: string;
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
    category: "Supplement",
  },
  {
    id: 2,
    name: "Health Essentials Bundle",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 95,
    discountedPrice: 74.99,
    discount: 21,
    badge: "FEATURED",
    category: "Bundle",
  },
  {
    id: 3,
    name: "Complete Care Kit",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 150,
    discountedPrice: 109.99,
    discount: 27,
    badge: "FEATURED",
    category: "Kit",
  },
  {
    id: 4,
    name: "Daily Supplement Stack",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 85,
    discountedPrice: 59.99,
    discount: 29,
    badge: "FEATURED",
    category: "Stack",
  },
  {
    id: 5,
    name: "Premium Wellness Package",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 120,
    discountedPrice: 89.99,
    discount: 25,
    badge: "FEATURED",
    category: "Supplement",
  },
  {
    id: 6,
    name: "Health Essentials Bundle",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 95,
    discountedPrice: 74.99,
    discount: 21,
    badge: "FEATURED",
    category: "Bundle",
  },
  {
    id: 7,
    name: "Complete Care Kit",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 150,
    discountedPrice: 109.99,
    discount: 27,
    badge: "FEATURED",
    category: "Kit",
  },
  {
    id: 8,
    name: "Daily Supplement Stack",
    image: "/Blister-Packaging-Material-for-tablet-and-capsule.jpg",
    originalPrice: 85,
    discountedPrice: 59.99,
    discount: 29,
    badge: "FEATURED",
    category: "Stack",
  },
];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-[18px] h-[18px] transition-colors duration-200 ${
        filled ? "text-[#C50000]" : "text-slate-400"
      }`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-[#C50000] focus-within:ring-offset-2">
      {/* ── Image ── */}
      <div className="relative w-full aspect-square bg-[#f7f7f7] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />

        {/* Discount pill */}
        <span className="absolute top-3 left-3 bg-[#C50000] text-white text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-sm leading-none">
          −{product.discount}%
        </span>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted((v) => !v)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-sm text-slate-400 hover:border-[#C50000] hover:text-[#C50000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C50000] transition-colors duration-150"
        >
          <HeartIcon filled={isWishlisted} />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category tag */}
        {product.category && (
          <span className="text-[11px] font-medium tracking-widest uppercase text-slate-400">
            {product.category}
          </span>
        )}

        {/* Product name */}
        <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-[#C50000]">
            ${product.discountedPrice.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-slate-100" />

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Quantity selector */}
          <div
            role="group"
            aria-label="Quantity selector"
            className="flex items-center border border-slate-200 rounded-sm overflow-hidden text-sm select-none"
          >
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C50000] active:bg-slate-200 transition-colors duration-100 font-medium"
            >
              −
            </button>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="w-8 h-9 flex items-center justify-center text-slate-800 font-semibold border-x border-slate-200"
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-8 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C50000] active:bg-slate-200 transition-colors duration-100 font-medium"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`flex-1 h-9 rounded-sm text-xs font-semibold tracking-wide uppercase transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#C50000] active:scale-[0.98] ${
              added
                ? "bg-slate-800 text-white"
                : "bg-[#C50000] hover:bg-[#a30000] text-white"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="relative w-full py-8 md:py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={featuredImage}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover"
        />
      </div>
      {/* Flat overlay — no gradient */}
      <div className="absolute inset-0 bg-[#f5f4f2] opacity-90 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <header className="mb-6 md:mb-10 lg:mb-14 max-w-xl">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C50000] mb-2 md:mb-3">
            Popular Selection
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-2 md:mb-4">
            Featured{" "}
            <span className="font-semibold text-[#C50000]">Collections</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed">
            Our carefully curated selection of premium wellness products and
            everyday health essentials — handpicked for quality and value.
          </p>
        </header>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div className="mt-8 md:mt-12 lg:mt-14 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex flex-1 h-px bg-slate-300" />
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-slate-800 text-slate-800 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 transition-colors duration-150 w-full sm:w-auto justify-center sm:justify-start"
          >
            See all
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
          <div className="hidden sm:flex flex-1 h-px bg-slate-300" />
        </div>
      </div>
    </section>
  );
}