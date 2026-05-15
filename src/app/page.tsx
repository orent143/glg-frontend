import HeroSection from "../components/sections/landingPage/HeroSection";
import Navbar from "../components/layout/Navbar";
import Topbar from "../components/layout/Topbar";
import FeaturedBrands from "../components/sections/landingPage/FeaturedBrands";
import Categories from "../components/sections/landingPage/Categories";
import Promos, { PromoCardOnly } from "../components/sections/landingPage/Promos";
import DiscountedProducts from "../components/sections/landingPage/DiscountedProducts";
import BestSellingProducts from "../components/sections/landingPage/BestSellingProducts";
import FeaturedProducts from "../components/sections/landingPage/FeaturedProducts";
import UploadPrescription from "../components/sections/landingPage/UploadPrescription";
import HealthTips from "../components/sections/landingPage/HealthTips";
import Testimonials from "../components/sections/landingPage/Testimonials";
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
