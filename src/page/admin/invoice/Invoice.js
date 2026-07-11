import { useState, useMemo } from "react";
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiSearch,
  FiChevronDown,
  FiPlus,
  FiDownload,
  FiPrinter,
  FiSend,
  FiEye,
  FiX,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { PageHeader, BtnBlue } from "../../../components/ui/UI";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INVOICES = [
  {
    id: "INV-10015",
    customer: "John Smith",
    vehicle: "AB12 CDE",
    make: "BMW 320d M Sport",
    date: "21/05/2024",
    due: "28/05/2024",
    total: 234.0,
    paid: 234.0,
    balance: 0,
    status: "Paid",
    payMethod: "Card",
    txn: "TXN123456789",
    payDate: "21/05/2024",
    notes: "Thank you for your business!",
    subtotal: 195,
    vatAmt: 39,
    discount: 0,
    items: [
      {
        desc: "Front Brake Pads",
        type: "Parts",
        qty: 1,
        rate: 80,
        vat: 20,
        total: 80,
      },
      {
        desc: "Labour (Replace Brake Pads)",
        type: "Labour",
        qty: 2,
        rate: 50,
        vat: 20,
        total: 100,
      },
      {
        desc: "Brake Fluid",
        type: "Parts",
        qty: 1,
        rate: 15,
        vat: 20,
        total: 15,
      },
    ],
    customerDetails: {
      phone: "07700 900123",
      email: "johnsmith@email.com",
      address: "12 Park Road, London, SW1A 1AA",
    },
    vehicleDetails: { year: 2018, mileage: "58,750" },
  },
  {
    id: "INV-10014",
    customer: "Sarah Bloom",
    vehicle: "SB71 ABC",
    make: "Mercedes C220 AMG",
    date: "20/05/2024",
    due: "27/05/2024",
    total: 540.0,
    paid: 0,
    balance: 540,
    status: "Unpaid",
    payMethod: "",
    txn: "",
    payDate: "",
    notes: "",
    subtotal: 450,
    vatAmt: 90,
    discount: 0,
    items: [
      {
        desc: "Timing Belt Kit",
        type: "Parts",
        qty: 1,
        rate: 350,
        vat: 20,
        total: 350,
      },
      {
        desc: "Labour (Timing Belt)",
        type: "Labour",
        qty: 2,
        rate: 50,
        vat: 20,
        total: 100,
      },
    ],
    customerDetails: {
      phone: "07700 900456",
      email: "sarah@email.com",
      address: "45 Oak Street, Manchester",
    },
    vehicleDetails: { year: 2021, mileage: "22,100" },
  },
  {
    id: "INV-10013",
    customer: "Omar Hassan",
    vehicle: "OH22 TRE",
    make: "Audi A4 2.0 TDI",
    date: "18/05/2024",
    due: "25/05/2024",
    total: 744.0,
    paid: 300,
    balance: 444,
    status: "Partial",
    payMethod: "Cash",
    txn: "CSH-0099",
    payDate: "18/05/2024",
    notes: "Part payment received. Remaining balance due.",
    subtotal: 422.5,
    vatAmt: 84.5,
    discount: 20,
    items: [
      {
        desc: "Full Service Kit",
        type: "Parts",
        qty: 1,
        rate: 280,
        vat: 20,
        total: 280,
      },
      {
        desc: "Labour (Full Service)",
        type: "Labour",
        qty: 1.5,
        rate: 65,
        vat: 20,
        total: 97.5,
      },
      {
        desc: "Coolant Flush",
        type: "Parts",
        qty: 1,
        rate: 45,
        vat: 20,
        total: 45,
      },
    ],
    customerDetails: {
      phone: "07700 900789",
      email: "omar@email.com",
      address: "8 High Street, Birmingham",
    },
    vehicleDetails: { year: 2022, mileage: "31,400" },
  },
  {
    id: "INV-10012",
    customer: "Mark Johnson",
    vehicle: "MJ19 XYZ",
    make: "Ford Focus ST",
    date: "10/05/2024",
    due: "17/05/2024",
    total: 318.0,
    paid: 0,
    balance: 318,
    status: "Overdue",
    payMethod: "",
    txn: "",
    payDate: "",
    notes: "Payment overdue. Please contact customer.",
    subtotal: 300,
    vatAmt: 60,
    discount: 0,
    items: [
      {
        desc: "Clutch Replacement",
        type: "Parts",
        qty: 1,
        rate: 195,
        vat: 20,
        total: 195,
      },
      {
        desc: "Labour (Clutch)",
        type: "Labour",
        qty: 1.5,
        rate: 70,
        vat: 20,
        total: 105,
      },
    ],
    customerDetails: {
      phone: "07700 900321",
      email: "mark@email.com",
      address: "99 Elm Drive, Leeds",
    },
    vehicleDetails: { year: 2019, mileage: "67,200" },
  },
  {
    id: "INV-10011",
    customer: "Robert Brown",
    vehicle: "RB23 QWE",
    make: "Volkswagen Golf GTI",
    date: "05/05/2024",
    due: "12/05/2024",
    total: 192.0,
    paid: 192,
    balance: 0,
    status: "Paid",
    payMethod: "BACS",
    txn: "BACS-4512",
    payDate: "08/05/2024",
    notes: "",
    subtotal: 160,
    vatAmt: 32,
    discount: 0,
    items: [
      {
        desc: "Spark Plugs x4",
        type: "Parts",
        qty: 4,
        rate: 18,
        vat: 20,
        total: 72,
      },
      {
        desc: "Air Filter",
        type: "Parts",
        qty: 1,
        rate: 35,
        vat: 20,
        total: 35,
      },
      { desc: "Labour", type: "Labour", qty: 1, rate: 53, vat: 20, total: 53 },
    ],
    customerDetails: {
      phone: "07700 900654",
      email: "robert@email.com",
      address: "3 Pine Ave, Bristol",
    },
    vehicleDetails: { year: 2023, mileage: "8,900" },
  },
  {
    id: "INV-10010",
    customer: "Lisa Wong",
    vehicle: "LW20 PPQ",
    make: "Toyota Camry 2.5",
    date: "28/04/2024",
    due: "05/05/2024",
    total: 156.0,
    paid: 156,
    balance: 0,
    status: "Paid",
    payMethod: "Card",
    txn: "TXN987654321",
    payDate: "29/04/2024",
    notes: "",
    subtotal: 130,
    vatAmt: 26,
    discount: 0,
    items: [
      {
        desc: "Oil & Filter Service",
        type: "Parts",
        qty: 1,
        rate: 65,
        vat: 20,
        total: 65,
      },
      { desc: "Labour", type: "Labour", qty: 1, rate: 65, vat: 20, total: 65 },
    ],
    customerDetails: {
      phone: "07700 900111",
      email: "lisa@email.com",
      address: "22 Maple Road, London",
    },
    vehicleDetails: { year: 2020, mileage: "45,300" },
  },
  {
    id: "INV-10009",
    customer: "David Osei",
    vehicle: "DO20 LMN",
    make: "Honda CR-V 1.5T",
    date: "22/04/2024",
    due: "29/04/2024",
    total: 468.0,
    paid: 0,
    balance: 468,
    status: "Draft",
    payMethod: "",
    txn: "",
    payDate: "",
    notes: "Pending customer approval.",
    subtotal: 390,
    vatAmt: 78,
    discount: 0,
    items: [
      {
        desc: "Front & Rear Discs",
        type: "Parts",
        qty: 2,
        rate: 120,
        vat: 20,
        total: 240,
      },
      {
        desc: "Labour (Discs)",
        type: "Labour",
        qty: 2,
        rate: 60,
        vat: 20,
        total: 120,
      },
      {
        desc: "Wheel Alignment",
        type: "Labour",
        qty: 1,
        rate: 50,
        vat: 20,
        total: 50,
      },
    ],
    customerDetails: {
      phone: "07700 900222",
      email: "david@email.com",
      address: "56 Cedar Lane, Coventry",
    },
    vehicleDetails: { year: 2020, mileage: "52,800" },
  },
  {
    id: "INV-10008",
    customer: "Emma Clarke",
    vehicle: "EC21 RRR",
    make: "Nissan Qashqai",
    date: "15/04/2024",
    due: "22/04/2024",
    total: 258.0,
    paid: 258,
    balance: 0,
    status: "Paid",
    payMethod: "Card",
    txn: "TXN555888111",
    payDate: "16/04/2024",
    notes: "Customer happy with service.",
    subtotal: 215,
    vatAmt: 43,
    discount: 0,
    items: [
      {
        desc: "MOT Test",
        type: "Labour",
        qty: 1,
        rate: 55,
        vat: 20,
        total: 55,
      },
      {
        desc: "Advisory Repairs",
        type: "Labour",
        qty: 1,
        rate: 115,
        vat: 20,
        total: 115,
      },
      { desc: "Parts", type: "Parts", qty: 1, rate: 45, vat: 20, total: 45 },
    ],
    customerDetails: {
      phone: "07700 900333",
      email: "emma@email.com",
      address: "101 Birch Way, Sheffield",
    },
    vehicleDetails: { year: 2021, mileage: "19,600" },
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => `£${Number(n || 0).toFixed(2)}`;

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const AVATAR_COLORS = [
  "from-red-400 to-red-600",
  "from-violet-400 to-violet-600",
  "from-emerald-400 to-emerald-600",
  "from-orange-400 to-orange-600",
  "from-red-500 to-red-600",
  "from-rose-400 to-rose-600",
];
const avatarColor = (name) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

// ─── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  Paid: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    text: "text-emerald-600",
  },
  Unpaid: {
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600 border-red-200",
    text: "text-red-600",
  },
  Partial: {
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    text: "text-amber-600",
  },
  Overdue: {
    dot: "bg-orange-500",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    text: "text-orange-600",
  },
  Draft: {
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600 border-gray-200",
    text: "text-gray-500",
  },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
const Badge = ({ status, size = "sm" }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.Draft;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border font-semibold rounded-full whitespace-nowrap
        ${size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1"}
        ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

const RegPlate = ({ reg }) => (
  <span className="inline-block bg-yellow-300 text-black font-mono font-bold text-xs px-2 py-0.5 rounded tracking-wider border border-yellow-400">
    {reg}
  </span>
);

const StatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  subColor,
}) => (
  <div className="premium-card rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-5 transition-all duration-300">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[9px] font-extrabold text-[#64748b] uppercase tracking-[0.16em] mb-1.5">
          {label}
        </p>
        <p className="font-[Sora] text-2xl font-extrabold tracking-[-0.04em] text-[#0f172a] leading-none">
          {value}
        </p>
        {sub && (
          <p
            className={`text-xs mt-1.5 font-medium ${subColor || "text-gray-400"}`}
          >
            {sub}
          </p>
        )}
      </div>
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        <Icon size={20} className={iconColor} />
      </div>
    </div>
  </div>
);

// ─── TYPE BADGE ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) =>
  type === "Parts" ? (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
      Parts
    </span>
  ) : (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
      Labour
    </span>
  );

// ─── INVOICE DETAIL MODAL ─────────────────────────────────────────────────────
const InvoiceModal = ({ invoice, onClose, onMarkPaid }) => {
  if (!invoice) return null;
  const cfg = STATUS_CFG[invoice.status] || STATUS_CFG.Draft;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#030912]/72 backdrop-blur-xl flex items-start justify-center p-4 pt-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#ffffff] rounded-[26px] border border-[#e2e8f0] w-full max-w-4xl shadow-[0_38px_110px_rgba(3,9,18,.42)] mb-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="sticky top-0 bg-gradient-to-r from-[#ffffff] to-[#fff1f2] z-10 px-6 py-5 border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-gray-900">
                  Invoice #{invoice.id}
                </h2>
                <Badge status={invoice.status} />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {invoice.customer} · {invoice.make}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <FiDownload size={13} /> Download PDF
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <FiPrinter size={13} /> Print
            </button>
            {(invoice.status === "Unpaid" ||
              invoice.status === "Overdue" ||
              invoice.status === "Partial") && (
              <button
                onClick={() => onMarkPaid(invoice.id)}
                className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <FiCheckCircle size={13} /> Mark as Paid
              </button>
            )}
            <button className="gold-button flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-lg transition-all">
              <FiSend size={13} /> Send Invoice
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors ml-1"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* ── Modal Body ── */}
        <div className="p-6">
          {/* 3-col info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-100">
            {/* Customer */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Customer Details
              </p>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(invoice.customer)} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                >
                  {initials(invoice.customer)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {invoice.customer}
                  </p>
                </div>
              </div>
              {[
                ["Phone", invoice.customerDetails.phone],
                ["Email", invoice.customerDetails.email],
                ["Address", invoice.customerDetails.address],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2 mb-1.5">
                  <span className="text-xs text-gray-400 w-14 flex-shrink-0">
                    {k}
                  </span>
                  <span className="text-xs text-gray-700 font-medium leading-relaxed">
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Vehicle */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Vehicle Details
              </p>
              <div className="mb-2">
                <RegPlate reg={invoice.vehicle} />
              </div>
              {[
                ["Make & Model", invoice.make],
                ["Year", invoice.vehicleDetails.year],
                ["Mileage", `${invoice.vehicleDetails.mileage} miles`],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2 mb-1.5">
                  <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                    {k}
                  </span>
                  <span className="text-xs text-gray-700 font-medium">{v}</span>
                </div>
              ))}
            </div>

            {/* Invoice Details */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Invoice Details
              </p>
              {[
                ["Invoice No.", invoice.id],
                ["Invoice Date", invoice.date],
                ["Due Date", invoice.due],
                ["Status", null],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2 mb-1.5 items-center">
                  <span className="text-xs text-gray-400 w-20 flex-shrink-0">
                    {k}
                  </span>
                  {k === "Status" ? (
                    <Badge status={invoice.status} />
                  ) : (
                    <span className="text-xs text-gray-700 font-medium">
                      {v}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Line Items */}
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Repair Items
          </p>
          <div className="rounded-xl border border-gray-100 overflow-hidden mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-8">
                    #
                  </th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Description
                  </th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Qty
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Rate (GBP)
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    VAT %
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Total (GBP)
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {item.desc}
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={item.type} />
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {item.qty}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-700">
                      {fmt(item.rate)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {item.vat}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900">
                      {fmt(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom: Payment Info + Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Info */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Payment Information
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                {invoice.payMethod ? (
                  <>
                    {[
                      ["Payment Method", invoice.payMethod || "—"],
                      ["Transaction No.", invoice.txn || "—"],
                      ["Payment Date", invoice.payDate || "—"],
                      ["Amount Paid", fmt(invoice.paid)],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-xs text-gray-400">{k}</span>
                        <span
                          className={`text-xs font-semibold ${k === "Amount Paid" ? "text-emerald-600" : "text-gray-700"}`}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                    {invoice.notes && (
                      <p className="text-xs text-gray-400 italic mt-3 pt-3 border-t border-gray-100">
                        {invoice.notes}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <FiClock size={24} className="text-gray-300 mb-2" />
                    <p className="text-sm text-gray-400 font-medium">
                      No payment recorded
                    </p>
                    {invoice.notes && (
                      <p className="text-xs text-gray-400 mt-1 italic">
                        {invoice.notes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Totals */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Summary
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                {[
                  ["Subtotal (GBP)", fmt(invoice.subtotal), "text-gray-600"],
                  ["VAT (20%)", fmt(invoice.vatAmt), "text-gray-600"],
                  [
                    "Discount (GBP)",
                    fmt(invoice.discount || 0),
                    "text-gray-600",
                  ],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className={`${color}`}>{label}</span>
                    <span className="font-mono text-gray-700">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2.5 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total (GBP)</span>
                  <span className="font-mono font-bold text-lg text-gray-900">
                    {fmt(invoice.total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-medium">
                    Paid Amount (GBP)
                  </span>
                  <span className="font-mono font-semibold text-emerald-600">
                    {fmt(invoice.paid)}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span
                    className={`font-bold ${invoice.balance > 0 ? "text-red-600" : "text-gray-500"}`}
                  >
                    Balance (GBP)
                  </span>
                  <span
                    className={`font-mono font-bold ${invoice.balance > 0 ? "text-red-600" : "text-gray-400"}`}
                  >
                    {fmt(invoice.balance)}
                  </span>
                </div>

                {invoice.status === "Paid" && (
                  <div className="flex justify-center pt-2">
                    <div className="border-2 border-emerald-500 text-emerald-600 font-bold text-lg tracking-[.3em] px-5 py-1.5 rounded -rotate-3 opacity-70">
                      PAID
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN INVOICE PAGE ────────────────────────────────────────────────────────
export default function Invoice() {
  const [invoices, setInvoices] = useState(INVOICES);
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState("");
  const [selected, setSelected] = useState(null);
  const [showNew, setShowNew] = useState(false);

  /* ── New invoice form state ── */
  const [newForm, setNewForm] = useState({
    customer: "",
    vehicle: "",
    date: "",
    due: "",
    notes: "",
    items: [{ desc: "", type: "Parts", qty: 1, rate: "" }],
  });

  // ── Derived stats ──
  const totalCount = invoices.length;
  const unpaidCount = invoices.filter((i) => i.status === "Unpaid").length;
  const unpaidVal = invoices
    .filter((i) => i.status === "Unpaid")
    .reduce((s, i) => s + i.balance, 0);
  const paidMonth = invoices
    .filter((i) => i.status === "Paid")
    .reduce((s, i) => s + i.paid, 0);
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length;
  const overdueVal = invoices
    .filter((i) => i.status === "Overdue")
    .reduce((s, i) => s + i.balance, 0);

  // ── Filtered list ──
  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      const q = search.toLowerCase();
      const matchQ =
        !q ||
        inv.id.toLowerCase().includes(q) ||
        inv.customer.toLowerCase().includes(q) ||
        inv.make.toLowerCase().includes(q) ||
        inv.vehicle.toLowerCase().includes(q);
      const matchS = !statusF || inv.status === statusF;
      return matchQ && matchS;
    });
  }, [invoices, search, statusF]);

  // ── Mark Paid ──
  const markPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: "Paid",
              paid: inv.total,
              balance: 0,
              payMethod: "Card",
              payDate: new Date().toLocaleDateString("en-GB"),
            }
          : inv,
      ),
    );
    setSelected((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status: "Paid",
            paid: prev.total,
            balance: 0,
            payMethod: "Card",
            payDate: new Date().toLocaleDateString("en-GB"),
          }
        : prev,
    );
  };

  // ── New invoice item helpers ──
  const setNewItem = (i, k, v) =>
    setNewForm((f) => {
      const items = [...f.items];
      items[i] = { ...items[i], [k]: v };
      return { ...f, items };
    });
  const addNewItem = () =>
    setNewForm((f) => ({
      ...f,
      items: [...f.items, { desc: "", type: "Parts", qty: 1, rate: "" }],
    }));
  const removeNewItem = (i) =>
    setNewForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));
  const newSub = newForm.items.reduce(
    (s, it) => s + (it.qty || 0) * (it.rate || 0),
    0,
  );
  const newVat = newSub * 0.2;
  const newTotal = newSub + newVat;

  const saveNew = () => {
    const inv = {
      id: `INV-${10016 + invoices.length}`,
      customer: newForm.customer || "New Customer",
      vehicle: newForm.vehicle || "—",
      make: "—",
      date: newForm.date || new Date().toLocaleDateString("en-GB"),
      due: newForm.due || "—",
      total: newTotal,
      paid: 0,
      balance: newTotal,
      status: "Draft",
      payMethod: "",
      txn: "",
      payDate: "",
      notes: newForm.notes,
      subtotal: newSub,
      vatAmt: newVat,
      discount: 0,
      items: newForm.items.map((it) => ({
        ...it,
        total: (it.qty || 0) * (it.rate || 0),
        vat: 20,
      })),
      customerDetails: { phone: "—", email: "—", address: "—" },
      vehicleDetails: { year: "—", mileage: "—" },
    };
    setInvoices((p) => [inv, ...p]);
    setShowNew(false);
    setNewForm({
      customer: "",
      vehicle: "",
      date: "",
      due: "",
      notes: "",
      items: [{ desc: "", type: "Parts", qty: 1, rate: "" }],
    });
  };

  // ── Render ──
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Invoices"
        sub="Manage billing, VAT invoices and outstanding payments."
        action={
          <BtnBlue onClick={() => setShowNew(true)}>
            <FiPlus size={16} /> New Invoice
          </BtnBlue>
        }
      />

      <div className="space-y-5">
        {/* ── Stats strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={FiFileText}
            iconBg="bg-[#fff1f2]"
            iconColor="text-[#be123c]"
            label="Total Invoices"
            value={totalCount}
            sub="+8% this month"
            subColor="text-emerald-600"
          />
          <StatCard
            icon={FiClock}
            iconBg="bg-[#fff1f2]"
            iconColor="text-[#be123c]"
            label="Unpaid"
            value={unpaidCount}
            sub={`${fmt(unpaidVal)} outstanding`}
            subColor="text-red-500"
          />
          <StatCard
            icon={FiCheckCircle}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-500"
            label="Paid This Month"
            value={fmt(paidMonth)}
            sub="+25% from last month"
            subColor="text-emerald-600"
          />
          <StatCard
            icon={FiAlertTriangle}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            label="Overdue"
            value={overdueCount}
            sub={`${fmt(overdueVal)} overdue`}
            subColor="text-amber-600"
          />
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {/* Search */}
            <div className="flex items-center gap-2 bg-[#ffffff] border border-[#e2e8f0] rounded-xl px-3 py-2.5 flex-1 min-w-[200px] max-w-xs hover:border-[#e11d48] transition-colors focus-within:border-[#e11d48] focus-within:ring-4 focus-within:ring-[#e11d48]/10">
              <FiSearch size={15} className="text-gray-400 flex-shrink-0" />
              <input
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                placeholder="Search invoices, customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                className="appearance-none bg-[#ffffff] border border-[#e2e8f0] rounded-xl px-3 py-2.5 pr-8 text-sm text-[#334155] outline-none cursor-pointer hover:border-[#e11d48] transition-colors"
                value={statusF}
                onChange={(e) => setStatusF(e.target.value)}
              >
                <option value="">All Statuses</option>
                {["Paid", "Unpaid", "Partial", "Overdue", "Draft"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <FiChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Count indicator */}
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filtered.length}
            </span>{" "}
            of {invoices.length} invoices
          </p>
        </div>

        {/* ── Table ── */}
        <div className="premium-card rounded-2xl border border-[#e2e8f0] bg-[#ffffff] shadow-[0_14px_38px_rgba(7,17,31,.06)] overflow-hidden">
          {/* Table header */}
          <div
            className="grid bg-gray-50 border-b border-gray-100"
            style={{
              gridTemplateColumns:
                "120px 1fr 95px 95px 90px 90px 90px 100px 110px",
            }}
          >
            {[
              "Invoice #",
              "Customer",
              "Date",
              "Due Date",
              "Total",
              "Paid",
              "Balance",
              "Status",
              "Actions",
            ].map((h) => (
              <div
                key={h}
                className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FiFileText size={40} className="text-gray-200 mb-3" />
              <p className="text-sm font-semibold text-gray-400">
                No invoices found
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            filtered.map((inv) => {
              const cfg = STATUS_CFG[inv.status] || STATUS_CFG.Draft;
              return (
                <div
                  key={inv.id}
                  className="grid border-b border-gray-50 last:border-0 hover:bg-red-50/30 cursor-pointer transition-colors group"
                  style={{
                    gridTemplateColumns:
                      "120px 1fr 95px 95px 90px 90px 90px 100px 110px",
                  }}
                  onClick={() => setSelected(inv)}
                >
                  {/* Invoice # */}
                  <div className="px-4 py-3.5 flex items-center">
                    <span className="font-mono text-sm font-bold text-red-600">
                      {inv.id}
                    </span>
                  </div>

                  {/* Customer */}
                  <div className="px-4 py-3.5 flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColor(inv.customer)} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 shadow-sm`}
                    >
                      {initials(inv.customer)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {inv.customer}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {inv.make}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="px-4 py-3.5 flex items-center">
                    <span className="text-sm text-gray-500">{inv.date}</span>
                  </div>

                  {/* Due date */}
                  <div className="px-4 py-3.5 flex items-center">
                    <span
                      className={`text-sm ${inv.status === "Overdue" ? "text-red-500 font-semibold" : "text-gray-500"}`}
                    >
                      {inv.due}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="px-4 py-3.5 flex items-center">
                    <span className="text-sm font-bold text-gray-900 font-mono">
                      {fmt(inv.total)}
                    </span>
                  </div>

                  {/* Paid */}
                  <div className="px-4 py-3.5 flex items-center">
                    <span
                      className={`text-sm font-semibold font-mono ${inv.paid > 0 ? "text-emerald-600" : "text-gray-300"}`}
                    >
                      {fmt(inv.paid)}
                    </span>
                  </div>

                  {/* Balance */}
                  <div className="px-4 py-3.5 flex items-center">
                    <span
                      className={`text-sm font-semibold font-mono ${inv.balance > 0 ? "text-red-500" : "text-gray-300"}`}
                    >
                      {fmt(inv.balance)}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="px-4 py-3.5 flex items-center">
                    <Badge status={inv.status} />
                  </div>

                  {/* Actions */}
                  <div
                    className="px-3 py-3.5 flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelected(inv)}
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 border border-gray-200 px-2 py-1.5 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      <FiEye size={11} /> View
                    </button>
                    {(inv.status === "Unpaid" ||
                      inv.status === "Overdue" ||
                      inv.status === "Partial") && (
                      <button
                        onClick={() => markPaid(inv.id)}
                        className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination */}
          <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} · Page
              1 of 1
            </p>
            <div className="flex items-center gap-1">
              {[
                <FiChevronLeft size={13} />,
                "1",
                "2",
                "3",
                <FiChevronRight size={13} />,
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors
                    ${
                      item === "1"
                        ? "bg-[#e11d48] text-white"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Invoice Detail Modal ── */}
      {selected && (
        <InvoiceModal
          invoice={selected}
          onClose={() => setSelected(null)}
          onMarkPaid={(id) => {
            markPaid(id);
          }}
        />
      )}

      {/* ── New Invoice Modal ── */}
      {showNew && (
        <div
          className="fixed inset-0 z-50 bg-[#030912]/72 backdrop-blur-xl flex items-start justify-center p-4 pt-10 overflow-y-auto"
          onClick={() => setShowNew(false)}
        >
          <div
            className="bg-[#ffffff] rounded-[26px] border border-[#e2e8f0] w-full max-w-2xl shadow-[0_38px_110px_rgba(3,9,18,.42)] mb-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#ffffff] to-[#fff1f2] z-10 px-6 py-5 border-b border-[#e2e8f0] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">New Invoice</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Generate a VAT invoice for completed work
                </p>
              </div>
              <button
                onClick={() => setShowNew(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Customer + Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Customer", "customer", "John Smith"],
                  ["Vehicle", "vehicle", "AB12 CDE – BMW 320d"],
                  ["Invoice Date", "date", ""],
                  ["Due Date", "due", ""],
                ].map(([label, key, ph]) => (
                  <div key={key}>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                      {label}
                    </label>
                    <input
                      type={key.includes("ate") ? "date" : "text"}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10 outline-none transition-all"
                      placeholder={ph}
                      value={newForm[key]}
                      onChange={(e) =>
                        setNewForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Line items */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  Repair Items
                </label>
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        {[
                          "Description",
                          "Type",
                          "Qty",
                          "Rate (£)",
                          "Total",
                          "",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {newForm.items.map((it, i) => (
                        <tr key={i} className="border-t border-gray-50">
                          <td className="px-2 py-2">
                            <input
                              className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#e11d48]"
                              value={it.desc}
                              onChange={(e) =>
                                setNewItem(i, "desc", e.target.value)
                              }
                              placeholder="Description..."
                            />
                          </td>
                          <td className="px-2 py-2">
                            <select
                              className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#e11d48] bg-white"
                              value={it.type}
                              onChange={(e) =>
                                setNewItem(i, "type", e.target.value)
                              }
                            >
                              <option>Parts</option>
                              <option>Labour</option>
                            </select>
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              className="w-14 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#e11d48] text-right"
                              value={it.qty}
                              onChange={(e) =>
                                setNewItem(i, "qty", Number(e.target.value))
                              }
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              className="w-20 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:border-[#e11d48] text-right"
                              value={it.rate}
                              onChange={(e) =>
                                setNewItem(i, "rate", Number(e.target.value))
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-3 py-2 font-mono text-sm font-semibold text-gray-700">
                            {fmt((it.qty || 0) * (it.rate || 0))}
                          </td>
                          <td className="px-2 py-2">
                            {newForm.items.length > 1 && (
                              <button
                                onClick={() => removeNewItem(i)}
                                className="w-6 h-6 flex items-center justify-center rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <FiX size={12} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-3 py-2 border-t border-gray-50">
                    <button
                      onClick={addNewItem}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#fff1f2] px-3 py-2 text-xs font-extrabold text-[#be123c] transition-colors hover:bg-[#fecdd3]"
                    >
                      <FiPlus size={12} /> Add line item
                    </button>
                  </div>
                </div>

                {/* Mini totals */}
                <div className="mt-3 p-4 bg-gradient-to-br from-[#f8fafc] to-[#ffffff] rounded-xl border border-[#e2e8f0] space-y-1.5 text-sm">
                  {[
                    ["Subtotal", fmt(newSub)],
                    ["VAT (20%)", fmt(newVat)],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-gray-500">
                      <span>{l}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-mono font-bold text-gray-900">
                      {fmt(newTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                  Notes
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#e11d48] focus:ring-4 focus:ring-[#e11d48]/10 resize-y min-h-[72px] transition-all"
                  placeholder="Payment terms, notes for customer..."
                  value={newForm.notes}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2.5">
              <button
                onClick={() => setShowNew(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNew}
                className="gold-button flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold rounded-xl transition-all"
              >
                <FiFileText size={14} /> Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
