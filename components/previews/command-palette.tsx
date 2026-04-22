export function CommandPalettePreview() {
  const groups = [
    {
      label: "Recent",
      items: [
        { icon: "◷", label: "Open recent project…", kbd: "⌘O" },
        { icon: "⤴", label: "Go to dashboard", kbd: "G D" },
      ],
    },
    {
      label: "Actions",
      items: [
        { icon: "＋", label: "Create new component", kbd: "⌘N", active: true },
        { icon: "⇧", label: "Toggle theme", kbd: "⌘T" },
        { icon: "↯", label: "Invite teammate", kbd: "" },
      ],
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-black p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative mx-auto mt-3 w-full max-w-[260px] overflow-hidden rounded-lg border border-white/15 bg-[#141420] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="text-[10px] text-white/50">⌕</span>
          <div className="flex-1 text-[10px] text-white/80">
            Create a new<span className="animate-pulse text-white/70">|</span>
          </div>
          <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[8px] text-white/50">
            ESC
          </span>
        </div>
        <div className="max-h-[180px] overflow-hidden">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="px-3 pb-1 pt-2 text-[8px] font-medium uppercase tracking-wider text-white/35">
                {g.label}
              </div>
              {g.items.map((it, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-2 px-3 py-1.5 text-[10px] ${
                    (it as { active?: boolean }).active
                      ? "bg-violet-500/15 text-white"
                      : "text-white/75"
                  }`}
                >
                  {(it as { active?: boolean }).active && (
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-violet-400" />
                  )}
                  <span className="w-3 text-center text-white/50">{it.icon}</span>
                  <span className="flex-1">{it.label}</span>
                  {it.kbd && (
                    <span className="font-mono text-[8px] text-white/40">
                      {it.kbd}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 bg-white/[0.02] px-3 py-1.5 text-[8px] text-white/40">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto">ESC close</span>
        </div>
      </div>
    </div>
  );
}
