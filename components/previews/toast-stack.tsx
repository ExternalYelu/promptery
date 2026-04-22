export function ToastStackPreview() {
  const toasts = [
    {
      status: "success",
      title: "Deployment successful",
      desc: "promptery.dev is live",
      color: "emerald",
    },
    {
      status: "info",
      title: "New comment on #42",
      desc: "“Love the bento hero…”",
      color: "sky",
    },
    {
      status: "warn",
      title: "Usage at 82%",
      desc: "You'll hit your plan limit soon",
      color: "amber",
    },
  ] as const;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0b0b12] p-3">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent)]" />
      <div className="absolute bottom-3 right-3 flex w-[220px] flex-col gap-2">
        {toasts.map((t, i) => {
          const tone =
            t.color === "emerald"
              ? "bg-emerald-400"
              : t.color === "sky"
                ? "bg-sky-400"
                : "bg-amber-400";
          const scale = 1 - i * 0.04;
          const opacity = 1 - i * 0.1;
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "right bottom",
                opacity,
              }}
              className="relative overflow-hidden rounded-md border border-white/10 bg-[#15151d]/90 p-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 h-2 w-2 rounded-full ${tone}`} />
                <div className="flex-1">
                  <div className="text-[10px] font-medium text-white">
                    {t.title}
                  </div>
                  <div className="text-[9px] text-white/55">{t.desc}</div>
                </div>
                <div className="text-[10px] text-white/40">×</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                <div
                  className={`h-full ${tone}`}
                  style={{ width: `${100 - i * 25}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
