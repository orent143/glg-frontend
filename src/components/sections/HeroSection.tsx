import Image from "next/image";
import Link from "next/link";
import heroImage from "../../assets/image 7 (1).png";
import { heroActions } from "../../routes/siteRoutes";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[58vh] overflow-hidden rounded-[2rem] bg-slate-100">
      <Image
        src={heroImage}
        alt="A pharmacist helping a customer choose medicine"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/35" />

      <div className="relative z-10 flex min-h-[58vh] max-w-2xl flex-col justify-center gap-5 p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Trusted Community Care</p>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
          Your Health Comes First at GLG Pharmacy
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-700 md:text-lg">
          Shop quality medicines, refill prescriptions fast, and get friendly support from licensed pharmacists.
        </p>
        <div className="flex flex-wrap pt-2 rounded-[10px]">
          {heroActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={
                action.variant === "primary"
                  ? "bg-[#A70000] px-6 py-3 text-sm font-extralight text-white transition hover:bg-[#A70000]/50 rounded-tl-[10px] rounded-bl-[10px]"
                  : "border border-[#000000]/30 bg-white/80 px-6 py-3 text-sm font-extralight text-[#333333] transition hover:bg-sky-50 rounded-tr-[10px] rounded-br-[10px]"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
