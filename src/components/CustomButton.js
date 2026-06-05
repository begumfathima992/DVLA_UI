// ─── BASE BUTTON ─────────────────────────────────────────────────────────────
export const Btn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
      cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
      ${className}`}
  >
    {children}
  </button>
);

// ─── VARIANTS ────────────────────────────────────────────────────────────────
export const BtnPrimary = ({ className = "", ...p }) => (
  <Btn
    {...p}
    className={`bg-cyan-500 text-[#0b1628] hover:bg-cyan-400 hover:-translate-y-px
      shadow-lg shadow-cyan-500/20 ${className}`}
  />
);

export const BtnGhost = ({ className = "", ...p }) => (
  <Btn
    {...p}
    className={`bg-transparent text-slate-400 border border-cyan-500/20
      hover:border-cyan-400 hover:text-cyan-400 ${className}`}
  />
);

export const BtnGreen = ({ className = "", ...p }) => (
  <Btn
    {...p}
    className={`bg-emerald-500 text-white hover:brightness-110 hover:-translate-y-px ${className}`}
  />
);

export const BtnRed = ({ className = "", ...p }) => (
  <Btn
    {...p}
    className={`bg-red-500/15 text-red-400 border border-red-500/30
      hover:bg-red-500 hover:text-white ${className}`}
  />
);

export const BtnAmber = ({ className = "", ...p }) => (
  <Btn
    {...p}
    className={`bg-amber-500 text-[#0b1628] hover:brightness-110 hover:-translate-y-px ${className}`}
  />
);

export const BtnSm = ({ as: Component = BtnPrimary, ...p }) => (
  <Component {...p} className="text-xs py-1 px-3" />
);
