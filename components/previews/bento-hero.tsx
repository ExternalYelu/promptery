export function BentoHeroPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0b0b12] p-3">
      <div className="grid h-full grid-cols-12 grid-rows-3 gap-2">
        <div className="relative col-span-7 row-span-2 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-3">
          <div className="absolute right-3 top-3 rounded-full border border-violet-400/40 bg-violet-500/10 px-1.5 py-0.5 text-[7px] font-medium text-violet-300">
            NEW • v2.0
          </div>
          <div className="mt-4 text-[12px] font-semibold leading-tight tracking-tight text-white">
            Design interfaces
            <br />
            at the speed of thought.
          </div>
          <div className="mt-1.5 text-[9px] text-white/50">
            The fastest way to turn a prompt into a shipped UI.
          </div>
          <div className="mt-3 flex gap-1.5">
            <div className="h-6 rounded-md bg-white px-2 text-[9px] font-medium leading-[24px] text-black">
              Get started
            </div>
            <div className="h-6 rounded-md border border-white/15 px-2 text-[9px] font-medium leading-[24px] text-white/80">
              Watch demo
            </div>
          </div>
        </div>

        <div className="relative col-span-5 row-span-2 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-sky-500/25 blur-3xl" />
          <div className="relative h-full w-full rounded-md border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-2">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-3/4 rounded bg-white/20" />
              <div className="h-1.5 w-1/2 rounded bg-white/10" />
              <div className="mt-2 grid grid-cols-3 gap-1">
                <div className="h-8 rounded bg-violet-500/30" />
                <div className="h-8 rounded bg-white/10" />
                <div className="h-8 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {["Composable", "Accessible", "Fast"].map((t) => (
          <div
            key={t}
            className="col-span-4 row-span-1 rounded-lg border border-white/10 bg-white/[0.03] p-2"
          >
            <div className="h-3 w-3 rounded bg-violet-400/70" />
            <div className="mt-1 text-[9px] font-semibold text-white">{t}</div>
            <div className="text-[8px] text-white/45">
              Ship consistent UIs across every surface.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
