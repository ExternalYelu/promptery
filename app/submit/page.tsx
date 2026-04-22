"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { categories } from "@/lib/prompts";
import { track } from "@/lib/analytics";

export default function SubmitPage() {
  const [state, setState] = useState({
    title: "",
    category: categories[0].id as string,
    summary: "",
    prompt: "",
    tags: "",
    author: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof typeof state>(k: K, v: (typeof state)[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to Supabase/Convex. For now, store locally.
    try {
      const key = "promptery.submissions.v1";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ ...state, submittedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      /* ignore */
    }
    track("submit_prompt", { title: state.title, category: state.category });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-[32px] font-semibold tracking-tight text-white">
          Submit a prompt
        </h1>
        <p className="mt-2 text-[14px] text-white/60">
          Share something you&apos;ve shipped with ChatGPT, Claude, v0, or
          Cursor. We&apos;ll preview it, polish the wording, and credit you.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <div className="text-[16px] font-medium text-white">
              ✓ Thanks — your submission is queued.
            </div>
            <p className="mt-1 text-[13px] text-white/70">
              Saved locally for now. Hooking up a real backend
              (Supabase/Convex) is next on the roadmap.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setState({
                  title: "",
                  category: categories[0].id,
                  summary: "",
                  prompt: "",
                  tags: "",
                  author: "",
                });
              }}
              className="mt-4 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/80 hover:bg-white/[0.06]"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4">
            <Field label="Title">
              <input
                required
                value={state.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls}
                placeholder="e.g. Holographic CTA Button"
              />
            </Field>
            <Field label="Category">
              <select
                value={state.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#141420]">
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tags">
              <input
                value={state.tags}
                onChange={(e) => set("tags", e.target.value)}
                className={inputCls}
                placeholder="comma, separated, tags"
              />
            </Field>
            <Field label="Summary">
              <textarea
                required
                rows={2}
                value={state.summary}
                onChange={(e) => set("summary", e.target.value)}
                className={inputCls}
                placeholder="One sentence describing the outcome."
              />
            </Field>
            <Field label="Prompt">
              <textarea
                required
                rows={8}
                value={state.prompt}
                onChange={(e) => set("prompt", e.target.value)}
                className={`${inputCls} font-mono`}
                placeholder="Paste your best working prompt here."
              />
            </Field>
            <Field label="Author (optional)">
              <input
                value={state.author}
                onChange={(e) => set("author", e.target.value)}
                className={inputCls}
                placeholder="@yourhandle"
              />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="rounded-md bg-white px-4 py-2 text-[13px] font-medium text-black hover:bg-white/90"
              >
                Submit prompt
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-white/35 focus:border-[color:var(--color-accent)] focus:outline-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
        {label}
      </div>
      {children}
    </label>
  );
}
