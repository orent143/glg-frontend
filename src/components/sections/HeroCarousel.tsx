'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { type CarouselItem } from '@/data/heroCarouselItems';

interface HeroCarouselProps {
  items: CarouselItem[];
  maxItems?: number;
}

export default function HeroCarousel({
  items,
  maxItems = 5,
}: HeroCarouselProps) {
  // Hard cap at 5 items
  const displayItems = items.slice(0, maxItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout>();

  const totalItems = displayItems.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index % totalItems);
  }, [totalItems]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Autoplay effect with smooth, intentional timing
  useEffect(() => {
    if (!isAutoplaying) return;

    autoplayRef.current = setTimeout(() => {
      nextSlide();
    }, 4500); // 4.5s per slide + 350ms transition = smooth rhythm

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [currentIndex, isAutoplaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoplaying(false);
  const handleMouseLeave = () => setIsAutoplaying(true);

  const getSlideOffset = (index: number) => {
    const diff = (index - currentIndex + totalItems) % totalItems;
    return diff;
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel viewport */}
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Slides container */}
        <div className="relative w-full h-full">
          {displayItems.map((item, index) => {
            const offset = getSlideOffset(index);
            const isActive = offset === 0;
            const isNext = offset === 1;

            return (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-350 ease-out-cubic`}
                style={{
                  opacity: isActive ? 1 : isNext ? 0.2 : 0,
                  transform: isActive
                    ? 'scale(1) translateX(0)'
                    : isNext
                      ? 'scale(0.95) translateX(20px)'
                      : 'scale(0.9) translateX(-40px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : isNext ? 5 : 0,
                }}
              >
                <div className="flex flex-col gap-4 p-6 h-full justify-between">
                  {/* Image area */}
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-white/50 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                      priority={isActive}
                    />
                  </div>

                  {/* Content area */}
                  <div className="flex flex-col gap-2 flex-grow justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#A70000] mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Badge or accent element */}
                    {item.badge && (
                      <div className="inline-flex items-center gap-2 w-fit">
                        <span className="text-xs font-semibold px-2 py-1 bg-[#A70000]/10 text-[#A70000] rounded">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradient overlays for polish */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* Dots indicator - compact and positioned */}
      <div className="flex justify-center gap-2 mt-4">
        {displayItems.map((_, index) => {
          const offset = getSlideOffset(index);
          const isActive = offset === 0;

          return (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsAutoplaying(false);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-6 bg-[#A70000]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>

      {/* Keyboard navigation hint (sr-only) */}
      <div className="sr-only">
        Carousel showing {totalItems} items. Use arrow keys or click dots to navigate.
        Currently showing item {currentIndex + 1} of {totalItems}.
      </div>
    </div>
  );
}
