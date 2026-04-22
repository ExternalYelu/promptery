"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { prompts } from "@/lib/prompts";
import { themes } from "@/lib/themes";

type Item = {
  id: string;
  group: "Prompts" | "Themes" | "Actions";
  label: string;
  hint?: string;
  href?: string;
  run?: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const allItems = useMemo<Item[]>(() => {
    const p: Item[] = prompts.map((pr) => ({
      id: `p-${pr.id}`,
      group: "Prompts",
      label: pr.title,
      hint: pr.category,
      href: `/prompts/${pr.id}`,
    }));
    const t: Item[] = themes.map((th) => ({
      id: `t-${th.id}`,
      group: "Themes",
      label: th.name,
      hint: `${th.mode} · ${th.typeface}`,
      href: `/themes/${th.id}`,
    }));
    const a: Item[] = [
      {
        id: "a-home",
        group: "Actions",
        label: "Go to library",
        href: "/",
      },
      {
        id: "a-themes",
        group: "Actions",
        label: "Browse themes",
        href: "/themes",
      },
      {
        id: "a-submit",
        group: "Actions",
        label: "Submit a prompt",
        href: "/submit",
      },
      {
        id: "a-cases",
        group: "Actions",
        label: "Read case studies",
        href: "/case-studies",
      },
    ];
    return [...a, ...p, ...t];
  }, []);

  // Fuzzy-ish filter: substring over label+hint
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 40);
    return allItems
      .map((it) => {
        const hay = (it.label + " " + (it.hint ?? "")).toLowerCase();
        const idx = hay.indexOf(q);
        return idx === -1 ? null : { it, score: idx };
      })
      .filter((x): x is { it: Item; score: number } => !!x)
      .sort((a, b) => a.score - b.score)
      .slice(0, 30)
      .map((x) => x.it);
  }, [allItems, query]);

  const grouped = useMemo(() => {
    const g: Record<string, Item[]> = { Actions: [], Prompts: [], Themes: [] };
    filtered.forEach((it) => g[it.group].push(it));
    const order: Item[] = [...g.Actions, ...g.Prompts, ...g.Themes];
    return { g, order };
  }, [filtered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isToggle =
        (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isToggle) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const select = (it: Item) => {
    setOpen(false);
    if (it.href) router.push(it.href);
    if (it.run) it.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, grouped.order.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = grouped.order[active];
      if (pick) select(pick);
    }
  };

  if (!open) return null;

  let idx = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#141420] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="text-white/40">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search prompts, themes, actions…"
            className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/35 focus:outline-none"
          />
          <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/55">
            ESC
          </span>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {(["Actions", "Prompts", "Themes"] as const).map((group) => {
            const items = grouped.g[group];
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-white/35">
                  {group}
                </div>
                {items.map((it) => {
                  idx += 1;
                  const isActive = idx === active;
                  return (
                    <button
                      key={it.id}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => select(it)}
                      className={`relative flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] ${
                        isActive
                          ? "bg-[color:var(--color-accent-soft)] text-white"
                          : "text-white/75"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-0.5 bg-[color:var(--color-accent)]" />
                      )}
                      <span className="flex-1">{it.label}</span>
                      {it.hint && (
                        <span className="text-[11px] text-white/40">
                          {it.hint}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-[13px] text-white/40">
              No matches for “{query}”.
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 bg-white/[0.02] px-3 py-1.5 text-[10px] text-white/40">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto">ESC close</span>
        </div>
      </div>
    </div>
  );
}
