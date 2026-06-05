import { useState } from "react";
import { fmt, calcLineTotal, today, padId } from "../../utils/helpers";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { LineItemsTable, ViewLineItems } from "../ui/LineItems";
import {
  FormSection,
  SectionTitle,
  FormGroup,
  Input,
  Textarea,
} from "../ui/FormControls";
import { BtnPrimary, BtnGhost, BtnGreen } from "../ui/Buttons";
import {
  StatStrip,
  EmptyState,
  RegPlate,
  TableCard,
  PageHeader,
} from "../ui/DataDisplay";

const defaultForm = () => ({
  customer: "",
  reg: "",
  vehicle: "",
  date: today(),
  dueDate: "",
  email: "",
  phone: "",
  address: "",
  vatNo: "",
  notes: "",
  items: [{ desc: "", qty: 1, rate: "" }],
});

// ─── INVOICE MODULE ───────────────────────────────────────────────────────────
const Invoice = ({ invoices, setInvoices, onRecordPayment }) => {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(defaultForm());

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const sub = calcLineTotal(form.items);
    const inv = {
      id: padId("INV", invoices.length),
      ...form,
      total: sub + sub * 0.2,
      status: "Unpaid",
    };
    setInvoices((p) => [...p, inv]);
    setShowNew(false);
    setForm(defaultForm());
  };

  const outstanding = invoices
    .filter((i) => i.status === "Unpaid")
    .reduce((s, i) => s + i.total, 0);

  const stats = [
    { label: "Total Invoices", value: invoices.length, color: "text-cyan-400" },
    {
      label: "Unpaid",
      value: invoices.filter((i) => i.status === "Unpaid").length,
      color: "text-amber-400",
    },
    {
      label: "Paid",
      value: invoices.filter((i) => i.status === "Paid").length,
      color: "text-emerald-400",
    },
    {
      label: "Outstanding",
      value: fmt(outstanding),
      sub: "Total owed",
      color: "text-red-400",
    },
  ];

  return (
    <div>
      <PageHeader
        icon="🧾"
        title="Invoices"
        sub="Manage billing, VAT invoices and outstanding payments"
        action={
          <BtnPrimary onClick={() => setShowNew(true)}>
            + New Invoice
          </BtnPrimary>
        }
      />

      <StatStrip stats={stats} />

      <TableCard title="All Invoices" count={invoices.length}>
        {invoices.length === 0 ? (
          <EmptyState
            icon="🧾"
            title="No invoices yet"
            sub="Complete a job sheet to generate an invoice"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0b1628]/60">
                  {[
                    "Invoice #",
                    "Customer",
                    "Vehicle",
                    "Registration",
                    "Date",
                    "Total",
                    "Status",
                    "Actions",
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
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-t border-cyan-500/10 hover:bg-cyan-500/5 cursor-pointer transition-colors"
                    onClick={() => setViewing(inv)}
                  >
                    <td className="px-4 py-3 font-mono text-cyan-400 font-bold text-sm">
                      {inv.id}
                    </td>
                    <td className="px-4 py-3 font-semibold">{inv.customer}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {inv.vehicle}
                    </td>
                    <td className="px-4 py-3">
                      <RegPlate reg={inv.reg} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      {inv.date}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">
                      {fmt(inv.total)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={inv.status} />
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {inv.status === "Unpaid" && (
                        <BtnGreen
                          className="text-xs py-1 px-3"
                          onClick={() => onRecordPayment(inv)}
                        >
                          💳 Pay
                        </BtnGreen>
                      )}
                      {inv.status === "Paid" && (
                        <span className="text-emerald-400 text-sm font-semibold">
                          ✓ Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TableCard>

      {/* ── NEW INVOICE MODAL ── */}
      {showNew && (
        <Modal
          title="New Invoice"
          sub="Generate a VAT invoice for completed work"
          onClose={() => setShowNew(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowNew(false)}>Cancel</BtnGhost>
              <BtnPrimary onClick={save}>🧾 Create Invoice</BtnPrimary>
            </>
          }
        >
          <FormSection>
            <SectionTitle>👤 Bill To</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <FormGroup label="Customer Name *">
                  <Input
                    value={form.customer}
                    onChange={(e) => set("customer", e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="col-span-3">
                <FormGroup label="Address">
                  <Input
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="123 High Street, London"
                  />
                </FormGroup>
              </div>
              <FormGroup label="Email">
                <Input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </FormGroup>
              <FormGroup label="VAT Number">
                <Input
                  className="font-mono"
                  value={form.vatNo}
                  onChange={(e) => set("vatNo", e.target.value)}
                  placeholder="GB 123456789"
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>🚗 Vehicle & Dates</SectionTitle>
            <div className="grid grid-cols-4 gap-4">
              <FormGroup label="Registration">
                <Input
                  className="font-mono uppercase"
                  value={form.reg}
                  onChange={(e) => set("reg", e.target.value.toUpperCase())}
                />
              </FormGroup>
              <FormGroup label="Make & Model">
                <Input
                  value={form.vehicle}
                  onChange={(e) => set("vehicle", e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Invoice Date">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Due Date">
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => set("dueDate", e.target.value)}
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>💰 Charges</SectionTitle>
            <LineItemsTable
              items={form.items}
              setItems={(v) => set("items", v)}
              withVatCol
            />
          </FormSection>

          <FormSection>
            <SectionTitle>📝 Notes & Terms</SectionTitle>
            <Textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Payment terms, notes to customer..."
            />
          </FormSection>
        </Modal>
      )}

      {/* ── VIEW INVOICE MODAL ── */}
      {viewing && (
        <Modal
          title={`${viewing.id} — Invoice`}
          sub={
            <span className="flex items-center gap-2">
              {viewing.customer} · <RegPlate reg={viewing.reg} />
            </span>
          }
          onClose={() => setViewing(null)}
          footer={
            <>
              <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>
              {viewing.status === "Unpaid" && (
                <BtnGreen
                  onClick={() => {
                    onRecordPayment(viewing);
                    setViewing(null);
                  }}
                >
                  💳 Record Payment
                </BtnGreen>
              )}
            </>
          }
        >
          <div className="flex justify-between items-center mb-5">
            <Badge status={viewing.status} />
            <span className="font-mono font-bold text-2xl text-cyan-400">
              {fmt(viewing.total)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Invoice Date
              </span>
              <div className="font-mono mt-1">{viewing.date}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Due Date
              </span>
              <div className="font-mono mt-1">{viewing.dueDate || "—"}</div>
            </div>
          </div>
          <SectionTitle>Charges</SectionTitle>
          <ViewLineItems items={viewing.items} total={viewing.total} />
        </Modal>
      )}
    </div>
  );
};

export default Invoice;
