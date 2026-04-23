const upcomingSections = [
  {
    title: "Popular Products",
    description: "Featured medicines and wellness essentials your family uses most.",
  },
  {
    title: "Prescription Refill",
    description: "Refill recurring prescriptions in minutes with guided pharmacist review.",
  },
  {
    title: "Health Services",
    description: "Book blood pressure checks and basic consultations from our care team.",
  },
];

export default function UpcomingSections() {
  return (
    <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 md:mt-10 md:p-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">Coming Up</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Upcoming Homepage Sections</h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {upcomingSections.map((section) => (
          <article key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{section.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
