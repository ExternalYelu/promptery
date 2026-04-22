import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { BrowserFrame } from "@/components/browser-frame";
import { ThemedLanding } from "@/components/themed-landing";
import { ThemeSwatch } from "@/components/theme-swatch";
import { ThemeCopyPanel } from "./copy-panel";
import { themes } from "@/lib/themes";

export function generateStaticParams() {
  return themes.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = themes.find((x) => x.id === id);
  if (!t) return {};
  return {
    title: `${t.name} theme — Promptery`,
    description: t.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const theme = themes.find((x) => x.id === id);
  if (!theme) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <Link
          href="/themes"
          className="text-[12px] text-white/50 hover:text-white"
        >
          ← All themes
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <ThemeSwatch theme={theme} size={56} />
          <div className="min-w-0 flex-1">
            <h1 className="text-[28px] font-semibold tracking-tight text-white">
              {theme.name}
            </h1>
            <p className="mt-1 max-w-2xl text-[14px] text-white/60">
              {theme.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {theme.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <BrowserFrame
              url={`designprompts.dev/${theme.id}`}
              tabs={[theme.name]}
            >
              <ThemedLanding theme={theme} />
            </BrowserFrame>
          </div>
          <ThemeCopyPanel theme={theme} />
        </div>
      </div>
    </div>
  );
}
