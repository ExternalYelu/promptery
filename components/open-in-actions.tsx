"use client";

import type { AiTarget } from "@/lib/prompts";
import { AI_TARGET_META } from "@/lib/ai-targets";
import { track } from "@/lib/analytics";

export function OpenInActions({
  target,
  prompt,
  promptId,
}: {
  target: AiTarget;
  prompt: string;
  promptId: string;
}) {
  const meta = AI_TARGET_META[target];

  const open = async () => {
    track("open_in_ai", { target, promptId });
    if (target === "cursor") {
      try {
        await navigator.clipboard.writeText(prompt);
      } catch {
        /* ignore */
      }
      alert(
        "Prompt copied. Paste into Cursor's chat (⌘L) — Cursor has no public deep-link URL."
      );
      return;
    }
    const url = meta.openUrl(prompt);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={open}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white/80 hover:bg-white/[0.06]"
      title={meta.openLabel}
    >
      <span>↗</span>
      {meta.openLabel}
    </button>
  );
}
