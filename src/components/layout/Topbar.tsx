"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import searchIcon from "../../assets/image-1.png";
import { siteRoutes } from "../../routes/siteRoutes";
import callIcon from "../../assets/image-3.png";

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="page-shell py-4">
      <div className="flex items-center justify-between gap-2 md:gap-6">
        {/* Logo and Brand - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <img src="/Kliyente.png" alt="Logo" className="w-10 h-10" />
          <p className="text-[20px] font-semibold tracking-wide text-[#1E1E1E]">
            <span className="text-[20px] font-semibold tracking-wide text-[#A70000]">GLG</span> Pharmacy.
          </p>
        </div>

        {/* Search Bar - Full width on mobile */}
        <div className="relative flex-1 md:ml-4 md:max-w-[600px]">
          <label htmlFor="search-medicine" className="sr-only">
            Search medicine
          </label>

          <div className="relative flex h-11 items-center">
            <input
              id="search-medicine"
              type="search"
              placeholder="Search Medicines"
              className="h-full w-full rounded-l-full border border-slate-300 bg-white pl-4 pr-0 text-xs md:text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />

            <button className="flex h-full items-center justify-center rounded-r-full border border-l-0 border-slate-300 bg-[#D9D9D9] px-3 md:px-4 text-white transition hover:bg-[#D9D9D9]/50 cursor-pointer">
              <Image src={searchIcon} alt="Search" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:+639123456789"
            className="inline-flex items-center rounded-full border bg-[#A70000] px-4 h-11 text-[14px] font-regular text-white transition hover:bg-[#A70000]/60 hover:text-white gap-2"
          >
            <Image src={callIcon} alt="Call" width={15} height={15} /> (+63) 912 345 6789
          </a>

          <Link
            href={siteRoutes.account}
            aria-label="Open account"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M5 20a7 7 0 0 1 14 0" />
            </svg>
          </Link>

          <Link
            href={siteRoutes.cart}
            aria-label="Open cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 4h2l2.3 10.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L21 7H7" />
              <circle cx="10" cy="19" r="1.5" />
              <circle cx="18" cy="19" r="1.5" />
            </svg>
          </Link>
        </div>

        {/* Mobile View - Menu Toggle Button */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Popout Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-slate-300 bg-white shadow-lg z-50">
              <div className="flex flex-col gap-3 p-4">
                {/* Call Button */}
                <a
                  href="tel:+639123456789"
                  className="inline-flex items-center rounded-full border bg-[#A70000] px-4 py-2 text-[14px] font-regular text-white transition hover:bg-[#A70000]/60 hover:text-white gap-2 justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image src={callIcon} alt="Call" width={15} height={15} /> Call Now
                </a>

                {/* Account Link */}
                <Link
                  href={siteRoutes.account}
                  aria-label="Open account"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:text-sky-600 py-2 gap-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M5 20a7 7 0 0 1 14 0" />
                  </svg>
                  My Account
                </Link>

                {/* Cart Link */}
                <Link
                  href={siteRoutes.cart}
                  aria-label="Open cart"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-sky-500 hover:text-sky-600 py-2 gap-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 4h2l2.3 10.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L21 7H7" />
                    <circle cx="10" cy="19" r="1.5" />
                    <circle cx="18" cy="19" r="1.5" />
                  </svg>
                  My Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
