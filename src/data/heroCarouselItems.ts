export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  category: string;
  badge?: string;
  image: string;
}

// Mock carousel items - easily replaceable with real content from an API
export const heroCarouselItems: CarouselItem[] = [
  {
    id: 'featured-1',
    title: 'Premium Pain Relief',
    description: 'Fast-acting relief backed by trusted formulations and expert pharmacist recommendations.',
    category: 'Featured Product',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0d?w=500&h=400&fit=crop',
  },
  {
    id: 'featured-2',
    title: 'Wellness Vitamins',
    description: 'Complete daily nutrition to support your health and energy levels year-round.',
    category: 'Wellness',
    badge: 'New Stock',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5f400f6f1?w=500&h=400&fit=crop',
  },
  {
    id: 'featured-3',
    title: 'Prescription Refills',
    description: 'Quick, secure online refills with same-day or next-day pickup at your nearest store.',
    category: 'Service',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=400&fit=crop',
  },
  {
    id: 'featured-4',
    title: 'First Aid Essentials',
    description: 'Complete kit with bandages, ointments, and supplies for every family emergency.',
    category: 'Safety',
    badge: 'Essential',
    image: 'https://images.unsplash.com/photo-1631549916768-4c6e7a4d2d1f?w=500&h=400&fit=crop',
  },
  {
    id: 'featured-5',
    title: 'Health Consultations',
    description: 'Connect with licensed pharmacists for personalized medication and wellness advice.',
    category: 'Expert Care',
    image: 'https://images.unsplash.com/photo-1576091160550-112ba8d25d1d?w=500&h=400&fit=crop',
  },
];
