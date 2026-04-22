"use client";

import { useState } from "react";
import type { PromptEntry } from "@/lib/prompts";
import { PromptDetail } from "@/components/prompt-detail";
import { PromptCard } from "@/components/prompt-card";

export function PromptPageClient({ prompt }: { prompt: PromptEntry }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-20">
      <div className="grid grid-cols-1 gap-6 md:max-w-xl">
        <PromptCard prompt={prompt} onOpen={() => setOpen(true)} />
      </div>
      {open && (
        <PromptDetail prompt={prompt} onClose={() => setOpen(false)} />
      )}
      {!open && (
        <div className="mt-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-white px-3 py-2 text-[12px] font-medium text-black hover:bg-white/90"
          >
            Reopen details
          </button>
        </div>
      )}
    </div>
  );
}
