'use client';
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import Topbar from "../../components/layout/Topbar";
import Footer from "../../components/layout/Footer";

const teamMembers = [
  {
    name: "Dr. Aisha Patel",
    role: "Chief Pharmacist",
    credentials: "B.Pharm, RPh License #PH2891",
    bio: "20 years experience in community pharmacy. Specializes in medication counseling for chronic conditions."
  },
  {
    name: "James Chen",
    role: "Operations Director",
    credentials: "MBA, Pharmacy Management Certification",
    bio: "Ensures HIPAA compliance and quality standards across all operations."
  },
];

export default function AboutPage() {
  return (
    <section className="flex flex-col">
      <Topbar />
      <Navbar />
      <main className="page-shell">
        {/* Mission Section */}
        <section className="py-16 border-b">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">About Dimboola Pharmacy</h1>
            <p className="text-lg text-slate-700 mb-4">
              Founded in 2015, Dimboola serves over 5,000 patients monthly with licensed pharmacists and accessible telehealth.
            </p>
            <p className="text-slate-600">
              We partner with local clinics and hospitals to bridge prescription access gaps in underserved communities.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 border-b">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Our Licensed Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="border rounded-lg p-6 hover:shadow-md transition">
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-emerald-600 font-medium">{member.role}</p>
                <p className="text-xs text-slate-500 mt-1">{member.credentials}</p>
                <p className="text-slate-700 mt-3 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 border-b">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Verified & Certified</h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Licensed Pharmacy - Registration #PH-09428 (State Board of Pharmacy)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>HIPAA Compliant - All patient data encrypted and protected</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>DEA Registered - Authorized to dispense controlled substances</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Accredited by NABP - Verified Internet Pharmacy Practice Sites (VIPPS)</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to Start?</h2>
          <div className="flex gap-4">
            <Link href="/shop" className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              Browse Medicines
            </Link>
            <Link href="/upload-prescription" className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50">
              Upload Prescription
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
}