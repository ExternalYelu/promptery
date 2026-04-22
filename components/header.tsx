"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { ModeToggle } from "./theme-mode";

type Props = {
  query?: string;
  onQuery?: (q: string) => void;
};

const NAV = [
  { href: "/", label: "Library" },
  { href: "/themes", label: "Themes" },
  { href: "/case-studies", label: "Case studies" },
];

export function Header({ query, onQuery }: Props) {
  const [focused, setFocused] = useState(false);
  const [mac, setMac] = useState(true);
  const pathname = usePathname() || "/";

  useEffect(() => {
    setMac(
      typeof navigator !== "undefined" &&
        /mac/i.test(navigator.platform || navigator.userAgent)
    );
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 text-[13px] md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-md px-2.5 py-1.5 transition-colors ${
                isActive(n.href)
                  ? "bg-white/[0.06] text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {typeof onQuery === "function" ? (
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
                value={query ?? ""}
                onChange={(e) => onQuery?.(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search prompts…"
                className="w-56 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none"
              />
              <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                {mac ? "⌘K" : "Ctrl K"}
              </span>
            </div>
          ) : (
            <button
              onClick={() => {
                const e = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  ctrlKey: true,
                  bubbles: true,
                });
                window.dispatchEvent(e);
              }}
              className="hidden items-center gap-2 rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-2.5 py-1.5 text-[13px] text-white/60 hover:text-white md:flex"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span>Search…</span>
              <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                {mac ? "⌘K" : "Ctrl K"}
              </span>
            </button>
          )}

          <ModeToggle />

          <button className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/80 hover:bg-white/[0.06]">
            Sign in
          </button>
          <Link
            href="/submit"
            className="rounded-md bg-white px-3 py-1.5 text-[13px] font-medium text-black hover:bg-white/90"
          >
            Submit prompt
          </Link>
        </div>
      </div>
    </header>
  );
}
