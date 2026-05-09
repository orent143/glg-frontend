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

          {/* Title */}
          <h2 className="text-[40px] font-bold text-[#A70000] uppercase tracking-tight">
            Featured Brands
          </h2>

          {/* Subtitle */}
          <p className="text-[20px] text-slate-600 max-w-2xl mx-auto font-light">
            Trusted pharmaceutical partners and healthcare providers delivering excellence and innovation
          </p>

          {/* Accent line */}
          <div className="flex justify-center mt-8">
            <div className="w-12 h-1 bg-[#A70000] rounded-full"></div>
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
            <div className="brand-carousel flex gap-3 md:gap-8">
              {extendedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 w-70 group"
                >
                  {/* Card Container */}
                  <div className="h-full">

                    <div className="flex items-center justify-center p-4 gap-3">
                      <img src={brand.image} alt="logo" className='h-20 w-20 rounded-full shadow-2xl' />
                      <span className="text-gray-500 text-[20px] font-light">{brand.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
