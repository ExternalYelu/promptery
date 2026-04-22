"use client";

import { useState } from "react";
import { Logo } from "./logo";

export function Header({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (q: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-6">
        <Logo />

        <nav className="ml-4 hidden items-center gap-1 text-[13px] md:flex">
          {["Library", "Collections", "Changelog"].map((l, i) => (
            <a
              key={l}
              href="#"
              className={`rounded-md px-2.5 py-1.5 transition-colors ${
                i === 0
                  ? "bg-white/[0.06] text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div
            className={`hidden items-center gap-2 rounded-md border px-2.5 py-1.5 transition-colors md:flex ${
              focused
                ? "border-[color:var(--color-accent)] bg-white/[0.04]"
                : "border-[color:var(--color-border)] bg-white/[0.02]"
            }`}
          >
            <svg
              className="h-3.5 w-3.5 text-white/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search prompts…"
              className="w-56 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none"
            />
            <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/50">
              ⌘K
            </span>
          </div>

          <button className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/80 hover:bg-white/[0.06]">
            Sign in
          </button>
          <button className="rounded-md bg-white px-3 py-1.5 text-[13px] font-medium text-black hover:bg-white/90">
            Submit prompt
          </button>
        </div>
      </div>
    </header>
  );
}
