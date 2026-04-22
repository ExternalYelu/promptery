export function AnalyticsCardPreview() {
  const series = [12, 18, 14, 22, 20, 28, 24, 34, 30, 42, 38, 48];
  const max = Math.max(...series);
  const min = Math.min(...series);
  const w = 240;
  const h = 60;
  const pts = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `M 0,${h} L ${pts.split(" ").join(" L ")} L ${w},${h} Z`;
  const last = pts.split(" ").pop()!.split(",");

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0c0c14] p-4">
      <div className="grid h-full grid-cols-2 gap-3">
        {[
          { label: "Revenue", value: "$42,310", delta: "+12.4%", up: true },
          { label: "Active users", value: "8,214", delta: "+3.1%", up: true },
          { label: "Conversion", value: "2.7%", delta: "-0.4%", up: false },
          { label: "Churn", value: "1.2%", delta: "-0.2%", up: true },
        ].map((s, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="text-[8px] font-medium uppercase tracking-wider text-white/45">
                {s.label}
              </div>
              <div className="h-2.5 w-2.5 rounded-full border border-white/15" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <div className="text-[15px] font-semibold tabular-nums tracking-tight text-white">
                {s.value}
              </div>
              <div
                className={`rounded-full px-1.5 py-0.5 text-[7px] font-medium ${
                  s.up
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-rose-400/10 text-rose-400"
                }`}
              >
                {s.delta}
              </div>
            </div>
            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="absolute bottom-0 left-0 h-8 w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0"
                    stopColor={s.up ? "#34d399" : "#f43f5e"}
                    stopOpacity="0.35"
                  />
                  <stop offset="1" stopColor="#000" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill={`url(#g${i})`} />
              <polyline
                points={pts}
                fill="none"
                stroke={s.up ? "#34d399" : "#f43f5e"}
                strokeWidth="1.25"
              />
              <circle
                cx={last[0]}
                cy={last[1]}
                r="2"
                fill={s.up ? "#34d399" : "#f43f5e"}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
