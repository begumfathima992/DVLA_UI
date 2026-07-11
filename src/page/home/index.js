import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gauge,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import Header from "../../layout/header";
import "./homeStyle.css";

const easing = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;

    let frame;
    const startedAt = performance.now();
    const duration = 1450;

    const update = (time) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value, visible]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const services = [
  {
    icon: Gauge,
    title: "Engine Diagnostics",
    description: "Advanced fault scanning, health checks and a clear repair report.",
    price: "₹799",
    tag: "Most booked",
  },
  {
    icon: Zap,
    title: "Electrical & Battery",
    description: "Battery, wiring, alternator and complete electrical inspection.",
    price: "₹899",
    tag: "Quick service",
  },
  {
    icon: Wrench,
    title: "Brake & Mechanical",
    description: "Brake pads, suspension, steering and safety-focused repairs.",
    price: "₹1,299",
    tag: "Safety first",
  },
  {
    icon: CarFront,
    title: "Body & Detailing",
    description: "Dent repair, paint correction and premium exterior detailing.",
    price: "₹1,999",
    tag: "Premium care",
  },
];

const steps = [
  {
    number: "01",
    title: "Search your vehicle",
    description: "Enter the registration number and fetch the vehicle profile.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose a service",
    description: "Select the required work, preferred date and service time.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Track every update",
    description: "Receive clear progress updates from inspection to delivery.",
    icon: CheckCircle2,
  },
];

