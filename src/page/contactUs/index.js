import React from "react";
import Header from "../../layout/header";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
export default function Contact() {
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
          <div className="bg-black min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
                {/* Left - Contact Info */}
                <div className="space-y-10">
                  <div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white mb-4">
                      GET IN <span className="text-red-500">TOUCH</span>
                    </h1>
                    <p className="text-zinc-400 text-xl">
                      We’re here to help keep your car in perfect condition.
                    </p>
                  </div>

                  <div className="space-y-8 text-start">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-2xl">
                        📍
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">
                          Workshop Address
                        </p>
                        <p className="text-zinc-400">
                          Near Gomti Nagar Metro Station,
                          <br />
                          Faizabad Road, Lucknow, Uttar Pradesh - 226028
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-2xl">
                        📞
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">
                          Call Us
                        </p>
                        <p className="text-zinc-400">
                          +91 9453 XXXXXX
                          <br />
                          +91 522 40XXXXX
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-2xl">
                        ✉️
                      </div>
                      <div>
                        <p className="font-semibold text-white text-lg">
                          Email
                        </p>
                        <p className="text-zinc-400">info@autoforge.in</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <p className="text-sm text-zinc-500">
                      Est. 2008 • Certified Workshop
                    </p>
                  </div>
                </div>

                {/* Right - Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Send us a Message
                  </h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:border-red-600 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:border-red-600 outline-none"
                      />
                    </div>

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:border-red-600 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:border-red-600 outline-none"
                    />

                    <textarea
                      placeholder="Tell us about your vehicle & service requirement..."
                      rows={5}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-6 py-4 focus:border-red-600 outline-none resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                    >
                      SEND MESSAGE
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
