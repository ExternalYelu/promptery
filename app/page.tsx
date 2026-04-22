"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PromptCard } from "@/components/prompt-card";
import { PromptDetail } from "@/components/prompt-detail";
import { categories, prompts, type Category } from "@/lib/prompts";

type Filter = Category | "all";

const SORTS = ["Popular", "Newest", "Most copied"] as const;

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Popular");
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: prompts.length };
    for (const cat of categories) c[cat.id] = 0;
    for (const p of prompts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      );
    });
  }, [filter, query]);

  const activeCategoryLabel =
    filter === "all"
      ? "All prompts"
      : categories.find((c) => c.id === filter)?.label;

  const openPrompt = openId ? prompts.find((p) => p.id === openId) ?? null : null;

  return (
    <div className="min-h-screen">
      <Header query={query} onQuery={setQuery} />

      {/* Hero strip */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-border)]">
        <div className="absolute inset-0 grid-lines" />
        <div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute -left-24 top-10 h-[260px] w-[260px] rounded-full bg-sky-500/15 blur-[120px]" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-12 md:py-16">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-emerald-400 align-middle" />
              {prompts.length} production-ready prompts
            </span>
            <span className="font-mono text-[11px] text-white/35">
              updated weekly
            </span>
          </div>

          <h1 className="max-w-3xl text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-[56px]">
            UI design prompts,
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
              previewed before you paste.
            </span>
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/60">
            See exactly what an AI will build, then copy the prompt tuned for
            ChatGPT, Claude, v0, or Cursor. No more guesswork, no more rework.
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <button className="rounded-md bg-white px-4 py-2 text-[13px] font-medium text-black hover:bg-white/90">
              Browse library ↓
            </button>
            <button className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-white/80 hover:bg-white/[0.06]">
              How it works
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto flex max-w-[1440px] gap-0 px-0">
        <Sidebar active={filter} onChange={setFilter} counts={counts} />

        <main className="min-w-0 flex-1 px-6 py-8">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                Library
              </div>
              <div className="text-[20px] font-semibold tracking-tight text-white">
                {activeCategoryLabel}
                <span className="ml-2 font-mono text-[13px] font-normal text-white/40">
                  {filtered.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-md border border-white/10 bg-white/[0.02] p-0.5">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`rounded px-2.5 py-1 text-[12px] transition ${
                      sort === s
                        ? "bg-white/[0.08] text-white"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-xl border border-dashed border-white/10 py-24 text-center">
              <div className="text-[14px] text-white/70">
                No prompts match “{query}”.
              </div>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/80 hover:bg-white/[0.06]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <PromptCard
                  key={p.id}
                  prompt={p}
                  onOpen={() => setOpenId(p.id)}
                />
              ))}
            </div>
          )}

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-border)] pt-6 text-[12px] text-white/40">
            <div>
              © {new Date().getFullYear()} Promptery · Curated with care.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/70">
                GitHub
              </a>
              <a href="#" className="hover:text-white/70">
                X / Twitter
              </a>
              <a href="#" className="hover:text-white/70">
                RSS
              </a>
            </div>
          </footer>
        </main>
      </div>

      <PromptDetail prompt={openPrompt} onClose={() => setOpenId(null)} />
    </div>
  );
}
