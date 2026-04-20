import { useState, useEffect, useRef } from "react";
import Header from "../../layout/header";

// ─── Vehicle Database (from screenshot + extras) ───────────────────────────
const VEHICLES = {
  YY59UAD: {
    regNo: "YY59UAD",
    make: "AUDI",
    model: "A4 AVANT S LINE 211 TFSI",
    engineCC: "1984",
    dateOfRegistration: "19/01/2010",
    dateOfManufacture: "19/01/2010",
    grossWeight: "",
    engineNo: "CDN 094322",
    vinChassis: "WAUZZZ8KXAA104933",
    fuelType: "PETROL",
    colour: "BLACK",
    fleetNo: "",
    transmission: "MANUAL",
    taxDue: "",
    associatedCustomer: "GUR003",
    customerName: "Mr Sahota Gurcharan",
    leaseCompany: "",
    taxExpiry: "31/03/2025",
    motExpiry: "18/01/2026",
    status: "Active",
  },
  MH12AB1234: {
    regNo: "MH12AB1234",
    make: "MARUTI SUZUKI",
    model: "SWIFT VXI AMT",
    engineCC: "1197",
    dateOfRegistration: "05/06/2021",
    dateOfManufacture: "01/04/2021",
    grossWeight: "1235 kg",
    engineNo: "K12M1234567",
    vinChassis: "MA3FJEB1S00123456",
    fuelType: "PETROL",
    colour: "PEARL WHITE",
    fleetNo: "FL-044",
    transmission: "AUTOMATIC",
    taxDue: "05/06/2026",
    associatedCustomer: "RAM001",
    customerName: "Mr Ramesh Patel",
    leaseCompany: "",
    taxExpiry: "05/06/2026",
    motExpiry: "04/06/2025",
    status: "Active",
  },
  UP32CD5678: {
    regNo: "UP32CD5678",
    make: "HYUNDAI",
    model: "CRETA SX TURBO",
    engineCC: "1482",
    dateOfRegistration: "12/11/2022",
    dateOfManufacture: "01/10/2022",
    grossWeight: "1985 kg",
    engineNo: "G4FJ5678901",
    vinChassis: "MALAM81BXNM234567",
    fuelType: "PETROL",
    colour: "TYPHOON SILVER",
    fleetNo: "",
    transmission: "AUTOMATIC",
    taxDue: "12/11/2027",
    associatedCustomer: "SHA002",
    customerName: "Ms Shreya Agarwal",
    leaseCompany: "LeasePro India Pvt Ltd",
    taxExpiry: "12/11/2027",
    motExpiry: "11/11/2026",
    status: "Active",
  },
};

