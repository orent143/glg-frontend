'use client';
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { categoryItems, navigationItems } from "../../routes/siteRoutes";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Calculate and update dropdown position
  const updateDropdownPosition = () => {
    if (isDropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  };

  // Handle dropdown positioning on open
  useEffect(() => {
    updateDropdownPosition();
  }, [isDropdownOpen]);

  // Handle scroll to reposition dropdown
  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener("scroll", updateDropdownPosition);
      return () => window.removeEventListener("scroll", updateDropdownPosition);
    }
  }, [isDropdownOpen]);

  // Handle click outside to close dropdown and mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-mobile-menu-trigger]")) {
          setIsMobileMenuOpen(false);
        }
      }
    }

    if (isDropdownOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen, isMobileMenuOpen]);

  // Handle escape key to close dropdown
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isDropdownOpen]);

  return (
    <>
      {/* Sticky navbar with proper stacking context */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="page-shell py-3">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 overflow-x-auto whitespace-nowrap text-sm font-light text-slate-700">
            {navigationItems.slice(0, 3).map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-[#A70000]">
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <button
                ref={triggerRef}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="category-dropdown"
                className="cursor-pointer transition hover:text-[#A70000] focus-visible:text-sky-700 focus:outline-none"
              >
                CATEGORIES
              </button>
            </li>

            {navigationItems.slice(3).map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-[#A70000]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center justify-between">
            <span className="text-xs font-light text-slate-700">Navigation</span>
            <button
              data-mobile-menu-trigger
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
              aria-label="Toggle navigation menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-b border-slate-200 bg-white shadow-md"
        >
          <div className="page-shell py-3">
            <ul className="flex flex-col gap-3 text-sm font-light text-slate-700">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block transition hover:text-[#A70000]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="border-t border-slate-200 pt-3">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  className="w-full text-left cursor-pointer transition hover:text-[#A70000] focus:outline-none"
                >
                  CATEGORIES
                </button>

                {isDropdownOpen && (
                  <ul className="mt-2 ml-2 flex flex-col gap-2 border-l-2 border-slate-200 pl-3">
                    {categoryItems.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={category.href}
                          className="text-xs text-slate-600 transition hover:text-[#A70000]"
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Dropdown overlay — rendered at viewport level */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          id="category-dropdown"
          style={{
            position: "fixed",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 50,
          }}
          className="hidden md:block w-52 rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          <ul className="p-2">
            {categoryItems.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-[#A70000]"
                  onClick={() => setDropdownOpen(false)}
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
