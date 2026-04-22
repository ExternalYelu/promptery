import type { ReactNode } from "react";

export function BrowserFrame({
  url = "acme.com",
  title = "Acme Inc.",
  tabs = ["Acme Inc.", "New Tab"],
  children,
  compact = false,
}: {
  url?: string;
  title?: string;
  tabs?: string[];
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1b1b22] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)]">
      {/* Tab row */}
      <div className="flex items-end gap-1 bg-[#111117] px-3 pt-2.5">
        <div className="mr-3 flex items-center gap-1.5 pb-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {tabs.map((t, i) => (
          <div
            key={`${t}-${i}`}
            className={`flex min-w-0 max-w-[180px] items-center gap-1.5 rounded-t-md px-3 py-1.5 text-[11px] ${
              i === 0
                ? "bg-[#1b1b22] text-white"
                : "text-white/40"
            }`}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-white/70" />
            <span className="truncate">{t}</span>
            {i === 0 && (
              <span className="ml-1 text-white/35 hover:text-white">×</span>
            )}
          </div>
        ))}
      </div>

      {/* URL bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#1b1b22] px-3 py-2">
        <div className="flex items-center gap-0.5 text-white/40">
          <button className="px-1 hover:text-white/70">‹</button>
          <button className="px-1 hover:text-white/70">›</button>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-black/40 px-3 py-1.5 text-[12px] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="truncate font-mono">{url}</span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`relative ${compact ? "min-h-[360px]" : "min-h-[640px]"}`}
      >
        {children}
      </div>
    </div>
  );
}