// ─── Animated Counter ──────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else setCount(Math.floor(start));
          }, 16);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | searching | found | notfound
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const doSearch = () => {
    const q = query.trim().toUpperCase().replace(/\s/g, "");
    if (!q) return;
    setStatus("searching");
    setResult(null);
    setEditMode(false);
    setTimeout(() => {
      const v = VEHICLES[q];
      if (v) {
        setResult(v);
        setEditData({ ...v });
        setStatus("found");
      } else setStatus("notfound");
    }, 900);
  };

  const Field = ({ label, value, field, span = false }) => (
    <div className={`${span ? "col-span-2" : ""}`}>
      <div className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
        {label}
      </div>
      {editMode ? (
        <input
          className="w-full bg-zinc-800 border border-zinc-600 focus:border-red-500 rounded px-3 py-2 text-sm text-white outline-none transition-colors"
          value={editData[field] || ""}
          onChange={(e) =>
            setEditData((d) => ({ ...d, [field]: e.target.value }))
          }
        />
      ) : (
        <div className="bg-zinc-800/60 border border-zinc-700 rounded px-3 py-2 text-sm text-white min-h-[36px]">
          {value || <span className="text-zinc-600">—</span>}
        </div>
      )}
    </div>
  );

  const StatusBadge = ({ v }) => {
    const motOk = true;
    return (
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-700/40 text-emerald-400 text-xs px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />{" "}
          Active
        </span>
        <span className="inline-flex items-center gap-1.5 bg-blue-950 border border-blue-700/40 text-blue-400 text-xs px-3 py-1 rounded-full">
          Tax Expiry: {v.taxExpiry || "N/A"}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${motOk ? "bg-amber-950 border-amber-700/40 text-amber-400" : "bg-red-950 border-red-700/40 text-red-400"}`}
        >
          MOT: {v.motExpiry || "N/A"}
        </span>
      </div>
    );
  };

  const suggestions = ["YY59UAD", "MH12AB1234", "UP32CD5678"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20">
      {/* Search Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-2">
            Vehicle Registry
          </div>
          <h1
            className="text-5xl font-black mb-3"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Search by Reg Number
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            Enter a vehicle registration to instantly retrieve full vehicle
            details
          </p>

          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                className="w-full bg-zinc-800 border-2 border-zinc-700 focus:border-red-500 rounded-xl px-5 py-4 text-white text-lg font-mono tracking-widest uppercase outline-none transition-all duration-200 placeholder-zinc-600"
                placeholder="e.g. YY59UAD"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResult(null);
                    setStatus("idle");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xl"
                >
                  ×
                </button>
              )}
            </div>
            <button
              onClick={doSearch}
              className="bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              Search
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-zinc-600 text-xs">Try:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                }}
                className="text-xs font-mono bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-white px-3 py-1 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Searching animation */}
        {status === "searching" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-2 border-zinc-700 border-t-red-500 rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm animate-pulse">
              Searching vehicle registry...
            </p>
          </div>
        )}

        {/* Not Found */}
        {status === "notfound" && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 bg-red-950 border border-red-800 rounded-full flex items-center justify-center text-3xl">
              🚫
            </div>
            <h3 className="text-white font-bold text-lg">No Vehicle Found</h3>
            <p className="text-zinc-500 text-sm">
              Registration <span className="font-mono text-white">{query}</span>{" "}
              not found in the system.
            </p>
          </div>
        )}

        {/* Result Card */}
        {status === "found" && result && (
          <div className="animate-fade-in">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-4xl font-black text-white tracking-wider"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {result.regNo}
                  </span>
                  <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs px-2 py-0.5 rounded font-mono">
                    VRM
                  </span>
                </div>
                <div className="text-zinc-400 text-sm">
                  {result.make} · {result.model}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode((e) => !e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    editMode
                      ? "bg-red-600 border-red-500 text-white"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {editMode ? "✏️ Editing..." : "✏️ Edit"}
                </button>
                {editMode && (
                  <button
                    onClick={() => {
                      setResult({ ...editData });
                      setEditMode(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-600 transition-all"
                  >
                    💾 Save
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zinc-500 transition-all">
                  🖨️ Print
                </button>
              </div>
            </div>

            <StatusBadge v={result} />

            {/* Main Details Card */}
            <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-zinc-800/60 border-b border-zinc-700/60 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600/20 border border-red-600/40 rounded flex items-center justify-center text-base">
                  🚗
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {result.make} {result.model}
                  </div>
                  <div className="text-zinc-500 text-xs">
                    Vehicle registration record
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Row 1 */}
                <div>
                  <div className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-red-700" /> Identity
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Field label="Make" value={result.make} field="make" />
                    <Field label="Model" value={result.model} field="model" />
                    <Field
                      label="Engine CC"
                      value={result.engineCC}
                      field="engineCC"
                    />
                    <Field
                      label="Fuel Type"
                      value={result.fuelType}
                      field="fuelType"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-800" />

                {/* Row 2 */}
                <div>
                  <div className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-red-700" /> Registration
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Field
                      label="Date of Registration"
                      value={result.dateOfRegistration}
                      field="dateOfRegistration"
                    />
                    <Field
                      label="Date of Manufacture"
                      value={result.dateOfManufacture}
                      field="dateOfManufacture"
                    />
                    <Field
                      label="Gross Weight"
                      value={result.grossWeight}
                      field="grossWeight"
                    />
                    <Field
                      label="Transmission"
                      value={result.transmission}
                      field="transmission"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-800" />

                {/* Row 3 */}
                <div>
                  <div className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-red-700" /> Technical
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Field
                      label="VIN / Chassis No"
                      value={result.vinChassis}
                      field="vinChassis"
                    />
                    <Field
                      label="Engine No"
                      value={result.engineNo}
                      field="engineNo"
                    />
                    <Field
                      label="Colour"
                      value={result.colour}
                      field="colour"
                    />
                  </div>
                </div>

                <div className="border-t border-zinc-800" />

                {/* Row 4 */}
                <div>
                  <div className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-red-700" /> Owner & Compliance
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Field
                      label="Customer Code"
                      value={result.associatedCustomer}
                      field="associatedCustomer"
                    />
                    <Field
                      label="Customer Name"
                      value={result.customerName}
                      field="customerName"
                    />
                    <Field
                      label="Fleet No"
                      value={result.fleetNo}
                      field="fleetNo"
                    />
                    <Field
                      label="Tax Due"
                      value={result.taxDue}
                      field="taxDue"
                    />
                    <Field
                      label="Tax Expiry"
                      value={result.taxExpiry}
                      field="taxExpiry"
                    />
                    <Field
                      label="MOT Expiry"
                      value={result.motExpiry}
                      field="motExpiry"
                    />
                    <Field
                      label="Lease Company"
                      value={result.leaseCompany}
                      field="leaseCompany"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "📋", label: "View Job History" },
                { icon: "📅", label: "Book Service" },
                { icon: "📄", label: "Generate Invoice" },
                { icon: "🗑️", label: "Delete Record" },
              ].map((a) => (
                <button
                  key={a.label}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    a.label === "Delete Record"
                      ? "bg-red-950 border-red-800 text-red-400 hover:bg-red-900 hover:shadow-red-950/50"
                      : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:shadow-zinc-950/50"
                  }`}
                >
                  <span className="text-base">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Idle state hint */}
        {status === "idle" && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <div className="text-6xl opacity-20">🔍</div>
            <p className="text-zinc-600 text-sm max-w-xs">
              Enter a vehicle registration number above to retrieve full vehicle
              details from the registry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────
export default function Vehicle() {
  const [page, setPage] = useState("home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes ping-slow { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.3} 50%{transform:translate(-50%,-50%) scale(1.15);opacity:.1} }
        @keyframes ping-slower { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.2} 50%{transform:translate(-50%,-50%) scale(1.25);opacity:.05} }
        @keyframes fade-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .animate-ping-slow { animation: ping-slow 4s ease-in-out infinite; }
        .animate-ping-slower { animation: ping-slower 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        * { box-sizing: border-box; }
        body { background: #09090b; }
      `}</style>
      <Header />
      <SearchPage />
    </>
  );
}
