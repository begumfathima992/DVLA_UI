import React, { useState, useRef, useEffect } from "react";
import Header from "../../layout/header";
import { motion, AnimatePresence } from "framer-motion";

/* ─── MAGNETIC BUTTON ──────────────────────────────────────────────────── */
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
      style={style}
      className={className}
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

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | done
  const [focusedField, setFocusedField] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setTimeout(() => setFormStatus("done"), 1700);
  };

  const infoItems = [
    {
      icon: "📍",
      label: "Workshop Address",
      lines: [
        "Near Gomti Nagar Metro Station,",
        "Faizabad Road, Lucknow, UP — 226028",
      ],
    },
    {
      icon: "📞",
      label: "Call Us",
      lines: ["+91 9453 XXXXXX", "+91 522 40XXXXX"],
    },
    {
      icon: "✉️",
      label: "Email",
      lines: ["info@autoforge.in"],
    },
    {
      icon: "🕐",
      label: "Working Hours",
      lines: ["Monday – Saturday: 8:00 AM – 7:00 PM", "Sunday: Closed"],
    },
  ];

  const InputField = ({ label, type = "text", ph, fieldKey }) => (
    <div>
      <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">
        {label}
      </label>
      <motion.div
        animate={{
          boxShadow:
            focusedField === fieldKey
              ? "0 0 0 3px rgba(244,63,94,0.13)"
              : "0 0 0 0px rgba(244,63,94,0)",
        }}
        transition={{ duration: 0.2 }}
        style={{ borderRadius: 12 }}
      >
        <input
          type={type}
          placeholder={ph}
          onFocus={() => setFocusedField(fieldKey)}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#e11d48] focus:bg-[#ffffff] focus:ring-4 focus:ring-[#e11d48]/10 rounded-xl px-4 py-3 text-sm text-[#1e293b] outline-none transition-all placeholder:text-[#94a3b8]"
        />
      </motion.div>
    </div>
  );

  return (
    <div className="public-page contact-page min-h-screen overflow-x-hidden">
      <style>{`
        

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="public-inner-hero relative border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.05) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-[#e11d48]/15 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#e11d48]/30 bg-[#e11d48]/10 px-5 py-2 text-[10px] font-extrabold tracking-[0.2em] text-[#fb7185] mb-5"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#fb7185] rounded-full shadow-[0_0_0_5px_rgba(244,63,94,.12)]"
            />
            WE'D LOVE TO HEAR FROM YOU
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-[Sora] text-5xl md:text-7xl font-extrabold tracking-[-0.055em] text-slate-950 mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            GET IN <span className="gold-text">TOUCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="text-slate-500 text-base md:text-lg"
          >
            We're here to help keep your car in perfect condition.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{
                  y: -3,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                data-hover
                className="premium-card flex gap-4 rounded-2xl border border-[#e2e8f0] bg-[#ffffff] p-5 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 bg-[#fff1f2] border border-[#fb7185] rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="font-bold text-slate-800 text-sm mb-1">
                    {item.label}
                  </p>
                  {item.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-slate-500 text-sm leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Trust badge */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-3 pt-2"
            >
              <div className="h-[2px] flex-1 bg-slate-300" />
              <span className="text-slate-400 text-xs tracking-widest font-medium uppercase">
                Est. 2008 · Certified Workshop
              </span>
              <div className="h-[2px] flex-1 bg-slate-300" />
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ boxShadow: "0 18px 48px rgba(0,0,0,0.07)" }}
            className="premium-card rounded-[26px] border border-[#e2e8f0] bg-[#ffffff] p-8 transition-shadow"
          >
            <h2
              className="font-[Sora] text-3xl font-extrabold tracking-[-0.04em] text-[#0f172a] mb-1"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Send Us a Message
            </h2>
            <p className="text-slate-400 text-sm mb-7">
              We typically reply within 2 business hours.
            </p>

            <AnimatePresence mode="wait">
              {formStatus !== "done" ? (
                <motion.form
                  key="form"
                  onSubmit={handleSend}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      ph="First Name"
                      fieldKey="fname"
                    />
                    <InputField
                      label="Last Name"
                      ph="Last Name"
                      fieldKey="lname"
                    />
                  </div>

                  <InputField
                    label="Phone Number"
                    type="tel"
                    ph="+91 98765 43210"
                    fieldKey="phone"
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    ph="you@example.com"
                    fieldKey="email"
                  />

                  <div>
                    <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">
                      Message
                    </label>
                    <motion.div
                      animate={{
                        boxShadow:
                          focusedField === "message"
                            ? "0 0 0 3px rgba(244,63,94,0.13)"
                            : "0 0 0 0px rgba(244,63,94,0)",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ borderRadius: 12 }}
                    >
                      <textarea
                        placeholder="Tell us about your vehicle & service requirement..."
                        rows={5}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full resize-none rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1e293b] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#e11d48] focus:bg-[#ffffff] focus:ring-4 focus:ring-[#e11d48]/10"
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 12px 34px rgba(244,63,94,0.28)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="gold-button w-full py-4 rounded-xl text-base font-extrabold transition-all mt-1 flex items-center justify-center gap-2"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {formStatus === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Send Message →
                        </motion.span>
                      )}
                      {formStatus === "loading" && (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p className="text-slate-400 text-xs text-center pt-1">
                    By sending, you agree to be contacted by our team.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center text-3xl mb-4"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 text-sm mb-5">
                    Our team will get back to you within 2 business hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setFormStatus("idle")}
                    className="text-[#be123c] font-extrabold text-sm border border-[#e2c37a] bg-[#fff1f2] hover:bg-[#fecdd3] px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ borderColor: "#e11d48" }}
          className="premium-card relative bg-[#ffffff] border border-[#e2e8f0] rounded-[26px] overflow-hidden h-64 flex items-center justify-center transition-colors"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative text-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-4xl mb-2"
            >
              📍
            </motion.div>
            <p className="text-slate-400 text-sm font-medium">
              Near Gomti Nagar Metro, Lucknow
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="text-[#be123c] text-sm font-extrabold hover:underline mt-1 block"
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center">
        <div
          className="font-[Sora] text-slate-950 font-extrabold text-2xl mb-1 tracking-[-0.04em]"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          AUTO<span className="gold-text">FORGE</span> GARAGE
        </div>
        <p className="text-slate-400 text-xs">
          14-B Industrial Estate, Lucknow UP 226001 · +91 522 400 1234 · Mon–Sat
          8AM–7PM
        </p>
      </footer>
    </div>
  );
}
