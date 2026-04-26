import { useRef, useState } from "react";

type ScrollDirection = "left" | "right";

export function useHorizontalScrollNav(
  scrollAmount = 400,
  scrollThreshold = 10
) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - scrollThreshold);
  };

  const scroll = (direction: ScrollDirection) => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    updateScrollButtons,
  };
}
