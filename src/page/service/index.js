import React from "react";
import Header from "../../layout/header";
import { motion } from "framer-motion";

const services = [
  {
    title: "Routine Maintenance",
    desc: "Oil changes, filter replacements, tire rotation & full servicing",
    icon: "🔧",
    accent: "bg-red-50 border-red-100",
    iconBg: "bg-red-100",
  },
  {
    title: "Engine Repair",
    desc: "Complete engine rebuilds, diagnostics, and performance tuning",
    icon: "⚡",
    accent: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    title: "Brake System",
    desc: "Brake pads, discs, ABS repair & hydraulic system service",
    icon: "🛑",
    accent: "bg-slate-50 border-slate-100",
    iconBg: "bg-slate-100",
  },
  {
    title: "Suspension & Steering",
    desc: "Shock absorbers, struts, alignment & power steering repair",
    icon: "🚗",
    accent: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    title: "Electrical & AC",
    desc: "Battery, alternator, wiring & full air conditioning service",
    icon: "❄️",
    accent: "bg-sky-50 border-sky-100",
    iconBg: "bg-sky-100",
  },
  {
    title: "Diagnostics",
    desc: "Advanced computer diagnostics with OBD-II scanner",
    icon: "📡",
    accent: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
  },
];

export default function Service() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Header />
      </motion.nav>

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest text-red-600 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            WHAT WE OFFER
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-4"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            OUR <span className="text-red-600">SERVICES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            Professional automotive care with certified standards and honest pricing.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
              className="group bg-white border border-slate-200 hover:border-red-200 rounded-2xl p-8 cursor-pointer transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              <button className="mt-6 text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                Learn More <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left */}
            <div>
              <div className="text-red-600 text-xs font-semibold tracking-widest uppercase mb-3">Why Choose Us</div>
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-slate-600 text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
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
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-10 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-4 -left-2 text-9xl font-black text-red-100 select-none leading-none" style={{ fontFamily: "'Bebas Neue', cursive" }}>"</div>
              <p className="text-2xl leading-relaxed font-light text-slate-700 relative z-10 mt-4">
                From regular servicing to major repairs, AutoForge has been our trusted partner for over 8 years.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-xs font-bold text-red-600">RS</div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">Rahul Sharma</p>
                  <p className="text-slate-400 text-xs">Owner — BMW X5</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Ready to Book?
          </h2>
          <p className="text-slate-400 text-sm mb-8">Our team confirms within 2 hours. No waiting, no hassle.</p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(220,38,38,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl text-base transition-colors shadow-sm shadow-red-100"
          >
            📅 Book a Service
          </motion.button>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10 text-center">
        <div className="text-slate-900 font-black text-2xl mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
          AUTO<span className="text-red-600">FORGE</span> GARAGE
        </div>
        <p className="text-slate-400 text-xs">14-B Industrial Estate, Lucknow UP 226001 · +91 522 400 1234 · Mon–Sat 8AM–7PM</p>
      </footer>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </div>
  );
}
