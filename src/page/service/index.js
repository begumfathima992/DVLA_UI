import React, { useState, useRef, useEffect } from "react";
import Header from "../../layout/header";
import { motion, useInView } from "framer-motion";

/* ─── MAGNETIC BUTTON ──────────────────────────────────────────────────── */
function MagneticBtn({ children, className = "", onClick, style }) {
  const ref = useRef(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setXY({
      x: (e.clientX - r.left - r.width / 2) * 0.2,
      y: (e.clientY - r.top - r.height / 2) * 0.2,
    });
  };
  return (
    <motion.button
      ref={ref}
      style={style}
      className={className}
      animate={{ x: xy.x, y: xy.y }}
      transition={{ type: "spring", stiffness: 190, damping: 15 }}
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
  show: { transition: { staggerChildren: 0.07 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const services = [
  {
    title: "Routine Maintenance",
    desc: "Oil changes, filter replacements, tire rotation & full servicing",
    icon: "🔧",
    accent: "bg-red-50 border-red-200",
    iconBg: "bg-red-100 border-red-300",
  },
  {
    title: "Engine Repair",
    desc: "Complete engine rebuilds, diagnostics, and performance tuning",
    icon: "⚡",
    accent: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100 border-orange-300",
  },
  {
    title: "Brake System",
    desc: "Brake pads, discs, ABS repair & hydraulic system service",
    icon: "🛑",
    accent: "bg-slate-50 border-slate-300",
    iconBg: "bg-slate-100 border-slate-300",
  },
  {
    title: "Suspension & Steering",
    desc: "Shock absorbers, struts, alignment & power steering repair",
    icon: "🚗",
    accent: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100 border-amber-300",
  },
  {
    title: "Electrical & AC",
    desc: "Battery, alternator, wiring & full air conditioning service",
    icon: "❄️",
    accent: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100 border-sky-300",
  },
  {
    title: "Diagnostics",
    desc: "Advanced computer diagnostics with OBD-II scanner",
    icon: "📡",
    accent: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100 border-violet-300",
  },
];

/* ─── SERVICE CARD ─────────────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={staggerItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -7,
        transition: { type: "spring", stiffness: 280, damping: 18 },
      }}
      data-hover
      className="group relative bg-white border-2 border-slate-300 hover:border-red-400 rounded-2xl p-8 cursor-pointer overflow-hidden transition-colors duration-300 hover:shadow-xl hover:shadow-red-100"
    >
      {/* top accent line sweep */}
      {/* <motion.div
        className="absolute top-0 left-0 h-[3px] bg-red-600 rounded-t-2xl"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      /> */}
      {/* subtle bg wash */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-transparent pointer-events-none rounded-2xl"
        animate={{
          opacity: hovered ? 1 : 0,
          background: hovered
            ? "linear-gradient(135deg, rgba(220,38,38,0.04), transparent 70%)"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`relative z-10 w-14 h-14 rounded-2xl border-2 ${service.iconBg} flex items-center justify-center text-3xl mb-6`}
      >
        {service.icon}
      </motion.div>
      <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-2">
        {service.title}
      </h3>
      <p className="relative z-10 text-slate-500 text-sm leading-relaxed">
        {service.desc}
      </p>
      <motion.button
        className="relative z-10 mt-6 text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1.5"
        animate={{ gap: hovered ? 12 : 6 }}
        transition={{ duration: 0.25 }}
      >
        Learn More{" "}
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

export default function Service() {
  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden"
      // style={{ cursor: "none" }}
    >
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
      <section className="relative bg-white border-b-2 border-slate-300 pt-32 pb-16 overflow-hidden">
        {/* grid bg */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-300 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest text-red-600 mb-6"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-red-500 rounded-full"
            />
            WHAT WE OFFER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-6xl md:text-7xl font-black tracking- text-slate-900 mb-4"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            OUR <span className="text-red-600">SERVICES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.16,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            Professional automotive care with certified standards and honest
            pricing.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white border-y-2 border-slate-300 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left */}
            <div>
              <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">
                Why Choose Us
              </div>
              <h2
                className="text-5xl font-black text-slate-900 mb-8 leading-tight"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                Why Drivers Trust AutoForge
              </h2>
              <ul className="space-y-4">
                {[
                  "Certified Master Technicians",
                  "Genuine Spare Parts Only",
                  "3 Months Warranty on All Services",
                  "Transparent Pricing — No Hidden Costs",
                  "Pickup & Drop Service Available",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3 text-slate-600 text-sm"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08 + 0.1,
                        type: "spring",
                        stiffness: 380,
                        damping: 18,
                      }}
                      className="w-5 h-5 rounded-full bg-red-100 border-2 border-red-300 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0"
                    >
                      ✓
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right - Quote card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, boxShadow: "0 18px 48px rgba(0,0,0,0.08)" }}
              className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-10 relative overflow-hidden transition-shadow"
            >
              <div
                className="absolute -top-4 -left-2 text-9xl font-black text-red-100 select-none leading-none"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                "
              </div>
              <p className="text-2xl leading-relaxed font-light text-slate-700 relative z-10 mt-4">
                From regular servicing to major repairs, AutoForge has been our
                trusted partner for over 8 years.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center text-xs font-bold text-red-600">
                  RS
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">
                    Rahul Sharma
                  </p>
                  <p className="text-slate-400 text-xs">Owner — BMW X5</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-black text-slate-900 mb-4"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Ready to Book?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-slate-400 text-sm mb-8"
          >
            Our team confirms within 2 hours. No waiting, no hassle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.16,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MagneticBtn className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl text-base transition-colors shadow-lg shadow-red-200 border-2 border-red-700">
              📅 Book a Service
            </MagneticBtn>
          </motion.div>
        </div>
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
