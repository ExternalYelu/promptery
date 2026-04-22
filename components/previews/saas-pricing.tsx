export function SaasPricingPreview() {
  const Tier = ({
    name,
    price,
    featured,
  }: {
    name: string;
    price: string;
    featured?: boolean;
  }) => (
    <div
      className={`relative flex flex-col rounded-lg p-3 ${
        featured
          ? "bg-gradient-to-b from-violet-500/20 to-fuchsia-500/10 border border-violet-400/40"
          : "border border-white/10 bg-white/[0.03]"
      }`}
    >
      {featured && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-2 py-0.5 text-[8px] font-semibold text-white">
          POPULAR
        </div>
      )}
      <div className="text-[10px] font-medium text-white/70">{name}</div>
      <div className="mt-1 text-base font-semibold tracking-tight text-white">
        {price}
        <span className="text-[9px] font-normal text-white/40">/mo</span>
      </div>
      <div
        className={`mt-2 h-6 rounded-md text-center text-[9px] font-medium leading-[24px] ${
          featured
            ? "bg-white text-violet-700"
            : "border border-white/10 bg-white/[0.04] text-white/80"
        }`}
      >
        {featured ? "Start trial" : "Get started"}
      </div>
      <div className="mt-2 space-y-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/20 text-center text-[7px] leading-[10px] text-emerald-400">
              ✓
            </div>
            <div className="h-1.5 flex-1 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0c0c14] p-4">
      <div className="mb-3 flex items-center justify-center">
        <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[9px]">
          <div className="rounded-full px-2 py-1 text-white/50">Monthly</div>
          <div className="rounded-full bg-white/10 px-2 py-1 text-white">
            Yearly <span className="text-emerald-400">-20%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Tier name="Free" price="$0" />
        <Tier name="Pro" price="$24" featured />
        <Tier name="Team" price="$79" />
      </div>
    </div>
  );
}
