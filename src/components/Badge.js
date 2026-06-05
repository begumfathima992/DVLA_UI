// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
export const STATUS_STYLES = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Approved: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Declined: "bg-red-500/10 text-red-400 border-red-500/20",
  Converted: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  "In Progress": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Complete: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Invoiced: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Unpaid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const STATUS_DOT = {
  Pending: "bg-amber-400",
  Approved: "bg-cyan-400",
  Declined: "bg-red-400",
  Converted: "bg-slate-400",
  "In Progress": "bg-violet-400",
  Complete: "bg-emerald-400",
  Invoiced: "bg-slate-400",
  Open: "bg-amber-400",
  Unpaid: "bg-amber-400",
  Paid: "bg-emerald-400",
  Confirmed: "bg-emerald-400",
  Cancelled: "bg-red-400",
};

// ─── BADGE COMPONENT ─────────────────────────────────────────────────────────
export const Badge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
      STATUS_STYLES[status] ||
      "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        STATUS_DOT[status] || "bg-slate-400"
      }`}
    />
    {status}
  </span>
);

export default Badge;
