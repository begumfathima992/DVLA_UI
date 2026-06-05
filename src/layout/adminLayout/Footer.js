import { fmt } from "../../utils/contents";

// ─── FOOTER COMPONENT ────────────────────────────────────────────────────────
const Footer = ({ totalReceived, openJobs, unpaidCount }) => (
  <footer className="ml-60 border-t border-cyan-500/15 bg-[#0b1628]/60 backdrop-blur-sm">
    <div className="px-8 py-3 flex items-center justify-between">
      {/* Left: Branding */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="text-base">🚗</span>
        <span className="font-mono">Prestige Cars Workshop Manager</span>
        <span className="text-cyan-500/40">•</span>
        <span>v1.0.0</span>
      </div>

      {/* Center: Live summary */}
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-slate-400">Open Jobs:</span>
          <span className="font-mono font-bold text-violet-400">
            {openJobs}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-slate-400">Unpaid Invoices:</span>
          <span className="font-mono font-bold text-amber-400">
            {unpaidCount}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-400">Total Received:</span>
          <span className="font-mono font-bold text-emerald-400">
            {fmt(totalReceived)}
          </span>
        </div>
      </div>

      {/* Right: Status */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
        All systems operational
      </div>
    </div>
  </footer>
);

export default Footer;
