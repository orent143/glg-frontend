'use client';

import Image from 'next/image';

const brands = [
  { id: 1, name: 'Pharmaceutical Tablets', image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg' },
  { id: 2, name: 'Prescription Medications', image: '/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__06__prescription-medications-a342aa54ec704f638b5c01de326c89cd.jpg' },
  { id: 3, name: 'Medical Injections', image: '/8cae3786c4cd68fd83c5945179c3152d7324384d-1799x1200.jpg' },
  { id: 4, name: 'Healthcare Products', image: '/images.png' },
];

// Duplicate brands for seamless loop
const extendedBrands = [...brands, ...brands];

export default function FeaturedBrands() {
  return (
    <section className="w-full bg-white py-20 md:py-10 overflow-hidden relative">
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .brand-carousel {
          animation: scroll-left 45s linear infinite;
        }
        
        .brand-carousel:hover {
          animation-play-state: paused;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .float-accent {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-100 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-slate-200 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-5 px-2">
          {/* Badge */}
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-2.5 px-4 py-2 bg-red-50 rounded-full border border-red-200 hover:bg-red-100 transition-colors duration-300">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-60"></span>
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full opacity-40"></span>
              </span>
              <span className="text-xs font-semibold text-red-700 tracking-wide">PREMIUM HEALTHCARE</span>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-[#C50000] mb-4 md:mb-6 tracking-tight">
            Featured Brands
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
            Trusted pharmaceutical partners and healthcare providers delivering excellence and innovation
          </p>

          {/* Accent line */}
          <div className="flex justify-center mt-8">
            <div className="w-12 h-1 bg-[#C50000] rounded-full"></div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative px-4 md:px-8 lg:px-12">
          {/* Left gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-20 pointer-events-none"></div>
          
          {/* Right gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-20 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div className="overflow-hidden py-8">
            <div className="brand-carousel flex gap-6 md:gap-8">
              {extendedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 w-72 h-64 group"
                >
                  {/* Card Container */}
                  <div className="h-full relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-red-300">
                    
                    {/* Image */}
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={288}
                      height={256}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      priority={index < 2}
                    />
                    
                    {/* Overlay - Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white text-center font-semibold text-lg leading-tight">{brand.name}</p>
                      <p className="text-red-200 text-xs mt-2 font-medium tracking-wide">TRUSTED PARTNER</p>
                    </div>

                    {/* Hover corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-12 border-b-12 border-l-transparent border-b-red-500 group-hover:border-l-16 group-hover:border-b-16 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {brands.map((brand) => (
              <button
                key={brand.id}
                className="relative p-1 group/dot cursor-pointer transition-all duration-300"
                aria-label={`Navigate to ${brand.name}`}
              >
                <div className="w-2 h-2 rounded-full bg-slate-300 group-hover/dot:bg-red-500 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-full border border-red-400 opacity-0 group-hover/dot:opacity-100 scale-150 transition-all duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
