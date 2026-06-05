// ─── SAMPLE DATA ────────────────────────────────────────────────────────────
export const sampleEstimates = [
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

export const sampleJobSheets = [
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

export const sampleInvoices = [
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

export const samplePayments = [
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

export const PIPELINE_STEPS = [
  { key: "estimates", label: "Estimates", color: "#F59E0B", sub: "New quotes" },
  {
    key: "jobsheets",
    label: "Job Sheets",
    color: "#8B5CF6",
    sub: "Active work",
  },
  { key: "invoices", label: "Invoices", color: "#0EA5C9", sub: "Billing" },
  { key: "payments", label: "Payments", color: "#10B981", sub: "Received" },
];

export const TECHNICIANS = [
  "Tech: Mike",
  "Tech: Raj",
  "Tech: Lisa",
  "Tech: Sam",
];

export const PAY_METHODS = [
  { icon: "💳", name: "Card", sub: "Debit / Credit" },
  { icon: "💵", name: "Cash", sub: "Cash in hand" },
  { icon: "🏦", name: "BACS", sub: "Bank transfer" },
];
