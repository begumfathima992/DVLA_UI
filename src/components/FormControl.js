// ─── FORM PRIMITIVES ─────────────────────────────────────────────────────────

export const Label = ({ children }) => (
  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
    {children}
  </label>
);

export const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full bg-[#0b1628]/80 border border-cyan-500/20 rounded-lg px-3 py-2.5
      text-white text-sm placeholder-slate-600
      focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15 outline-none
      transition-all font-[inherit] ${className}`}
  />
);

export const Select = ({ children, className = "", ...props }) => (
  <select
    {...props}
    className={`w-full bg-[#0b1628]/80 border border-cyan-500/20 rounded-lg px-3 py-2.5
      text-white text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15
      outline-none transition-all font-[inherit] ${className}`}
  >
    {children}
  </select>
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`w-full bg-[#0b1628]/80 border border-cyan-500/20 rounded-lg px-3 py-2.5
      text-white text-sm placeholder-slate-600
      focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15 outline-none
      transition-all resize-y min-h-[72px] font-[inherit] ${className}`}
  />
);

// ─── FORM LAYOUT HELPERS ─────────────────────────────────────────────────────
export const FormSection = ({ children }) => (
  <div className="mb-6 pb-6 border-b border-cyan-500/15 last:border-0 last:mb-0 last:pb-0">
    {children}
  </div>
);

export const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">
    <span className="flex items-center gap-1.5">{children}</span>
    <span className="flex-1 h-px bg-cyan-500/20" />
  </div>
);

export const FormGroup = ({ label, children, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    {label && <Label>{label}</Label>}
    {children}
  </div>
);
