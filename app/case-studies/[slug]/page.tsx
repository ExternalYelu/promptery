import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { caseStudies } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: `${c.title} — Promptery`, description: c.deck };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <article className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/case-studies"
          className="text-[12px] text-white/50 hover:text-white"
        >
          ← All case studies
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${c.accent}, transparent 70%), #141420`,
            }}
          />
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
            Case study
          </div>
        </div>

        <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-white">
          {c.title}
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-white/70">
          {c.deck}
        </p>
        <div className="mt-3 flex items-center gap-3 text-[12px] text-white/45">
          <span>{c.author}</span>
          <span>·</span>
          <span>{c.readingTime} read</span>
        </div>

        <div className="mt-10 space-y-8">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[20px] font-semibold tracking-tight text-white">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-4">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.7] text-white/75">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
