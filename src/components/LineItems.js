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
      <div className="overflow-x-auto rounded-xl border border-cyan-500/15">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0b1628]/60">
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
                  text-slate-400 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-t border-cyan-500/10">
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
                <td className="px-2 py-2 font-mono text-cyan-400 font-semibold text-xs whitespace-nowrap">
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
  <div className="mt-4 bg-[#0b1628]/60 border border-cyan-500/20 rounded-xl p-4">
    <div className="flex justify-between text-sm py-1">
      <span className="text-slate-400">Subtotal</span>
      <span className="font-mono font-semibold">{fmt(subtotal)}</span>
    </div>
    <div className="flex justify-between text-sm py-1">
      <span className="text-slate-400">VAT (20%)</span>
      <span className="font-mono font-semibold">{fmt(vat)}</span>
    </div>
    <div className="flex justify-between pt-3 mt-2 border-t border-cyan-500/20">
      <span className="font-semibold">{label}</span>
      <span className="font-mono font-bold text-xl text-cyan-400">
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
      <div className="overflow-x-auto rounded-xl border border-cyan-500/15">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0b1628]/60">
              {["Description", "Qty", "Rate", "Total"].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 text-left text-[10px] font-bold
                  text-slate-400 uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-t border-cyan-500/10">
                <td className="px-3 py-2.5">{it.desc}</td>
                <td className="px-3 py-2.5">{it.qty}</td>
                <td className="px-3 py-2.5 font-mono">{fmt(it.rate)}</td>
                <td className="px-3 py-2.5 font-mono text-cyan-400 font-semibold">
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
