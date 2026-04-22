import Link from "next/link";
import { Header } from "@/components/header";
import { caseStudies } from "@/lib/case-studies";

export const metadata = {
  title: "Case studies — Promptery",
  description:
    "Real stories of what teams built with AI design prompts — structure, style, and ship.",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
          Case studies
        </div>
        <h1 className="mt-2 text-[40px] font-semibold tracking-tight text-white">
          How real teams ship with prompts.
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-white/60">
          Short, honest reports on what worked, what didn&apos;t, and which
          prompts to copy.
        </p>

        <ul className="mt-10 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
          {caseStudies.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="group flex items-start gap-6 py-6 transition-colors hover:bg-white/[0.02]"
              >
                <div
                  className="mt-1.5 h-10 w-10 shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${c.accent}, transparent 70%), #141420`,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[20px] font-semibold tracking-tight text-white group-hover:text-white">
                    {c.title}
                  </div>
                  <p className="mt-1 text-[14px] text-white/60">{c.deck}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-white/40">
                    <span>{c.author}</span>
                    <span>·</span>
                    <span>{c.readingTime} read</span>
                  </div>
                </div>
                <div className="mt-2 text-white/40 group-hover:text-white">
                  ↗
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
