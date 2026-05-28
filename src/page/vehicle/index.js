import { useState } from "react";
import Header from "../../layout/header";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const API_URL = "http://localhost:5050/api/save-vehicle";

  const doSearch = async () => {
    const q = query.trim().toUpperCase().replace(/\s/g, "");
    if (!q) return;

    setStatus("searching");
    setResult(null);
    setEditMode(false);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber: q }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const formattedData = {
          regNo: data.registrationNumber,
          make: data.make,
          model: data.typeApproval || "N/A",
          engineCC: data.engineCapacity?.toString() || "N/A",
          fuelType: data.fuelType,
          colour: data.colour,
          taxStatus: data.taxStatus,
          taxExpiry: data.taxDueDate,
          motStatus: data.motStatus,
          motExpiry: data.motExpiryDate,
          yearOfManufacture: data.yearOfManufacture?.toString(),
          dateOfRegistration: data.monthOfFirstRegistration,
          revenueWeight: data.revenueWeight ? `${data.revenueWeight} kg` : "N/A",
          euroStatus: data.euroStatus || "N/A",
        };
        setResult(formattedData);
        setEditData({ ...formattedData });
        setStatus("found");
      } else if (response.status === 404) {
        setStatus("notfound");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setStatus("error");
    }
  };

  const StatusBadge = ({ value }) => {
    if (!value) return <span className="text-slate-300">—</span>;
    const isGood = value.toLowerCase().includes("valid") || value.toLowerCase().includes("taxed");
    const isExpired = value.toLowerCase().includes("expired") || value.toLowerCase().includes("sorn");
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
        ${isGood ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
          isExpired ? "bg-red-50 text-red-700 border border-red-200" :
          "bg-amber-50 text-amber-700 border border-amber-200"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isGood ? "bg-emerald-500" : isExpired ? "bg-red-500" : "bg-amber-500"}`} />
        {value}
      </span>
    );
  };

  const Field = ({ label, value, field, isStatus = false }) => (
    <div>
      <div className="text-slate-400 text-xs uppercase tracking-widest mb-1.5 font-medium">{label}</div>
      {editMode ? (
        <input
          className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white rounded-lg px-3 py-2 text-sm text-slate-800 outline-none transition-colors"
          value={editData[field] || ""}
          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
        />
      ) : (
        <div className="min-h-[36px] flex items-center">
          {isStatus
            ? <StatusBadge value={value} />
            : <span className="text-slate-800 text-sm font-medium">{value || <span className="text-slate-300">—</span>}</span>
          }
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20">

      {/* Search Header */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest text-red-600 mb-5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            DVLA VEHICLE LOOKUP
          </div>
          <h1 className="text-5xl font-black mb-2 text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Vehicle Enquiry
          </h1>
          <p className="text-slate-400 text-sm mb-8">Enter a UK registration number to retrieve DVLA records</p>

          <div className="flex gap-2 max-w-xl mx-auto">
            <input
              className="flex-1 bg-slate-100 border-2 border-slate-200 focus:border-red-400 focus:bg-white rounded-xl px-5 py-4 text-slate-900 text-lg font-mono uppercase outline-none transition-all placeholder-slate-300 shadow-sm"
              placeholder="e.g. YY59 UAD"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
            />
            <button
              onClick={doSearch}
              className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-xl font-bold transition-all shadow-sm shadow-red-100 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Loading */}
        {status === "searching" && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Querying DVLA records…</p>
          </div>
        )}

        {/* Not found */}
        {status === "notfound" && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No vehicle found</h3>
            <p className="text-slate-400 text-sm">No DVLA record matched that registration number.</p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-red-600 mb-1">Connection Error</h3>
            <p className="text-slate-400 text-sm">Could not reach the server. Make sure it's running on port 5050.</p>
          </div>
        )}

        {/* Result */}
        {status === "found" && result && (
          <div style={{ animation: "fadeUp 0.4s ease-out forwards" }}>

            {/* Vehicle Header */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                {/* UK Plate Mockup */}
                <div className="bg-amber-400 border-2 border-amber-500 rounded-lg px-5 py-2.5 shadow-sm">
                  <div className="text-black font-black text-2xl tracking-widest font-mono leading-none">
                    {result.regNo}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                    {result.make}
                  </h2>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">{result.colour} · {result.yearOfManufacture}</p>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all
                  ${editMode
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
              >
                {editMode ? "💾 Save Changes" : "✏️ Edit Record"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Compliance */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-5 bg-red-500 rounded-full" />
                  <h3 className="text-slate-900 text-xs font-bold uppercase tracking-widest">Compliance Status</h3>
                </div>
                <div className="grid grid-cols-2 gap-5 divide-x divide-slate-100">
                  <div className="space-y-5">
                    <Field label="Tax Status" value={result.taxStatus} field="taxStatus" isStatus />
                    <Field label="MOT Status" value={result.motStatus} field="motStatus" isStatus />
                  </div>
                  <div className="pl-5 space-y-5">
                    <Field label="Tax Expiry" value={result.taxExpiry} field="taxExpiry" />
                    <Field label="MOT Expiry" value={result.motExpiry} field="motExpiry" />
                  </div>
                </div>
              </div>

              {/* Technical */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-5 bg-slate-300 rounded-full" />
                  <h3 className="text-slate-900 text-xs font-bold uppercase tracking-widest">Technical Specs</h3>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Fuel Type" value={result.fuelType} field="fuelType" />
                  <Field label="Engine CC" value={result.engineCC} field="engineCC" />
                  <Field label="Year" value={result.yearOfManufacture} field="yearOfManufacture" />
                  <Field label="Weight" value={result.revenueWeight} field="revenueWeight" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default function Vehicle() {
  return (
    <>
      <Header />
      <SearchPage />
    </>
  );
}
