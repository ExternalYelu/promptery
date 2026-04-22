import type { CSSProperties } from "react";
import type { ThemeEntry } from "@/lib/themes";

/**
 * Renders the SAME landing-page layout for every theme, applying
 * the theme's tokens via inline CSS variables + direct styles.
 * Adding a new theme = one data entry, no new JSX.
 */
export function ThemedLanding({ theme }: { theme: ThemeEntry }) {
  const t = theme.tokens;
  const s = theme.sample;

  const rootStyle: CSSProperties & Record<string, string> = {
    background: t.bg,
    color: t.text,
    fontFamily: t.fontBody,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["--radius" as any]: t.radius,
    ["--border" as any]: t.border,
    ["--border-w" as any]: t.borderWidth,
    ["--surface" as any]: t.surface,
    ["--fg" as any]: t.text,
    ["--muted" as any]: t.textMuted,
    ["--primary" as any]: t.primary,
    ["--primary-text" as any]: t.primaryText,
    ["--secondary" as any]: t.secondary,
    ["--secondary-text" as any]: t.secondaryText,
    ["--accent" as any]: t.accent,
    ["--shadow" as any]: t.shadow,
    ["--font-heading" as any]: t.fontHeading,
    ["--font-body" as any]: t.fontBody,
  };

  const headingStyle: CSSProperties = {
    fontFamily: t.fontHeading,
    fontWeight: t.weightHeading,
    letterSpacing: t.letterSpacingHeading,
    textTransform: t.headingCase === "uppercase" ? "uppercase" : "none",
    lineHeight: 1.02,
    color: t.text,
  };

  const isGradientPrimary = t.primary.includes("gradient");
  const primaryBtnStyle: CSSProperties = {
    background: t.primary,
    color: t.primaryText,
    borderRadius: t.radius,
    border: isGradientPrimary ? "none" : `${t.borderWidth} solid ${t.border}`,
    boxShadow: t.shadow,
    fontFamily: t.fontHeading,
  };

  const secondaryBtnStyle: CSSProperties = {
    background: t.secondary,
    color: t.secondaryText,
    borderRadius: t.radius,
    border: `${t.borderWidth} solid ${t.border}`,
    fontFamily: t.fontHeading,
  };

  const borderStyle = `${t.borderWidth} solid ${t.border}`;

  return (
    <div
      style={rootStyle}
      className="relative h-full w-full overflow-hidden"
    >
      {/* Decorations per theme */}
      {t.decoration === "scanlines" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}
      {t.decoration === "grid" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(to right, ${t.border} 1px, transparent 1px), linear-gradient(to bottom, ${t.border} 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          }}
        />
      )}
      {t.decoration === "shapes" && (
        <>
          <div
            className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full"
            style={{ background: t.primary, opacity: 0.9 }}
          />
          <div
            className="pointer-events-none absolute top-48 -left-16 h-0 w-0"
            style={{
              borderLeft: "80px solid transparent",
              borderRight: "80px solid transparent",
              borderBottom: `140px solid ${t.accent}`,
              opacity: 0.85,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-12 right-20 h-20 w-20"
            style={{
              background: t.accent,
              border: `${t.borderWidth} solid ${t.border}`,
            }}
          />
        </>
      )}
      {t.grain && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.08,
            mixBlendMode: "multiply",
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
          }}
        />
      )}

      {/* NAV */}
      <header
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: borderStyle }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid h-8 w-8 place-items-center"
            style={{
              background: t.primary,
              color: t.primaryText,
              borderRadius: t.radius,
              border: isGradientPrimary ? "none" : borderStyle,
              fontFamily: t.fontHeading,
              fontWeight: 700,
            }}
          >
            {s.brand.charAt(0)}
          </div>
          <div
            style={{
              fontFamily: t.fontHeading,
              fontWeight: t.weightHeading >= 700 ? 700 : 600,
              letterSpacing: t.letterSpacingHeading,
              fontSize: 16,
              textTransform:
                t.headingCase === "uppercase" ? "uppercase" : "none",
            }}
          >
            {s.brand}
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {s.navLinks.map((l) => (
            <span
              key={l}
              style={{
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: t.textMuted,
                fontFamily: t.fontBody,
              }}
            >
              {l}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: t.textMuted,
              fontFamily: t.fontBody,
            }}
          >
            Log in
          </span>
          <button
            style={{
              ...primaryBtnStyle,
              padding: "8px 18px",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Sign up
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 px-8 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2"
            style={{
              border: borderStyle,
              borderRadius: t.radius === "9999px" ? "9999px" : t.radius,
              padding: "6px 12px",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: t.text,
              fontFamily: t.fontBody,
              textTransform:
                t.headingCase === "uppercase" ? "uppercase" : "none",
              background: t.surface,
            }}
          >
            <span
              className="h-1.5 w-1.5"
              style={{ background: t.accent, borderRadius: t.radius }}
            />
            {s.eyebrow}
          </div>

          <h1
            style={{
              ...headingStyle,
              fontSize: "clamp(40px, 7vw, 84px)",
              marginTop: 28,
              maxWidth: "14ch",
              whiteSpace: "pre-line",
            }}
          >
            {s.headline}
          </h1>

          {/* Divider ornament */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 8,
              maxWidth: 320,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 0,
                borderTop: `${t.borderWidth} solid ${t.border}`,
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                background: t.accent,
                borderRadius: t.radius,
              }}
            />
          </div>

          <p
            style={{
              marginTop: 20,
              maxWidth: 620,
              fontSize: 17,
              lineHeight: 1.65,
              color: t.textMuted,
              fontFamily: t.fontBody,
            }}
          >
            {s.subcopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              style={{
                ...primaryBtnStyle,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform:
                  t.headingCase === "uppercase" ? "uppercase" : "none",
              }}
            >
              {s.primaryCta} →
            </button>
            <button
              style={{
                ...secondaryBtnStyle,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform:
                  t.headingCase === "uppercase" ? "uppercase" : "none",
              }}
            >
              {s.secondaryCta}
            </button>
          </div>

          {/* "Feature" strip */}
          <div
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3"
            style={{ fontFamily: t.fontBody }}
          >
            {[
              "Lightning fast setup",
              "Enterprise-grade security",
              "Built for scale",
            ].map((f, i) => (
              <div
                key={f}
                style={{
                  background: t.surface,
                  border: borderStyle,
                  borderRadius: t.radius,
                  padding: "18px 18px",
                  boxShadow: t.shadow === "none" ? undefined : t.shadow,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: i === 1 ? t.accent : t.primary,
                    color: t.primaryText,
                    borderRadius: t.radius,
                    border: isGradientPrimary ? "none" : borderStyle,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: t.fontHeading,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: t.fontHeading,
                    color: t.text,
                  }}
                >
                  {f}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: t.textMuted,
                  }}
                >
                  Purpose-built for the way modern teams actually work.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER RULE */}
      <div
        className="relative z-10 mt-6 flex items-center justify-between px-8 py-4"
        style={{
          borderTop: borderStyle,
          fontFamily: t.fontBody,
          fontSize: 12,
          color: t.textMuted,
        }}
      >
        <span>© 2026 {s.brand}. All rights reserved.</span>
        <span style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Privacy · Terms
        </span>
      </div>
    </div>
  );
}
