import { useState } from "react";
import { fmt, today, padId } from "../../utils/helpers";
import { PAY_METHODS } from "../../data/sampleData";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import {
  FormSection,
  SectionTitle,
  FormGroup,
  Input,
  Select,
} from "../ui/FormControls";
import { BtnPrimary, BtnGhost, BtnGreen } from "../ui/Buttons";
import {
  StatStrip,
  EmptyState,
  TableCard,
  PageHeader,
} from "../ui/DataDisplay";

const defaultForm = (prefill = null) => ({
  invId: prefill?.id || "",
  customer: prefill?.customer || "",
  amount: prefill?.total || "",
  date: today(),
  reference: "",
  notes: "",
});

// ─── PAYMENT MODULE ───────────────────────────────────────────────────────────
const Payment = ({
  payments,
  setPayments,
  invoices,
  setInvoices,
  prefill,
  clearPrefill,
}) => {
  const [showNew, setShowNew] = useState(!!prefill);
  const [form, setForm] = useState(defaultForm(prefill));
  const [payMethod, setPayMethod] = useState("Card");
  const [prevPrefill, setPrevPrefill] = useState(prefill);

  // Sync when prefill changes (triggered from Invoices page)
  if (prefill && prefill !== prevPrefill) {
    setPrevPrefill(prefill);
    setForm(defaultForm(prefill));
    setPayMethod("Card");
    setShowNew(true);
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const pay = {
      id: padId("PAY", payments.length),
      ...form,
      method: payMethod,
      status: "Confirmed",
    };
    setPayments((p) => [...p, pay]);
    setInvoices((ivs) =>
      ivs.map((i) => (i.id === form.invId ? { ...i, status: "Paid" } : i)),
    );
    setShowNew(false);
    clearPrefill();
    setForm(defaultForm());
  };

  const closeModal = () => {
    setShowNew(false);
    clearPrefill();
  };

  const totalReceived = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
  const thisMonth = payments
    .filter((p) => p.date?.startsWith("2026-05"))
    .reduce((s, p) => s + Number(p.amount || 0), 0);

  const stats = [
    { label: "Transactions", value: payments.length, color: "text-cyan-400" },
    {
      label: "Total Received",
      value: fmt(totalReceived),
      color: "text-emerald-400",
    },
    { label: "This Month", value: fmt(thisMonth), color: "text-cyan-400" },
    {
      label: "Card / Cash",
      value: `${payments.filter((p) => p.method === "Card").length} / ${payments.filter((p) => p.method === "Cash").length}`,
      color: "text-amber-400",
    },
  ];

  return (
    <div>
      <PageHeader
        icon="💳"
        title="Payments"
        sub="Record and track all payment transactions"
        action={
          <BtnPrimary onClick={() => setShowNew(true)}>
            + Record Payment
          </BtnPrimary>
        }
      />

      <StatStrip stats={stats} />

      <TableCard title="Payment History" count={payments.length}>
        {payments.length === 0 ? (
          <EmptyState
            icon="💳"
            title="No payments yet"
            sub="Record payment against an invoice"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0b1628]/60">
                  {[
                    "Payment #",
                    "Invoice #",
                    "Customer",
                    "Amount",
                    "Method",
                    "Date",
                    "Reference",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((pay) => (
                  <tr
                    key={pay.id}
                    className="border-t border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-cyan-400 font-bold text-sm">
                      {pay.id}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400 text-sm">
                      {pay.invId}
                    </td>
                    <td className="px-4 py-3 font-semibold">{pay.customer}</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-400">
                      {fmt(pay.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-base mr-1.5">
                        {pay.method === "Card"
                          ? "💳"
                          : pay.method === "Cash"
                            ? "💵"
                            : "🏦"}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {pay.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      {pay.date}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      {pay.reference || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={pay.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TableCard>

      {/* ── RECORD PAYMENT MODAL ── */}
      {showNew && (
        <Modal
          title="Record Payment"
          sub="Capture payment against an invoice"
          onClose={closeModal}
          footer={
            <>
              <BtnGhost onClick={closeModal}>Cancel</BtnGhost>
              <BtnGreen
                onClick={save}
                disabled={!form.amount || !form.customer}
              >
                ✓ Confirm Payment
              </BtnGreen>
            </>
          }
        >
          {/* Invoice selection */}
          <FormSection>
            <SectionTitle>🧾 Invoice Details</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Invoice Number">
                <Select
                  value={form.invId}
                  onChange={(e) => {
                    const inv = invoices.find((i) => i.id === e.target.value);
                    set("invId", e.target.value);
                    if (inv) {
                      set("customer", inv.customer);
                      set("amount", inv.total);
                    }
                  }}
                >
                  <option value="">Select invoice...</option>
                  {invoices
                    .filter((i) => i.status !== "Paid")
                    .map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.id} — {i.customer} ({fmt(i.total)})
                      </option>
                    ))}
                </Select>
              </FormGroup>
              <FormGroup label="Customer">
                <Input
                  value={form.customer}
                  onChange={(e) => set("customer", e.target.value)}
                  placeholder="Customer name"
                />
              </FormGroup>
              <FormGroup label="Amount (£) *">
                <Input
                  className="font-mono"
                  type="number"
                  value={form.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  placeholder="0.00"
                />
              </FormGroup>
              <FormGroup label="Payment Date">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Payment method */}
          <FormSection>
            <SectionTitle>💳 Payment Method</SectionTitle>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {PAY_METHODS.map((m) => (
                <div
                  key={m.name}
                  onClick={() => setPayMethod(m.name)}
                  className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                    payMethod === m.name
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/20 hover:border-cyan-500/50"
                  }`}
                >
                  <div className="text-2xl mb-1.5">{m.icon}</div>
                  <div className="font-semibold text-sm">{m.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </FormSection>

          {/* Reference */}
          <FormSection>
            <SectionTitle>📄 Reference & Notes</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Reference / Auth Code">
                <Input
                  className="font-mono"
                  value={form.reference}
                  onChange={(e) => set("reference", e.target.value)}
                  placeholder="TXN-ABC123"
                />
              </FormGroup>
              <FormGroup label="Notes">
                <Input
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Optional notes..."
                />
              </FormGroup>
            </div>
          </FormSection>

          {/* Confirmation banner */}
          {form.amount && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              <span className="text-lg flex-shrink-0">✓</span>
              <span>
                Payment of <strong>{fmt(form.amount)}</strong> via{" "}
                <strong>{payMethod}</strong> will be recorded and the invoice
                marked as paid.
              </span>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Payment;
