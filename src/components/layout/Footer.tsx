import Link from 'next/link';
import { siteRoutes } from '../../routes/siteRoutes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-100">
      {/* Main Footer Content */}
      <div className="page-shell py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About / Brand */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              <span className="text-[#A70000]">GLG</span> Pharmacy
            </h4>
            <p className="text-sm font-light text-slate-300 leading-relaxed mb-4">
              Your trusted health and wellness partner. We're committed to providing quality medications and health products with expert guidance.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 text-slate-300 hover:border-[#A70000] hover:text-[#A70000] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 text-slate-300 hover:border-[#A70000] hover:text-[#A70000] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-9.75 10 10 0 01-2.956.974 4.933 4.933 0 00-8.868-4.5 4.906 4.906 0 00-1.502 6.525 13.957 13.957 0 01-10.102-5.102 4.93 4.93 0 001.526 6.57 4.888 4.888 0 01-2.231-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 text-slate-300 hover:border-[#A70000] hover:text-[#A70000] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="24" height="24" fill="none" />
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={siteRoutes.shop}
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  href={siteRoutes.categories}
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/health-tips"
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Health Tips
                </Link>
              </li>
              <li>
                <Link
                  href={siteRoutes.prescriptions}
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link
                  href={siteRoutes.services}
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Customer Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+639123456789"
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  (+63) 912 345 6789
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@glgpharmacy.com"
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  support@glgpharmacy.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-300 hover:text-[#A70000] transition-colors font-light"
                >
                  Returns & Exchange
                </a>
              </li>
            </ul>
          </div>

          {/* Store Locations */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Store Locations
            </h4>
            <ul className="space-y-4">
              <li className="text-sm text-slate-300 font-light">
                <p className="font-semibold text-white mb-1">Manila Branch</p>
                <p>123 Health St., Manila, Philippines 1000</p>
              </li>
              <li className="text-sm text-slate-300 font-light">
                <p className="font-semibold text-white mb-1">Cebu Branch</p>
                <p>456 Wellness Ave., Cebu, Philippines 6000</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Business Hours */}
            <div className="text-sm">
              <h5 className="font-semibold text-white mb-2">Business Hours</h5>
              <p className="text-slate-300 font-light">
                Monday - Friday: 8:00 AM - 8:00 PM
              </p>
              <p className="text-slate-300 font-light">
                Saturday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-slate-300 font-light">
                Sunday: 10:00 AM - 5:00 PM
              </p>
            </div>

            {/* Certifications */}
            <div className="text-sm">
              <h5 className="font-semibold text-white mb-2">Certifications</h5>
              <p className="text-slate-300 font-light">
                Licensed by the Department of Health
              </p>
              <p className="text-slate-300 font-light">
                PIC Accredited • ISO Compliant
              </p>
            </div>

            {/* Newsletter */}
            <div className="text-sm">
              <h5 className="font-semibold text-white mb-3">Health Tips & Offers</h5>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#A70000]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#A70000] text-white rounded font-medium hover:bg-[#780000] transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-950">
        <div className="page-shell py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-400 font-light">
            <p>
              © {currentYear} GLG Pharmacy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-[#A70000] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#A70000] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-[#A70000] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}