import { fmt, calcLineTotal } from "../utils";
import { Input } from "./FormControl";
import { BtnGhost, BtnRed } from "./CustomButton";

// ─── EDITABLE LINE ITEMS TABLE ───────────────────────────────────────────────
export const LineItemsTable = ({ items, setItems, withVatCol = false }) => {
  const setItem = (i, k, v) => {
    const arr = [...items];
    arr[i] = { ...arr[i], [k]: v };
    setItems(arr);
  };
  const addItem = () => setItems([...items, { desc: "", qty: 1, rate: "" }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const subtotal = calcLineTotal(items);
  const vat = subtotal * 0.2;

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f8fafc]">
              {[
                "Description",
                "Qty",
                "Rate (£)",
                withVatCol && "VAT",
                "Total",
                "",
              ]
                .filter(Boolean)
                .map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2.5 text-left text-[10px] font-bold
                  text-[#64748b] uppercase tracking-[0.14em] whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-t border-[#e2e8f0] hover:bg-[#fff1f2]/70 transition-colors">
                <td className="px-2 py-2" style={{ width: "45%" }}>
                  <Input
                    value={it.desc}
                    onChange={(e) => setItem(i, "desc", e.target.value)}
                    placeholder="Description..."
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    value={it.qty}
                    onChange={(e) => setItem(i, "qty", e.target.value)}
                    min="0.5"
                    step="0.5"
                  />
                </td>
                <td className="px-2 py-2">
                  <Input
                    type="number"
                    value={it.rate}
                    onChange={(e) => setItem(i, "rate", e.target.value)}
                    placeholder="0.00"
                  />
                </td>
                {withVatCol && (
                  <td className="px-2 py-2 text-slate-400 text-xs">20%</td>
                )}
                <td className="px-2 py-2 font-mono text-[#be123c] font-extrabold text-xs whitespace-nowrap">
                  {fmt((it.qty || 0) * (it.rate || 0))}
                </td>
                <td className="px-2 py-2">
                  {items.length > 1 && (
                    <BtnRed
                      className="px-2 py-1 text-xs"
                      onClick={() => removeItem(i)}
                    >
                      ✕
                    </BtnRed>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <BtnGhost className="text-xs py-1.5" onClick={addItem}>
          + Add Line
        </BtnGhost>
      </div>

      <TotalsBox subtotal={subtotal} vat={vat} total={subtotal + vat} />
    </>
  );
};

// ─── READ-ONLY TOTALS BOX ────────────────────────────────────────────────────
export const TotalsBox = ({ subtotal, vat, total, label = "Total" }) => (
  <div className="mt-4 bg-[#f8fafc] border border-slate-200 rounded-xl p-4">
    <div className="flex justify-between text-sm py-1">
      <span className="text-slate-400">Subtotal</span>
      <span className="font-mono font-semibold">{fmt(subtotal)}</span>
    </div>
    <div className="flex justify-between text-sm py-1">
      <span className="text-slate-400">VAT (20%)</span>
      <span className="font-mono font-semibold">{fmt(vat)}</span>
    </div>
    <div className="flex justify-between pt-3 mt-2 border-t border-[#e2e8f0]">
      <span className="font-semibold">{label}</span>
      <span className="font-mono font-bold text-xl text-[#be123c]">
        {fmt(total)}
      </span>
    </div>
  </div>
);

// ─── VIEW-ONLY LINE ITEMS + TOTALS ───────────────────────────────────────────
export const ViewLineItems = ({ items = [], total }) => {
  const sub = calcLineTotal(items);
  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f8fafc]">
              {["Description", "Qty", "Rate", "Total"].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 text-left text-[10px] font-bold
                  text-[#64748b] uppercase tracking-[0.14em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-t border-[#e2e8f0] hover:bg-[#fff1f2]/70 transition-colors">
                <td className="px-3 py-2.5">{it.desc}</td>
                <td className="px-3 py-2.5">{it.qty}</td>
                <td className="px-3 py-2.5 font-mono">{fmt(it.rate)}</td>
                <td className="px-3 py-2.5 font-mono text-[#be123c] font-extrabold">
                  {fmt((it.qty || 1) * (it.rate || 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TotalsBox
        subtotal={sub}
        vat={sub * 0.2}
        total={total || sub + sub * 0.2}
      />
    </>
  );
};
