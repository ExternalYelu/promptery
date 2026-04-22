import type { AiTarget } from "@/lib/prompts";

export const AI_TARGET_META: Record<
  AiTarget,
  { label: string; hint: string; openLabel: string; openUrl: (p: string) => string }
> = {
  chatgpt: {
    label: "ChatGPT",
    hint: "GPT-style, descriptive",
    openLabel: "Open in ChatGPT",
    openUrl: (p) =>
      `https://chat.openai.com/?q=${encodeURIComponent(p).slice(0, 1800)}`,
  },
  claude: {
    label: "Claude",
    hint: "Structured, explicit",
    openLabel: "Open in Claude",
    openUrl: (p) =>
      `https://claude.ai/new?q=${encodeURIComponent(p).slice(0, 1800)}`,
  },
  v0: {
    label: "v0",
    hint: "Terse, visual",
    openLabel: "Open in v0",
    openUrl: (p) => `https://v0.dev/?q=${encodeURIComponent(p).slice(0, 1800)}`,
  },
  cursor: {
    label: "Cursor",
    hint: "Implementation-ready",
    openLabel: "Copy for Cursor",
    // Cursor has no public prompt URL. We just copy.
    openUrl: () => "",
  },
};
