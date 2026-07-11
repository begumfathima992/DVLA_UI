// ─── BADGE ────────────────────────────────────────────────────────────────────
const statusMap = {
  Draft: "bg-slate-100 text-slate-600 border-slate-200",
  Sent: "bg-blue-50  text-blue-600  border-blue-200",
  Approved: "bg-green-50 text-green-600 border-green-200",
  Rejected: "bg-red-50   text-red-600   border-red-200",
  "In Progress": "bg-amber-50 text-amber-600 border-amber-200",
  Completed: "bg-green-50 text-green-600 border-green-200",
  "On Hold": "bg-red-50   text-red-500   border-red-200",
  Unpaid: "bg-amber-50 text-amber-600 border-amber-200",
  Paid: "bg-green-50 text-green-600 border-green-200",
  Partial: "bg-violet-50 text-violet-600 border-violet-200",
  Confirmed: "bg-green-50 text-green-600 border-green-200",
  Open: "bg-blue-50  text-blue-600  border-blue-200",
  Low: "bg-green-50 text-green-700 border-green-200",

  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",

  High: "bg-orange-50 text-orange-700 border-orange-200",

  Urgent: "bg-red-50 text-red-700 border-red-200",
};
const dotMap = {
  Draft: "bg-slate-400",
  Sent: "bg-blue-500",
  Approved: "bg-green-500",
  Rejected: "bg-red-500",
  "In Progress": "bg-amber-500",
  Completed: "bg-green-500",
  "On Hold": "bg-red-500",
  Unpaid: "bg-amber-500",
  Paid: "bg-green-500",
  Partial: "bg-violet-500",
  Confirmed: "bg-green-500",
  Open: "bg-blue-500",
  Low: "bg-green-500",

  Medium: "bg-yellow-500",

  High: "bg-orange-500",

  Urgent: "bg-red-600",
};

export const Badge = ({ status, size = "sm", ...props }) => {
  const cls =
    statusMap[status] || "bg-slate-100 text-slate-500 border-slate-200";
  const dot = dotMap[status] || "bg-slate-400";
  return (
    <span
      {...props}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
      border font-semibold ${size === "sm" ? "text-xs" : "text-sm"} ${cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
};

// ─── BUTTONS ─────────────────────────────────────────────────────────────────
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-extrabold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

export const BtnBlue = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} gold-button text-[#0f172a] px-4 py-2.5 text-sm hover:-translate-y-0.5 ${className}`} 
  >
    {children}
  </button>
);
export const BtnGreen = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 text-sm shadow-sm ${className}`}
  >
    {children}
  </button>
);
export const BtnGhost = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} bg-[#ffffff] hover:bg-[#f8fafc] text-[#334155] border border-[#e2e8f0] px-4 py-2.5 text-sm hover:-translate-y-0.5 hover:border-[#e11d48] hover:shadow-sm ${className}`}
  >
    {children}
  </button>
);
export const BtnRed = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2.5 text-sm hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </button>
);
export const BtnAmber = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-sm shadow-sm ${className}`}
  >
    {children}
  </button>
);
export const BtnSm = ({ children, as: As = BtnBlue, ...p }) => (
  <As {...p} className="px-3 py-1.5 text-xs">
    {children}
  </As>
);

// ─── INPUT / SELECT / TEXTAREA ───────────────────────────────────────────────
export const Input = ({ label, className = "", ...p }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
    )}
    <input
      {...p}
      className={`border border-[#e2e8f0] rounded-xl px-3.5 py-3 text-sm outline-none
      focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10 transition-all bg-[#ffffff] text-[#1e293b] ${className}`}
    />
  </div>
);

export const Select = ({
  label,
  children,
  className = "",
  touched = false,
  errors,
  ...p
}) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
    )}
    <select
      {...p}
      className={`border border-[#e2e8f0] rounded-xl px-3.5 py-3 text-sm outline-none
  focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10 transition-all
  bg-[#ffffff] text-[#1e293b] disabled:bg-slate-100 disabled:text-slate-500 disabled:border-gray-300 disabled:cursor-not-allowed
  ${className}`}
    >
      {children}
    </select>
    {touched && errors && (
      <p className="text-xs text-red-500 mt-0.5">{errors}</p>
    )}
  </div>
);

