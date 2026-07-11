import React from "react";
import { Modal } from "../../../components/ui/Modal";
import {
  Badge,
  BtnAmber,
  BtnGhost,
  RegPlate,
  TotalsBox,
} from "../../../components/ui/UI";
import { RiDownloadLine } from "react-icons/ri";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ViewItemDetailsModal({ setViewing, viewing }) {
  const handleDownloadPDF = async () => {
    if (!viewing) return;

    const content = document.getElementById("estimate-modal-content");
    if (!content) {
      alert("Content not found!");
      return;
    }

    try {
      // Show loading state (optional)
      const originalText = document.querySelector("#download-btn")?.innerHTML;
      if (document.querySelector("#download-btn")) {
        document.querySelector("#download-btn").innerHTML = "Generating PDF...";
      }

      const canvas = await html2canvas(content, {
        scale: 2, // High quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `Estimate_${viewing.id || "Unknown"}_${moment().format("YYYY-MM-DD")}.pdf`,
      );

      // Restore button text
      if (document.querySelector("#download-btn")) {
        document.querySelector("#download-btn").innerHTML =
          originalText || "Download PDF";
      }
    } catch (error) {
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div>
      <Modal
        title={`Estimate #${viewing?.id}`}
        // size="max-w-5xl"
        onClose={() => setViewing(null)}
        open={viewing}
        footer={
          <>
            <BtnGhost onClick={() => setViewing(null)}>Close</BtnGhost>

            <BtnAmber id="download-btn" onClick={handleDownloadPDF}>
              <RiDownloadLine /> Download PDF
            </BtnAmber>
          </>
        }
      >
        {/* Main Content - This will be captured for PDF */}
        <div id="estimate-modal-content" className="space-y-5 p-6 bg-white">
          <div className="flex items-center gap-3">
            <Badge status={viewing?.status} />
            <span className="text-sm text-slate-400">
              Created:{" "}
              {viewing?.estimateDate
                ? moment(viewing.estimateDate).format("lll")
                : "—"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer Details */}
            <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
              <div className="font-bold text-slate-700 mb-2">
                Customer Details
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Name: </span>
                {viewing?.customer?.name || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Phone: </span>
                {viewing?.customer?.phone || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Email: </span>
                {viewing?.customer?.email || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Address: </span>
                {viewing?.customer?.address || "—"}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
              <div className="font-bold text-slate-700 mb-2">
                Vehicle Details
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Reg: </span>
                <RegPlate reg={viewing?.vehicle?.registrationNumber || "—"} />
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Make: </span>
                {viewing?.vehicle?.make || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Model: </span>
                {viewing?.vehicle?.model || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Year: </span>
                {viewing?.vehicle?.year || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">VIN: </span>
                {viewing?.vehicle?.vinNumber || "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Mileage: </span>
                {viewing?.vehicle?.mileage || "—"}
              </div>
            </div>

            {/* Estimate Details */}
            <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
              <div className="font-bold text-slate-700 mb-2">
                Estimate Details
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">No: </span>
                {viewing?.id}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Date: </span>
                {viewing?.estimateDate
                  ? moment(viewing.estimateDate).format("lll")
                  : "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Valid Until: </span>
                {viewing?.validUntil
                  ? moment(viewing.validUntil).format("lll")
                  : "—"}
              </div>
              <div className="text-slate-600">
                <span className="text-slate-400">Status: </span>
                <Badge status={viewing?.status} />
              </div>
            </div>
          </div>

          {/* Repair Items Table */}
          <div>
            <div className="font-bold text-slate-700 mb-3">Repair Items</div>
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
                      // "VAT %",
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
                  {viewing?.items?.map((it, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-4 py-2.5 text-slate-400 text-xs">
                        {i + 1}
                      </td>
                      <td className="px-4 py-2.5">{it.description}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            it.type === "Labour"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {it.itemType || it.type}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">{it.quantity}</td>
                      <td className="px-4 py-2.5 font-mono">
                        £{parseFloat(it?.totalPrice || 0).toFixed(2)}
                      </td>
                      {/* <td className="px-4 py-2.5 text-slate-400">{it.vat}%</td> */}
                      <td className="px-4 py-2.5 font-mono font-semibold">
                        £{parseFloat(it.totalPrice || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <TotalsBox
                subtotal={viewing?.subtotal || "0.00"}
                vat={viewing?.vatPercentage || "0"}
                discount={viewing?.discount || "0"}
                total={viewing?.total}
                balance={0}
              />
            </div>
          </div>

          {/* Notes */}
          {viewing?.notes && (
            <div className="bg-red-50 rounded-xl p-4 text-sm text-slate-700">
              <span className="font-semibold">Notes: </span>
              {viewing.notes}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
