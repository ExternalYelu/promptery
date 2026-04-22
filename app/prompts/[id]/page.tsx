import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { PromptPageClient } from "./prompt-page-client";
import { prompts } from "@/lib/prompts";

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = prompts.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `${p.title} — Promptery`,
    description: p.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = prompts.find((x) => x.id === id);
  if (!prompt) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <Link
          href="/"
          className="text-[12px] text-white/50 hover:text-white"
        >
          ← Back to library
        </Link>
      </div>
      <PromptPageClient prompt={prompt} />
    </div>
  );
}
