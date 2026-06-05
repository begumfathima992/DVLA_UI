// ─── STAT CARD ────────────────────────────────────────────────────────────────
export const StatCard = ({ label, value, sub, color = "text-cyan-400" }) => (
  <div
    className="bg-[#112240]/80 border border-cyan-500/20 rounded-xl p-4
    hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
  >
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </div>
    <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

// ─── STAT STRIP ──────────────────────────────────────────────────────────────
export const StatStrip = ({ stats }) => (
  <div className="grid grid-cols-4 gap-4 mb-7">
    {stats.map((s, i) => (
      <StatCard key={i} {...s} />
    ))}
  </div>
);

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export const EmptyState = ({ icon, title, sub }) => (
  <div className="text-center py-16 px-6">
    <div className="text-5xl opacity-20 mb-4">{icon}</div>
    <div className="text-base font-semibold text-white/40 mb-1">{title}</div>
    <div className="text-sm text-slate-500">{sub}</div>
  </div>
);

// ─── REG PLATE ────────────────────────────────────────────────────────────────
export const RegPlate = ({ reg }) => (
  <span
    className="inline-block bg-yellow-300 text-black font-mono font-bold
    text-xs px-2 py-0.5 rounded tracking-wider"
  >
    {reg}
  </span>
);

// ─── TABLE CARD WRAPPER ──────────────────────────────────────────────────────
export const TableCard = ({ title, count, children }) => (
  <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
    <div className="px-5 py-4 border-b border-cyan-500/20 flex justify-between items-center">
      <div className="font-bold text-sm">{title}</div>
      <div className="text-xs text-slate-400">{count} records</div>
    </div>
    {children}
  </div>
);

// ─── PAGE HEADER ─────────────────────────────────────────────────────────────
export const PageHeader = ({ icon, title, sub, action }) => (
  <div className="flex items-start justify-between mb-7">
    <div>
      <div className="text-xl font-bold text-white flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        {title}
      </div>
      <div className="text-sm text-slate-400 mt-1">{sub}</div>
    </div>
    {action}
  </div>
);
