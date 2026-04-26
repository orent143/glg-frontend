'use client';

import { useState, useRef, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  role?: string;
  rating: number;
  content: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Emily R.',
    initials: 'ER',
    role: 'Verified Buyer',
    rating: 5,
    content:
      'I had an amazing experience with Dimboola! The customer service was top-notch and the delivery was super fast. Highly recommend!',
    date: '2024-05-10',
  },
  {
    id: 2,
    name: 'Michael S.',
    initials: 'MS',
    role: 'Verified Buyer',
    rating: 4,
    content:
      'Great selection of products and the prices are very competitive. I had a minor issue with my order but their support team resolved it quickly.',
    date: '2024-05-08',
  },
  {
    id: 3,
    name: 'Sophia L.',
    initials: 'SL',
    role: 'Verified Buyer',
    rating: 5,
    content:
      'Dimboola has become my go-to online pharmacy. The website is easy to navigate and the checkout process is seamless.',
    date: '2024-05-05',
  },
  {
    id: 4,
    name: 'James T.',
    initials: 'JT',
    role: 'Verified Buyer',
    rating: 3,
    content:
      'The product quality is good but I experienced a delay in delivery. Customer service was helpful though.',
    date: '2024-05-02',
  },
  {
    id: 5,
    name: 'Olivia M.',
    initials: 'OM',
    role: 'Verified Buyer',
    rating: 5,
    content:
      'I am extremely satisfied with my purchase from Dimboola. The medication arrived in perfect condition and the instructions were clear.',
    date: '2024-04-30',
  },
  {
    id: 6,
    name: 'William B.',
    initials: 'WB',
    role: 'Verified Buyer',
    rating: 4,
    content:
      'Good experience overall. The prices are reasonable and the delivery was on time. I will definitely order again.',
    date: '2024-04-28',
  },
  {
    id: 7,
    name: 'Ava K.',
    initials: 'AK',
    role: 'Verified Buyer',
    rating: 5,
    content:
      'Dimboola exceeded my expectations! The customer support team was very responsive and helpful throughout the entire process.',
    date: '2024-04-25',
  },
];

// Extend testimonials for seamless looping
const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 4)];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:border-slate-200 transition-all duration-300">
      {/* Rating */}
      <div className="mb-4">
        <RatingStars rating={testimonial.rating} />
      </div>

      {/* Content */}
      <p className="text-sm text-slate-700 font-light leading-relaxed mb-5 line-clamp-4">
        "{testimonial.content}"
      </p>

      {/* Author Section */}
      <div className="flex items-start justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#A70000] to-[#780000] text-white text-xs font-semibold">
            {testimonial.initials}
          </div>

          {/* Name & Role */}
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{testimonial.name}</p>
            {testimonial.role && (
              <p className="text-xs text-slate-500">{testimonial.role}</p>
            )}
          </div>
        </div>

        {/* Date */}
        <p className="text-xs text-slate-400 font-light flex-shrink-0 ml-2">{testimonial.date}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Get initial scroll width
    const scrollWidth = carousel.scrollWidth;
    const containerWidth = carousel.offsetWidth;
    const totalScroll = scrollWidth / 2; // Half because we duplicated half the items

    let animationFrameId: number;
    let currentScroll = 0;

    const animate = () => {
      if (!isHovered) {
        currentScroll += 0.5; // Adjust speed here (0.3-0.8 is subtle)
        if (currentScroll >= totalScroll) {
          currentScroll = 0; // Loop seamlessly
        }
        carousel.scrollLeft = currentScroll;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section className="bg-white py-12 md:py-16 border border-slate-200">
      <div className="px-6 md:px-30">
        {/* Header with Stats */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <p className="text-2xl font-semibold text-[#A70000] uppercase">
                Customer Reviews
              </p>
              <h2 className="text-slate-600 text-sm md:text-base font-light">
                Trusted by thousands of satisfied customers
              </h2>
            </div>

            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-3xl font-semibold text-slate-900">
                    {avgRating}
                  </p>
                  <p className="text-xs text-slate-500">out of 5.0</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <RatingStars rating={Math.round(parseFloat(avgRating))} />
                <p className="text-xs text-slate-500">
                  Based on {testimonials.length} reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden mb-8"
        >
          <div className="flex gap-6 pb-2">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mb-8">
          <p className="text-xs text-slate-500 font-light">
            Scroll to see more reviews
          </p>
        </div>

        {/* Trust Callout */}
        <div className="pt-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-900 mb-1">
                We Verify All Reviews
              </p>
              <p className="text-sm text-slate-600 font-light">
                All testimonials are from verified customers who have made a purchase. We believe in transparency and authenticity.
              </p>
            </div>
            <svg
              className="w-8 h-8 text-[#A70000] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}