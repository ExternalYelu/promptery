"use client";

export type RemixVars = {
  primary: string;
  radius: number;
  density: "cozy" | "compact" | "airy";
  fontPair: "geist" | "inter-serif" | "mono-sans" | "playful";
};

export const DEFAULT_REMIX: RemixVars = {
  primary: "#7c3aed",
  radius: 12,
  density: "cozy",
  fontPair: "geist",
};

const FONT_LABELS: Record<RemixVars["fontPair"], string> = {
  geist: "Geist Sans + Geist Mono",
  "inter-serif": "Inter + Source Serif",
  "mono-sans": "JetBrains Mono + Inter",
  playful: "Cabinet Grotesk + Instrument Serif",
};

export function applyRemix(prompt: string, vars: RemixVars): string {
  const suffix = `\n\n--- REMIX ---\nPrimary color: ${vars.primary}. Border radius: ${vars.radius}px. Density: ${vars.density}. Typography: ${FONT_LABELS[vars.fontPair]}.`;
  const base = prompt.split("\n\n--- REMIX ---")[0];
  return base + suffix;
}

export function RemixPanel({
  vars,
  onChange,
}: {
  vars: RemixVars;
  onChange: (v: RemixVars) => void;
}) {
  const set = <K extends keyof RemixVars>(k: K, v: RemixVars[K]) =>
    onChange({ ...vars, [k]: v });

  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
        Remix variables
      </div>

      <Row label="Primary">
        <input
          type="color"
          value={vars.primary}
          onChange={(e) => set("primary", e.target.value)}
          className="h-7 w-10 cursor-pointer rounded border border-white/10 bg-transparent"
        />
        <span className="font-mono text-[11px] text-white/60">
          {vars.primary}
        </span>
      </Row>

      <Row label="Radius">
        <input
          type="range"
          min={0}
          max={24}
          value={vars.radius}
          onChange={(e) => set("radius", Number(e.target.value))}
          className="flex-1 accent-[color:var(--color-accent)]"
        />
        <span className="w-10 text-right font-mono text-[11px] text-white/60">
          {vars.radius}px
        </span>
      </Row>

      <Row label="Density">
        <div className="flex rounded-md border border-white/10 bg-white/[0.02] p-0.5">
          {(["airy", "cozy", "compact"] as const).map((d) => (
            <button
              key={d}
              onClick={() => set("density", d)}
              className={`rounded px-2 py-0.5 text-[11px] capitalize transition ${
                vars.density === d
                  ? "bg-white/[0.08] text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </Row>

      <Row label="Fonts">
        <select
          value={vars.fontPair}
          onChange={(e) =>
            set("fontPair", e.target.value as RemixVars["fontPair"])
          }
          className="flex-1 rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-[12px] text-white/80 focus:outline-none"
        >
          {(Object.keys(FONT_LABELS) as Array<RemixVars["fontPair"]>).map(
            (k) => (
              <option key={k} value={k} className="bg-[#141420]">
                {FONT_LABELS[k]}
              </option>
            )
          )}
        </select>
      </Row>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-14 text-[11px] text-white/45">{label}</div>
      <div className="flex flex-1 items-center gap-2">{children}</div>
    </div>
  );
}