export const Textarea = ({ label, className = "", ...p }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
    )}
    <textarea
      {...p}
      className={`border border-[#e2e8f0] rounded-xl px-3.5 py-3 text-sm outline-none
      focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10 transition-all bg-[#ffffff] text-[#1e293b] resize-y min-h-[90px] ${className}`}
    />
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────
export const Modal = ({
  title,
  sub,
  onClose,
  children,
  footer,
  size = "max-w-2xl",
}) => (
  <div
    className="fixed inset-0 bg-[#030912]/70 backdrop-blur-xl !z-50 flex items-center justify-center p-4 fade-up"
    onClick={onClose}
  >
    <div
      className={`bg-[#ffffff] rounded-[26px] border border-[#e2e8f0] shadow-[0_35px_100px_rgba(7,17,31,.3)] w-full overflow-hidden ${size} max-h-[90vh] flex flex-col`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0] shrink-0 bg-gradient-to-r from-[#ffffff] to-[#fff1f2]">
        <div>
          <div className="font-[Sora] font-extrabold text-[#0f172a] text-base tracking-[-0.025em]">{title}</div>
          {sub && <div className="text-xs text-[#818995] mt-1">{sub}</div>}
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8e96a0] hover:bg-[#fff1f2] hover:text-[#be123c] transition-colors text-xl"
        >
          ×
        </button>
      </div>
      {/* Body */}
      <div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
      {/* Footer */}
      {footer && (
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#e2e8f0] bg-[#f8fafc] shrink-0">
          {footer}
        </div>
      )}
    </div>
  </div>
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
export const Card = ({ children, className = "" }) => (
  <div className={` premium-card rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-sm ${className}`}>
    {children}
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export const StatCard = ({
  icon,
  label,
  value,
  change,
  changeLabel,
  iconBg,
}) => (
  <Card className="group p-5 flex items-start justify-between fade-up overflow-hidden relative">
    <div className="relative z-10">
      <div className="text-[10px] font-extrabold text-[#64748b] uppercase tracking-[0.14em] mb-1.5">
        {label}
      </div>
      <div className="font-[Sora] text-2xl font-extrabold tracking-[-0.04em] text-[#0f172a]">{value}</div>
      {change && (
        <div
          className={`text-xs mt-1 font-medium ${change.startsWith("+") ? "text-green-600" : "text-red-500"}`}
        >
          {change}{" "}
          <span className="text-slate-400 font-normal">{changeLabel}</span>
        </div>
      )}
    </div>
    <div
      className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconBg || "bg-[#fff1f2] text-[#be123c]"}`}
    >
      {icon}
    </div>
  </Card>
);

// ─── PAGE HEADER ─────────────────────────────────────────────────────────────
export const PageHeader = ({ title, sub, action }) => (
  <div className="relative overflow-hidden flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-7 rounded-2xl border border-[#e2e8f0] bg-[#ffffff]/90 p-5 sm:p-6 shadow-[0_12px_34px_rgba(7,17,31,.055)] fade-up">
    <div className="relative z-10">
      <div className="mb-2 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#e11d48] shadow-[0_0_0_5px_rgba(244,63,94,0.14)]" /><span className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#be123c]">Workshop workspace</span></div><h1 className="font-[Sora] text-2xl font-extrabold tracking-[-0.045em] text-[#0f172a] sm:text-3xl">{title}</h1>
      {sub && <p className="text-sm text-[#7c8592] mt-1">{sub}</p>}
    </div>
    <div className="shrink-0">{action}</div>
  </div>
);

// ─── TABLE WRAPPER ────────────────────────────────────────────────────────────
export const Table = ({ headers, children, empty, className }) => (
  <div
    className={`overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-[0_12px_34px_rgba(7,17,31,.055)] ${className}`}
  >
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left text-[10px] font-extrabold text-[#64748b] uppercase tracking-[0.14em] whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
    {empty && (
      <div className="text-center py-14">
        <div className="text-4xl opacity-20 mb-3">📋</div>
        <div className="text-slate-400 text-sm">{empty}</div>
      </div>
    )}
  </div>
);

// ─── REG PLATE ────────────────────────────────────────────────────────────────
export const RegPlate = ({ reg }) => (
  <span className="inline-block bg-yellow-300 text-black font-mono font-bold text-xs px-2 py-0.5 rounded border border-yellow-400 tracking-widest">
    {reg}
  </span>
);

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export const EmptyState = ({ icon = "📋", title, sub }) => (
  <div className="text-center py-16">
    <div className="text-5xl mb-4 opacity-20">{icon}</div>
    <div className="font-semibold text-slate-500 mb-1">{title}</div>
    <div className="text-sm text-slate-400">{sub}</div>
  </div>
);

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
export const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3 text-[10px] font-extrabold text-[#be123c] uppercase tracking-[0.16em] mb-3">
    {children}
    <span className="flex-1 h-px bg-slate-100" />
  </div>
);

// ─── LINE ITEMS TABLE (editable) ─────────────────────────────────────────────
export const LineItemsTable = ({
  items,
  setFieldValue,
  fieldName = "items",
  formik,
  vatPercentage = 0,
}) => {
  const handleChange = (index, key, value) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [key]: value,
    };
    const qty = Number(
      key === "quantity" ? value : updatedItems[index].quantity,
    );

    const rate = Number(
      key === "unitPrice" ? value : updatedItems[index].unitPrice,
    );

    updatedItems[index].totalPrice = qty * rate;

    setFieldValue(fieldName, updatedItems);
  };

  const addItem = () => {
    setFieldValue(fieldName, [
      ...items,
      {
        description: "",
        itemType: "Part",
        quantity: 1,
        unitPrice: 0,
        vat: vatPercentage,
        totalPrice: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);

    setFieldValue(fieldName, updatedItems);
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              {[
                "#",
                "Description",
                "Type",
                "Qty",
                "Rate (£)",
                // "VAT %",
                "Total (£)",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 text-left text-[10px] font-bold text-[#64748b] uppercase tracking-[0.14em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items?.map((item, index) => (
              <tr key={index} className="border-b border-[#e2e8f0] hover:bg-[#fff1f2]/70 transition-colors">
                <td className="px-3 py-2">{index + 1}</td>

                <td className="px-2 py-1">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    className="w-full border border-[#e2e8f0] bg-[#ffffff] rounded-lg px-2 py-2 outline-none focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10"
                  />
                  {formik.touched.items?.[index]?.description &&
                    formik.errors.items?.[index]?.description && (
                      <span className="text-red-500 text-xs">
                        {formik.errors.items[index].description}
                      </span>
                    )}
                </td>

                <td className="px-2 py-1">
                  <select
                    value={item.itemType}
                    onChange={(e) =>
                      handleChange(index, "itemType", e.target.value)
                    }
                    className="border border-[#e2e8f0] bg-[#ffffff] rounded-lg px-2 py-2 outline-none focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10"
                  >
                    <option value="Part">Part</option>

                    <option value="Labour">Labour</option>

                    <option value="Service">Service</option>
                  </select>
                </td>

                <td className="px-2 py-1">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", Number(e.target.value))
                    }
                    className="w-16 border border-[#e2e8f0] bg-[#ffffff] rounded-lg px-2 py-2 outline-none focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10"
                  />
                </td>

                <td className="px-2 py-1">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleChange(index, "unitPrice", Number(e.target.value))
                    }
                    className="w-20 border border-[#e2e8f0] bg-[#ffffff] rounded-lg px-2 py-2 outline-none focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10"
                  />
                </td>

                {/* <td className="px-2 py-1">{item.vat}%</td> */}

                <td className="px-2 py-1 font-semibold">
                  £{(item.totalPrice || 0).toFixed(2)}
                </td>

                <td className="px-2 py-1">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500 transition-colors hover:bg-rose-100"
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" onClick={addItem} className="mt-3 inline-flex items-center rounded-lg bg-[#fff1f2] px-3 py-2 text-[#be123c] font-extrabold hover:bg-[#fecdd3] transition-colors">
        + Add Item
      </button>
    </div>
  );
};
// ─── TOTALS BOX ──────────────────────────────────────────────────────────────
export const TotalsBox = ({
  subtotal,
  vat,
  discount = 0,
  total,
  paidAmount = null,
  balance = null,
  LabourCharge = 0,
  vatPercentage = 0,
}) => (
  <div className="ml-auto w-full sm:w-80 bg-gradient-to-br from-[#f8fafc] to-[#ffffff] rounded-2xl border border-[#e2e8f0] p-5 mt-4 space-y-2.5 text-sm shadow-sm">
    <div className="flex justify-between">
      <span className="text-slate-500">Subtotal (GBP)</span>
      <span className="font-mono">{subtotal}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">VAT ({vatPercentage}%)</span>
      <span className="font-mono">{vat}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Discount (GBP)</span>
      <span className="font-mono">- {discount}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Labour Charge</span>
      <span className="font-mono">{LabourCharge}</span>
    </div>

    <div className="flex justify-between font-bold text-base border-t border-[#e2e8f0] pt-2">
      <span>Total (GBP)</span>
      <span className="font-mono">£{total}</span>
    </div>
    {paidAmount !== null && (
      <div className="flex justify-between text-green-600 font-semibold">
        <span>Paid Amount (GBP)</span>
        <span className="font-mono">£{paidAmount}</span>
      </div>
    )}
    {balance !== null && (
      <div className="flex justify-between font-bold border-t border-[#e2e8f0] pt-2">
        <span>Balance (GBP)</span>
        <span className="font-mono">£{balance}</span>
      </div>
    )}
  </div>
);
