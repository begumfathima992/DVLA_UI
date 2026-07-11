import { useState } from "react";
import { fmt, calcLineTotal, today, padId } from "../../utils/helpers";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { LineItemsTable, ViewLineItems } from "../ui/LineItems";
import {
  FormSection,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Textarea,
} from "../ui/FormControls";
import {
  BtnPrimary,
  BtnGhost,
  BtnGreen,
  BtnRed,
  BtnAmber,
} from "../ui/Buttons";
import {
  StatStrip,
  EmptyState,
  RegPlate,
  TableCard,
  PageHeader,
} from "../ui/DataDisplay";

// ─── DEFAULT FORM STATE ───────────────────────────────────────────────────────
const defaultForm = () => ({
  customer: "",
  email: "",
  phone: "",
  reg: "",
  vehicle: "",
  mileage: "",
  date: today(),
  notes: "",
  items: [{ desc: "", qty: 1, rate: "" }],
});

// ─── ESTIMATE MODULE ──────────────────────────────────────────────────────────
const Estimates = ({ estimates, setEstimates, onConvert }) => {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(defaultForm());

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const sub = calcLineTotal(form.items);
    const est = {
      id: padId("EST", estimates.length),
      ...form,
      total: sub + sub * 0.2,
      status: "Pending",
    };
    setEstimates((p) => [...p, est]);
    setShowNew(false);
    setForm(defaultForm());
  };

  const approve = (id) =>
    setEstimates((p) =>
      p.map((e) => (e.id === id ? { ...e, status: "Approved" } : e)),
    );
  const decline = (id) =>
    setEstimates((p) =>
      p.map((e) => (e.id === id ? { ...e, status: "Declined" } : e)),
    );

  const stats = [
    {
      label: "Total Estimates",
      value: estimates.length,
      sub: "All time",
      color: "text-[#be123c]",
    },
    {
      label: "Pending",
      value: estimates.filter((e) => e.status === "Pending").length,
      sub: "Awaiting approval",
      color: "text-amber-400",
    },
    {
      label: "Approved",
      value: estimates.filter((e) => e.status === "Approved").length,
      sub: "Ready for job",
      color: "text-emerald-400",
    },
    {
      label: "Pipeline Value",
      value: fmt(estimates.reduce((s, e) => s + e.total, 0)),
      sub: "Total quoted",
      color: "text-[#be123c]",
    },
  ];

  return (
    <div>
      <PageHeader
        icon="📋"
        title="Estimates"
        sub="Create and manage customer quotes before work begins"
        action={
          <BtnPrimary onClick={() => setShowNew(true)}>
            + New Estimate
          </BtnPrimary>
        }
      />

      <StatStrip stats={stats} />

      {/* Table */}
      <TableCard title="All Estimates" count={estimates.length}>
        {estimates.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No estimates yet"
            sub="Create your first estimate to get started"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/80">
                  {[
                    "Estimate #",
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
                {estimates.map((est) => (
                  <tr
                    key={est.id}
                    className="border-t border-slate-100 hover:bg-[#fff1f2] cursor-pointer transition-colors"
                    onClick={() => setViewing(est)}
                  >
                    <td className="px-4 py-3 font-mono text-[#be123c] font-extrabold text-sm">
                      {est.id}
                    </td>
                    <td className="px-4 py-3 font-semibold">{est.customer}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {est.vehicle}
                    </td>
                    <td className="px-4 py-3">
                      <RegPlate reg={est.reg} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      {est.date}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-red-600">
                      {fmt(est.total)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={est.status} />
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex gap-2">
                        {est.status === "Pending" && (
                          <>
                            <BtnGreen
                              className="text-xs py-1 px-3"
                              onClick={() => approve(est.id)}
                            >
                              ✓ Approve
                            </BtnGreen>
                            <BtnRed
                              className="text-xs py-1 px-3"
                              onClick={() => decline(est.id)}
                            >
                              ✗ Decline
                            </BtnRed>
                          </>
                        )}
                        {est.status === "Approved" && (
                          <BtnPrimary
                            className="text-xs py-1 px-3"
                            onClick={() => onConvert(est)}
                          >
                            → Job Sheet
                          </BtnPrimary>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TableCard>

      {/* ── NEW ESTIMATE MODAL ── */}
      {showNew && (
        <Modal
          title="New Estimate"
          sub="Complete all sections to generate a quote"
          onClose={() => setShowNew(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowNew(false)}>Cancel</BtnGhost>
              <BtnAmber onClick={save}>💾 Save Draft</BtnAmber>
              <BtnPrimary onClick={save}>📋 Create Estimate</BtnPrimary>
            </>
          }
        >
          <FormSection>
            <SectionTitle>👤 Customer Information</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <FormGroup label="Full Name *">
                  <Input
                    value={form.customer}
                    onChange={(e) => set("customer", e.target.value)}
                    placeholder="John Smith"
                  />
                </FormGroup>
              </div>
              <FormGroup label="Email">
                <Input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="john@email.com"
                />
              </FormGroup>
              <FormGroup label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="07700 900000"
                />
              </FormGroup>
              <FormGroup label="Date">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>🚗 Vehicle Details</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <FormGroup label="Registration *">
                <Input
                  className="font-mono uppercase"
                  value={form.reg}
                  onChange={(e) => set("reg", e.target.value.toUpperCase())}
                  placeholder="AB12 CDE"
                />
              </FormGroup>
              <FormGroup label="Make & Model *">
                <Input
                  value={form.vehicle}
                  onChange={(e) => set("vehicle", e.target.value)}
                  placeholder="BMW 520d"
                />
              </FormGroup>
              <FormGroup label="Mileage">
                <Input
                  value={form.mileage}
                  onChange={(e) => set("mileage", e.target.value)}
                  placeholder="45,000"
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>💰 Line Items</SectionTitle>
            <LineItemsTable
              items={form.items}
              setItems={(v) => set("items", v)}
            />
          </FormSection>

          <FormSection>
            <SectionTitle>📝 Notes</SectionTitle>
            <Textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Additional notes or customer requests..."
            />
          </FormSection>
        </Modal>
      )}

      {/* ── VIEW ESTIMATE MODAL ── */}
      {viewing && (
        <Modal
          title={`${viewing.id} — Estimate Details`}
          sub={
            <span className="flex items-center gap-2">
              {viewing.customer} · {viewing.vehicle} ·{" "}
              <RegPlate reg={viewing.reg} />
            </span>
          }
          onClose={() => setViewing(null)}
          footer={
            <>
              <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>
              {viewing.status === "Pending" && (
                <>
                  <BtnRed
                    onClick={() => {
                      decline(viewing.id);
                      setViewing(null);
                    }}
                  >
                    ✗ Decline
                  </BtnRed>
                  <BtnGreen
                    onClick={() => {
                      approve(viewing.id);
                      setViewing({ ...viewing, status: "Approved" });
                    }}
                  >
                    ✓ Approve
                  </BtnGreen>
                </>
              )}
              {viewing.status === "Approved" && (
                <BtnPrimary
                  onClick={() => {
                    onConvert(viewing);
                    setViewing(null);
                  }}
                >
                  → Convert to Job Sheet
                </BtnPrimary>
              )}
            </>
          }
        >
          <div className="flex justify-between items-center mb-5">
            <Badge status={viewing.status} />
            <span className="font-mono font-bold text-2xl text-red-600">
              {fmt(viewing.total)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <Label>Customer</Label>
              <div className="font-semibold mt-1">{viewing.customer}</div>
            </div>
            <div>
              <Label>Date</Label>
              <div className="font-mono mt-1">{viewing.date}</div>
            </div>
          </div>
          <SectionTitle>Line Items</SectionTitle>
          <ViewLineItems items={viewing.items} total={viewing.total} />
        </Modal>
      )}
    </div>
  );
};

export default Estimates;
