'use client';

import Link from 'next/link';
import ProductCard, { Product } from './ProductCard';
import { useHorizontalScrollNav } from './hooks/useHorizontalScrollNav';

const bestSellingProducts: Product[] = [
  {
    id: 1,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 2,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 3,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 4,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 5,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
    {
    id: 6,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 7,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 8,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 9,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
  {
    id: 10,
    name: 'Purell Hand Sanitizer 236ml',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    originalPrice: 50,
    discountedPrice: 37.5,
    discount: 25,
    badge: 'BEST SELLER',
  },
];

export default function BestSellingProducts() {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    updateScrollButtons,
  } = useHorizontalScrollNav();

  return (
    <section className="bg-white py-12 md:py-15 border border-slate-200">
      <div className="px-6 md:px-30">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#A70000] uppercase">
              Best Sellers
            </h2>
            <p className="text-slate-600 text-sm md:text-base font-light">
              Top-selling medicines trusted by customers for everyday relief.
            </p>
          </div>
          <Link
            href="/shop?sort=best-selling"
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
            onScroll={updateScrollButtons}
            className="flex gap-15 overflow-x-auto scrollbar-hide pb-2"
          >
            {bestSellingProducts.map((product) => (
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
