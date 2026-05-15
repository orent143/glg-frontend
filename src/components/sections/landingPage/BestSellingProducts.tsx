'use client';

import Link from 'next/link';
import ProductCard, { Product } from './ProductCard';
import { useHorizontalScrollNav } from '../hooks/useHorizontalScrollNav';

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
    <section className="bg-white py-8 md:py-12 lg:py-15">
      <div className="px-4 sm:px-6 lg:px-30 max-w-7xl mx-auto lg:max-w-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-[#A70000] uppercase">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light">
              Top-selling medicines trusted by customers for everyday relief.
            </p>
          </div>
          <Link
            href="/shop?sort=best-selling"
            className="w-full sm:w-auto p-2 px-3 md:px-4 text-xs md:text-[15px] rounded-lg bg-[#A70000] text-white hover:bg-[#780000] text-center md:text-left whitespace-nowrap"
          >
            View all best selling Products
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex gap-3 sm:gap-4 md:gap-15 overflow-x-auto scrollbar-hide pb-2"
          >
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Navigation Buttons - Hidden on mobile */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-white hover:bg-slate-100 border border-slate-200 rounded-full p-2 md:p-2.5 shadow-lg transition-all"
              aria-label="Scroll left"
            >
              <svg className="w-4 md:w-5 h-4 md:h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 bg-white hover:bg-slate-100 border border-slate-200 rounded-full p-2 md:p-2.5 shadow-lg transition-all"
              aria-label="Scroll right"
            >
              <svg className="w-4 md:w-5 h-4 md:h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
