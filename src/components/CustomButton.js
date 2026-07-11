export const Btn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold
      transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
  >
    {children}
  </button>
);

export const BtnPrimary = ({ className = "", ...p }) => (
  <Btn {...p} className={`gold-button text-[#0f172a] hover:-translate-y-0.5 ${className}`} />
);

export const BtnGhost = ({ className = "", ...p }) => (
  <Btn
    {...p}
    className={`border border-[#e2e8f0] bg-[#ffffff] text-[#334155]
      hover:-translate-y-0.5 hover:border-[#e11d48] hover:bg-[#fff1f2] ${className}`}
  />
);

export const BtnGreen = ({ className = "", ...p }) => (
  <Btn {...p} className={`bg-emerald-600 text-white hover:-translate-y-0.5 hover:bg-emerald-700 ${className}`} />
);

export const BtnRed = ({ className = "", ...p }) => (
  <Btn {...p} className={`border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 ${className}`} />
);

export const BtnAmber = ({ className = "", ...p }) => (
  <Btn {...p} className={`bg-amber-500 text-[#0f172a] hover:-translate-y-0.5 hover:bg-amber-600 ${className}`} />
);

export const BtnSm = ({ as: Component = BtnPrimary, ...p }) => (
  <Component {...p} className="px-3 py-1.5 text-xs" />
);
