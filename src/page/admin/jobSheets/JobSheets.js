import { useState } from "react";
import {
  Card,
  PageHeader,
  Badge,
  BtnBlue,
  BtnGhost,
  BtnGreen,
  Modal,
  RegPlate,
  Table,
} from "../../../components/ui/UI";
import {
  calcSubtotal,
  calcVat,
  calcTotal,
  today,
  pad,
} from "../../../utils/data";
import { RiEyeLine, RiAddLine, RiCheckLine } from "react-icons/ri";

// ==================== DUMMY DATA ====================
const dummyCustomers = [
  {
    id: "CUST001",
    name: "John Smith",
    phone: "+44 7911 123456",
    email: "john@email.com",
  },
  {
    id: "CUST002",
    name: "Sarah Patel",
    phone: "+44 7912 654321",
    email: "sarah@email.com",
  },
];

const dummyVehicles = [
  {
    id: "VEH001",
    reg: "AB12 CDE",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    mileage: "45,230 miles",
  },
  {
    id: "VEH002",
    reg: "XY67 ZXA",
    make: "Ford",
    model: "Focus",
    year: 2019,
    mileage: "62,100 miles",
  },
];

const dummyMechs = [{ name: "Mike Ross" }, { name: "Rachel Zane" }];

const initialJobSheets = [
  {
    id: "JS-1001",
    estId: "EST-2005",
    customerId: "CUST001",
    vehicleId: "VEH001",
    mechanic: "Mike Ross",
    date: "2025-06-01",
    startDate: "2025-06-02",
    status: "In Progress",
    progress: 65,
    items: [
      {
        desc: "Brake pads replacement",
        type: "Labour",
        qty: 1,
        rate: 85,
        vat: 20,
        total: 102,
      },
      {
        desc: "Front brake discs",
        type: "Parts",
        qty: 2,
        rate: 65,
        vat: 20,
        total: 156,
      },
    ],
    workDesc: ["Replace front brakes", "Check suspension"],
    progressLog: [
      { label: "Job Started", done: true, date: "2025-06-02" },
      { label: "Parts Ordered", done: true, date: "2025-06-03" },
      { label: "Repair in Progress", done: false },
      { label: "Quality Check", done: false },
    ],
    notes: "Customer requested priority service.",
  },
  {
    id: "JS-1002",
    estId: "EST-2007",
    customerId: "CUST002",
    vehicleId: "VEH002",
    mechanic: "Rachel Zane",
    date: "2025-06-03",
    startDate: "2025-06-04",
    status: "Completed",
    progress: 100,
    items: [
      {
        desc: "Oil change + filter",
        type: "Labour",
        qty: 1,
        rate: 45,
        vat: 20,
        total: 54,
      },
      {
        desc: "Engine oil 5W-30",
        type: "Parts",
        qty: 5,
        rate: 12,
        vat: 20,
        total: 72,
      },
    ],
    workDesc: ["Full service"],
    progressLog: [
      { label: "Job Started", done: true, date: "2025-06-04" },
      { label: "Service Completed", done: true, date: "2025-06-05" },
    ],
    notes: "",
  },
];

