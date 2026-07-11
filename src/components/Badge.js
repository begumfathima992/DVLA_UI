export const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Declined: "bg-rose-50 text-rose-600 border-rose-200",
  Converted: "bg-sky-50 text-sky-700 border-sky-200",
  "In Progress": "bg-violet-50 text-violet-700 border-violet-200",
  Complete: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Invoiced: "bg-sky-50 text-sky-700 border-sky-200",
  Open: "bg-blue-50 text-blue-700 border-blue-200",
  Unpaid: "bg-amber-50 text-amber-700 border-amber-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-rose-50 text-rose-600 border-rose-200",
};

export const STATUS_DOT = {
  Pending: "bg-amber-500",
  Approved: "bg-emerald-500",
  Declined: "bg-rose-500",
  Converted: "bg-sky-500",
  "In Progress": "bg-violet-500",
  Complete: "bg-emerald-500",
  Completed: "bg-emerald-500",
  Invoiced: "bg-sky-500",
  Open: "bg-blue-500",
  Unpaid: "bg-amber-500",
  Paid: "bg-emerald-500",
  Confirmed: "bg-emerald-500",
  Cancelled: "bg-rose-500",
};

export const Badge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${
      STATUS_STYLES[status] || "border-slate-200 bg-slate-50 text-slate-600"
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status] || "bg-slate-400"}`} />
    {status}
  </span>
);

export default Badge;
