"use client";

import { useState } from "react";
import type { AiTarget } from "@/lib/prompts";
import type { ThemeEntry } from "@/lib/themes";
import { AI_TARGET_META } from "@/lib/ai-targets";
import { track } from "@/lib/analytics";

const TARGETS: AiTarget[] = ["chatgpt", "claude", "v0", "cursor"];

export function ThemeCopyPanel({ theme }: { theme: ThemeEntry }) {
  const [target, setTarget] = useState<AiTarget>("chatgpt");
  const [copied, setCopied] = useState(false);

  const text = theme.prompts[target];

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    track("copy_theme_prompt", { themeId: theme.id, target });
    setTimeout(() => setCopied(false), 1600);
  };

  const open = () => {
    const meta = AI_TARGET_META[target];
    track("open_theme_prompt", { themeId: theme.id, target });
    if (target === "cursor") {
      navigator.clipboard.writeText(text).catch(() => {});
      alert("Prompt copied. Paste into Cursor's chat (⌘L).");
      return;
    }
    const url = meta.openUrl(text);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)]">
      <div className="border-b border-[color:var(--color-border)] px-4 py-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
          Prompt for
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TARGETS.map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`rounded-md border px-2.5 py-1 text-[12px] transition ${
                target === t
                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-white"
                  : "border-white/10 bg-white/[0.02] text-white/65 hover:text-white"
              }`}
            >
              {AI_TARGET_META[t].label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-[11px] text-white/45">
            {text.length.toLocaleString()} characters
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={open}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white/80 hover:bg-white/[0.06]"
            >
              ↗ {AI_TARGET_META[target].openLabel}
            </button>
            <button
              onClick={copy}
              className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition ${
                copied
                  ? "bg-emerald-400 text-black"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              {copied ? "✓ Copied" : "Copy prompt"}
            </button>
          </div>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-auto px-4 py-3">
        <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.65] text-white/85">
          {text}
        </pre>
      </div>
    </div>
  );
}
