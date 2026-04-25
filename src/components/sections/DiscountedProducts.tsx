'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  badge?: string;
}

const discountedProducts: Product[] = [
  {
    id: 1,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'SALE',
  },
  {
    id: 2,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'SALE',
  },
  {
    id: 3,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'SALE',
  },
  {
    id: 4,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'SALE',
  },
  {
    id: 5,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'SALE',
  },
];

function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex-shrink-0 w-56 group">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hover:shadow-1xl transition-all duration-500 h-full flex flex-col hover:border-red-100">
        {/* Image Container */}
        <div className="relative h-56 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="224px"
            className="object-cover group-hover:scale-125 transition-transform duration-700"
          />
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              {product.badge}
            </div>
          )}
          {/* Wishlist Icon */}
          <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-110 backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-slate-400 hover:text-red-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-4 leading-snug">
            {product.name}
          </h3>

          {/* Pricing with better styling */}
          <div className="mb-5 pb-4 border-b border-slate-100">
            <div className="flex items-baseline gap-2.5">
              <span className="text-xl font-bold text-slate-900">
                ${product.discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm font-medium line-through text-slate-400">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full ml-auto">
                -{product.discount}%
              </span>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-2.5 mt-auto">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 hover:bg-white transition-colors">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all font-semibold"
              >
                −
              </button>
              <span className="px-2.5 py-2 border-l border-r border-slate-200 text-sm font-semibold text-slate-900 w-9 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-white hover:text-slate-900 bg-[#780000] hover:bg-red-200 transition-all font-semibold"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-[#9C0000] hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold rounded-lg transition-all duration-300 py-2.5 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscountedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="bg-white py-12 md:py-15 border border-slate-200">
      <div className="px-6 md:px-30">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#A70000] uppercase">
              Discounts & Offers
            </h2>
            <p className="text-slate-600 text-sm md:text-base font-light">
              Save more with exclusive deals on selected health products.
            </p>
          </div>
          <Link
            href="/shop?filter=discounted"
            className="px-4 py-2 bg-[#9C0000] hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
          >
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white hover:bg-slate-100 border border-slate-200 rounded-full p-2.5 shadow-lg transition-all"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white hover:bg-slate-100 border border-slate-200 rounded-full p-2.5 shadow-lg transition-all"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
