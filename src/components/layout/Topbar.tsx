import Link from "next/link";
import Image from "next/image";
import searchIcon from "../../assets/image-1.png";
import { siteRoutes } from "../../routes/siteRoutes";

export default function Topbar() {
  return (
    <div className="page-shell py-4">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <p className="text-lg font-semibold tracking-wide text-[#1E1E1E]"><span className="text-lg font-semibold tracking-wide text-[#A70000]">GLG</span> Pharmacy.</p>

        <div className="relative w-full max-w-[572px] flex-1">
          <label htmlFor="search-medicine" className="sr-only">
            Search medicine
          </label>

          <div className="relative flex h-11 items-center">
            <input
              id="search-medicine"
              type="search"
              placeholder="Search for Medicines and other Needs"
              className="h-full w-full rounded-l-full border border-slate-300 bg-white pl-4 pr-0 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />

            <button className="flex h-full items-center justify-center rounded-r-full border border-l-0 border-slate-300 bg-[#D9D9D9] px-4 text-white transition hover:bg-[#D9D9D9]/50 cursor-pointer">
              <Image src={searchIcon} alt="Search" width={20} height={20} />
            </button>
          </div>
        </div>

        <a
          href="tel:+639123456789"
          className="inline-flex items-center rounded-full border border-sky-800 px-4 py-2 text-sm font-medium text-sky-800 transition hover:bg-sky-800 hover:text-white"
        >
          Call (+63) 912 345 6789
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
    </div>
  );
}
