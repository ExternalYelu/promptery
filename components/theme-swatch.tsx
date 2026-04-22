import type { ThemeEntry } from "@/lib/themes";

export function ThemeSwatch({
  theme,
  size = 36,
}: {
  theme: ThemeEntry;
  size?: number;
}) {
  const [a, b, c] = theme.swatch;
  return (
    <div
      aria-hidden
      className="relative shrink-0 overflow-hidden rounded-md border border-white/15"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${a} 0 33%, ${b} 33% 66%, ${c} 66% 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
    </div>
  );
}
