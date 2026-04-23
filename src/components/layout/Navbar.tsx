import Link from "next/link";
import { categoryItems, navigationItems } from "../../routes/siteRoutes";

export default function Navbar() {
  return (
    <nav className="border-t border-slate-200">
      <div className="page-shell py-3">
        <ul className="flex items-center gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium text-slate-700">
          {navigationItems.slice(0, 3).map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="transition hover:text-sky-700">
                {item.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <details className="group">
              <summary className="list-none cursor-pointer transition hover:text-sky-700 focus-visible:text-sky-700">
                Categories
              </summary>
              <ul className="absolute left-0 top-9 z-10 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {categoryItems.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={category.href}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-sky-700"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          {navigationItems.slice(3).map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="transition hover:text-sky-700">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
