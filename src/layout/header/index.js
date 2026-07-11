import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, ShieldCheck, UserRound, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../../page/auth/Login";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Vehicle Search", path: "/find-vehicle" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const goTo = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const handleAccount = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
      return;
    }
    setLoginOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3.5"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex h-[68px] items-center justify-between rounded-[20px] border px-3.5 transition-all duration-300 sm:px-4 ${
              scrolled
                ? "border-slate-200/90 bg-white/92 shadow-[0_16px_50px_rgba(15,23,42,.1)] backdrop-blur-2xl"
                : "border-white/80 bg-white/78 shadow-[0_10px_35px_rgba(15,23,42,.07)] backdrop-blur-xl"
            }`}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => goTo("/")}
              className="group flex items-center gap-3 rounded-xl text-left"
              aria-label="Go to home"
            >
              <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-[0_10px_25px_rgba(225,29,72,.24)]">
                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.45),transparent_48%)]" />
                <Zap size={20} className="relative transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </span>
              <span>
                <span className="block font-[Sora] text-[19px] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-xl">
                  Auto<span className="text-rose-600">Forge</span>
                </span>
                <span className="hidden text-[8px] font-extrabold uppercase tracking-[0.2em] text-slate-400 sm:block">Garage management</span>
              </span>
            </motion.button>

            <nav className="relative hidden items-center rounded-2xl border border-slate-200 bg-slate-50/90 p-1 md:flex">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => goTo(item.path)}
                    className={`relative rounded-xl px-4 py-2.5 text-[12px] font-extrabold transition-colors lg:px-5 ${active ? "text-white" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="light-public-nav"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 shadow-[0_8px_20px_rgba(225,29,72,.2)]"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <span className="hidden items-center gap-2 text-[10px] font-bold text-slate-400 xl:flex">
                <ShieldCheck size={15} className="text-emerald-500" /> Secure portal
              </span>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAccount}
                className="primary-action inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[12px] font-extrabold text-white"
              >
                <UserRound size={16} />
                {isLoggedIn ? "Dashboard" : "Login / Sign up"}
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
              aria-label="Toggle navigation"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={21} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={21} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 overflow-hidden rounded-[20px] border border-slate-200 bg-white/96 p-3 shadow-[0_24px_65px_rgba(15,23,42,.14)] backdrop-blur-2xl md:hidden"
              >
                <div className="space-y-1">
                  {navItems.map((item, index) => {
                    const active = location.pathname === item.path;
                    return (
                      <motion.button
                        key={item.path}
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => goTo(item.path)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-extrabold ${active ? "bg-rose-50 text-rose-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
                      >
                        {item.label}
                        <ArrowRight size={16} />
                      </motion.button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleAccount();
                  }}
                  className="primary-action mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-white"
                >
                  <UserRound size={16} /> {isLoggedIn ? "Open dashboard" : "Login / Sign up"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <Login open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
}
