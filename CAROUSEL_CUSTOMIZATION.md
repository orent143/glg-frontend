# Carousel Customization Recipes

Quick copy-paste guides for common customizations.

## 🎨 Color Customization

### Change Brand Color from Red to Blue

**File**: `/src/components/sections/HeroCarousel.tsx`

Find all instances of `#A70000` and replace:
```diff
- className="text-[#A70000]"
+ className="text-[#0066CC]"

- bg-[#A70000]
+ bg-[#0066CC]
```

**Files affected**:
- `HeroCarousel.tsx` (multiple lines)
- `HeroSection.tsx` (line 24)
- Mock data in `heroCarouselItems.ts` (line 15 & 21)

### Complete Color Override Example

```typescript
// In HeroCarousel.tsx, create at top of file:
const BRAND_COLOR = '#0066CC'; // Your brand color
const ACCENT_LIGHT = '#E6F0FF'; // Light variant

// Then use variables:
<span className={`text-[${BRAND_COLOR}]`}>
  {item.badge}
</span>
```

## ⚡ Performance Tweaks

### Increase Autoplay Speed

```typescript
// HeroCarousel.tsx, line ~62

// Current: 4.5 seconds
setTimeout(() => nextSlide(), 4500)

// Faster: 3 seconds
setTimeout(() => nextSlide(), 3000)

// Slower: 6 seconds
setTimeout(() => nextSlide(), 6000)
```

### Disable Image Priority (for many carousels)

```typescript
// HeroCarousel.tsx, line ~92

// Change from:
priority={isActive}

// To:
priority={false}
```

### Reduce Animation Duration

```css
/* globals.css */

/* Current: 350ms */
.duration-350 {
  transition-duration: 350ms;
}

/* Snappier: 250ms */
.duration-250 {
  transition-duration: 250ms;
}

/* Then update HeroCarousel.tsx line ~87:
className={`... transition-all duration-250 ease-out-cubic`}
*/
```

## 📱 Responsive Adjustments

### Show Carousel on Mobile (Stack Layout)

```tsx
// HeroSection.tsx, line ~50

// Current: hidden on mobile
<div className="hidden md:flex md:flex-1">

// Show on all sizes:
<div className="md:flex-1">
```

### Carousel on Its Own Row (Mobile)

```tsx
// HeroSection.tsx, replace the layout div:

<div className="flex w-full flex-col gap-5">
  {/* Left column - text */}
  <div className="flex max-w-2xl flex-col justify-center gap-5">
    {/* ... text content ... */}
  </div>

  {/* Right column - carousel (always visible) */}
  <div className="w-full h-96">
    <HeroCarousel items={heroCarouselItems} maxItems={5} />
  </div>
</div>
```

### Make Carousel Wider

```tsx
// HeroSection.tsx, line ~51

// Current: max-w-sm (384px)
<div className="w-full max-w-sm">

// Wider: max-w-md (448px)
<div className="w-full max-w-md">

// Very wide: max-w-lg (512px)
<div className="w-full max-w-lg">

// Or fixed width:
<div className="w-96">
```

## 🎯 Animation Effects

### Disable Peek Next Slide Effect

```typescript
// HeroCarousel.tsx, line ~111-116

// Current: Has peek effect
transform: isActive
  ? 'scale(1) translateX(0)'
  : isNext
    ? 'scale(0.95) translateX(20px)'
    : 'scale(0.9) translateX(-40px)'

// Without peek (simple fade):
transform: 'scale(1) translateX(0)' // Always 1x scale
```

### Add Rotation Effect

```typescript
// HeroCarousel.tsx, line ~111-116

// Add rotation to next slide:
transform: isActive
  ? 'scale(1) translateX(0) rotateY(0deg)'
  : isNext
    ? 'scale(0.95) translateX(20px) rotateY(-10deg)'
    : 'scale(0.9) translateX(-40px) rotateY(10deg)'
```

### Fade-Only Transition (No Scale)

```typescript
// HeroCarousel.tsx, line ~111-116

// Remove scale transforms:
transform: isActive
  ? 'translateX(0)'
  : isNext
    ? 'translateX(20px)'
    : 'translateX(-40px)'
```

### Slower Easing (More Dramatic)

```css
/* globals.css */

/* Current: Quick deceleration */
.ease-out-cubic {
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

/* Slower, more dramatic: */
.ease-out-quart {
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Then update HeroCarousel.tsx:
className={`... ease-out-quart`}
*/
```

## 🎪 Content Customization

### Load Real Data from API

```typescript
// Replace /src/data/heroCarouselItems.ts

export async function getCarouselItems(): Promise<CarouselItem[]> {
  const response = await fetch('https://api.example.com/carousel-items');
  return response.json();
}
```

