import { useState } from "react";
import {
  FiClipboard,
  FiTool,
  FiFileText,
  FiCreditCard,
  FiPlus,
  FiX,
  FiCheck,
  FiArrowRight,
  FiChevronRight,
  FiUser,
  FiTruck,
  FiAlertCircle,
  FiCheckCircle,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// ─── SAMPLE DATA ────────────────────────────────────────────────────────
const sampleEstimates = [
  {
    id: "EST-001",
    customer: "James Mitchell",
    reg: "LK23 XYZ",
    vehicle: "BMW 520d",
    date: "2026-05-20",
    total: 820.0,
    status: "Pending",
    items: [
      { desc: "Full Service & Oil Change", qty: 1, rate: 280 },
      { desc: "Brake Pads Front", qty: 2, rate: 85 },
      { desc: "Tyre Rotation", qty: 1, rate: 60 },
      { desc: "Air Filter Replacement", qty: 1, rate: 45 },
    ],
  },
  {
    id: "EST-002",
    customer: "Sarah Bloom",
    reg: "SB71 ABC",
    vehicle: "Mercedes C220",
    date: "2026-05-21",
    total: 1450.0,
    status: "Approved",
    items: [
      { desc: "Timing Belt & Water Pump", qty: 1, rate: 750 },
      { desc: "Coolant Flush", qty: 1, rate: 120 },
      { desc: "Spark Plugs x6", qty: 6, rate: 25 },
      { desc: "Labour - Diagnostics", qty: 2, rate: 80 },
    ],
  },
  {
    id: "EST-003",
    customer: "Omar Hassan",
    reg: "OH22 TRE",
    vehicle: "Audi A4 2.0T",
    date: "2026-05-22",
    total: 560.0,
    status: "Declined",
    items: [
      { desc: "Clutch Replacement", qty: 1, rate: 480 },
      { desc: "Flywheel Inspection", qty: 1, rate: 80 },
    ],
  },
];
const sampleJobSheets = [
  {
    id: "JOB-001",
    estId: "EST-002",
    customer: "Sarah Bloom",
    reg: "SB71 ABC",
    vehicle: "Mercedes C220",
    assignedTo: "Tech: Mike",
    startDate: "2026-05-23",
    status: "In Progress",
    notes: "Customer advised noise from engine bay",
    items: [{ desc: "Labour", qty: 3.5, rate: 65 }],
    total: 227.5,
  },
  {
    id: "JOB-002",
    estId: "",
    customer: "David Osei",
    reg: "DO20 LMN",
    vehicle: "Ford Focus ST",
    assignedTo: "Tech: Raj",
    startDate: "2026-05-24",
    status: "Complete",
    notes: "Routine service and MOT preparation",
    items: [{ desc: "Service", qty: 1, rate: 390 }],
    total: 390,
  },
];
const sampleInvoices = [
  {
    id: "INV-001",
    jobId: "JOB-002",
    customer: "David Osei",
    reg: "DO20 LMN",
    vehicle: "Ford Focus ST",
    date: "2026-05-25",
    total: 468.0,
    status: "Unpaid",
    items: [{ desc: "Routine Service & MOT Prep", qty: 1, rate: 390 }],
  },
];
const samplePayments = [
  {
    id: "PAY-001",
    invId: "INV-001",
    customer: "David Osei",
    amount: 468.0,
    method: "Card",
    date: "2026-05-26",
    status: "Confirmed",
    reference: "TXN-9821",
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────
const fmt = (n) => `£${Number(n).toFixed(2)}`;
const calcLineTotal = (items) =>
  items.reduce(
    (s, it) => s + parseFloat(it.qty || 1) * parseFloat(it.rate || 0),
    0,
  );

const STATUS_STYLES = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Approved: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Declined: "bg-red-500/10 text-red-400 border-red-500/20",
  Converted: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  "In Progress": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Complete: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Invoiced: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Unpaid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};
const STATUS_DOT = {
  Pending: "bg-amber-400",
  Approved: "bg-cyan-400",
  Declined: "bg-red-400",
  Converted: "bg-slate-400",
  "In Progress": "bg-violet-400",
  Complete: "bg-emerald-400",
  Invoiced: "bg-slate-400",
  Open: "bg-amber-400",
  Unpaid: "bg-amber-400",
  Paid: "bg-emerald-400",
  Confirmed: "bg-emerald-400",
  Cancelled: "bg-red-400",
};

const Badge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}
  >
    <span
      className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status] || "bg-slate-400"}`}
    />
    {status}
  </span>
);

const RegPlate = ({ reg }) => (
  <span className="inline-block bg-yellow-300 text-black font-mono font-bold text-xs px-2 py-0.5 rounded tracking-wider">
    {reg}
  </span>
);

const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm">
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </div>
    <div className={`text-2xl font-bold font-mono ${color || "text-cyan-400"}`}>
      {value}
    </div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

// ─── MODAL WRAPPER ──────────────────────────────────────────────────────
const Modal = ({ title, sub, onClose, children, footer }) => (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-[#112240] border border-cyan-500/20 rounded-2xl w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-2xl animate-[slideUp_0.25s_ease]"
      style={{ animation: "slideUp 0.25s ease" }}
      onClick={(e) => e.stopPropagation()}
    >
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      {/* Header */}
      <div className="sticky top-0 bg-[#112240] z-10 px-7 pt-6 pb-4 border-b border-cyan-500/20 flex items-start justify-between rounded-t-2xl">
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-slate-500/10 hover:bg-red-500/15 hover:text-red-400 text-slate-400 flex items-center justify-center transition-all"
        >
          <FiX />
        </button>
      </div>
      {/* Body */}
      <div className="px-7 py-6">{children}</div>
      {/* Footer */}
      {footer && (
        <div className="px-7 py-4 border-t border-cyan-500/20 flex justify-end gap-2.5 bg-[#0b1628]/40 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  </div>
);

// ─── FORM PRIMITIVES ────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
    {children}
  </label>
);
const Input = (props) => (
  <input
    {...props}
    className={`w-full bg-[#0b1628]/80 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15 outline-none transition-all ${props.className || ""}`}
  />
);
const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full bg-[#0b1628]/80 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15 outline-none transition-all"
  >
    {children}
  </select>
);
const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full bg-[#0b1628]/80 border border-cyan-500/20 rounded-lg px-3 py-2.5 text-white text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15 outline-none transition-all resize-y min-h-[72px]"
  />
);
const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-3 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">
    {children}
    <span className="flex-1 h-px bg-cyan-500/20" />
  </div>
);
const FormSection = ({ children }) => (
  <div className="mb-6 pb-6 border-b border-cyan-500/15 last:border-0 last:mb-0 last:pb-0">
    {children}
  </div>
);

