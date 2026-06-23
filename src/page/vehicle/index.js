import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../layout/header";

function MagneticBtn({
  children,
  className = "",
  onClick,
  style,
  type = "button",
}) {
  const ref = useRef(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setXY({
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.18,
    });
  };
  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={style}
      animate={{ x: xy.x, y: xy.y }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      onMouseMove={onMove}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

/* ─── FADE UP ──────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [focused, setFocused] = useState(false);

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
          revenueWeight: data.revenueWeight
            ? `${data.revenueWeight} kg`
            : "N/A",
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
    const isGood =
      value.toLowerCase().includes("valid") ||
      value.toLowerCase().includes("taxed");
    const isExpired =
      value.toLowerCase().includes("expired") ||
      value.toLowerCase().includes("sorn");
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 20 }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border-2
        ${
          isGood
            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
            : isExpired
              ? "bg-red-50 text-red-700 border-red-300"
              : "bg-amber-50 text-amber-700 border-amber-300"
        }`}
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-1.5 h-1.5 rounded-full ${isGood ? "bg-emerald-500" : isExpired ? "bg-red-500" : "bg-amber-500"}`}
        />
        {value}
      </motion.span>
    );
  };

  const Field = ({ label, value, field, isStatus = false }) => (
    <div>
      <div className="text-slate-400 text-xs uppercase tracking-widest mb-1.5 font-medium">
        {label}
      </div>
      {editMode ? (
        <input
          className="w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] rounded-lg px-3 py-2 text-sm text-slate-800 outline-none transition-all"
          value={editData[field] || ""}
          onChange={(e) =>
            setEditData({ ...editData, [field]: e.target.value })
          }
        />
      ) : (
        <div className="min-h-[36px] flex items-center">
          {isStatus ? (
            <StatusBadge value={value} />
          ) : (
            <span className="text-slate-800 text-sm font-medium">
              {value || <span className="text-slate-300">—</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 pt-20"
      // style={{ cursor: "none" }}
    >
      {/* ── SEARCH HEADER ── */}
      <div className="bg-white border-b-2 border-slate-300 py-12 relative overflow-hidden">
        {/* faint grid bg */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-300 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest text-red-600 mb-5">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-red-500 rounded-full"
              />
              DVLA VEHICLE LOOKUP
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1
              className="text-5xl font-black mb-2 text-slate-900"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Vehicle Enquiry
            </h1>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="text-slate-400 text-sm mb-8">
              Enter a UK registration number to retrieve DVLA records
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex gap-2 max-w-xl mx-auto">
              <motion.div
                className="flex-1 relative"
                animate={{
                  boxShadow: focused
                    ? "0 0 0 4px rgba(220,38,38,0.12)"
                    : "0 1px 2px rgba(0,0,0,0.04)",
                }}
                transition={{ duration: 0.25 }}
                style={{ borderRadius: 12 }}
              >
                <input
                  className="w-full bg-slate-100 border-2 border-slate-300 focus:border-red-500 focus:bg-white rounded-xl px-5 py-4 text-slate-900 text-lg font-mono uppercase outline-none transition-all placeholder-slate-300"
                  placeholder="e.g. YY59 UAD"
                  value={query}
                  onChange={(e) => setQuery(e.target.value.toUpperCase())}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                />
              </motion.div>
              <MagneticBtn
                onClick={doSearch}
                className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-xl font-bold transition-colors shadow-md shadow-red-200 border-2 border-red-700 flex items-center gap-2"
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
              </MagneticBtn>
            </div>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {/* ── LOADING ── */}
          {status === "searching" && (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-[3px] border-red-500 border-t-transparent rounded-full"
              />
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-slate-400 text-sm"
              >
                Querying DVLA records…
              </motion.p>
            </motion.div>
          )}

          {/* ── NOT FOUND ── */}
          {status === "notfound" && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-20 bg-white border-2 border-slate-300 rounded-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl mb-4"
              >
                🔍
              </motion.div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">
                No vehicle found
              </h3>
              <p className="text-slate-400 text-sm">
                No DVLA record matched that registration number.
              </p>
            </motion.div>
          )}

          {/* ── ERROR ── */}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-20 bg-white border-2 border-red-200 rounded-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-5xl mb-4"
              >
                ⚠️
              </motion.div>
              <h3 className="text-lg font-bold text-red-600 mb-1">
                Connection Error
              </h3>
              <p className="text-slate-400 text-sm">
                Could not reach the server. Make sure it's running on port 5050.
              </p>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {status === "found" && result && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Vehicle Header */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-slate-300 rounded-2xl p-6 mb-5 flex items-center justify-between shadow-md flex-wrap gap-4"
              >
                <div className="flex items-center gap-5">
                  {/* UK Plate Mockup */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      delay: 0.1,
                    }}
                    className="plate-shimmer relative bg-amber-400 border-2 border-amber-600 rounded-lg px-5 py-2.5 shadow-md overflow-hidden"
                  >
                    <div className="text-black font-black text-2xl tracking-widest font-mono leading-none relative z-10">
                      {result.regNo}
                    </div>
                  </motion.div>
                  <div>
                    <h2
                      className="text-2xl font-black text-slate-900"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      {result.make}
                    </h2>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">
                      {result.colour} · {result.yearOfManufacture}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setEditMode(!editMode)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all
                    ${
                      editMode
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                        : "bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-100 hover:border-red-300"
                    }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={editMode ? "save" : "edit"}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block"
                    >
                      {editMode ? "💾 Save Changes" : "✏️ Edit Record"}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {/* Compliance */}
                <motion.div
                  variants={staggerItem}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 12px 36px rgba(0,0,0,0.07)",
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-5 bg-red-500 rounded-full" />
                    <h3 className="text-slate-900 text-xs font-bold uppercase tracking-widest">
                      Compliance Status
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-5 divide-x-2 divide-slate-200">
                    <div className="space-y-5">
                      <Field
                        label="Tax Status"
                        value={result.taxStatus}
                        field="taxStatus"
                        isStatus
                      />
                      <Field
                        label="MOT Status"
                        value={result.motStatus}
                        field="motStatus"
                        isStatus
                      />
                    </div>
                    <div className="pl-5 space-y-5">
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
                    </div>
                  </div>
                </motion.div>

                {/* Technical */}
                <motion.div
                  variants={staggerItem}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 12px 36px rgba(0,0,0,0.07)",
                  }}
                  className="bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-5 bg-slate-400 rounded-full" />
                    <h3 className="text-slate-900 text-xs font-bold uppercase tracking-widest">
                      Technical Specs
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <Field
                      label="Fuel Type"
                      value={result.fuelType}
                      field="fuelType"
                    />
                    <Field
                      label="Engine CC"
                      value={result.engineCC}
                      field="engineCC"
                    />
                    <Field
                      label="Year"
                      value={result.yearOfManufacture}
                      field="yearOfManufacture"
                    />
                    <Field
                      label="Weight"
                      value={result.revenueWeight}
                      field="revenueWeight"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
