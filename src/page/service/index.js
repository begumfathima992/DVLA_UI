import React from "react";
import Header from "../../layout/header";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

const services = [
  {
    title: "Routine Maintenance",
    desc: "Oil changes, filter replacements, tire rotation & full servicing",
    icon: "🔧",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Engine Repair",
    desc: "Complete engine rebuilds, diagnostics, and performance tuning",
    icon: "⚡",
    color: "from-red-600 to-rose-600",
  },
  {
    title: "Brake System",
    desc: "Brake pads, discs, ABS repair & hydraulic system service",
    icon: "🛑",
    color: "from-zinc-700 to-zinc-500",
  },
  {
    title: "Suspension & Steering",
    desc: "Shock absorbers, struts, alignment & power steering repair",
    icon: "🚗",
    color: "from-amber-500 to-red-500",
  },
  {
    title: "Electrical & AC",
    desc: "Battery, alternator, wiring & full air conditioning service",
    icon: "❄️",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Diagnostics",
    desc: "Advanced computer diagnostics with OBD-II scanner",
    icon: "📡",
    color: "from-purple-500 to-violet-600",
  },
];
export default function Service() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60"
      >
        <Header />
      </motion.nav>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
        <div className="relative max-w-7xl mx-auto text-center px-6 w-full">
          <div className="bg-black min-h-screen pt-20 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white mb-4">
                  OUR <span className="text-red-500">SERVICES</span>
                </h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                  Professional automotive care with German standards and Indian
                  reliability
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}
                    >
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {service.desc}
                    </p>

                    <button className="mt-8 text-red-500 hover:text-red-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More →
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us Section */}
              <div className="mt-24 bg-zinc-950 border border-zinc-800 rounded-3xl p-12 md:p-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-6">
                      Why Drivers Trust AutoForge
                    </h2>
                    <ul className="space-y-6 text-zinc-400">
                      {[
                        "Certified Master Technicians",
                        "Genuine Spare Parts Only",
                        "3 Months Warranty on All Services",
                        "Transparent Pricing - No Hidden Costs",
                        "Pickup & Drop Service Available",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black rounded-2xl p-8 border border-red-900/30">
                    <p className="text-3xl leading-tight font-light text-zinc-300">
                      "From regular servicing to major repairs, AutoForge has
                      been our trusted partner for over 8 years."
                    </p>
                    <p className="mt-6 text-red-400">
                      - Rahul Sharma, Owner - BMW X5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
