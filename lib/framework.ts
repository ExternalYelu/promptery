export type Framework =
  | "tailwind"
  | "shadcn"
  | "vanilla-css"
  | "chakra"
  | "mui"
  | "html";

export const FRAMEWORKS: { id: Framework; label: string; hint: string }[] = [
  { id: "tailwind", label: "Tailwind", hint: "Default" },
  { id: "shadcn", label: "shadcn/ui", hint: "Tailwind + shadcn" },
  { id: "vanilla-css", label: "Vanilla CSS", hint: "No framework" },
  { id: "chakra", label: "Chakra UI", hint: "@chakra-ui/react" },
  { id: "mui", label: "MUI", hint: "@mui/material" },
  { id: "html", label: "Plain HTML", hint: "Single file" },
];

const INSTRUCTIONS: Record<Framework, string> = {
  tailwind: "Use TailwindCSS utility classes throughout. No UI library.",
  shadcn:
    "Use TailwindCSS + shadcn/ui primitives (Button, Card, Input, etc.) with their conventional import paths.",
  "vanilla-css":
    "Do NOT use TailwindCSS or any UI library. Use plain hand-written CSS in a <style> block with modern features (custom properties, logical properties, container queries where appropriate). Keep class names semantic.",
  chakra:
    "Use Chakra UI (`@chakra-ui/react`) components and the `sx` prop / style props. Do not use Tailwind.",
  mui: "Use Material UI (`@mui/material`) components and the `sx` prop. Do not use Tailwind.",
  html: "Return a single self-contained HTML file with inline <style>. No build step, no frameworks.",
};

export function applyFramework(prompt: string, fw: Framework): string {
  const suffix = `\n\n--- FRAMEWORK ---\n${INSTRUCTIONS[fw]}`;
  // Strip any prior "--- FRAMEWORK ---" suffix so toggling is idempotent
  const base = prompt.split("\n\n--- FRAMEWORK ---")[0];
  return base + suffix;
}
