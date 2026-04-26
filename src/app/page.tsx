import HeroSection from "../components/sections/HeroSection";
import Navbar from "../components/layout/Navbar";
import Topbar from "../components/layout/Topbar";
import FeaturedBrands from "../components/sections/FeaturedBrands";
import Categories from "../components/sections/Categories";
import Promos, { PromoCardOnly } from "../components/sections/Promos";
import DiscountedProducts from "../components/sections/DiscountedProducts";
import BestSellingProducts from "../components/sections/BestSellingProducts";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import UploadPrescription from "../components/sections/UploadPrescription";
import HealthTips from "../components/sections/HealthTips";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-slate-800">
      <header className="border-b border-slate-200">
        <Topbar />
        <Navbar />
      </header>

      <main>
        <HeroSection />
        <FeaturedBrands />
        <Categories />
        <Promos />
        <DiscountedProducts />
        <BestSellingProducts />
        <PromoCardOnly />
        <FeaturedProducts />
        <UploadPrescription />
        <HealthTips />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
