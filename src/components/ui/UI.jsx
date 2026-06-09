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
};

export const Badge = ({ status, size = "sm" }) => {
  const cls =
    statusMap[status] || "bg-slate-100 text-slate-500 border-slate-200";
  const dot = dotMap[status] || "bg-slate-400";
  return (
    <span
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
  "inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50";

export const BtnBlue = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm shadow-sm ${className}`}
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
    className={`${base} bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 text-sm ${className}`}
  >
    {children}
  </button>
);
export const BtnRed = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`${base} bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 text-sm ${className}`}
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
      className={`border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none
      focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white ${className}`}
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
      className={`border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none
      focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white ${className}`}
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
      className={`border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none
      focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white resize-y min-h-[80px] ${className}`}
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
    className="fixed inset-0  backdrop-blur-sm !z-50 flex items-center justify-center p-4 fade-up"
    onClick={onClose}
  >
    <div
      className={`bg-white rounded-2xl shadow-2xl w-full ${size} max-h-[90vh] flex flex-col`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
        <div>
          <div className="font-bold text-slate-800 text-base">{title}</div>
          {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors text-lg"
        >
          ×
        </button>
      </div>
      {/* Body */}
      <div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
      {/* Footer */}
      {footer && (
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl shrink-0">
          {footer}
        </div>
      )}
    </div>
  </div>
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
export const Card = ({ children, className = "" }) => (
  <div className={` rounded-xl border border-slate-200 shadow-sm ${className}`}>
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
  <Card className="p-5 flex items-start justify-between fade-up">
    <div>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
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
      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${iconBg || "bg-blue-50"}`}
    >
      {icon}
    </div>
  </Card>
);

// ─── PAGE HEADER ─────────────────────────────────────────────────────────────
export const PageHeader = ({ title, sub, action }) => (
  <div className="flex items-start justify-between mb-6 fade-up">
    <div>
      <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      {sub && <p className="text-sm text-slate-400 mt-0.5">{sub}</p>}
    </div>
    {action}
  </div>
);

// ─── TABLE WRAPPER ────────────────────────────────────────────────────────────
export const Table = ({ headers, children, empty }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100">
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap"
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
  <div className="flex items-center gap-3 text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
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
}) => {
  const handleChange = (index, key, value) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [key]: value,
    };
    console.log(updatedItems[index].quantity, key, "updatedItems");
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
        vat: 20,
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
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
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
                  className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items?.map((item, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="px-3 py-2">{index + 1}</td>

                <td className="px-2 py-1">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    className="w-full border rounded-lg px-2 py-1"
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
                    className="border rounded-lg px-2 py-1"
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
                    className="w-16 border rounded-lg px-2 py-1"
                  />
                </td>

                <td className="px-2 py-1">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleChange(index, "unitPrice", Number(e.target.value))
                    }
                    className="w-20 border rounded-lg px-2 py-1"
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
                      className="text-red-500"
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

      <button type="button" onClick={addItem} className="mt-2 text-blue-600">
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
}) => (
  <div className="ml-auto w-64 bg-slate-50 rounded-xl border border-slate-200 p-4 mt-4 space-y-2 text-sm">
    <div className="flex justify-between">
      <span className="text-slate-500">Subtotal (GBP)</span>
      <span className="font-mono">{subtotal}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">VAT (20%)</span>
      <span className="font-mono">{vat}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Discount (GBP)</span>
      <span className="font-mono">{discount}</span>
    </div>
    <div className="flex justify-between font-bold text-base border-t border-slate-200 pt-2">
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
      <div className="flex justify-between font-bold border-t border-slate-200 pt-2">
        <span>Balance (GBP)</span>
        <span className="font-mono">£{balance}</span>
      </div>
    )}
  </div>
);
