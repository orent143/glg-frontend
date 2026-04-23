import HeroSection from "../components/sections/HeroSection";
import Navbar from "../components/layout/Navbar";
import Topbar from "../components/layout/Topbar";
import UpcomingSections from "../components/sections/UpcomingSections";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-slate-800">
      <header className="border-b border-slate-200">
        <Topbar />
        <Navbar />
      </header>

      <main>
        <HeroSection />
        <UpcomingSections />
      </main>
    </div>
  );
}
