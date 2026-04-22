export function GlassLoginPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#7c3aed_0%,transparent_45%),radial-gradient(circle_at_80%_80%,#2563eb_0%,transparent_40%),linear-gradient(180deg,#0b0b14,#0b0b14)]" />
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-500/30 blur-3xl" />

      <div className="relative flex h-full items-center justify-center p-6">
        <div className="w-full max-w-[280px] rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="mb-4">
            <div className="mb-1 h-6 w-6 rounded-md bg-gradient-to-br from-violet-400 to-fuchsia-500" />
            <div className="text-[13px] font-semibold tracking-tight text-white">
              Welcome back
            </div>
            <div className="text-[11px] text-white/55">
              Sign in to continue to Acme
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-8 rounded-md border border-white/10 bg-white/[0.04] px-2 text-[10px] leading-[32px] text-white/50">
              you@company.com
            </div>
            <div className="h-8 rounded-md border border-white/10 bg-white/[0.04] px-2 text-[10px] leading-[32px] text-white/50">
              ••••••••••
            </div>
            <div className="h-8 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-[11px] font-medium leading-[32px] text-white">
              Sign in
            </div>
          </div>
          <div className="my-3 flex items-center gap-2 text-[9px] text-white/35">
            <div className="h-px flex-1 bg-white/10" />
            or continue with
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["G", "", ""].map((l, i) => (
              <div
                key={i}
                className="h-7 rounded-md border border-white/10 bg-white/[0.04] text-center text-[10px] leading-[26px] text-white/70"
              >
                {l || (i === 1 ? "" : "")}
                {i === 0 && "oogle"}
                {i === 1 && "GitHub"}
                {i === 2 && "Apple"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
