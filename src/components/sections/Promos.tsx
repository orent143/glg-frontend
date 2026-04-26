import Image from 'next/image';
import Link from 'next/link';

interface PromoProps {
  id: number;
  badge?: string;
  title: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  badgeColor?: string;
  isHorizontal?: boolean;
}

const promos: PromoProps[] = [
  {
    id: 1,
    badge: 'Limited Time',
    title: 'Winter Health Bundle',
    description: 'Get 20% off on essential vitamins and supplements this season.',
    cta: {
      label: 'Shop Now',
      href: '/shop?category=supplements',
    },
    image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg',
    isHorizontal: true,
  },

  {
    id: 3,
    badge: 'Exclusive',
    title: 'Wellness Starter Kit',
    description: 'Premium medical devices and health monitoring tools.',
    cta: {
      label: 'Explore',
      href: '/shop?category=medical-devices',
    },
    image: '/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__06__prescription-medications-a342aa54ec704f638b5c01de326c89cd.jpg',
    isHorizontal: true,
  },
];

function PromoCard({
  id,
  badge,
  title,
  description,
  cta,
  image,
  backgroundColor = 'bg-slate-50',
  textColor = 'text-slate-900',
  badgeColor = 'bg-[#A70000]',
  isHorizontal = false,
}: PromoProps) {
  const cardContent = (
    <div className={`flex flex-col justify-between h-full p-6 md:p-8 ${textColor}`}>
      {/* Badge */}
      {badge && (
        <div className={`${badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mb-4`}>
          {badge}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-sm md:text-base font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* CTA Button */}
      {cta && (
        <Link
          href={cta.href}
          className="mt-6 inline-flex items-center text-sm font-semibold text-[#A70000] hover:text-[#A70000]/80 transition-colors duration-300 group"
        >
          {cta.label}
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 duration-300">
            →
          </span>
        </Link>
      )}
    </div>
  );

  if (isHorizontal && image) {
    return (
      <div className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 h-48 md:h-56">
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors duration-300" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8 text-white">
          {badge && (
            <div className="bg-[#A70000] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider w-fit">
              {badge}
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-sm md:text-base font-light leading-relaxed text-white/90">
                {description}
              </p>
            )}
          </div>

          {cta && (
            <Link
              href={cta.href}
              className="mt-4 inline-flex items-center text-sm font-semibold text-white hover:text-white/80 transition-colors duration-300 group/link"
            >
              {cta.label}
              <span className="ml-2 inline-block transition-transform group-hover/link:translate-x-1 duration-300">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    );
  }

}

export function PromoCardOnly() {
  return (
    <section className="bg-white py-12 md:py-15">
      <div className="px-6 md:px-30">
        <PromoCard {...promos[1]} />
      </div>
    </section>
  );
}

export default function Promos() {
  return (
    <section className="bg-white py-12 md:py-15 border border-slate-200">
      {/* Header */}
      <div className="p-6 md:px-30 md:py-8 mb-3">
        <p className="text-2xl font-semibold text-[#A70000] uppercase">
          Exclusive Offers
        </p>
        <h2 className="text-lg font-light text-slate-600">
          Limited-time deals and special promotions
        </h2>
      </div>

      {/* Promos Grid */}
      <div className="px-6 md:px-30 pb-12">
        <PromoCard {...promos[0]} />
      </div>
    </section>
  );
}
