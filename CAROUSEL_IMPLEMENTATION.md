# Hero Section Carousel Refactor - Implementation Guide

## Overview

The HeroSection component has been refactored to include a right-side autoplay carousel that creates visual balance with the left-side text content. The implementation uses **zero new dependencies** and adheres to modern React/Next.js best practices with a focus on performance and polish.

## What Changed

### 1. **New Files Created**

#### `/src/components/sections/HeroCarousel.tsx`
A standalone, reusable carousel component featuring:
- **Autoplay with smooth timing**: 4.5s per slide + 350ms transition = intentional, non-distracting rhythm
- **Infinite loop**: Seamlessly cycles through items with mathematical modulo logic
- **Hard cap at 5 items**: Enforced via `maxItems` prop (default: 5)
- **Pause on hover**: Autoplay stops when user hovers, resumes on mouse leave
- **Custom animations**: 
  - Active slide: Full scale & opacity
  - Next slide (preview): 95% scale, slight translateX for peek effect
  - Inactive slides: Fade out with transform for depth
  - Easing: Custom cubic-bezier (0.215, 0.61, 0.355, 1) for polished motion
- **Accessible indicators**: Clickable dot navigation with proper ARIA labels
- **Image optimization**: Uses Next.js Image with responsive sizes

#### `/src/data/heroCarouselItems.ts`
Mock carousel data structure featuring:
- `CarouselItem` TypeScript interface (reusable type)
- 5 sample featured products/services for pharmacy domain
- Easy to replace with API data (preserves same structure)

### 2. **Updated Files**

#### `/src/components/sections/HeroSection.tsx`
- Converted from vertical flex layout to **responsive two-column layout**
- Left column: Original text content (unchanged)
- Right column: New HeroCarousel (hidden on mobile, visible md+)
- Added imports for HeroCarousel and carousel items
- Mobile-first approach: stacks vertically on small screens

#### `/src/app/globals.css`
- Added custom CSS classes:
  - `.duration-350`: 350ms transition duration for smooth carousel movement
  - `.ease-out-cubic`: Custom cubic-bezier easing for polished feel

## Key Features

### Performance
- ✅ No unnecessary re-renders (useState + useCallback hooks)
- ✅ Image lazy-loading via Next.js Image (only active slide has `priority`)
- ✅ Efficient DOM structure with absolute positioning
- ✅ Zero third-party carousel libraries (custom implementation)

### UX Polish
- ✅ Subtle parallax effect: Next slide scales to 95% and peeks from right edge
- ✅ Smooth easing: Cubic-bezier for natural motion (not linear)
- ✅ Pause on hover: Users can interact without auto-advance interruption
- ✅ Responsive dots: Compact indicator bar below carousel
- ✅ Graceful degradation: Hidden entirely on mobile (not cramped or broken)

### Accessibility
- ✅ Semantic HTML with aria-labels on buttons
- ✅ Screen reader text explaining carousel navigation
- ✅ Keyboard navigation ready (structure supports arrow keys if needed)
- ✅ Proper image alt text

### Responsive Design
- **Mobile (< 768px)**: Carousel hidden, full-width text content
- **Tablet & Desktop (768px+)**: Two-column grid with carousel on right
- **Large screens**: Max-width carousel (400px) prevents oversizing

## Carousel Content Structure

Each carousel item has:
```typescript
{
  id: string;              // Unique identifier
  title: string;           // Main heading
  description: string;     // Body text
  category: string;        // Label (e.g., "Featured Product")
  badge?: string;          // Optional accent badge (e.g., "Best Seller")
  image: string;           // Image URL or static import
}
```

## Customization Guide

### Change Autoplay Speed
In `HeroCarousel.tsx`, line ~62:
```typescript
autoplayRef.current = setTimeout(() => {
  nextSlide();
}, 4500); // Change this value (in milliseconds)
```

### Disable Pause-on-Hover
Remove lines ~123-124 in HeroCarousel.tsx:
```typescript
// onMouseEnter={handleMouseEnter}
// onMouseLeave={handleMouseLeave}
```

### Adjust Carousel Size
In `HeroSection.tsx`, line ~51:
```typescript
<div className="w-full max-w-sm"> {/* Change max-w-sm to your size */}
```

### Replace Mock Data
Update `/src/data/heroCarouselItems.ts` with real API data while maintaining the `CarouselItem` interface structure.

### Customize Colors & Styling
- **Red accent**: Replace `#A70000` with your brand color
- **Background**: Adjust `from-slate-50 to-slate-100` gradient
- **Animation easing**: Modify `.ease-out-cubic` in globals.css

## Animation Breakdown

### Slide Transitions (350ms)
- **Active slide**: `scale(1) translateX(0)` at `opacity: 1` (z-index: 10)
- **Next slide preview**: `scale(0.95) translateX(20px)` at `opacity: 0.2` (z-index: 5)
- **Inactive slides**: `scale(0.9) translateX(-40px)` at `opacity: 0` (z-index: 0)

This creates a subtle forward-motion effect without being distracting.

### Dot Indicators
- Active dot: 6px wide bar with red (#A70000) background
- Inactive dots: 2px circles with gray background
- Hover effect on inactive dots for better affordance

## Browser Support
- ✅ Modern browsers with CSS transforms & transitions
- ✅ Fallback: CSS transform fallback if JS disabled (no rotation, but visible)
- ✅ Mobile: Touch-friendly dot navigation

## Future Enhancements
- Add keyboard arrow key support (ArrowLeft/ArrowRight)
- Implement swipe gesture support for mobile
- Add fade transition variant as option
- Create carousel with image grid mode (2-3 visible at once)
- Persist carousel state in URL params or session storage

## Testing Checklist
- [ ] Carousel autoplays on initial load
- [ ] Carousel pauses on hover, resumes on mouse leave
- [ ] Dots advance carousel when clicked
- [ ] Carousel loops infinitely without jumps
- [ ] Images load without layout shift
- [ ] Mobile view hides carousel completely
- [ ] Tablet/desktop view shows carousel properly balanced
- [ ] Next slide peeks from right edge (visual preview)
- [ ] Transitions feel smooth, not janky

---

**Implementation Date**: April 27, 2026  
**Framework**: Next.js 16.2.4 + React 19.2.4  
**Styling**: Tailwind CSS 4.0
