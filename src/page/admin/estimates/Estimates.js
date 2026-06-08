import { useEffect, useState } from "react";

import {
  Card,
  PageHeader,
  Badge,
  BtnBlue,
  BtnGhost,
  BtnGreen,
  BtnRed,
  BtnAmber,
  Select,
  Textarea,
  Table,
  RegPlate,
  SectionTitle,
  LineItemsTable,
  TotalsBox,
  Input,
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
import { fetchEstimates } from "../../../services/apiServices/estimateService";
import moment from "moment";
import { Modal } from "../../../components/ui/Modal";
import ViewItemDetailsModal from "./ViewItemDetailsModal";

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
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(blank());
  const [search, setSearch] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const [estimateData, setEstimateData] = useState([]);
  const custVehicles = (cId) => vehicles.filter((v) => v.customerId === cId);

  const save = () => {
    if (!form.customerId) return;

    setShowNew(false);
    setForm(blank());
  };

  const estimateList = async () => {
    try {
      const response = await fetchEstimates();
      if (response.success) {
        setEstimateData(response?.data || []);
      } else {
        setEstimateData([]);
      }
    } catch {
      setEstimateData([]);
    }
  };
  useEffect(() => {
    estimateList();
  }, []);

  console.log(estimateData, "estimateData");

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
          empty={!estimateData.length ? "No estimates found" : null}
        >
          {estimateData?.map((est, index) => {
            return (
              <tr
                key={est.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setViewing(est)}
              >
                <td className="px-4 py-3 font-mono text-blue-600 font-semibold text-sm">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  {est?.customer?.name || "—"}
                </td>
                <td className="px-4 py-3">
                  <RegPlate reg={est.vehicle?.model} />
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {moment(est.estimateDate).format("lll")}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {/* {est.validUntil || "—"} */}
                  {moment(est.validUntil).format("lll")}
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                  £{est?.total}
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

      <Modal
        title="New Estimate"
        sub="Create a quotation for the customer"
        // size="max-w-4xl"
        onClose={() => setShowNew(false)}
        open={showNew}
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

      {viewing && (
        <ViewItemDetailsModal setViewing={setViewing} viewing={viewing} />
      )}
    </div>
  );
}
