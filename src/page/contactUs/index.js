import React from "react";
import Header from "../../layout/header";
import { motion } from "framer-motion";

export default function Contact() {
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
      <section className="bg-white border-b border-slate-200 pt-32 pb-14">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest text-red-600 mb-5"
          >
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            WE'D LOVE TO HEAR FROM YOU
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-3"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            GET IN <span className="text-red-600">TOUCH</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-500 text-lg"
          >
            We're here to help keep your car in perfect condition.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              {
                icon: "📍",
                label: "Workshop Address",
                lines: ["Near Gomti Nagar Metro Station,", "Faizabad Road, Lucknow, UP — 226028"],
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
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-200 hover:shadow-sm transition-all"
              >
                <div className="w-11 h-11 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm mb-1">{item.label}</p>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-slate-500 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Trust badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-slate-400 text-xs tracking-widest font-medium uppercase">Est. 2008 · Certified Workshop</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Send Us a Message
            </h2>
            <p className="text-slate-400 text-sm mb-7">We typically reply within 2 business hours.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {["First Name", "Last Name"].map((ph) => (
                  <div key={ph}>
                    <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">{ph}</label>
                    <input
                      type="text"
                      placeholder={ph}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder-slate-300"
                    />
                  </div>
                ))}
              </div>

              {[
                { label: "Phone Number", type: "tel", ph: "+91 98765 43210" },
                { label: "Email Address", type: "email", ph: "you@example.com" },
              ].map(({ label, type, ph }) => (
                <div key={label}>
                  <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">{label}</label>
                  <input
                    type={type}
                    placeholder={ph}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder-slate-300"
                  />
                </div>
              ))}

              <div>
                <label className="text-slate-500 text-xs uppercase tracking-widest block mb-1.5">Message</label>
                <textarea
                  placeholder="Tell us about your vehicle & service requirement..."
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors resize-none placeholder-slate-300"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(220,38,38,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-base transition-colors shadow-sm shadow-red-100 mt-1"
              >
                Send Message →
              </motion.button>

              <p className="text-slate-300 text-xs text-center pt-1">
                By sending, you agree to be contacted by our team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📍</div>
            <p className="text-slate-400 text-sm font-medium">Near Gomti Nagar Metro, Lucknow</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 text-sm font-semibold hover:underline mt-1 block"
            >
              Open in Google Maps →
            </a>
          </div>
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
