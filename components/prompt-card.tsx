"use client";

import { previewRegistry } from "./preview-registry";
import type { PromptEntry } from "@/lib/prompts";

export function PromptCard({
  prompt,
  onOpen,
}: {
  prompt: PromptEntry;
  onOpen: () => void;
}) {
  const Preview = previewRegistry[prompt.id];

  return (
    <button
      onClick={onOpen}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--color-border-strong)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
    >
      {/* Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--color-border)] bg-[#0a0a12]">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
          {Preview ? <Preview /> : <div className="h-full w-full" />}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Hover CTA */}
        <div className="pointer-events-none absolute bottom-3 right-3 translate-y-1 rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
          View prompt →
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold tracking-tight text-white">
              {prompt.title}
            </div>
            <div className="mt-0.5 line-clamp-2 text-[12px] text-white/55">
              {prompt.summary}
            </div>
          </div>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {prompt.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
