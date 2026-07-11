import { useState } from "react";
import { fmt, calcLineTotal, today, padId } from "../../utils/helpers";
import { TECHNICIANS } from "../../data/sampleData";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { LineItemsTable, ViewLineItems } from "../ui/LineItems";
import {
  FormSection,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Select,
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
  assignedTo: "",
  startDate: today(),
  faultReported: "",
  work: "",
  notes: "",
  mileageIn: "",
  status: "Open",
  items: [{ desc: "Labour", qty: 1, rate: 65 }],
});

// ─── JOB SHEET MODULE ─────────────────────────────────────────────────────────
const JobSheetModule = ({ jobSheets, setJobSheets, onConvertToInvoice }) => {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(defaultForm());

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    const sub = calcLineTotal(form.items);
    const job = {
      id: padId("JOB", jobSheets.length),
      ...form,
      total: sub + sub * 0.2,
    };
    setJobSheets((p) => [...p, job]);
    setShowNew(false);
    setForm(defaultForm());
  };

  const markComplete = (id) =>
    setJobSheets((p) =>
      p.map((j) => (j.id === id ? { ...j, status: "Complete" } : j)),
    );

  const active = jobSheets.filter(
    (j) => j.status !== "Complete" && j.status !== "Invoiced",
  ).length;
  const complete = jobSheets.filter((j) => j.status === "Complete").length;

  const stats = [
    { label: "Total Jobs", value: jobSheets.length, color: "text-[#be123c]" },
    {
      label: "Active / Open",
      value: active,
      sub: "In workshop",
      color: "text-violet-400",
    },
    {
      label: "Completed",
      value: complete,
      sub: "Ready to invoice",
      color: "text-emerald-400",
    },
    {
      label: "Conversion Rate",
      value:
        jobSheets.length > 0
          ? `${Math.round((complete / jobSheets.length) * 100)}%`
          : "0%",
      color: "text-amber-400",
    },
  ];

  return (
    <div>
      <PageHeader
        icon="🔧"
        title="Job Sheets"
        sub="Manage ongoing workshop jobs and technician assignments"
        action={
          <BtnPrimary onClick={() => setShowNew(true)}>
            + New Job Sheet
          </BtnPrimary>
        }
      />

      <StatStrip stats={stats} />

      <TableCard title="All Job Sheets" count={jobSheets.length}>
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
                <tr className="bg-slate-50/80">
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
                    className="border-t border-slate-100 hover:bg-[#fff1f2] cursor-pointer transition-colors"
                    onClick={() => setViewing(job)}
                  >
                    <td className="px-4 py-3 font-mono text-[#be123c] font-extrabold text-sm">
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
                              ✓ Mark Done
                            </BtnGreen>
                          )}
                        {job.status === "Complete" && (
                          <BtnPrimary
                            className="text-xs py-1 px-3"
                            onClick={() => onConvertToInvoice(job)}
                          >
                            → Invoice
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

      {/* ── NEW JOB SHEET MODAL ── */}
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
            <SectionTitle>👤 Customer & Vehicle</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <FormGroup label="Customer Name *">
                  <Input
                    value={form.customer}
                    onChange={(e) => set("customer", e.target.value)}
                    placeholder="Full Name"
                  />
                </FormGroup>
              </div>
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
              <FormGroup label="Mileage In">
                <Input
                  value={form.mileageIn}
                  onChange={(e) => set("mileageIn", e.target.value)}
                  placeholder="45,000"
                />
              </FormGroup>
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>⚙️ Job Details</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <FormGroup label="Assigned Technician">
                <Select
                  value={form.assignedTo}
                  onChange={(e) => set("assignedTo", e.target.value)}
                >
                  <option value="">Select technician</option>
                  {TECHNICIANS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup label="Start Date">
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => set("startDate", e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Status">
                <Select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Complete</option>
                </Select>
              </FormGroup>
              <div className="col-span-3">
                <FormGroup label="Fault Reported by Customer">
                  <Textarea
                    value={form.faultReported}
                    onChange={(e) => set("faultReported", e.target.value)}
                    placeholder="Describe the fault..."
                  />
                </FormGroup>
              </div>
              <div className="col-span-3">
                <FormGroup label="Work to be Carried Out">
                  <Textarea
                    value={form.work}
                    onChange={(e) => set("work", e.target.value)}
                    placeholder="Detail the work required..."
                  />
                </FormGroup>
              </div>
            </div>
          </FormSection>

          <FormSection>
            <SectionTitle>💰 Labour & Parts</SectionTitle>
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

      {/* ── VIEW JOB SHEET MODAL ── */}
      {viewing && (
        <Modal
          title={`${viewing.id} — Job Sheet`}
          sub={
            <span className="flex items-center gap-2">
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
          <ViewLineItems items={viewing.items} total={viewing.total} />
        </Modal>
      )}
    </div>
  );
};

export default JobSheetModule;
