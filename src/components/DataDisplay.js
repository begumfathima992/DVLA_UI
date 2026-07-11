export const StatCard = ({ label, value, sub, color = "text-[#be123c]" }) => (
  <div className="premium-card rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-4 transition-all duration-300">
    <div className="mb-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#858d99]">
      {label}
    </div>
    <div className={`font-[Sora] text-2xl font-extrabold tracking-[-0.04em] ${color}`}>{value}</div>
    {sub && <div className="mt-1 text-xs text-[#64748b]">{sub}</div>}
  </div>
);

export const StatStrip = ({ stats }) => (
  <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((s, i) => <StatCard key={i} {...s} />)}
  </div>
);

export const EmptyState = ({ icon, title, sub }) => (
  <div className="px-6 py-16 text-center">
    <div className="mb-4 text-5xl opacity-20">{icon}</div>
    <div className="mb-1 text-base font-extrabold text-[#334155]">{title}</div>
    <div className="text-sm text-[#64748b]">{sub}</div>
  </div>
);

export const RegPlate = ({ reg }) => (
  <span className="inline-block rounded-md border border-[#dfbc57] bg-[#fb7185] px-2 py-0.5 font-mono text-xs font-black tracking-wider text-black shadow-sm">
    {reg}
  </span>
);

export const TableCard = ({ title, count, children }) => (
  <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-[0_12px_34px_rgba(7,17,31,.055)]">
    <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-5 py-4">
      <div className="font-[Sora] text-sm font-extrabold text-[#0f172a]">{title}</div>
      <div className="rounded-full bg-[#fff1f2] px-2.5 py-1 text-[10px] font-bold text-[#be123c]">{count} records</div>
    </div>
    {children}
  </div>
);

export const PageHeader = ({ icon, title, sub, action }) => (
  <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-5 shadow-[0_12px_34px_rgba(7,17,31,.055)] sm:flex-row sm:items-end sm:justify-between">
    <div>
      <div className="flex items-center gap-2 font-[Sora] text-xl font-extrabold tracking-[-0.035em] text-[#0f172a]">
        <span className="text-lg text-[#be123c]">{icon}</span>{title}
      </div>
      <div className="mt-1 text-sm text-[#64748b]">{sub}</div>
    </div>
    {action}
  </div>
);
