"use client";

import { useEffect, useState } from "react";
import type { AiTarget, PromptEntry } from "@/lib/prompts";
import { previewRegistry } from "./preview-registry";

const TARGETS: { id: AiTarget; label: string; hint: string }[] = [
  { id: "chatgpt", label: "ChatGPT", hint: "GPT-style, descriptive" },
  { id: "claude", label: "Claude", hint: "Structured, explicit" },
  { id: "v0", label: "v0", hint: "Terse, visual" },
  { id: "cursor", label: "Cursor", hint: "Implementation-ready" },
];

export function PromptDetail({
  prompt,
  onClose,
}: {
  prompt: PromptEntry | null;
  onClose: () => void;
}) {
  const [target, setTarget] = useState<AiTarget>("chatgpt");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prompt) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [prompt, onClose]);

  useEffect(() => {
    setCopied(false);
    setTarget("chatgpt");
  }, [prompt]);

  if (!prompt) return null;

  const Preview = previewRegistry[prompt.id];
  const text = prompt.prompts[target];

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-[1100px] flex-col overflow-hidden border-l border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)] shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[color:var(--color-border)] px-6 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-white/45">
              <span className="font-mono uppercase tracking-wider">
                {prompt.category}
              </span>
              <span>•</span>
              <span>{prompt.tags.join(" / ")}</span>
            </div>
            <div className="mt-0.5 truncate text-[16px] font-semibold tracking-tight text-white">
              {prompt.title}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white/75 hover:bg-white/[0.06]"
              aria-label="Bookmark"
              title="Bookmark"
            >
              ☆ Save
            </button>
            <button
              onClick={onClose}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white/75 hover:bg-white/[0.06]"
            >
              Close
              <span className="ml-1.5 font-mono text-[10px] text-white/40">
                ESC
              </span>
            </button>
          </div>
        </div>

        {/* Body: split */}
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
          {/* Preview */}
          <div className="relative flex min-h-0 items-center justify-center overflow-hidden border-b border-[color:var(--color-border)] bg-[#070710] p-8 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 grid-lines opacity-60" />
            <div className="relative aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)]">
              {Preview ? <Preview /> : null}
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-white/65 backdrop-blur">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live preview
            </div>
          </div>

          {/* Prompt panel */}
          <div className="flex min-h-0 flex-col">
            <div className="border-b border-[color:var(--color-border)] px-5 pt-4">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                Prompt for
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TARGETS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTarget(t.id)}
                    className={`group flex flex-col items-start rounded-md border px-3 py-1.5 text-left transition ${
                      target === t.id
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-white"
                        : "border-white/10 bg-white/[0.02] text-white/65 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="text-[12px] font-medium leading-none">
                      {t.label}
                    </span>
                    <span className="mt-0.5 text-[10px] text-white/40">
                      {t.hint}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 mb-3 flex items-center justify-between">
                <div className="text-[11px] text-white/45">
                  {text.length.toLocaleString()} characters
                </div>
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
            <div className="relative min-h-0 flex-1 overflow-auto px-5 py-4">
              <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-[1.65] text-white/85">
                {text}
              </pre>
            </div>
            <div className="border-t border-[color:var(--color-border)] px-5 py-3 text-[11px] text-white/45">
              Tip: tweak colors, copy, and scale in the prompt before pasting —
              small changes give big style shifts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