// Buttons
const Btn = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 disabled:opacity-40 ${className}`}
  >
    {children}
  </button>
);
const BtnPrimary = (p) => (
  <Btn
    {...p}
    className={`bg-cyan-500 text-[#0b1628] hover:bg-cyan-400 hover:-translate-y-px shadow-lg shadow-cyan-500/20 ${p.className || ""}`}
  />
);
const BtnGhost = (p) => (
  <Btn
    {...p}
    className={`bg-transparent text-slate-400 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-400 ${p.className || ""}`}
  />
);
const BtnGreen = (p) => (
  <Btn
    {...p}
    className={`bg-emerald-500 text-white hover:brightness-110 hover:-translate-y-px ${p.className || ""}`}
  />
);
const BtnRed = (p) => (
  <Btn
    {...p}
    className={`bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white ${p.className || ""}`}
  />
);
const BtnAmber = (p) => (
  <Btn
    {...p}
    className={`bg-amber-500 text-[#0b1628] hover:brightness-110 hover:-translate-y-px ${p.className || ""}`}
  />
);

// ─── LINE ITEMS TABLE ───────────────────────────────────────────────────
const LineItemsTable = ({ items, setItems, withVatCol }) => {
  const setItem = (i, k, v) => {
    const a = [...items];
    a[i] = { ...a[i], [k]: v };
    setItems(a);
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
              <th
                className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                style={{ width: "45%" }}
              >
                Description
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Qty
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Rate (£)
              </th>
              {withVatCol && (
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  VAT
                </th>
              )}
              <th className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total
              </th>
              <th className="px-3 py-2.5" style={{ width: "8%" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-t border-cyan-500/10">
                <td className="px-2 py-2">
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
                <td className="px-2 py-2 font-mono text-cyan-400 font-semibold text-xs">
                  {fmt((it.qty || 0) * (it.rate || 0))}
                </td>
                <td className="px-2 py-2">
                  {items.length > 1 && (
                    <BtnRed
                      className="px-2 py-1 text-xs"
                      onClick={() => removeItem(i)}
                    >
                      <FiX />
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
          <FiPlus /> Add Line
        </BtnGhost>
      </div>
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
          <span className="font-semibold">Total</span>
          <span className="font-mono font-bold text-xl text-cyan-400">
            {fmt(subtotal + vat)}
          </span>
        </div>
      </div>
    </>
  );
};

const ViewTotals = ({ items, total }) => {
  const sub = calcLineTotal(items || []);
  return (
    <div className="mt-4 bg-[#0b1628]/60 border border-cyan-500/20 rounded-xl p-4">
      <div className="flex justify-between text-sm py-1">
        <span className="text-slate-400">Subtotal</span>
        <span className="font-mono">{fmt(sub)}</span>
      </div>
      <div className="flex justify-between text-sm py-1">
        <span className="text-slate-400">VAT (20%)</span>
        <span className="font-mono">{fmt(sub * 0.2)}</span>
      </div>
      <div className="flex justify-between pt-3 mt-2 border-t border-cyan-500/20">
        <span className="font-semibold">Total</span>
        <span className="font-mono font-bold text-xl text-cyan-400">
          {fmt(total || sub + sub * 0.2)}
        </span>
      </div>
    </div>
  );
};

// ─── EMPTY STATE ─────────────────────────────────────────────────────────
const EmptyState = ({ icon, title, sub }) => (
  <div className="text-center py-16 px-6">
    <div className="text-5xl opacity-20 mb-4">{icon}</div>
    <div className="text-base font-semibold text-white/40 mb-1">{title}</div>
    <div className="text-sm text-slate-500">{sub}</div>
  </div>
);

// ─── ESTIMATES MODULE ────────────────────────────────────────────────────
function EstimateModule({ estimates, setEstimates, onConvert }) {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState({
    customer: "",
    email: "",
    phone: "",
    reg: "",
    vehicle: "",
    mileage: "",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
    items: [{ desc: "", qty: 1, rate: "" }],
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const sub = calcLineTotal(form.items);
    const est = {
      id: `EST-${String(estimates.length + 1).padStart(3, "0")}`,
      ...form,
      total: sub + sub * 0.2,
      status: "Pending",
    };
    setEstimates((p) => [...p, est]);
    setShowNew(false);
    setForm({
      customer: "",
      email: "",
      phone: "",
      reg: "",
      vehicle: "",
      mileage: "",
      date: new Date().toISOString().slice(0, 10),
      notes: "",
      items: [{ desc: "", qty: 1, rate: "" }],
    });
  };

  const approve = (id) =>
    setEstimates((p) =>
      p.map((e) => (e.id === id ? { ...e, status: "Approved" } : e)),
    );
  const decline = (id) =>
    setEstimates((p) =>
      p.map((e) => (e.id === id ? { ...e, status: "Declined" } : e)),
    );

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <FiClipboard className="text-amber-400" />
            Estimates
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Create and manage customer quotes before work begins
          </div>
        </div>
        <BtnPrimary onClick={() => setShowNew(true)}>
          <FiPlus />
          New Estimate
        </BtnPrimary>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCard
          label="Total Estimates"
          value={estimates.length}
          sub="All time"
          color="text-cyan-400"
        />
        <StatCard
          label="Pending"
          value={estimates.filter((e) => e.status === "Pending").length}
          sub="Awaiting approval"
          color="text-amber-400"
        />
        <StatCard
          label="Approved"
          value={estimates.filter((e) => e.status === "Approved").length}
          sub="Ready for job sheet"
          color="text-emerald-400"
        />
        <StatCard
          label="Pipeline Value"
          value={fmt(estimates.reduce((s, e) => s + e.total, 0))}
          sub="Total quoted"
          color="text-cyan-400"
        />
      </div>

      <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-5 py-4 border-b border-cyan-500/20 flex justify-between items-center">
          <div className="font-bold text-sm">All Estimates</div>
          <div className="text-xs text-slate-400">
            {estimates.length} records
          </div>
        </div>
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
                <tr className="bg-[#0b1628]/60">
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
                    className="border-t border-cyan-500/10 hover:bg-cyan-500/5 cursor-pointer transition-colors"
                    onClick={() => setViewing(est)}
                  >
                    <td className="px-4 py-3 font-mono text-cyan-400 font-bold text-sm">
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
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">
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
                              <FiCheck />
                              Approve
                            </BtnGreen>
                            <BtnRed
                              className="text-xs py-1 px-3"
                              onClick={() => decline(est.id)}
                            >
                              <FiX />
                              Decline
                            </BtnRed>
                          </>
                        )}
                        {est.status === "Approved" && (
                          <BtnPrimary
                            className="text-xs py-1 px-3"
                            onClick={() => onConvert(est)}
                          >
                            <FiArrowRight />
                            Job Sheet
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
      </div>

      {/* New Estimate Modal */}
      {showNew && (
        <Modal
          title="New Estimate"
          sub="Complete all sections to generate a quote"
          onClose={() => setShowNew(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowNew(false)}>Cancel</BtnGhost>
              <BtnAmber onClick={() => save()}>💾 Save Draft</BtnAmber>
              <BtnPrimary onClick={() => save()}>📋 Create Estimate</BtnPrimary>
            </>
          }
        >
          <FormSection>
            <SectionTitle>
              <FiUser />
              Customer Information
            </SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <Label>Full Name *</Label>
                <Input
                  value={form.customer}
                  onChange={(e) => set("customer", e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="john@email.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="07700 900000"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>
              <FiTruck />
              Vehicle Details
            </SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Registration *</Label>
                <Input
                  className="font-mono uppercase"
                  value={form.reg}
                  onChange={(e) => set("reg", e.target.value.toUpperCase())}
                  placeholder="AB12 CDE"
                />
              </div>
              <div>
                <Label>Make & Model *</Label>
                <Input
                  value={form.vehicle}
                  onChange={(e) => set("vehicle", e.target.value)}
                  placeholder="BMW 520d"
                />
              </div>
              <div>
                <Label>Mileage</Label>
                <Input
                  value={form.mileage}
                  onChange={(e) => set("mileage", e.target.value)}
                  placeholder="45,000"
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>
              <FiDollarSign />
              Line Items
            </SectionTitle>
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

      {/* View Estimate Modal */}
      {viewing && (
        <Modal
          title={`${viewing.id} — Estimate Details`}
          sub={
            <span>
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
            <span className="font-mono font-bold text-2xl text-cyan-400">
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
          <div className="overflow-x-auto rounded-xl border border-cyan-500/15">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0b1628]/60">
                  {["Description", "Qty", "Rate", "Total"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(viewing.items || []).map((it, i) => (
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
          <ViewTotals items={viewing.items} total={viewing.total} />
        </Modal>
      )}
    </div>
  );
}

// ─── JOB SHEET MODULE ────────────────────────────────────────────────────
function JobSheetModule({ jobSheets, setJobSheets, onConvertToInvoice }) {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState({
    customer: "",
    reg: "",
    vehicle: "",
    assignedTo: "",
    startDate: new Date().toISOString().slice(0, 10),
    faultReported: "",
    work: "",
    notes: "",
    mileageIn: "",
    status: "Open",
    items: [{ desc: "Labour", qty: 1, rate: 65 }],
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const sub = calcLineTotal(form.items);
    const job = {
      id: `JOB-${String(jobSheets.length + 1).padStart(3, "0")}`,
      ...form,
      total: sub + sub * 0.2,
    };
    setJobSheets((p) => [...p, job]);
    setShowNew(false);
    setForm({
      customer: "",
      reg: "",
      vehicle: "",
      assignedTo: "",
      startDate: new Date().toISOString().slice(0, 10),
      faultReported: "",
      work: "",
      notes: "",
      mileageIn: "",
      status: "Open",
      items: [{ desc: "Labour", qty: 1, rate: 65 }],
    });
  };

  const markComplete = (id) =>
    setJobSheets((p) =>
      p.map((j) => (j.id === id ? { ...j, status: "Complete" } : j)),
    );

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <FiTool className="text-violet-400" />
            Job Sheets
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Manage ongoing workshop jobs and technician assignments
          </div>
        </div>
        <BtnPrimary onClick={() => setShowNew(true)}>
          <FiPlus />
          New Job Sheet
        </BtnPrimary>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCard
          label="Total Jobs"
          value={jobSheets.length}
          color="text-cyan-400"
        />
        <StatCard
          label="Active / Open"
          value={
            jobSheets.filter(
              (j) => j.status !== "Complete" && j.status !== "Invoiced",
            ).length
          }
          sub="In workshop"
          color="text-violet-400"
        />
        <StatCard
          label="Completed"
          value={jobSheets.filter((j) => j.status === "Complete").length}
          sub="Ready to invoice"
          color="text-emerald-400"
        />
        <StatCard
          label="Conversion Rate"
          value={
            jobSheets.length > 0
              ? `${Math.round((jobSheets.filter((j) => j.status === "Complete").length / jobSheets.length) * 100)}%`
              : "0%"
          }
          color="text-amber-400"
        />
      </div>

      <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-5 py-4 border-b border-cyan-500/20 flex justify-between items-center">
          <div className="font-bold text-sm">All Job Sheets</div>
          <div className="text-xs text-slate-400">
            {jobSheets.length} records
          </div>
        </div>
        {jobSheets.length === 0 ? (
          <EmptyState
            icon="🔧"
            title="No job sheets"
            sub="Approve an estimate or create a new job sheet"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0b1628]/60">
                  {[
                    "Job #",
                    "Customer",
                    "Vehicle",
                    "Registration",
                    "Assigned To",
                    "Start Date",
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
                {jobSheets.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-cyan-500/10 hover:bg-cyan-500/5 cursor-pointer transition-colors"
                    onClick={() => setViewing(job)}
                  >
                    <td className="px-4 py-3 font-mono text-cyan-400 font-bold text-sm">
                      {job.id}
                    </td>
                    <td className="px-4 py-3 font-semibold">{job.customer}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {job.vehicle}
                    </td>
                    <td className="px-4 py-3">
                      <RegPlate reg={job.reg} />
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {job.assignedTo || "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      {job.startDate}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={job.status} />
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex gap-2">
                        {job.status !== "Complete" &&
                          job.status !== "Invoiced" && (
                            <BtnGreen
                              className="text-xs py-1 px-3"
                              onClick={() => markComplete(job.id)}
                            >
                              <FiCheck />
                              Mark Done
                            </BtnGreen>
                          )}
                        {job.status === "Complete" && (
                          <BtnPrimary
                            className="text-xs py-1 px-3"
                            onClick={() => onConvertToInvoice(job)}
                          >
                            <FiArrowRight />
                            Invoice
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
      </div>

      {showNew && (
        <Modal
          title="New Job Sheet"
          sub="Record work order details for the workshop"
          onClose={() => setShowNew(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowNew(false)}>Cancel</BtnGhost>
              <BtnPrimary onClick={save}>💾 Create Job Sheet</BtnPrimary>
            </>
          }
        >
          <FormSection>
            <SectionTitle>
              <FiUser />
              Customer & Vehicle
            </SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <Label>Customer Name *</Label>
                <Input
                  value={form.customer}
                  onChange={(e) => set("customer", e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label>Registration *</Label>
                <Input
                  className="font-mono uppercase"
                  value={form.reg}
                  onChange={(e) => set("reg", e.target.value.toUpperCase())}
                  placeholder="AB12 CDE"
                />
              </div>
              <div>
                <Label>Make & Model *</Label>
                <Input
                  value={form.vehicle}
                  onChange={(e) => set("vehicle", e.target.value)}
                  placeholder="BMW 520d"
                />
              </div>
              <div>
                <Label>Mileage In</Label>
                <Input
                  value={form.mileageIn}
                  onChange={(e) => set("mileageIn", e.target.value)}
                  placeholder="45,000"
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>⚙️ Job Details</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Assigned Technician</Label>
                <Select
                  value={form.assignedTo}
                  onChange={(e) => set("assignedTo", e.target.value)}
                >
                  <option value="">Select technician</option>
                  <option>Tech: Mike</option>
                  <option>Tech: Raj</option>
                  <option>Tech: Lisa</option>
                  <option>Tech: Sam</option>
                </Select>
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => set("startDate", e.target.value)}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Complete</option>
                </Select>
              </div>
              <div className="col-span-3">
                <Label>Fault Reported by Customer</Label>
                <Textarea
                  value={form.faultReported}
                  onChange={(e) => set("faultReported", e.target.value)}
                  placeholder="Describe the fault..."
                />
              </div>
              <div className="col-span-3">
                <Label>Work to be Carried Out</Label>
                <Textarea
                  value={form.work}
                  onChange={(e) => set("work", e.target.value)}
                  placeholder="Detail the work required..."
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>
              <RiMoneyDollarCircleLine />
              Labour & Parts
            </SectionTitle>
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
              placeholder="Internal workshop notes..."
            />
          </FormSection>
        </Modal>
      )}

      {viewing && (
        <Modal
          title={`${viewing.id} — Job Sheet`}
          sub={
            <span>
              {viewing.customer} · <RegPlate reg={viewing.reg} /> ·{" "}
              {viewing.vehicle}
            </span>
          }
          onClose={() => setViewing(null)}
          footer={
            <>
              <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>
              {viewing.status !== "Complete" &&
                viewing.status !== "Invoiced" && (
                  <BtnGreen
                    onClick={() => {
                      markComplete(viewing.id);
                      setViewing({ ...viewing, status: "Complete" });
                    }}
                  >
                    ✓ Mark Complete
                  </BtnGreen>
                )}
              {viewing.status === "Complete" && (
                <BtnPrimary
                  onClick={() => {
                    onConvertToInvoice(viewing);
                    setViewing(null);
                  }}
                >
                  → Create Invoice
                </BtnPrimary>
              )}
            </>
          }
        >
          <div className="flex justify-between items-center mb-5">
            <Badge status={viewing.status} />
            <span className="text-slate-400 text-sm">
              Assigned: {viewing.assignedTo || "—"}
            </span>
          </div>
          {viewing.faultReported && (
            <div className="mb-5">
              <Label>Fault Reported</Label>
              <div className="text-sm text-slate-400 mt-1">
                {viewing.faultReported}
              </div>
            </div>
          )}
          {viewing.work && (
            <div className="mb-5">
              <Label>Work Carried Out</Label>
              <div className="text-sm mt-1">{viewing.work}</div>
            </div>
          )}
          <SectionTitle>Line Items</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-cyan-500/15">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0b1628]/60">
                  {["Description", "Qty", "Rate", "Total"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(viewing.items || []).map((it, i) => (
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
          <ViewTotals items={viewing.items} total={viewing.total} />
        </Modal>
      )}
    </div>
  );
}

// ─── INVOICE MODULE ───────────────────────────────────────────────────────
function InvoiceModule({ invoices, setInvoices, onRecordPayment }) {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState({
    customer: "",
    reg: "",
    vehicle: "",
    date: new Date().toISOString().slice(0, 10),
    dueDate: "",
    email: "",
    phone: "",
    address: "",
    vatNo: "",
    notes: "",
    items: [{ desc: "", qty: 1, rate: "" }],
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const sub = calcLineTotal(form.items);
    const inv = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      ...form,
      total: sub + sub * 0.2,
      status: "Unpaid",
    };
    setInvoices((p) => [...p, inv]);
    setShowNew(false);
    setForm({
      customer: "",
      reg: "",
      vehicle: "",
      date: new Date().toISOString().slice(0, 10),
      dueDate: "",
      email: "",
      phone: "",
      address: "",
      vatNo: "",
      notes: "",
      items: [{ desc: "", qty: 1, rate: "" }],
    });
  };

  const outstanding = invoices
    .filter((i) => i.status === "Unpaid")
    .reduce((s, i) => s + i.total, 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <FiFileText className="text-cyan-400" />
            Invoices
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Manage billing, VAT invoices and outstanding payments
          </div>
        </div>
        <BtnPrimary onClick={() => setShowNew(true)}>
          <FiPlus />
          New Invoice
        </BtnPrimary>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCard
          label="Total Invoices"
          value={invoices.length}
          color="text-cyan-400"
        />
        <StatCard
          label="Unpaid"
          value={invoices.filter((i) => i.status === "Unpaid").length}
          color="text-amber-400"
        />
        <StatCard
          label="Paid"
          value={invoices.filter((i) => i.status === "Paid").length}
          color="text-emerald-400"
        />
        <StatCard
          label="Outstanding"
          value={fmt(outstanding)}
          sub="Total owed"
          color="text-red-400"
        />
      </div>

      <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-5 py-4 border-b border-cyan-500/20 flex justify-between items-center">
          <div className="font-bold text-sm">All Invoices</div>
          <div className="text-xs text-slate-400">
            {invoices.length} records
          </div>
        </div>
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
                          <FiCreditCard />
                          Pay
                        </BtnGreen>
                      )}
                      {inv.status === "Paid" && (
                        <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
                          <FiCheckCircle />
                          Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
            <SectionTitle>
              <FiUser />
              Bill To
            </SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <Label>Customer Name *</Label>
                <Input
                  value={form.customer}
                  onChange={(e) => set("customer", e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Label>Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="123 High Street, London"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              <div>
                <Label>VAT Number</Label>
                <Input
                  className="font-mono"
                  value={form.vatNo}
                  onChange={(e) => set("vatNo", e.target.value)}
                  placeholder="GB 123456789"
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>
              <FiTruck />
              Vehicle & Dates
            </SectionTitle>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Registration</Label>
                <Input
                  className="font-mono uppercase"
                  value={form.reg}
                  onChange={(e) => set("reg", e.target.value.toUpperCase())}
                />
              </div>
              <div>
                <Label>Make & Model</Label>
                <Input
                  value={form.vehicle}
                  onChange={(e) => set("vehicle", e.target.value)}
                />
              </div>
              <div>
                <Label>Invoice Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => set("dueDate", e.target.value)}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>
              <FiDollarSign />
              Charges
            </SectionTitle>
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

      {viewing && (
        <Modal
          title={`${viewing.id} — Invoice`}
          sub={
            <span>
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
              <Label>Invoice Date</Label>
              <div className="font-mono mt-1">{viewing.date}</div>
            </div>
            <div>
              <Label>Due Date</Label>
              <div className="font-mono mt-1">{viewing.dueDate || "—"}</div>
            </div>
          </div>
          <SectionTitle>Charges</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-cyan-500/15">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0b1628]/60">
                  {["Description", "Qty", "Rate", "Total"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(viewing.items || []).map((it, i) => (
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
          <ViewTotals items={viewing.items} total={viewing.total} />
        </Modal>
      )}
    </div>
  );
}

// ─── PAYMENT MODULE ───────────────────────────────────────────────────────
function PaymentModule({
  payments,
  setPayments,
  invoices,
  setInvoices,
  prefill,
  clearPrefill,
}) {
  const [showNew, setShowNew] = useState(!!prefill);
  const [form, setForm] = useState({
    invId: prefill?.id || "",
    customer: prefill?.customer || "",
    amount: prefill?.total || "",
    date: new Date().toISOString().slice(0, 10),
    reference: "",
    notes: "",
  });
  const [payMethod, setPayMethod] = useState("Card");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const [prevPrefill, setPrevPrefill] = useState(prefill);
  if (prefill && prefill !== prevPrefill) {
    setPrevPrefill(prefill);
    setForm({
      invId: prefill.id,
      customer: prefill.customer,
      amount: prefill.total,
      date: new Date().toISOString().slice(0, 10),
      reference: "",
      notes: "",
    });
    setPayMethod("Card");
    setShowNew(true);
  }

  const save = () => {
    const pay = {
      id: `PAY-${String(payments.length + 1).padStart(3, "0")}`,
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
    setForm({
      invId: "",
      customer: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      reference: "",
      notes: "",
    });
  };

  const totalReceived = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
  const PAY_METHODS = [
    { icon: "💳", name: "Card", sub: "Debit / Credit" },
    { icon: "💵", name: "Cash", sub: "Cash in hand" },
    { icon: "🏦", name: "BACS", sub: "Bank transfer" },
  ];

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <FiCreditCard className="text-emerald-400" />
            Payments
          </div>
          <div className="text-sm text-slate-400 mt-1">
            Record and track all payment transactions
          </div>
        </div>
        <BtnPrimary onClick={() => setShowNew(true)}>
          <FiPlus />
          Record Payment
        </BtnPrimary>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-7">
        <StatCard
          label="Transactions"
          value={payments.length}
          color="text-cyan-400"
        />
        <StatCard
          label="Total Received"
          value={fmt(totalReceived)}
          color="text-emerald-400"
        />
        <StatCard
          label="This Month"
          value={fmt(
            payments
              .filter((p) => p.date?.startsWith("2026-05"))
              .reduce((s, p) => s + Number(p.amount || 0), 0),
          )}
          color="text-cyan-400"
        />
        <StatCard
          label="Card / Cash"
          value={`${payments.filter((p) => p.method === "Card").length} / ${payments.filter((p) => p.method === "Cash").length}`}
          color="text-amber-400"
        />
      </div>

      <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-5 py-4 border-b border-cyan-500/20 flex justify-between items-center">
          <div className="font-bold text-sm">Payment History</div>
          <div className="text-xs text-slate-400">
            {payments.length} records
          </div>
        </div>
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
      </div>

      {showNew && (
        <Modal
          title="Record Payment"
          sub="Capture payment against an invoice"
          onClose={() => {
            setShowNew(false);
            clearPrefill();
          }}
          footer={
            <>
              <BtnGhost
                onClick={() => {
                  setShowNew(false);
                  clearPrefill();
                }}
              >
                Cancel
              </BtnGhost>
              <BtnGreen
                onClick={save}
                disabled={!form.amount || !form.customer}
              >
                <FiCheck />
                Confirm Payment
              </BtnGreen>
            </>
          }
        >
          <FormSection>
            <SectionTitle>🧾 Invoice Details</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Invoice Number</Label>
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
              </div>
              <div>
                <Label>Customer</Label>
                <Input
                  value={form.customer}
                  onChange={(e) => set("customer", e.target.value)}
                  placeholder="Customer name"
                />
              </div>
              <div>
                <Label>Amount (£) *</Label>
                <Input
                  className="font-mono"
                  type="number"
                  value={form.amount}
                  onChange={(e) => set("amount", e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Payment Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>💳 Payment Method</SectionTitle>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {PAY_METHODS.map((m) => (
                <div
                  key={m.name}
                  onClick={() => setPayMethod(m.name)}
                  className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${payMethod === m.name ? "border-cyan-400 bg-cyan-500/10" : "border-cyan-500/20 hover:border-cyan-500/50"}`}
                >
                  <div className="text-2xl mb-1.5">{m.icon}</div>
                  <div className="font-semibold text-sm">{m.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>
          </FormSection>
          <FormSection>
            <SectionTitle>📄 Reference & Notes</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Reference / Auth Code</Label>
                <Input
                  className="font-mono"
                  value={form.reference}
                  onChange={(e) => set("reference", e.target.value)}
                  placeholder="TXN-ABC123"
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Input
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Optional notes..."
                />
              </div>
            </div>
          </FormSection>
          {form.amount && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              <FiCheckCircle className="text-lg flex-shrink-0" />
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
}

// ─── PIPELINE STEPS ───────────────────────────────────────────────────────
const STEPS = [
  {
    key: "estimates",
    icon: <FiClipboard />,
    label: "Estimates",
    color: "#F59E0B",
    sub: "New quotes",
  },
  {
    key: "jobsheets",
    icon: <FiTool />,
    label: "Job Sheets",
    color: "#8B5CF6",
    sub: "Active work",
  },
  {
    key: "invoices",
    icon: <FiFileText />,
    label: "Invoices",
    color: "#0EA5C9",
    sub: "Billing",
  },
  {
    key: "payments",
    icon: <FiCreditCard />,
    label: "Payments",
    color: "#10B981",
    sub: "Received",
  },
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive] = useState("estimates");
  const [estimates, setEstimates] = useState(sampleEstimates);
  const [jobSheets, setJobSheets] = useState(sampleJobSheets);
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [payments, setPayments] = useState(samplePayments);
  const [payPrefill, setPayPrefill] = useState(null);

  const convertToJobSheet = (est) => {
    const job = {
      id: `JOB-${String(jobSheets.length + 1).padStart(3, "0")}`,
      estId: est.id,
      customer: est.customer,
      reg: est.reg,
      vehicle: est.vehicle,
      assignedTo: "",
      startDate: new Date().toISOString().slice(0, 10),
      faultReported: "",
      work: "",
      notes: est.notes || "",
      items: est.items || [],
      total: est.total,
      status: "Open",
    };
    setJobSheets((p) => [...p, job]);
    setEstimates((p) =>
      p.map((e) => (e.id === est.id ? { ...e, status: "Converted" } : e)),
    );
    setActive("jobsheets");
  };
  const convertToInvoice = (job) => {
    const inv = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      jobId: job.id,
      customer: job.customer,
      reg: job.reg,
      vehicle: job.vehicle,
      date: new Date().toISOString().slice(0, 10),
      dueDate: "",
      items: job.items || [],
      total: job.total || 0,
      status: "Unpaid",
    };
    setInvoices((p) => [...p, inv]);
    setJobSheets((p) =>
      p.map((j) => (j.id === job.id ? { ...j, status: "Invoiced" } : j)),
    );
    setActive("invoices");
  };
  const recordPayment = (inv) => {
    setPayPrefill(inv);
    setActive("payments");
  };

  const counts = {
    estimates: estimates.length,
    jobsheets: jobSheets.filter((j) => j.status !== "Invoiced").length,
    invoices: invoices.filter((i) => i.status === "Unpaid").length,
    payments: payments.length,
  };

  const activeIdx = STEPS.findIndex((s) => s.key === active);

  return (
    <div
      className="flex min-h-screen bg-[#0B1628] text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>

      {/* ── SIDEBAR ── */}
      <nav className="w-60 min-h-screen bg-[#112240] border-r border-cyan-500/20 fixed flex flex-col z-40">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-cyan-500/20">
              🚗
            </div>
            <div>
              <div className="text-sm font-bold text-white">Prestige Cars</div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                Workshop Manager
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline nav */}
        <div className="px-3 py-4 border-b border-cyan-500/20">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
            Workflow Pipeline
          </div>
          <div className="flex flex-col gap-0.5">
            {STEPS.map((step, i) => (
              <div key={step.key}>
                <button
                  onClick={() => setActive(step.key)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl border transition-all text-left ${active === step.key ? "border-cyan-500/40 bg-cyan-500/15" : "border-transparent hover:bg-cyan-500/8 hover:border-cyan-500/20"}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm border-2 transition-all"
                    style={{
                      borderColor:
                        active === step.key
                          ? step.color
                          : "rgba(148,163,184,0.2)",
                      background:
                        active === step.key
                          ? `${step.color}33`
                          : "rgba(148,163,184,0.05)",
                      color: active === step.key ? step.color : "#94A3B8",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-semibold"
                      style={{
                        color: active === step.key ? step.color : "#F8FAFC",
                      }}
                    >
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-500">{step.sub}</div>
                  </div>
                  {counts[step.key] > 0 && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono"
                      style={{
                        background: `${step.color}22`,
                        color: step.color,
                      }}
                    >
                      {counts[step.key]}
                    </span>
                  )}
                </button>
                {i < STEPS.length - 1 && (
                  <div className="w-px h-2.5 mx-[22px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="px-4 py-4 border-b border-cyan-500/20">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Quick Stats
          </div>
          <div className="flex flex-col gap-2">
            {[
              {
                label: "Open Jobs",
                value: jobSheets.filter(
                  (j) => j.status === "Open" || j.status === "In Progress",
                ).length,
                color: "text-violet-400",
              },
              {
                label: "Outstanding",
                value: fmt(
                  invoices
                    .filter((i) => i.status === "Unpaid")
                    .reduce((s, i) => s + i.total, 0),
                ),
                color: "text-amber-400",
              },
              {
                label: "Received",
                value: fmt(
                  payments.reduce((s, p) => s + Number(p.amount || 0), 0),
                ),
                color: "text-emerald-400",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex justify-between items-center text-xs"
              >
                <span className="text-slate-400">{label}</span>
                <span className={`font-mono font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-4 py-4 border-t border-cyan-500/20 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <FiUser />
          </div>
          <div>
            <div className="text-xs font-semibold">Workshop Admin</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Active session
            </div>
          </div>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main className="ml-60 flex-1 p-8 min-h-screen">
        {/* Progress track */}
        <div className="bg-[#112240]/80 border border-cyan-500/20 rounded-2xl px-6 py-4 mb-7 flex items-center backdrop-blur-sm">
          {STEPS.map((step, i) => {
            const isActive = active === step.key;
            const isPast = activeIdx > i;
            return (
              <div key={step.key} className="flex items-center flex-1">
                <button
                  onClick={() => setActive(step.key)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1"
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-all flex-shrink-0"
                    style={{
                      borderColor:
                        isActive || isPast
                          ? step.color
                          : "rgba(148,163,184,0.2)",
                      background: isActive
                        ? `${step.color}22`
                        : isPast
                          ? `${step.color}11`
                          : "transparent",
                      color: isActive || isPast ? step.color : "#94A3B8",
                    }}
                  >
                    {isPast ? <FiCheck /> : step.icon}
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        color: isActive || isPast ? step.color : "#64748b",
                      }}
                    >
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-500">{step.sub}</div>
                  </div>
                </button>
                {i < STEPS.length - 1 && (
                  <FiChevronRight
                    className="mx-2 flex-shrink-0"
                    style={{
                      color: isPast ? "#0EA5C9" : "rgba(148,163,184,0.2)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Modules */}
        {active === "estimates" && (
          <EstimateModule
            estimates={estimates}
            setEstimates={setEstimates}
            onConvert={convertToJobSheet}
          />
        )}
        {active === "jobsheets" && (
          <JobSheetModule
            jobSheets={jobSheets}
            setJobSheets={setJobSheets}
            onConvertToInvoice={convertToInvoice}
          />
        )}
        {active === "invoices" && (
          <InvoiceModule
            invoices={invoices}
            setInvoices={setInvoices}
            onRecordPayment={recordPayment}
          />
        )}
        {active === "payments" && (
          <PaymentModule
            payments={payments}
            setPayments={setPayments}
            invoices={invoices}
            setInvoices={setInvoices}
            prefill={payPrefill}
            clearPrefill={() => setPayPrefill(null)}
          />
        )}
      </main>
    </div>
  );
}
