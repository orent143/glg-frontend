'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface HealthTip {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

const healthTips: HealthTip[] = [
  {
    id: 1,
    title: 'How to Manage Cold Symptoms at Home',
    excerpt: 'Learn effective home remedies and when to seek professional care for cold and flu symptoms.',
    category: 'Cold & Flu',
    readTime: '5 min',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    slug: 'manage-cold-symptoms',
  },
  {
    id: 2,
    title: 'Building a Strong Immune System Naturally',
    excerpt: 'Discover science-backed strategies to boost immunity through diet, lifestyle, and supplements.',
    category: 'Wellness',
    readTime: '7 min',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    slug: 'strong-immune-system',
  },
  {
    id: 3,
    title: 'Understanding Your Prescription: A Beginner\'s Guide',
    excerpt: 'Demystify prescription labels, dosages, and what to watch for when taking medications.',
    category: 'Medications',
    readTime: '6 min',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    slug: 'understanding-prescriptions',
  },
  {
    id: 4,
    title: 'Seasonal Allergies: Prevention and Treatment',
    excerpt: 'Expert tips on managing seasonal allergies without relying solely on medication.',
    category: 'Allergies',
    readTime: '5 min',
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    slug: 'seasonal-allergies',
  },
];

function TipCard({ tip }: { tip: HealthTip }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300 h-full">
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center">
        <Image
          src={tip.image}
          alt={tip.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category Badge */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold text-[#A70000] uppercase tracking-wide">
            {tip.category}
          </span>
          <span className="text-xs text-slate-500 font-light">
            {tip.readTime} read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#A70000] transition-colors">
          {tip.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1 font-light leading-relaxed">
          {tip.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/health-tips/${tip.slug}`}
          className="inline-flex items-center text-sm font-medium text-[#A70000] hover:text-[#780000] transition-colors group/link"
        >
          Read More
          <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(healthTips.map(tip => tip.category)));
  const filteredTips = selectedCategory
    ? healthTips.filter(tip => tip.category === selectedCategory)
    : healthTips;

  return (
    <section className="bg-white py-12 md:py-15 ">
      <div className="px-6 md:px-30">
        {/* Header */}
        <div className="mb-10">
          <p className="text-2xl font-semibold text-[#A70000] uppercase">
            Health Tips & Articles
          </p>
          <h2 className="text-slate-600 text-sm md:text-base font-light">
            Trusted health guidance from industry experts
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-[#A70000] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            All Articles
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#A70000] text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredTips.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href="/health-tips"
            className="inline-flex items-center px-6 py-3 bg-[#A70000] text-white font-medium rounded-full hover:bg-[#780000] transition-colors"
          >
            View All Articles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}