export default function JobSheets() {
  const [jobSheets, setJobSheets] = useState(initialJobSheets);
  const [invoices, setInvoices] = useState([]); // kept for conversion simulation
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");

  // Mock helper functions
  const getCustomer = (id) => dummyCustomers.find((c) => c.id === id);
  const getVehicle = (id) => dummyVehicles.find((v) => v.id === id);

  const markComplete = (id) => {
    setJobSheets((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: "Completed", progress: 100 } : j,
      ),
    );
  };

  const convertToInvoice = (job) => {
    const newInvoice = {
      id: pad("INV", 10010 + invoices.length),
      jobId: job.id,
      customerId: job.customerId,
      vehicleId: job.vehicleId,
      invoiceDate: today(),
      dueDate: "",
      status: "Unpaid",
      items: job.items,
      discount: 0,
      payment: null,
      notes: "Thank you for your business!",
    };

    setInvoices((prev) => [...prev, newInvoice]);

    setJobSheets((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: "Invoiced" } : j)),
    );

    setViewing(null);
    alert(`Invoice ${newInvoice.id} created successfully!`);
  };

  const filteredJobs = jobSheets.filter((job) => {
    const customer = getCustomer(job.customerId);
    const searchTerm = search.toLowerCase();
    return (
      !search ||
      (customer?.name || "").toLowerCase().includes(searchTerm) ||
      job.id.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Job Sheets"
        sub="Manage workshop work orders"
        action={
          <BtnBlue onClick={() => alert("New Job Sheet form would open here")}>
            <RiAddLine /> New Job Sheet
          </BtnBlue>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total Jobs",
            value: jobSheets.length,
            color: "text-slate-800",
          },
          {
            label: "In Progress",
            value: jobSheets.filter((j) => j.status === "In Progress").length,
            color: "text-amber-600",
          },
          {
            label: "Completed",
            value: jobSheets.filter((j) => j.status === "Completed").length,
            color: "text-green-600",
          },
          {
            label: "Invoiced",
            value: jobSheets.filter((j) => j.status === "Invoiced").length,
            color: "text-blue-600",
          },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              {s.label}
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job sheets..."
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm w-72 outline-none focus:border-blue-400"
          />
        </div>

        <Table
          headers={[
            "Job #",
            "Est #",
            "Customer",
            "Vehicle",
            "Mechanic",
            "Date",
            "Progress",
            "Status",
            "Actions",
          ]}
          empty={!filteredJobs.length ? "No job sheets found" : null}
        >
          {filteredJobs.map((job) => {
            const customer = getCustomer(job.customerId);
            const vehicle = getVehicle(job.vehicleId);

            return (
              <tr
                key={job.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setViewing(job)}
              >
                <td className="px-4 py-3 font-mono text-amber-600 font-semibold text-sm">
                  {job.id}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">
                  {job.estId || "—"}
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  {customer?.name || "—"}
                </td>
                <td className="px-4 py-3">
                  {vehicle ? <RegPlate reg={vehicle.reg} /> : "—"}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {job.mechanic || "—"}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{job.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-16">
                      <div
                        className="h-1.5 rounded-full bg-blue-600"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {job.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge status={job.status} />
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setViewing(job)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500"
                    >
                      <RiEyeLine />
                    </button>

                    {job.status === "In Progress" && (
                      <button
                        onClick={() => markComplete(job.id)}
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg font-semibold hover:bg-green-600"
                      >
                        ✓ Done
                      </button>
                    )}

                    {job.status === "Completed" && (
                      <button
                        onClick={() => convertToInvoice(job)}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-blue-700"
                      >
                        → Invoice
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </Card>

      {/* Viewing Modal */}
      {viewing &&
        (() => {
          const customer = getCustomer(viewing.customerId);
          const vehicle = getVehicle(viewing.vehicleId);
          const subtotal = calcSubtotal(viewing.items || []);
          const vat = calcVat(viewing.items || []);
          const total = calcTotal(viewing.items || []);

          return (
            <Modal
              title={`Job Sheet #${viewing.id}`}
              size="max-w-5xl"
              onClose={() => setViewing(null)}
              footer={
                <>
                  <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>

                  {viewing.status === "In Progress" && (
                    <BtnGreen
                      onClick={() => {
                        markComplete(viewing.id);
                        setViewing((prev) => ({
                          ...prev,
                          status: "Completed",
                          progress: 100,
                        }));
                      }}
                    >
                      <RiCheckLine /> Mark as Complete
                    </BtnGreen>
                  )}

                  {viewing.status === "Completed" && (
                    <BtnBlue onClick={() => convertToInvoice(viewing)}>
                      → Create Invoice
                    </BtnBlue>
                  )}
                </>
              }
            >
              <div className="space-y-5">
                <Badge status={viewing.status} />

                {/* Info Grid */}
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-slate-700 mb-1">
                      Job Info
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Job #: </span>
                      {viewing.id}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Est #: </span>
                      {viewing.estId || "—"}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Date: </span>
                      {viewing.date}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-slate-700 mb-1">
                      Customer
                    </div>
                    <div className="text-slate-600">{customer?.name}</div>
                    <div className="text-slate-400 text-xs">
                      {customer?.phone}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {customer?.email}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-slate-700 mb-1">Vehicle</div>
                    <RegPlate reg={vehicle?.reg || "—"} />
                    <div className="text-slate-600 mt-1">
                      {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                    </div>
                    <div className="text-slate-400 text-xs">
                      {vehicle?.mileage}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-slate-700 mb-1">
                      Assigned Mechanic
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                        {(viewing.mechanic || "?").charAt(0)}
                      </div>
                      <div className="text-slate-600 text-sm">
                        {viewing.mechanic || "Unassigned"}
                      </div>
                    </div>
                    <div className="text-slate-400 text-xs">
                      Start: {viewing.startDate}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-slate-700 text-sm">
                      Job Progress
                    </div>
                    <span className="font-mono text-blue-600 font-bold">
                      {viewing.progress}%
                    </span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-blue-600 transition-all"
                      style={{ width: `${viewing.progress}%` }}
                    />
                  </div>
                </div>

                {/* Work Description */}
                {viewing.workDesc?.length > 0 && (
                  <div>
                    <div className="font-bold text-slate-700 mb-2 text-sm">
                      Work Required
                    </div>
                    <ul className="space-y-1.5">
                      {viewing.workDesc.map((w, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <span className="text-blue-500">•</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Line Items */}
                <div>
                  <div className="font-bold text-slate-700 mb-3 text-sm">
                    Parts & Labour
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {[
                            "#",
                            "Description",
                            "Type",
                            "Qty",
                            "Rate (GBP)",
                            "VAT %",
                            "Total (GBP)",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 py-2.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(viewing.items || []).map((it, i) => (
                          <tr
                            key={i}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="px-4 py-2.5 text-slate-400 text-xs">
                              {i + 1}
                            </td>
                            <td className="px-4 py-2.5">{it.desc}</td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${it.type === "Labour" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}
                              >
                                {it.type}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">{it.qty}</td>
                            <td className="px-4 py-2.5 font-mono">
                              £{it.rate.toFixed(2)}
                            </td>
                            <td className="px-4 py-2.5 text-slate-400">
                              {it.vat}%
                            </td>
                            <td className="px-4 py-2.5 font-mono font-semibold">
                              £{it.total.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className="text-right">
                      <p>Subtotal: £{subtotal.toFixed(2)}</p>
                      <p>VAT: £{vat.toFixed(2)}</p>
                      <p className="font-bold text-lg">
                        Total: £{total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {viewing.notes && (
                  <div className="bg-amber-50 rounded-xl p-4 text-sm text-slate-700">
                    <span className="font-semibold">Notes: </span>
                    {viewing.notes}
                  </div>
                )}
              </div>
            </Modal>
          );
        })()}
    </div>
  );
}
