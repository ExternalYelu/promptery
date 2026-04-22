"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Mode = "light" | "dark" | "system";

type Ctx = {
  mode: Mode;
  resolved: "light" | "dark";
  setMode: (m: Mode) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

const KEY = "promptery.theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("dark");
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  // Apply mode → data-theme attribute on <html>
  const apply = useCallback((m: Mode) => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const r = m === "system" ? (prefersDark ? "dark" : "light") : m;
    setResolved(r);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", r);
    }
  }, []);

  // Hydrate from storage
  useEffect(() => {
    try {
      const stored = (localStorage.getItem(KEY) as Mode | null) ?? "dark";
      setModeState(stored);
      apply(stored);
    } catch {
      apply("dark");
    }
  }, [apply]);

  // Follow system changes when in system mode
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => apply("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, apply]);

  const setMode = useCallback(
    (m: Mode) => {
      setModeState(m);
      apply(m);
      try {
        localStorage.setItem(KEY, m);
      } catch {
        /* ignore */
      }
    },
    [apply]
  );

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export function ModeToggle() {
  const { mode, setMode } = useTheme();
  const opts: Mode[] = ["light", "system", "dark"];
  const icons: Record<Mode, string> = {
    light: "☀",
    system: "◐",
    dark: "☾",
  };
  return (
    <div className="flex items-center rounded-md border border-white/10 bg-white/[0.02] p-0.5">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => setMode(o)}
          aria-label={`${o} mode`}
          className={`grid h-7 w-7 place-items-center rounded text-[12px] transition ${
            mode === o
              ? "bg-white/[0.08] text-white"
              : "text-white/50 hover:text-white"
          }`}
        >
          {icons[o]}
        </button>
      ))}
    </div>
  );
}
