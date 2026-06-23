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
              ? "0 0 0 3px rgba(220,38,38,0.1)"
              : "0 0 0 0px rgba(220,38,38,0)",
        }}
        transition={{ duration: 0.2 }}
        style={{ borderRadius: 12 }}
      >
        <input
          type={type}
          placeholder={ph}
          onFocus={() => setFocusedField(fieldKey)}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder-slate-300"
        />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Header />
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative bg-white border-b-2 border-slate-300 pt-32 pb-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-300 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest text-red-600 mb-5"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
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
            className="text-6xl md:text-7xl font-black tracking-wide text-slate-900 mb-3"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            GET IN <span className="text-red-600">TOUCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="text-slate-500 text-lg"
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
                className="flex gap-4 bg-white border-2 border-slate-300 rounded-2xl p-5 hover:border-red-400 hover:shadow-lg hover:shadow-red-50 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 bg-red-50 border-2 border-red-300 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
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
            className="bg-white border-2 border-slate-300 rounded-2xl p-8 shadow-md transition-shadow"
          >
            <h2
              className="text-3xl font-black text-slate-900 mb-1"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
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
                            ? "0 0 0 3px rgba(220,38,38,0.1)"
                            : "0 0 0 0px rgba(220,38,38,0)",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ borderRadius: 12 }}
                    >
                      <textarea
                        placeholder="Tell us about your vehicle & service requirement..."
                        rows={5}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors resize-none placeholder-slate-300"
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 32px rgba(220,38,38,0.25)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-base transition-colors shadow-md shadow-red-100 mt-1 border-2 border-red-700 flex items-center justify-center gap-2"
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
                    className="text-red-600 font-semibold text-sm border-2 border-red-300 bg-red-50 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors"
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
          whileHover={{ borderColor: "#fca5a5" }}
          className="relative bg-white border-2 border-slate-300 rounded-2xl overflow-hidden h-64 flex items-center justify-center transition-colors"
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
              className="text-red-600 text-sm font-semibold hover:underline mt-1 block"
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-slate-300 bg-white py-10 text-center">
        <div
          className="text-slate-900 font-black text-2xl mb-1"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          AUTO<span className="text-red-600">FORGE</span> GARAGE
        </div>
        <p className="text-slate-400 text-xs">
          14-B Industrial Estate, Lucknow UP 226001 · +91 522 400 1234 · Mon–Sat
          8AM–7PM
        </p>
      </footer>
    </div>
  );
}
