import { useState } from "react";

import {
  Card,
  PageHeader,
  Badge,
  BtnBlue,
  BtnGhost,
  BtnGreen,
  BtnRed,
  BtnAmber,
  Modal,
  Input,
  Select,
  Textarea,
  Table,
  RegPlate,
  SectionTitle,
  LineItemsTable,
  TotalsBox,
} from "../../../components/ui/UI";
import {
  calcSubtotal,
  calcVat,
  calcTotal,
  today,
  pad,
} from "../../../utils/data";
import {
  RiAddLine,
  RiDownloadLine,
  RiSendPlane2Line,
  RiArrowRightLine,
  RiEyeLine,
} from "react-icons/ri";
import { customers, vehicles } from "../../../utils/data";
import { sampleEstimates } from "../../../utils/SampleData";

const blank = () => ({
  id: "",
  customerId: "",
  vehicleId: "",
  date: today(),
  validUntil: "",
  status: "Draft",
  notes: "",
  items: [
    { id: 1, desc: "", type: "Parts", qty: 1, rate: 0, vat: 20, total: 0 },
  ],
});

export default function Estimates() {
  //   const {
  //     estimates,
  //     setEstimates,
  //     jobSheets,
  //     setJobSheets,
  //     customers,
  //     vehicles,
  //     getCustomer,
  //     getVehicle,
  //   } = useApp();
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(blank());
  const [search, setSearch] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const custVehicles = (cId) => vehicles.filter((v) => v.customerId === cId);

  const save = () => {
    if (!form.customerId) return;

    setShowNew(false);
    setForm(blank());
  };

  const convertToJob = (est) => {
    const job = {
      id: pad("JOB", 10020 + 23),
      estId: est.id,
      customerId: est.customerId,
      vehicleId: est.vehicleId,
      date: today(),
      status: "In Progress",
      mechanic: "",
      startDate: today() + " 09:00 AM",
      endDate: "",
      progress: 0,
      workDesc: [],
      checklist: {
        vehicleReceived: true,
        workStarted: false,
        partsOrdered: false,
        repairCompleted: false,
        qualityCheck: false,
        readyForCollection: false,
      },
      progressLog: [
        { label: "Work Started", date: null, done: false },
        { label: "Parts Ordered", date: null, done: false },
        { label: "Repair in Progress", date: null, done: false },
        { label: "Job Completed", date: null, done: false },
      ],
      notes: "",
      items: est.items,
    };

    setViewing(null);
  };

  const list = sampleEstimates.filter((e) => {
    const c = 12;
    return (
      !search ||
      (c?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sub = (est) => calcSubtotal(est.items);
  const tot = (est) => calcTotal(est.items);

  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Estimates"
        sub="Create and send quotations to customers"
        action={
          <BtnBlue
            onClick={() => {
              setForm(blank());
              setShowNew(true);
            }}
          >
            <RiAddLine /> New Estimate
          </BtnBlue>
        }
      />
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: sampleEstimates.length,
            color: "text-slate-800",
          },
          {
            label: "Draft",
            value: sampleEstimates.filter((e) => e.status === "Draft").length,
            color: "text-slate-600",
          },
          {
            label: "Approved",
            value: sampleEstimates.filter((e) => e.status === "Approved")
              .length,
            color: "text-green-600",
          },
          {
            label: "Pipeline",
            value: `£${sampleEstimates.reduce((s, e) => s + tot(e), 0)?.toFixed(0)}`,
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
            placeholder="Search estimates..."
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm w-72 outline-none focus:border-blue-400"
          />
        </div>
        <Table
          headers={[
            "Estimate #",
            "Customer",
            "Vehicle",
            "Date",
            "Valid Until",
            "Total",
            "Status",
            "Actions",
          ]}
          empty={!list.length ? "No estimates found" : null}
        >
          {list.map((est) => {
            const c = 12;
            const v = 10;
            return (
              <tr
                key={est.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setViewing(est)}
              >
                <td className="px-4 py-3 font-mono text-blue-600 font-semibold text-sm">
                  {est.id}
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  {c?.name || "—"}
                </td>
                <td className="px-4 py-3">
                  {v ? <RegPlate reg={v.reg} /> : "—"}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{est.date}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {est.validUntil || "—"}
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                  £{tot(est)?.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <Badge status={est.status} />
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setViewing(est)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500"
                    >
                      <RiEyeLine />
                    </button>
                    {est.status === "Approved" && (
                      <button
                        onClick={() => convertToJob(est)}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-blue-700"
                      >
                        → Job
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </Card>

      {/* New Estimate Modal */}
      {showNew && (
        <Modal
          title="New Estimate"
          sub="Create a quotation for the customer"
          size="max-w-4xl"
          onClose={() => setShowNew(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowNew(false)}>Cancel</BtnGhost>
              <BtnAmber onClick={save}>💾 Save Draft</BtnAmber>
              <BtnBlue onClick={save}>📋 Create Estimate</BtnBlue>
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <SectionTitle>👤 Customer & Vehicle</SectionTitle>
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Customer *"
                  value={form.customerId}
                  onChange={(e) => {
                    set("customerId", e.target.value);
                    set("vehicleId", "");
                  }}
                >
                  <option value="">Select customer...</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Vehicle"
                  value={form.vehicleId}
                  onChange={(e) => set("vehicleId", e.target.value)}
                >
                  <option value="">Select vehicle...</option>
                  {custVehicles(form.customerId).map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.reg} — {v.make} {v.model}
                    </option>
                  ))}
                </Select>
                <Input
                  label="Date"
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
                <Input
                  label="Valid Until"
                  type="date"
                  value={form.validUntil}
                  onChange={(e) => set("validUntil", e.target.value)}
                />
                <Select
                  label="Status"
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option>Draft</option>
                  <option>Sent</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </Select>
              </div>
            </div>
            <div>
              <SectionTitle>🔧 Repair Items</SectionTitle>
              <LineItemsTable
                items={form.items}
                setItems={(v) => set("items", v)}
              />
              <div className="flex justify-end">
                <TotalsBox
                  subtotal={calcSubtotal(form.items)}
                  vat={calcVat(form.items)}
                  discount={0}
                  total={calcTotal(form.items)}
                />
              </div>
            </div>
            <div>
              <SectionTitle>📝 Notes</SectionTitle>
              <Textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Notes for the customer..."
              />
            </div>
          </div>
        </Modal>
      )}

      {/* View Estimate Modal */}
      {viewing &&
        (() => {
          const c = 12;
          const v = 10;
          const sub = calcSubtotal(viewing.items);
          const vat = calcVat(viewing.items);
          const tot = calcTotal(viewing.items);
          return (
            <Modal
              title={`Estimate #${viewing.id}`}
              size="max-w-5xl"
              onClose={() => setViewing(null)}
              footer={
                <>
                  <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>
                  <BtnGhost>
                    <RiDownloadLine /> Download PDF
                  </BtnGhost>
                  <BtnAmber>
                    <RiSendPlane2Line /> Send to Customer
                  </BtnAmber>
                  {viewing.status === "Draft" && (
                    <BtnGreen
                      onClick={() => {
                        // approve(viewing.id);
                        setViewing({ ...viewing, status: "Approved" });
                      }}
                    >
                      ✓ Approve
                    </BtnGreen>
                  )}
                  {viewing.status === "Approved" && (
                    <BtnBlue onClick={() => convertToJob(viewing)}>
                      <RiArrowRightLine /> Convert to Job Sheet
                    </BtnBlue>
                  )}
                </>
              }
            >
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Badge status={viewing.status} />
                  <span className="text-sm text-slate-400">
                    Created: {viewing.date}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
                    <div className="font-bold text-slate-700 mb-2">
                      Customer Details
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Name: </span>
                      {c?.name}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Phone: </span>
                      {c?.phone}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Email: </span>
                      {c?.email}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Address: </span>
                      {c?.address}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
                    <div className="font-bold text-slate-700 mb-2">
                      Vehicle Details
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Reg: </span>
                      <RegPlate reg={v?.reg || "—"} />
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Make: </span>
                      {v?.make}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Model: </span>
                      {v?.model}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Year: </span>
                      {v?.year}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">VIN: </span>
                      {v?.vin}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Mileage: </span>
                      {v?.mileage}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
                    <div className="font-bold text-slate-700 mb-2">
                      Estimate Details
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">No: </span>
                      {viewing.id}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Date: </span>
                      {viewing.date}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Valid Until: </span>
                      {viewing.validUntil || "—"}
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Status: </span>
                      <Badge status={viewing.status} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-700 mb-3">
                    Repair Items
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
                        {viewing.items.map((it, i) => (
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
                              £{it?.rate?.toFixed(2)}
                            </td>
                            <td className="px-4 py-2.5 text-slate-400">
                              {it.vat}%
                            </td>
                            <td className="px-4 py-2.5 font-mono font-semibold">
                              £{it.total?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end">
                    <TotalsBox
                      subtotal={sub}
                      vat={vat}
                      discount={0}
                      total={tot}
                    />
                  </div>
                </div>
                {viewing.notes && (
                  <div className="bg-blue-50 rounded-xl p-4 text-sm text-slate-700">
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
