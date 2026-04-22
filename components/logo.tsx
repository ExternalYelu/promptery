export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-[0_4px_16px_-4px_rgba(167,139,250,0.6)]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h7v7H4z" />
          <path d="M13 13h7v7h-7z" />
          <path d="M13 4l7 7" />
        </svg>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[15px] font-semibold tracking-tight text-white">
          Promptery
        </span>
        <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-white/55 sm:inline-block">
          beta
        </span>
      </div>
    </div>
  );
}
