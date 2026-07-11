export const Label = ({ children }) => (
  <label className="mb-1.5 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#64748b]">
    {children}
  </label>
);

const fieldBase = `w-full rounded-xl border border-[#e2e8f0] bg-[#ffffff] px-3.5 py-3
  text-sm text-[#1e293b] placeholder:text-[#a1a7b0] outline-none
  transition-all focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10`;

export const Input = ({ className = "", ...props }) => (
  <input {...props} className={`${fieldBase} ${className}`} />
);

export const Select = ({ children, className = "", ...props }) => (
  <select {...props} className={`${fieldBase} ${className}`}>
    {children}
  </select>
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`${fieldBase} min-h-[90px] resize-y ${className}`}
  />
);

export const FormSection = ({ children }) => (
  <div className="mb-6 border-b border-[#e2e8f0] pb-6 last:mb-0 last:border-0 last:pb-0">
    {children}
  </div>
);

export const SectionTitle = ({ children }) => (
  <div className="mb-4 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#be123c]">
    <span className="flex items-center gap-1.5">{children}</span>
    <span className="h-px flex-1 bg-gradient-to-r from-[#e11d48]/45 to-transparent" />
  </div>
);

export const FormGroup = ({ label, children, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    {label && <Label>{label}</Label>}
    {children}
  </div>
);
