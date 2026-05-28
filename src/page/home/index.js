import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "../../layout/header";

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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ServiceCard({ icon, title, desc, price, index }) {
  return (
    <FadeUp delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -5, borderColor: "rgba(220,38,38,0.4)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group bg-white border border-slate-200 hover:shadow-lg hover:shadow-red-50 rounded-2xl p-6 cursor-pointer relative overflow-hidden h-full transition-shadow duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-50/0 group-hover:from-red-50 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-bold text-slate-900 mb-2 text-base">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-red-600 text-sm font-semibold">From {price}</span>
          <span className="text-slate-300 group-hover:text-red-500 text-lg transition-colors">→</span>
        </div>
      </motion.div>
    </FadeUp>
  );
}

function TestiCard({ stars, text, name, initials, car, delay }) {
  return (
    <FadeUp delay={delay}>
      <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all rounded-2xl p-6 h-full">
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < stars ? "text-amber-400" : "text-slate-200"}`}>★</span>
          ))}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 italic">"{text}"</p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-xs font-bold text-red-600 flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-slate-800 text-sm font-semibold">{name}</div>
            <div className="text-slate-400 text-xs">{car}</div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

export default function HomePage({ setPage }) {
  const services = [
    { icon: "⚙️", title: "Engine Diagnostics", desc: "Full OBD scan & fault code analysis with detailed report.", price: "₹799" },
    { icon: "🛢️", title: "Oil & Filter Change", desc: "Synthetic & mineral grade oils for all vehicle types.", price: "₹499" },
    { icon: "🔧", title: "Brake Service", desc: "Pads, discs & fluid flush with road-safety guarantee.", price: "₹1,299" },
    { icon: "🔄", title: "Tyre & Alignment", desc: "Balancing, rotation & computerised wheel alignment.", price: "₹399" },
    { icon: "❄️", title: "AC & Electrical", desc: "HVAC, wiring, battery diagnostics & repairs.", price: "₹899" },
    { icon: "🎨", title: "Body & Paint", desc: "Dent removal, scratch repair & full panel repainting.", price: "₹1,999" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Header />
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Red accent blob */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
            {/* Left */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-6 py-2 text-sm font-semibold tracking-widest text-red-600"
              >
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                EST. 2026 · CERTIFIED WORKSHOP · UK
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-black leading-[0.97] text-7xl lg:text-[5.8rem] text-slate-900"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                YOUR CAR.
                <br />
                <span className="text-red-600">OUR CRAFT.</span>
                <br />
                <span className="text-slate-300">ZERO LIMITS.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg max-w-lg leading-relaxed"
              >
                Full-service vehicle maintenance & repair. From routine oil changes to complete engine rebuilds — every machine runs at peak performance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(220,38,38,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPage && setPage("search")}
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md shadow-red-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  Search Vehicle
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 border-2 border-slate-200 hover:border-slate-300 bg-white px-8 py-4 rounded-2xl font-bold text-lg text-slate-700 hover:text-slate-900 transition-all shadow-sm"
                >
                  📅 Book Service
                </motion.button>
              </motion.div>
            </div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=85"
                  alt="Premium Car Workshop"
                  className="w-full h-[620px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-slate-900/20" />
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl text-sm font-bold border border-slate-200 text-slate-800 shadow-sm">
                  ✓ Professional Service
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-red-100 -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-slate-400 text-xs tracking-[3px] uppercase">Scroll to explore</span>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {[
            { num: 12000, suffix: "+", label: "Vehicles Serviced" },
            { num: 98, suffix: "%", label: "Satisfaction Rate" },
            { num: 16, suffix: "+", label: "Years Active" },
            { num: 24, suffix: " hrs", label: "Avg Turnaround" },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div className="py-10 px-6 text-center border-r border-slate-100 last:border-r-0">
                <div className="text-4xl font-black text-red-600 mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div className="text-slate-400 text-xs tracking-widest uppercase">{s.label}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-14">
            <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">What We Do</div>
            <h2 className="text-6xl font-black text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>Workshop Services</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-red-600 mt-3 rounded"
            />
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="mb-10">
              <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">Quick Booking</div>
              <h2 className="text-5xl font-black text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>Schedule a Service</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 bg-red-600 mt-3 rounded"
              />
              <p className="text-slate-400 text-sm mt-3">Reserve your bay — our team confirms within 2 hours.</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["Your Name", "Rajiv Sharma"], ["Phone", "+91 98765 43210"]].map(([label, ph]) => (
                  <div key={label}>
                    <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">{label}</label>
                    <input
                      placeholder={ph}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder-slate-300"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  ["Vehicle Type", ["Sedan", "SUV / MUV", "Hatchback", "Two-Wheeler", "Commercial"]],
                  ["Service Required", ["Engine Diagnostics", "Oil Change", "Brake Service", "Tyre Alignment", "AC Repair", "Body Work"]],
                ].map(([label, opts]) => (
                  <div key={label}>
                    <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">{label}</label>
                    <select className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-colors appearance-none">
                      {opts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none transition-colors"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(220,38,38,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-base transition-colors mt-2 shadow-sm shadow-red-100"
              >
                Confirm Booking →
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-14">
            <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">Why Choose Us</div>
            <h2 className="text-6xl font-black text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>The AutoForge Advantage</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-red-600 mt-3 rounded"
            />
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: "01", title: "Certified Technicians", desc: "National automotive certifications with 5+ years field experience." },
            { n: "02", title: "Transparent Pricing", desc: "Detailed cost estimate before any work begins — zero surprises." },
            { n: "03", title: "OEM-Grade Parts", desc: "Only genuine or OEM-equivalent parts with full manufacturer warranty." },
            { n: "04", title: "Live Job Tracking", desc: "Real-time SMS updates as your vehicle moves through the service bay." },
          ].map((w, i) => (
            <FadeUp key={w.n} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white border border-slate-200 hover:border-red-100 rounded-2xl p-6 transition-shadow"
              >
                <div className="text-5xl font-black text-red-100 mb-4" style={{ fontFamily: "'Bebas Neue', cursive" }}>{w.n}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{w.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="mb-14">
              <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-2">Customer Reviews</div>
              <h2 className="text-6xl font-black text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>What Our Customers Say</h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 bg-red-600 mt-3 rounded"
              />
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <TestiCard stars={5} text="Brought my Swift in for engine noise. They diagnosed and fixed it the same day. Fair price, honest team." name="Amit Kumar" initials="AK" car="Maruti Swift 2021" delay={0} />
            <TestiCard stars={5} text="Best garage in the city. The SMS tracking feature is brilliant — I knew exactly when my car was ready." name="Priya Singh" initials="PS" car="Hyundai Creta 2022" delay={0.1} />
            <TestiCard stars={4} text="Very professional staff. My Fortuner's AC was fixed in under 3 hours. Will definitely return." name="Rohit Verma" initials="RV" car="Toyota Fortuner 2020" delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-6xl font-black mb-4 text-slate-900" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Ready to Service Your Vehicle?
          </h2>
          <p className="text-slate-500 mb-10 max-w-md mx-auto text-base leading-relaxed">
            Search by registration number to instantly pull up vehicle records and book a service slot.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(220,38,38,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage && setPage("search")}
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-12 py-5 rounded-2xl text-xl transition-colors shadow-md shadow-red-100"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.5px" }}
          >
            Search Vehicle Now
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </motion.button>
          <p className="text-slate-300 text-xs mt-5 font-mono">Try: YY59UAD · MH12AB1234 · UP32CD5678</p>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 bg-white py-10 text-center">
        <div className="text-slate-900 font-black text-2xl mb-2" style={{ fontFamily: "'Bebas Neue', cursive" }}>
          AUTO<span className="text-red-600">FORGE</span> GARAGE
        </div>
        <p className="text-slate-400 text-xs">14-B Industrial Estate, Lucknow UP 226001 · +91 522 400 1234 · Mon–Sat 8AM–7PM</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
