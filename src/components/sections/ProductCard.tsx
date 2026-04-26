'use client';

import Image from 'next/image';
import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex-shrink-0 w-56 group">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md hover:shadow-1xl transition-all duration-500 h-full flex flex-col hover:border-red-100">
        <div className="relative h-56 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="224px"
            className="object-cover group-hover:scale-125 transition-transform duration-700"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              {product.badge}
            </div>
          )}
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

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-4 leading-snug">
            {product.name}
          </h3>

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
