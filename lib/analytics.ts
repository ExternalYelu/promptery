"use client";

// Lightweight analytics shim. Emits custom events + optionally
// forwards to Plausible if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
// and the plausible script has been injected.
type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;
  // Dev console trail
  // eslint-disable-next-line no-console
  console.debug("[track]", event, props);
  // Plausible (optional)
  const w = window as unknown as {
    plausible?: (name: string, opts?: { props: AnalyticsProps }) => void;
  };
  if (typeof w.plausible === "function") {
    w.plausible(event, { props });
  }
}
