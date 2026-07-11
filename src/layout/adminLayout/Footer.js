import { fmt } from "../../utils/contents";

const Footer = ({ totalReceived, openJobs, unpaidCount }) => (
  <footer className="border-t-2 border-slate-200 bg-white/85 backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1680px] flex-col gap-3 px-6 py-4 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">🚗</span>
        <span className="font-bold text-slate-700">AutoForge Workshop Manager</span>
        <span className="text-red-300">•</span>
        <span>v1.0.0</span>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span><b className="text-violet-600">{openJobs}</b> open jobs</span>
        <span><b className="text-amber-600">{unpaidCount}</b> unpaid invoices</span>
        <span><b className="text-emerald-600">{fmt(totalReceived)}</b> received</span>
      </div>
      <div className="flex items-center gap-2 font-semibold text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500 soft-pulse" />
        All systems operational
      </div>
    </div>
  </footer>
);

export default Footer;
