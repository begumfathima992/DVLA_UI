import React from "react";
import { Modal } from "../../../components/ui/Modal";
import { BtnAmber, BtnGhost } from "../../../components/ui/UI";
import { RiDownloadLine, RiPrinterLine } from "react-icons/ri";
import moment from "moment";

/* ─── Print styles injected once ─────────────────────────── */
const PRINT_STYLE = `
@media print {
  body * { visibility: hidden; }
  #job-sheet-printable, #job-sheet-printable * { visibility: visible; }
  #job-sheet-printable {
    position: fixed; inset: 0;
    padding: 24px 32px;
    background: #fff;
    font-family: sans-serif;
  }
}
`;

function injectPrintStyle() {
  if (document.getElementById("job-sheet-print-style")) return;
  const tag = document.createElement("style");
  tag.id = "job-sheet-print-style";
  tag.innerHTML = PRINT_STYLE;
  document.head.appendChild(tag);
}

/* ─── Small helpers ───────────────────────────────────────── */
function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
        {icon}
        {title}
      </p>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-slate-400">{label}</span>
      <span className="text-xs text-slate-700">{value || "—"}</span>
    </div>
  );
}

function RegPlate({ reg }) {
  return (
    <span className="inline-block bg-amber-300 text-amber-900 text-xs font-mono font-semibold px-2 py-0.5 rounded tracking-wider">
      {reg}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Open: "bg-emerald-50 text-emerald-700",
    Closed: "bg-slate-100 text-slate-500",
    "In Progress": "bg-blue-50 text-blue-700",
    Completed: "bg-teal-50 text-teal-700",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${map[status] ?? "bg-slate-100 text-slate-500"}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const map = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-slate-100 text-slate-500",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${map[priority] ?? "bg-slate-100 text-slate-500"}`}
    >
      {priority}
    </span>
  );
}

function DueDateValue({ date }) {
  if (!date) return <span className="text-xs text-slate-700">—</span>;
  const d = moment(date);
  const daysLeft = d.diff(moment(), "days");
  const urgent = daysLeft <= 30;
  return (
    <span
      className={`text-xs font-medium ${urgent ? "text-red-600" : "text-slate-700"}`}
    >
      {d.format("D MMM YYYY")}
      {urgent && (
        <span className="ml-1 text-[10px] text-red-400">({daysLeft}d)</span>
      )}
    </span>
  );
}

/* ─── Main component ──────────────────────────────────────── */
export default function JobSheetsDetailModal({ setViewing, viewing }) {
  const handlePrint = () => {
    injectPrintStyle();
    window.print();
  };

  if (!viewing) return null;

  const { customer, vehicle, items = [], totalPrice } = viewing;

  return (
    <Modal
      title={
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          {viewing.jobNumber}
          <StatusBadge status={viewing.status} />
          <PriorityBadge priority={viewing.priority} />
        </span>
      }
      //   size="max-w-4xl"
      onClose={() => setViewing(null)}
      open={!!viewing}
      footer={
        <>
          <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>
          <BtnAmber onClick={handlePrint} className="flex items-center gap-1.5">
            <RiPrinterLine />
            Print / Save PDF
          </BtnAmber>
        </>
      }
    >
      {/* ── Printable region ── */}
      <div id="job-sheet-printable" className="space-y-5 p-6 bg-white">
        {/* Header meta */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Created:{" "}
            <span className="text-slate-600">
              {moment(viewing.createdAt).format("D MMM YYYY, HH:mm")}
            </span>
          </p>
          {viewing.technicianName && (
            <p className="text-xs text-slate-400">
              Technician:{" "}
              <span className="text-slate-600">{viewing.technicianName}</span>
            </p>
          )}
          {viewing.serviceAdvisor && (
            <p className="text-xs text-slate-400">
              Advisor:{" "}
              <span className="text-slate-600">{viewing.serviceAdvisor}</span>
            </p>
          )}
        </div>

        {/* Three info cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Customer */}
          <InfoCard title="Customer">
            <InfoRow label="Name" value={customer?.name} />
            <InfoRow label="Phone" value={customer?.phone} />
            <InfoRow label="Email" value={customer?.email} />
            <InfoRow label="Address" value={customer?.address} />
          </InfoCard>

          {/* Vehicle */}
          <InfoCard title="Vehicle">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400">Reg</span>
              <RegPlate reg={vehicle?.registrationNumber || "—"} />
            </div>
            <InfoRow
              label="Make / Model"
              value={
                vehicle?.make && vehicle?.model
                  ? `${vehicle.make} ${vehicle.model}`
                  : null
              }
            />
            <InfoRow label="Year" value={vehicle?.year} />
            <InfoRow label="Fuel" value={vehicle?.fuelType} />
            <InfoRow label="Colour" value={vehicle?.colour} />
            <InfoRow
              label="Mileage"
              value={
                vehicle?.mileage
                  ? `${vehicle.mileage.toLocaleString()} km`
                  : null
              }
            />
          </InfoCard>

          {/* Job / Compliance */}
          <InfoCard title="Job Details">
            <InfoRow label="Job No." value={`#${viewing.id}`} />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400">VIN</span>
              <span className="text-[10px] font-mono text-slate-700 break-all">
                {vehicle?.vinNumber || "—"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400">Engine No.</span>
              <span className="text-[10px] font-mono text-slate-700">
                {vehicle?.engineNumber || "—"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400">MOT due</span>
              <DueDateValue date={vehicle?.motDueDate} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400">Tax due</span>
              <DueDateValue date={vehicle?.taxDueDate} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400">Next service</span>
              <DueDateValue date={vehicle?.nextServiceDate} />
            </div>
          </InfoCard>
        </div>

        {/* Repair items */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
            Repair Items
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "36px" }} />
                <col />
                <col style={{ width: "80px" }} />
                <col style={{ width: "50px" }} />
                <col style={{ width: "90px" }} />
                <col style={{ width: "90px" }} />
              </colgroup>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {[
                    "#",
                    "Description",
                    "Type",
                    "Qty",
                    "Unit Price",
                    "Total",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={item.id ?? i}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-3 py-2.5 text-slate-400">{i + 1}</td>
                    <td className="px-3 py-2.5 text-slate-700">
                      {item.description}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          item.itemType === "Labour"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {item.itemType}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-slate-600">
                      £{parseFloat(item.unitPrice || 0).toFixed(2)}
                    </td>
                    <td className="px-3 py-2.5 font-mono font-semibold text-slate-800">
                      £{parseFloat(item.totalPrice || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-4">
            <div className="bg-slate-50 rounded-xl p-4 min-w-[220px] space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-mono">
                  £{parseFloat(totalPrice || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>VAT (0%)</span>
                <span className="font-mono">£{viewing?.vatAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Discount</span>
                <span className="font-mono">{viewing?.discount || 0}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2 text-sm font-semibold text-slate-800">
                <span>Total due</span>
                <span className="font-mono">
                  £{parseFloat(viewing?.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {viewing.notes && (
          <div className="bg-blue-50 rounded-xl p-4 text-xs text-slate-700">
            <span className="font-semibold text-blue-700">Notes: </span>
            {viewing.notes}
          </div>
        )}
        <div className="hidden print:flex justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-3">
          <span>Printed: {moment().format("D MMM YYYY, HH:mm")}</span>
          <span>{viewing.jobNumber}</span>
        </div>
      </div>
    </Modal>
  );
}