Then in HeroSection:

```tsx
const items = await getCarouselItems();

<HeroCarousel items={items} maxItems={5} />
```

### Show Only 3 Items Instead of 5

```tsx
// HeroSection.tsx

<HeroCarousel items={heroCarouselItems} maxItems={3} />
```

### Add More Carousel Items

```typescript
// heroCarouselItems.ts

export const heroCarouselItems: CarouselItem[] = [
  // ... existing 5 items ...
  
  // Add new items (but maxItems=5 will still cap display):
  {
    id: 'featured-6',
    title: 'New Item',
    description: 'Description',
    category: 'Category',
    badge: 'New',
    image: 'https://...',
  },
];
```

### Customize Dot Indicators

```typescript
// HeroCarousel.tsx, line ~145-157

// Current: Animated width dots
<button
  className={`h-2 rounded-full transition-all duration-300 ${
    isActive
      ? 'w-6 bg-[#A70000]'
      : 'w-2 bg-slate-300 hover:bg-slate-400'
  }`}
/>

// Alternative: Always same size (just color change):
<button
  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
    isActive
      ? 'bg-[#A70000]'
      : 'bg-slate-300 hover:bg-slate-400'
  }`}
/>

// Alternative: Square dots:
className={`h-3 w-3 rounded transition-colors...`}
```

## 🎛️ Autoplay Control

### Disable Pause on Hover

```typescript
// HeroCarousel.tsx, line ~123

// Remove these props:
// onMouseEnter={handleMouseEnter}
// onMouseLeave={handleMouseLeave}

// Or set constant autoplay:
const [isAutoplaying, setIsAutoplaying] = useState(true);
// Remove the handleMouseEnter/Leave functions entirely
```

### Disable Autoplay Completely

```typescript
// HeroCarousel.tsx, line ~117

// Change from:
const [isAutoplaying, setIsAutoplaying] = useState(true);

// To:
const [isAutoplaying, setIsAutoplaying] = useState(false);
```

### Manual Progression Only (Click Dots)

```typescript
// HeroCarousel.tsx

// Remove the entire autoplay effect (lines ~65-76):
useEffect(() => {
  if (!isAutoplaying) return;
  autoplayRef.current = setTimeout(() => {
    nextSlide();
  }, 4500);
  return () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current);
  };
}, [currentIndex, isAutoplaying, nextSlide]);
```

## 🎨 Styling Variants

### Dark Mode Carousel

```tsx
// HeroCarousel.tsx, line ~130

// Change from:
<div className="... rounded-lg bg-gradient-to-br from-slate-50 to-slate-100">

// To:
<div className="... rounded-lg bg-gradient-to-br from-slate-900 to-slate-800">

// And update text colors in slide content:
<p className="text-xs ... text-[#A70000]">
  
// Might need:
<p className="text-xs ... text-white">
```

### Minimal Indicators (Hidden by Default)

```tsx
// HeroCarousel.tsx, line ~142

// Change from:
<div className="flex justify-center gap-2 mt-4">

// To:
<div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
```

Then wrap carousel:
```tsx
<div className="group relative w-full h-full">
  {/* carousel content */}
</div>
```

## 🔧 Advanced: Custom Carousel Instance

### Create Multiple Carousels with Different Items

```tsx
// Create new data file: /src/data/secondaryCarouselItems.ts

export const secondaryCarouselItems: CarouselItem[] = [
  // ... different items ...
];

// Then use in another section:
<HeroCarousel items={secondaryCarouselItems} maxItems={4} />
```

### Pass Custom CSS Classes

Modify HeroCarousel component signature:

```typescript
interface HeroCarouselProps {
  items: CarouselItem[];
  maxItems?: number;
  className?: string;  // Add this
}

export default function HeroCarousel({
  items,
  maxItems = 5,
  className = '',
}: HeroCarouselProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* ... carousel content ... */}
    </div>
  );
}

// Usage:
<HeroCarousel 
  items={items} 
  maxItems={5}
  className="rounded-2xl border-2 border-slate-300"
/>
```

## 📊 Data Transformation

### Convert API Response to CarouselItem

```typescript
interface APIProduct {
  productId: number;
  productName: string;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  rating?: number;
}

function transformToCarouselItem(product: APIProduct): CarouselItem {
  return {
    id: `product-${product.productId}`,
    title: product.productName,
    description: product.description,
    category: product.category,
    badge: product.featured ? 'Featured' : undefined,
    image: product.imageUrl,
  };
}

// Usage:
const apiData: APIProduct[] = await fetchProducts();
const carouselData = apiData.map(transformToCarouselItem);
```

---

**Need help?** Check `CAROUSEL_IMPLEMENTATION.md` for detailed feature explanations.