const reviews = [
  {
    text: "The booking experience was extremely simple and the team explained every repair before starting the work.",
    name: "Amit Kumar",
    car: "Maruti Swift · 2021",
    initials: "AK",
  },
  {
    text: "The live updates made the entire service transparent. The car was delivered exactly at the promised time.",
    name: "Priya Singh",
    car: "Hyundai Creta · 2022",
    initials: "PS",
  },
  {
    text: "Premium service without confusing pricing. The dashboard and job updates are genuinely useful.",
    name: "Rohit Verma",
    car: "Toyota Fortuner · 2020",
    initials: "RV",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [bookingStatus, setBookingStatus] = useState("idle");
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.45]);

  const submitBooking = (event) => {
    event.preventDefault();
    setBookingStatus("loading");
    window.setTimeout(() => setBookingStatus("done"), 1300);
  };

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="public-page home-page min-h-screen bg-white text-slate-950">
      <Header />

      <section ref={heroRef} className="light-hero relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:min-h-screen lg:pb-20">
        <div className="hero-mesh absolute inset-0" />
        <div className="hero-red-orb absolute -right-36 top-4 h-[440px] w-[440px] rounded-full" />
        <div className="hero-blue-orb absolute -left-44 bottom-[-120px] h-[420px] w-[420px] rounded-full" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-6 lg:min-h-[calc(100vh-120px)] lg:grid-cols-[1.02fr_.98fr] lg:px-8">
          <motion.div style={{ y: contentY, opacity: heroOpacity }} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easing }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/85 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-rose-600 shadow-sm backdrop-blur-xl"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50">
                <Sparkles size={13} />
              </span>
              Modern garage care, made simple
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78, delay: 0.08, ease: easing }}
              className="max-w-3xl font-[Sora] text-[3.45rem] font-extrabold leading-[0.98] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-[5.35rem]"
            >
              Premium care for
              <span className="relative block text-rose-600">
                every journey.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.72, duration: 0.7, ease: easing }}
                  className="absolute -bottom-1 left-1 h-2 w-[78%] origin-left rounded-full bg-rose-100"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easing }}
              className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              Search your vehicle, book trusted services and follow every job update from one beautifully simple experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: easing }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/find-vehicle")}
                className="primary-action group inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-extrabold text-white"
              >
                <Search size={18} />
                Search vehicle
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToBooking}
                className="secondary-action inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-extrabold text-slate-800"
              >
                <CalendarDays size={18} className="text-rose-600" />
                Book a service
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.58, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-slate-500"
            >
              {["Transparent pricing", "Certified technicians", "Live job updates"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.16, ease: easing }}
            className="relative mx-auto w-full max-w-[590px] lg:mx-0 lg:ml-auto"
          >
            <div className="hero-image-shell relative overflow-hidden rounded-[34px] border-[8px] border-white bg-white p-1 shadow-[0_35px_100px_rgba(15,23,42,.16)]">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1100&q=88"
                alt="Professional garage technician servicing a car"
                className="h-[480px] w-full rounded-[25px] object-cover sm:h-[610px]"
              />
              <div className="absolute inset-2 rounded-[25px] bg-gradient-to-t from-slate-950/40 via-transparent to-white/5" />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/30 bg-white/88 p-4 shadow-xl backdrop-blur-xl sm:right-auto sm:w-[285px]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Workshop status</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900">Open and accepting bookings</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={21} />
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="floating-card absolute -left-4 top-12 hidden w-52 rounded-2xl border border-slate-200/80 bg-white/92 p-4 shadow-[0_20px_55px_rgba(15,23,42,.12)] backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Gauge size={20} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Vehicle health</p>
                  <p className="text-sm font-extrabold text-slate-900">All systems checked</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="floating-card absolute -right-4 top-32 hidden rounded-2xl border border-slate-200/80 bg-white/92 px-4 py-3 shadow-[0_20px_55px_rgba(15,23,42,.12)] backdrop-blur-xl sm:block"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_0_5px_rgba(244,63,94,.12)]" />
                Live job tracking
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-2 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,.08)] md:grid-cols-4">
          {[
            { value: 12000, suffix: "+", label: "Vehicles serviced" },
            { value: 98, suffix: "%", label: "Customer satisfaction" },
            { value: 16, suffix: "+", label: "Years of experience" },
            { value: 24, suffix: " hrs", label: "Average turnaround" },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="stat-card border-b border-r border-slate-100 px-4 py-7 text-center last:border-r-0 md:py-8">
                <div className="font-[Sora] text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-xs">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="section-label">Services designed around you</span>
            <h2 className="section-title mt-4">Everything your vehicle needs, in one trusted workshop.</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/services")}
            className="group inline-flex items-center gap-2 text-sm font-extrabold text-rose-600"
          >
            View all services <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="service-card group h-full rounded-[24px] border border-slate-200 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="service-icon flex h-13 w-13 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                      <Icon size={24} />
                    </span>
                    <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="mt-7 font-[Sora] text-lg font-extrabold tracking-[-0.025em] text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{service.description}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">Starting from</span>
                      <span className="mt-1 block font-[Sora] text-xl font-extrabold text-slate-950">{service.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToBooking}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition group-hover:border-rose-200 group-hover:bg-rose-600 group-hover:text-white"
                      aria-label={`Book ${service.title}`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="process-section border-y border-slate-200/80 bg-slate-50/70 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-label">A better service journey</span>
            <h2 className="section-title mt-4">From registration to road-ready in three clear steps.</h2>
            <p className="mt-5 text-base leading-8 text-slate-500">No confusing calls, hidden progress or unnecessary waiting.</p>
          </Reveal>

          <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent lg:block" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 0.12}>
                  <div className="process-card relative rounded-[24px] border border-slate-200 bg-white p-7 text-center shadow-sm">
                    <span className="absolute right-5 top-5 font-[Sora] text-4xl font-extrabold text-slate-100">{step.number}</span>
                    <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,.18)]">
                      <Icon size={23} />
                    </span>
                    <h3 className="mt-6 font-[Sora] text-lg font-extrabold text-slate-950">{step.title}</h3>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-500">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="booking-panel relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,.1)]">
          <div className="grid lg:grid-cols-[.84fr_1.16fr]">
            <div className="booking-intro relative overflow-hidden bg-slate-950 p-8 text-white sm:p-11 lg:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                  <Clock3 size={14} className="text-rose-400" /> Takes less than 2 minutes
                </span>
                <h2 className="mt-7 font-[Sora] text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl">Book your next service with confidence.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/55">Share a few details and the workshop team will confirm the most suitable slot.</p>

                <div className="mt-9 space-y-4">
                  {["No payment required now", "Clear estimate before work", "Free booking confirmation"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/75">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.07] text-rose-400"><CheckCircle2 size={17} /></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={submitBooking} className="p-7 sm:p-10 lg:p-12">
              <div className="mb-8">
                <span className="section-label">Book service</span>
                <h3 className="mt-3 font-[Sora] text-2xl font-extrabold tracking-[-0.035em] text-slate-950">Tell us about your vehicle</h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-field sm:col-span-2">
                  <span>Full name</span>
                  <input required placeholder="Enter your full name" />
                </label>
                <label className="form-field">
                  <span>Phone number</span>
                  <input required type="tel" placeholder="+91 98765 43210" />
                </label>
                <label className="form-field">
                  <span>Registration number</span>
                  <input required placeholder="UP32 AB 1234" className="uppercase" />
                </label>
                <label className="form-field">
                  <span>Required service</span>
                  <select required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option>Engine diagnostics</option>
                    <option>General service</option>
                    <option>Brake service</option>
                    <option>Electrical & AC</option>
                    <option>Body & detailing</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Preferred date</span>
                  <input required type="date" />
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={bookingStatus === "loading"}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold text-white transition ${bookingStatus === "done" ? "bg-emerald-600 shadow-lg shadow-emerald-100" : "primary-action"}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {bookingStatus === "idle" && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Confirm booking</motion.span>}
                  {bookingStatus === "loading" && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Confirming...
                    </motion.span>
                  )}
                  {bookingStatus === "done" && <motion.span key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2"><CheckCircle2 size={17} /> Booking confirmed</motion.span>}
                </AnimatePresence>
                {bookingStatus === "idle" && <ArrowRight size={17} />}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/70 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="section-label">Customer stories</span>
              <h2 className="section-title mt-4">Trusted by drivers who expect better.</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-700">
              <Star size={16} fill="currentColor" /> 4.9 average rating
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <Reveal key={review.name} delay={index * 0.1}>
                <motion.article whileHover={{ y: -6 }} className="review-card h-full rounded-[24px] border border-slate-200 bg-white p-7">
                  <div className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={16} fill="currentColor" />)}</div>
                  <p className="mt-6 text-[15px] leading-8 text-slate-600">“{review.text}”</p>
                  <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-xs font-extrabold text-rose-600">{review.initials}</span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{review.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{review.car}</p>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:px-8">
        <Reveal className="cta-panel relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-600 via-rose-600 to-red-700 px-7 py-14 text-center text-white shadow-[0_30px_90px_rgba(225,29,72,.24)] sm:px-12 lg:py-20">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[48px] border-white/[0.07]" />
          <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/[0.06]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/80"><ShieldCheck size={15} /> Reliable care starts here</span>
            <h2 className="mt-6 font-[Sora] text-3xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl">Ready to give your vehicle the service it deserves?</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">Search your registration or reserve a workshop slot today.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => navigate("/find-vehicle")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-rose-600 shadow-xl transition hover:-translate-y-1">Search vehicle <ArrowRight size={17} /></button>
              <button type="button" onClick={scrollToBooking} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15"><CalendarDays size={17} /> Book service</button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-100"><Zap size={20} /></span>
              <div>
                <div className="font-[Sora] text-xl font-extrabold tracking-[-0.04em] text-slate-950">Auto<span className="text-rose-600">Forge</span></div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Garage management</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">Premium vehicle care with transparent communication and a smarter service experience.</p>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Explore</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <button onClick={() => navigate("/services")} className="block hover:text-rose-600">Services</button>
              <button onClick={() => navigate("/find-vehicle")} className="block hover:text-rose-600">Vehicle search</button>
              <button onClick={() => navigate("/contact")} className="block hover:text-rose-600">Contact us</button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p className="flex items-center gap-2"><MapPin size={15} className="text-rose-500" /> Lucknow, Uttar Pradesh</p>
              <p className="flex items-center gap-2"><Phone size={15} className="text-rose-500" /> +91 522 400 1234</p>
              <p className="flex items-center gap-2"><Mail size={15} className="text-rose-500" /> support@autoforge.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 px-5 py-5 text-center text-xs text-slate-400">© 2026 AutoForge Garage. All rights reserved.</div>
      </footer>
    </div>
  );
}
