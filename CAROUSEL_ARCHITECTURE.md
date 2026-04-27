# Carousel Architecture & Layout

## Component Hierarchy

```
HeroSection
├── Image (background)
├── Gradient overlay
└── page-shell (flex container)
    └── Two-column layout
        ├── Left Column (md:flex-1)
        │   ├── Subtitle
        │   ├── Title (H1)
        │   ├── Description
        │   └── Action buttons
        │
        └── Right Column (hidden on mobile, md:flex md:flex-1)
            └── HeroCarousel
                ├── Carousel viewport
                │   ├── Slide 1 (Active)
                │   ├── Slide 2 (Peek next)
                │   └── Slides 3-5 (Inactive)
                │
                └── Dot indicators (clickable)
```

## Responsive Behavior

### Mobile (< 768px)
```
┌─────────────────────┐
│  Title & Text       │
│  (Full Width)       │
│                     │
│  [Action Buttons]   │
│                     │
└─────────────────────┘
```

### Tablet & Desktop (≥ 768px)
```
┌──────────────────────┬──────────────────┐
│                      │                  │
│  Title & Text        │   Carousel       │
│  (flex-1)            │   (max-w-sm)     │
│                      │                  │
│  [Action Buttons]    │  [Dots]          │
│                      │                  │
└──────────────────────┴──────────────────┘
```

## Carousel Slide States

Each carousel slide exists in one of three states:

### 1. Active Slide (offset = 0)
```
Position: Center/Full view
Transform: scale(1) translateX(0)
Opacity: 1
Z-index: 10
Pointer-events: auto
Visible: 100%
```

### 2. Next Slide - Peek (offset = 1)
```
Position: Peeking from right edge
Transform: scale(0.95) translateX(20px)
Opacity: 0.2
Z-index: 5
Pointer-events: none
Visible: Subtle preview (20% opacity)
Purpose: Visual hint of upcoming content
```

### 3. Inactive Slides (offset > 1)
```
Position: Off-screen left
Transform: scale(0.9) translateX(-40px)
Opacity: 0
Z-index: 0
Pointer-events: none
Visible: Hidden
```

## Slide Content Layout

Each slide is a flex column with:

```
┌───────────────────────────┐
│                           │
│    Image Container        │
│    (200px height)         │
│    Rounded + overflow     │
│                           │
├───────────────────────────┤
│ Category Label (red)      │
│ [FEATURED PRODUCT]        │
│                           │
│ Title (bold)              │
│ Premium Pain Relief       │
│                           │
│ Description (slate-600)   │
│ Fast-acting relief...     │
│                           │
│ Badge (if exists)         │
│ [Best Seller]             │
│                           │
└───────────────────────────┘
```

## Animation Timeline

### Every 4.5 seconds (if autoplaying):

```
Time    State               Action
─────────────────────────────────────────────
T=0ms   Advance trigger     nextSlide() called
        
T=0ms   Animation start     CSS transitions begin (350ms duration)
        - Current → inactive left
        - Next → active center
        - Following → peek right
        
T=350ms Animation end       New slide fully visible
        Carousel settles
        
T=4500ms Next trigger       Cycle repeats
```

### User Interactions:

```
Action              Effect
──────────────────────────────────────────
Hover               → setIsAutoplaying(false)
Mouse leave         → setIsAutoplaying(true)
Click dot           → goToSlide(index)
                    → setIsAutoplaying(false)
                      (user took control)
```

## CSS Transitions Applied

```css
/* All slides use the same transition */
.carousel-slide {
  transition: all 350ms ease-out-cubic;
  /* Animates: opacity, transform, z-index */
}

/* Animation properties */
ease-out-cubic = cubic-bezier(0.215, 0.61, 0.355, 1)
/* Eases in quickly, slows at end = natural deceleration */
```

## Data Flow

```
heroCarouselItems (mock data)
    ↓
HeroCarousel receives:
    • items: CarouselItem[]
    • maxItems: number (default: 5)
    ↓
Component Logic:
    • displayItems = items.slice(0, maxItems)
    • [currentIndex, setCurrentIndex] = useState(0)
    ↓
Rendering:
    • For each item, calculate offset:
      offset = (index - currentIndex + totalItems) % totalItems
    ↓
    • Render with offset-based styles
    ↓
User sees:
    • Active slide (offset = 0)
    • Peek slide (offset = 1)
    • Hidden slides (offset > 1)
```

## Performance Optimizations

### Rendering
- ✅ Uses absolute positioning (no reflow on every slide change)
- ✅ Minimal re-renders (useCallback for event handlers)
- ✅ Image lazy-loading (only active slide gets priority)

### Animations
- ✅ Uses CSS transforms (GPU-accelerated)
- ✅ Single transition property (not animating height/width)
- ✅ Will-change: Not needed (not needed at this scale)

### DOM
- ✅ All slides rendered (small fixed set, max 5)
- ✅ No mounting/unmounting (better for smooth animations)
- ✅ Minimal className updates (only opacity/transform)

## Accessibility Features

### ARIA & Semantics
```
<div className="relative w-full h-full" role="region" aria-live="polite">
  {/* Carousel slides with positioning */}
  {displayItems.map((item, index) => (
    <div
      key={item.id}
      aria-current={isActive ? 'true' : 'false'}
      {/* Semantic image alt text */}
      {/* Descriptive slide content */}
    />
  ))}
  
  {/* Navigation dots */}
  {displayItems.map((_, index) => (
    <button
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive ? 'true' : 'false'}
    />
  ))}
  
  {/* Screen reader hint */}
  <div className="sr-only">
    Carousel showing {totalItems} items...
  </div>
</div>
```

### Color Contrast
- Red accent (#A70000) on white: ✅ WCAG AA
- Text on gradient backgrounds: ✅ Sufficient contrast maintained

## Customization Hook Points

**Timing**
```typescript
// Line ~62 in HeroCarousel.tsx
setTimeout(() => nextSlide(), 4500) // Change here
```

**Transition Duration**
```css
/* In globals.css */
.duration-350 { transition-duration: 350ms; }
```

**Animation Easing**
```css
/* In globals.css */
.ease-out-cubic { transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
```

**Slide Transforms**
```typescript
// Lines ~111-116 in HeroCarousel.tsx
transform: isActive
  ? 'scale(1) translateX(0)'
  : isNext ? 'scale(0.95) translateX(20px)' : 'scale(0.9) translateX(-40px)'
```

**Colors & Styling**
```typescript
// Search for "#A70000" to replace brand color throughout
// Search for "slate-" classes to adjust gray palette
```

---

**Last Updated**: April 27, 2026
