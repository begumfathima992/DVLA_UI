import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Header from "../../layout/header";
import "./homeStyle.css";

/* ─── ANIMATED COUNTER ─────────────────────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── FADE UP ──────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── STAGGER CHILDREN ─────────────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── WORD REVEAL ──────────────────────────────────────────────────────── */
function WordReveal({ text, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.22em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── MAGNETIC BUTTON ──────────────────────────────────────────────────── */
function MagneticBtn({ children, className = "", onClick, style }) {
  const ref = useRef(null);
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setXY({
      x: (e.clientX - r.left - r.width / 2) * 0.22,
      y: (e.clientY - r.top - r.height / 2) * 0.22,
    });
  };
  return (
    <motion.button
      ref={ref}
      className={className}
      style={style}
      animate={{ x: xy.x, y: xy.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      onMouseMove={onMove}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

/* ─── SERVICE CARD ─────────────────────────────────────────────────────── */
function ServiceCard({ icon, title, desc, price, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -7,
        transition: { type: "spring", stiffness: 280, damping: 18 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-hover
      className="group relative bg-white border-2 border-slate-300 hover:border-red-500 rounded-2xl p-6 cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-red-100"
    >
      {/* shimmer bg */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="text-4xl mb-4 inline-block relative z-10"
      >
        {icon}
      </motion.div>

      <h3 className="relative z-10 font-bold text-slate-900 mb-2 text-base">
        {title}
      </h3>
      <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-5">
        {desc}
      </p>

      <div className="relative z-10 flex items-center justify-between mt-auto">
        <span className="text-red-600 text-sm font-semibold">From {price}</span>
        <motion.span
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="text-slate-400 group-hover:text-red-500 text-lg transition-colors"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ─── TESTI CARD ───────────────────────────────────────────────────────── */
function TestiCard({ stars, text, name, initials, car, delay }) {
  return (
    <FadeUp delay={delay}>
      <motion.div
        whileHover={{
          y: -5,
          transition: { type: "spring", stiffness: 260, damping: 18 },
        }}
        className="bg-white border-2 border-slate-300 hover:border-slate-400 hover:shadow-lg rounded-2xl p-6 h-full transition-all"
        data-hover
      >
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: delay + i * 0.06,
                type: "spring",
                stiffness: 360,
              }}
              className={`text-sm ${i < stars ? "text-amber-400" : "text-slate-200"}`}
            >
              ★
            </motion.span>
          ))}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 italic">
          "{text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center text-xs font-bold text-red-600 flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-slate-800 text-sm font-semibold">{name}</div>
            <div className="text-slate-400 text-xs">{car}</div>
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function HomePage({ setPage }) {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const [formStatus, setFormStatus] = useState("idle");

  const handleBook = (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setTimeout(() => setFormStatus("done"), 1800);
  };

  const services = [
    {
      icon: "⚙️",
      title: "Engine Diagnostics",
      desc: "Full OBD scan & fault code analysis with detailed report.",
      price: "₹799",
    },
    {
      icon: "🛢️",
      title: "Oil & Filter Change",
      desc: "Synthetic & mineral grade oils for all vehicle types.",
      price: "₹499",
    },
    {
      icon: "🔧",
      title: "Brake Service",
      desc: "Pads, discs & fluid flush with road-safety guarantee.",
      price: "₹1,299",
    },
    {
      icon: "🔄",
      title: "Tyre & Alignment",
      desc: "Balancing, rotation & computerised wheel alignment.",
      price: "₹399",
    },
    {
      icon: "❄️",
      title: "AC & Electrical",
      desc: "HVAC, wiring, battery diagnostics & repairs.",
      price: "₹899",
    },
    {
      icon: "🎨",
      title: "Body & Paint",
      desc: "Dent removal, scratch repair & full panel repainting.",
      price: "₹1,999",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Header />
      </motion.nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16"
      >
        {/* Grid bg */}
        <div className="absolute inset-0 hero-grid opacity-100" />
        {/* Red blob */}
        <div className="absolute top-16 right-0 w-[620px] h-[620px] bg-red-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
            {/* Left */}
            <div className="space-y-8">
              {/* Eyebrow pill */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-200 rounded-full px-6 py-2 text-sm font-semibold tracking-widest text-red-600"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
                EST. 2026 · CERTIFIED WORKSHOP · UK
              </motion.div>

              {/* H1 — word by word */}
              <h1
                className="font-black leading-[0.97] text-7xl lg:text-[5.8rem] text-slate-900"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <WordReveal
                  text="YOUR CAR."
                  delay={0.15}
                  className="text-slate-900 block"
                />
                <WordReveal
                  text="OUR CRAFT."
                  delay={0.25}
                  className="text-red-600 block"
                />
                <WordReveal
                  text="ZERO LIMITS."
                  delay={0.38}
                  className="text-slate-300 block"
                />
              </h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-slate-500 text-lg max-w-lg leading-relaxed"
              >
                Full-service vehicle maintenance & repair. From routine oil
                changes to complete engine rebuilds — every machine runs at peak
                performance.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.72,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <MagneticBtn
                  onClick={() => setPage && setPage("search")}
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-red-200 border-2 border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                  Search Vehicle
                </MagneticBtn>

                <MagneticBtn className="flex items-center gap-3 border-2 border-slate-400 hover:border-red-400 bg-white px-8 py-4 rounded-2xl font-bold text-lg text-slate-700 hover:text-red-600 transition-all shadow-sm">
                  📅 Book Service
                </MagneticBtn>
              </motion.div>
            </div>

            {/* Right — image */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300 border-2 border-slate-300">
                <img
                  src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=85"
                  alt="Premium Car Workshop"
                  className="w-full h-[620px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-slate-900/20" />
                <motion.div
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-5 right-5 bg-white/92 backdrop-blur-md px-5 py-2.5 rounded-2xl text-sm font-bold border-2 border-slate-300 text-slate-300 shadow-md flex items-center gap-2"
                >
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full inline-block"
                  />
                  Professional Service
                </motion.div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-red-100 border-2 border-red-200 -z-10" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-slate-400 text-xs tracking-[3px] uppercase">
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y-2 border-slate-300 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {[
            { num: 12000, suffix: "+", label: "Vehicles Serviced" },
            { num: 98, suffix: "%", label: "Satisfaction Rate" },
            { num: 16, suffix: "+", label: "Years Active" },
            { num: 24, suffix: " hrs", label: "Avg Turnaround" },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div className="stat-cell py-10 px-6 text-center border-r-2 border-slate-200 last:border-r-0">
                <div
                  className="text-4xl font-black text-red-600 mb-1"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div className="text-slate-400 text-xs tracking-widest uppercase">
                  {s.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-14">
            <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">
              What We Do
            </div>
            <h2
              className="text-6xl font-black text-slate-900"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Workshop Services
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="h-[3px] bg-red-600 mt-3 rounded"
            />
          </div>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section className="py-20 bg-white border-y-2 border-slate-300">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="mb-10">
              <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">
                Quick Booking
              </div>
              <h2
                className="text-5xl font-black text-slate-900"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                Schedule a Service
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 56 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="h-[3px] bg-red-600 mt-3 rounded"
              />
              <p className="text-slate-400 text-sm mt-3">
                Reserve your bay — our team confirms within 2 hours.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form className="space-y-4" onSubmit={handleBook}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Your Name", "Rajiv Sharma", "text"],
                  ["Phone", "+91 98765 43210", "tel"],
                ].map(([label, ph, type]) => (
                  <div key={label}>
                    <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={ph}
                      className="af-input w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">
                    Vehicle Type
                  </label>
                  <select className="af-select w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-slate-700 transition-all appearance-none">
                    {[
                      "Sedan",
                      "SUV / MUV",
                      "Hatchback",
                      "Two-Wheeler",
                      "Commercial",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">
                    Service Required
                  </label>
                  <select className="af-select w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-slate-700 transition-all appearance-none">
                    {[
                      "Engine Diagnostics",
                      "Oil Change",
                      "Brake Service",
                      "Tyre Alignment",
                      "AC Repair",
                      "Body Work",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="af-input w-full bg-slate-50 border-2 border-slate-300 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-slate-700 transition-all"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.015,
                  boxShadow: "0 10px 36px rgba(220,38,38,0.22)",
                }}
                whileTap={{ scale: 0.97 }}
                className={`w-full font-bold py-4 rounded-xl text-base mt-2 border-2 transition-all
                  ${
                    formStatus === "done"
                      ? "bg-green-600 border-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 border-red-700 text-white shadow-md shadow-red-100"
                  }`}
                data-hover
              >
                <AnimatePresence mode="wait">
                  {formStatus === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Confirm Booking →
                    </motion.span>
                  )}
                  {formStatus === "loading" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
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
                      Booking...
                    </motion.span>
                  )}
                  {formStatus === "done" && (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ✓ Booking Confirmed!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-14">
            <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">
              Why Choose Us
            </div>
            <h2
              className="text-6xl font-black text-slate-900"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              The AutoForge Advantage
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="h-[3px] bg-red-600 mt-3 rounded"
            />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              n: "01",
              title: "Certified Technicians",
              desc: "National automotive certifications with 5+ years field experience.",
            },
            {
              n: "02",
              title: "Transparent Pricing",
              desc: "Detailed cost estimate before any work begins — zero surprises.",
            },
            {
              n: "03",
              title: "OEM-Grade Parts",
              desc: "Only genuine or OEM-equivalent parts with full manufacturer warranty.",
            },
            {
              n: "04",
              title: "Live Job Tracking",
              desc: "Real-time SMS updates as your vehicle moves through the service bay.",
            },
          ].map((w, i) => (
            <FadeUp key={w.n} delay={i * 0.1}>
              <motion.div
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 280 },
                }}
                className="why-card bg-white border-2 border-slate-300 rounded-2xl p-6 transition-all"
                data-hover
              >
                <div
                  className="text-5xl font-black text-red-100 mb-4"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {w.n}
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">
                  {w.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {w.desc}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-slate-50 border-y-2 border-slate-300">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14">
              <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">
                Customer Reviews
              </div>
              <h2
                className="text-6xl font-black text-slate-900"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                What Our Customers Say
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 56 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="h-[3px] bg-red-600 mt-3 rounded"
              />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <TestiCard
              stars={5}
              text="Brought my Swift in for engine noise. They diagnosed and fixed it the same day. Fair price, honest team."
              name="Amit Kumar"
              initials="AK"
              car="Maruti Swift 2021"
              delay={0}
            />
            <TestiCard
              stars={5}
              text="Best garage in the city. The SMS tracking feature is brilliant — I knew exactly when my car was ready."
              name="Priya Singh"
              initials="PS"
              car="Hyundai Creta 2022"
              delay={0.1}
            />
            <TestiCard
              stars={4}
              text="Very professional staff. My Fortuner's AC was fixed in under 3 hours. Will definitely return."
              name="Rohit Verma"
              initials="RV"
              car="Toyota Fortuner 2020"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2
            className="text-6xl font-black mb-4 text-slate-900"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Ready to Service Your Vehicle?
          </h2>
          <p className="text-slate-500 mb-10 max-w-md mx-auto text-base leading-relaxed">
            Search by registration number to instantly pull up vehicle records
            and book a service slot.
          </p>

          <MagneticBtn
            onClick={() => setPage && setPage("search")}
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-12 py-5 rounded-2xl text-xl transition-colors shadow-xl shadow-red-200 border-2 border-red-700"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              letterSpacing: "0.5px",
            }}
          >
            Search Vehicle Now
            <svg
              className="w-6 h-6"
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
          </MagneticBtn>

          <p className="text-slate-400 text-xs mt-5 font-mono">
            Try:{" "}
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              YY59UAD
            </span>
            {" · "}
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              MH12AB1234
            </span>
            {" · "}
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              UP32CD5678
            </span>
          </p>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-slate-300 bg-white py-10 text-center">
        <div
          className="text-slate-900 font-black text-2xl mb-2"
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
