"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { BrowserFrame } from "@/components/browser-frame";
import { ThemedLanding } from "@/components/themed-landing";
import { ThemeSwatch } from "@/components/theme-swatch";
import { themes, type ThemeMode, type ThemeTypeface } from "@/lib/themes";

type ModeFilter = "all" | ThemeMode;
type TypeFilter = "all" | ThemeTypeface;

export default function ThemesPage() {
  const [mode, setMode] = useState<ModeFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(themes[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return themes.filter((t) => {
      if (mode !== "all" && t.mode !== mode) return false;
      if (type !== "all" && t.typeface !== type) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q))
      );
    });
  }, [mode, type, query]);

  const active = themes.find((t) => t.id === activeId) ?? themes[0];
  const activeIndex = filtered.findIndex((t) => t.id === active.id);

  const prev = () => {
    if (filtered.length === 0) return;
    const i = activeIndex <= 0 ? filtered.length - 1 : activeIndex - 1;
    setActiveId(filtered[i].id);
  };
  const next = () => {
    if (filtered.length === 0) return;
    const i =
      activeIndex === -1 || activeIndex === filtered.length - 1
        ? 0
        : activeIndex + 1;
    setActiveId(filtered[i].id);
  };

  return (
    <div className="min-h-screen">
      <Header query={query} onQuery={setQuery} />

      <div className="mx-auto flex max-w-[1600px] gap-0">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[340px] shrink-0 flex-col overflow-hidden border-r border-[color:var(--color-border)] md:flex">
          <div className="px-6 pb-4 pt-6">
            <div className="text-[26px] font-semibold leading-none tracking-tight text-white">
              design<span className="text-white/40">/</span>themes
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">
              Drop these prompts into any AI assistant and ship beautiful,
              consistent interfaces in minutes.
            </p>
          </div>

          <div className="space-y-3 px-6 pb-3">
            <FilterRow label="MODE">
              {(["all", "light", "dark"] as ModeFilter[]).map((m) => (
                <Chip
                  key={m}
                  active={mode === m}
                  onClick={() => setMode(m)}
                  icon={m === "light" ? "☀" : m === "dark" ? "☾" : undefined}
                >
                  {m === "all" ? "All" : m[0].toUpperCase() + m.slice(1)}
                </Chip>
              ))}
            </FilterRow>
            <FilterRow label="TYPE">
              {(["all", "sans", "serif", "mono"] as TypeFilter[]).map((v) => (
                <Chip key={v} active={type === v} onClick={() => setType(v)}>
                  {v === "all" ? "All" : v[0].toUpperCase() + v.slice(1)}
                </Chip>
              ))}
            </FilterRow>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6">
            <ul className="space-y-1">
              {filtered.map((t, i) => {
                const isActive = t.id === active.id;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => setActiveId(t.id)}
                      className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                        isActive
                          ? "bg-white/[0.06] ring-1 ring-white/10"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <ThemeSwatch theme={t} size={34} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-medium text-white">
                          {t.name}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50">
                          <span>
                            {t.mode === "light" ? "☀" : "☾"}{" "}
                            {t.mode[0].toUpperCase() + t.mode.slice(1)}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-[12px] text-white/40">
                  No themes match your filters.
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-3 border-t border-[color:var(--color-border)] px-6 py-3 text-[11px] text-white/45">
            <span className="flex items-center gap-1.5">
              <Kbd>↑↓</Kbd>navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd>open
            </span>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-6 lg:p-8">
          {/* Top bar */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <ThemeSwatch theme={active} size={42} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-[18px] font-semibold tracking-tight text-white">
                  {active.name}
                </div>
                <Tag>
                  {active.mode === "light" ? "☀" : "☾"}{" "}
                  {active.mode[0].toUpperCase() + active.mode.slice(1)}
                </Tag>
                <Tag>
                  <span className="font-mono">T</span>{" "}
                  {active.typeface[0].toUpperCase() + active.typeface.slice(1)}
                </Tag>
              </div>
              <div className="mt-1 line-clamp-1 text-[12.5px] text-white/55">
                {active.description}
              </div>
            </div>

            <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03]">
              <IconButton onClick={prev} label="Previous">
                ‹
              </IconButton>
              <div className="h-5 w-px bg-white/10" />
              <IconButton onClick={next} label="Next">
                ›
              </IconButton>
            </div>

            <Link
              href={`/themes/${active.id}`}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[12.5px] font-medium text-white hover:bg-white/[0.06]"
            >
              <span>📄</span>
              Get Prompt
            </Link>
            <Link
              href={`/themes/${active.id}`}
              className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[12.5px] font-medium text-black hover:bg-white/90"
            >
              Open <span>↗</span>
            </Link>
          </div>

          <BrowserFrame
            url={`designprompts.dev/${active.id}`}
            tabs={[active.name, "New Tab"]}
          >
            <ThemedLanding theme={active} />
          </BrowserFrame>
        </main>
      </div>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 font-mono text-[10px] tracking-[0.15em] text-white/35">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-1">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] transition ${
        active
          ? "bg-white text-black"
          : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
      }`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/75">
      {children}
    </span>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-8 w-8 place-items-center text-white/70 hover:text-white"
    >
      {children}
    </button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/70">
      {children}
    </span>
  );
}
