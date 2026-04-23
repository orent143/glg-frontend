type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

function fromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const title = fromSlug(slug).replace("And", "&");

  return (
    <main className="page-shell py-12">
      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-3 max-w-2xl text-slate-700">
        Browse available items in the {title} category. Product filtering and listing integration can be added next.
      </p>
    </main>
  );
}
