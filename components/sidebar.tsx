"use client";

import { categories, type Category } from "@/lib/prompts";

type Filter = Category | "all";

export function Sidebar({
  active,
  onChange,
  counts,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
  counts: Record<string, number>;
}) {
  const items: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All prompts", count: counts.all },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: counts[c.id] ?? 0,
    })),
  ];

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-[color:var(--color-border)] px-3 py-5 md:block">
      <div className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
        Browse
      </div>
      <ul className="space-y-0.5">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <button
                onClick={() => onChange(it.id)}
                className={`group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[13px] transition-colors ${
                  isActive
                    ? "bg-[color:var(--color-accent-soft)] text-white"
                    : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                  )}
                  <span className={isActive ? "" : "pl-3.5"}>{it.label}</span>
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] tabular-nums ${
                    isActive
                      ? "bg-white/10 text-white/80"
                      : "text-white/35 group-hover:text-white/55"
                  }`}
                >
                  {it.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
        Collections
      </div>
      <ul className="space-y-0.5">
        {["Bookmarked", "Trending this week", "Most copied"].map((l) => (
          <li key={l}>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-white/65 hover:bg-white/[0.04] hover:text-white">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{l}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-lg border border-[color:var(--color-border)] bg-gradient-to-br from-violet-500/10 to-fuchsia-500/[0.02] p-3">
        <div className="text-[12px] font-medium text-white">
          Got a great prompt?
        </div>
        <div className="mt-0.5 text-[11px] leading-relaxed text-white/55">
          Share it with the community and get credited.
        </div>
        <button className="mt-3 w-full rounded-md bg-white px-2 py-1.5 text-[12px] font-medium text-black hover:bg-white/90">
          Submit prompt →
        </button>
      </div>
    </aside>
  );
}
