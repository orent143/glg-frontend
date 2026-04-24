export const siteRoutes = {
  home: "/",
  shop: "/shop",
  prescriptions: "/prescriptions",
  services: "/services",
  about: "/about",
  account: "/account",
  cart: "/cart",
  uploadPrescription: "/upload-prescription",

  category: (slug: string) => `/categories/${slug}` as `/categories/${string}`,
  product: (slug: string) => `/products/${slug}` as `/products/${string}`,
} as const;

export const navigationItems = [
  { label: "HOME", href: siteRoutes.home },
  { label: "SHOP", href: siteRoutes.shop },
  { label: "PRESCRIPTIONS", href: siteRoutes.prescriptions },
  { label: "SERVICES", href: siteRoutes.services },
  { label: "ABOUT", href: siteRoutes.about },
] as const;

export const categoryItems = [
  { label: "Pain Relief", slug: "pain-relief", href: siteRoutes.category("pain-relief") },
  { label: "Vitamins", slug: "vitamins", href: siteRoutes.category("vitamins") },
  { label: "Cold & Flu", slug: "cold-flu", href: siteRoutes.category("cold-flu") },
  { label: "Skin Care", slug: "skin-care", href: siteRoutes.category("skin-care") },
  { label: "Baby Care", slug: "baby-care", href: siteRoutes.category("baby-care") },
  { label: "Diabetes Care", slug: "diabetes-care", href: siteRoutes.category("diabetes-care") },
  { label: "First Aid", slug: "first-aid", href: siteRoutes.category("first-aid") },
] as const;

export const heroActions = [
  { label: "Shop Medicines", href: siteRoutes.shop, variant: "primary" as const },
  { label: "Upload Prescription", href: siteRoutes.uploadPrescription, variant: "secondary" as const },
] as const;
