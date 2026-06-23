import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Login from "../../page/auth/Login";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  /* scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vehicle Search", path: "/find-vehicle" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const activeIdx = navItems.findIndex((i) => i.path === location.pathname);
  const pillIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        /* pill shimmer */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .pill-shimmer {
          background: linear-gradient(
            105deg,
            #dc2626 0%,
            #ef4444 40%,
            #fca5a5 50%,
            #ef4444 60%,
            #dc2626 100%
          );
          background-size: 200% auto;
          animation: shimmer 2.8s linear infinite;
        }

        /* nav glow on scroll */
        .nav-scrolled {
          box-shadow:
            0 1px 0 rgba(220,38,38,0.08),
            0 4px 24px rgba(0,0,0,0.06);
        }

        /* logo icon spin */
        .logo-icon { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .logo-wrap:hover .logo-icon { transform: rotate(15deg) scale(1.08); }

        /* login btn */
        .login-btn {
          position: relative; overflow: hidden;
          transition: color 0.2s, border-color 0.2s;
        }
        .login-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #dc2626;
          transform: translateY(101%);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
        }
        .login-btn:hover::before { transform: translateY(0); }
        .login-btn:hover { color: #fff; border-color: #dc2626; }
        .login-btn span { position: relative; z-index: 1; }

        /* mobile item */
        .mobile-item { transition: background 0.18s, color 0.18s, transform 0.18s; }
        .mobile-item:active { transform: scale(0.97); }

        /* active border glow */
        .nav-active-glow {
          box-shadow: 0 0 0 1px rgba(220,38,38,0.18), 0 4px 16px rgba(220,38,38,0.15);
        }
      `}</style>

      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-white/96 backdrop-blur-xl border-b-2 border-slate-300 nav-scrolled"
              : "bg-white/85 backdrop-blur-md border-b-2 border-slate-200"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* ── LOGO ── */}
            <motion.div
              onClick={() => handleNav("/")}
              className="logo-wrap flex items-center gap-2.5 cursor-pointer select-none"
              whileTap={{ scale: 0.96 }}
            >
              <div className="logo-icon w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-md shadow-red-200 border border-red-700">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span
                className="font-black text-2xl text-slate-900 tracking-wide"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                AUTO<span className="text-red-600">FORGE</span>
              </span>
            </motion.div>

            {/* ── DESKTOP NAV PILL ── */}
            <div
              ref={navRef}
              className="hidden md:flex items-center relative bg-slate-100 rounded-3xl p-1 border-2 border-slate-300"
            >
              {/* sliding pill */}
              <motion.div
                className="pill-shimmer absolute top-1 bottom-1 rounded-3xl nav-active-glow"
                animate={{
                  left: `calc(${pillIdx * 25}% + 0px)`,
                  width: "25%",
                  opacity: pillIdx >= 0 ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
              />

              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    onHoverStart={() => setHoveredIdx(i)}
                    onHoverEnd={() => setHoveredIdx(null)}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-7 py-2.5 text-sm font-semibold capitalize transition-colors rounded-3xl z-10 select-none
                      ${isActive || hoveredIdx === i ? "" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    {item.label}

                    {/* active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/70 rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* ── LOGIN BUTTON ── */}
            <div className="hidden md:block">
              <motion.button
                onClick={() => setOpen(true)}
                whileTap={{ scale: 0.96 }}
                className="login-btn text-red-600 border-2 border-red-300 bg-red-50 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Login / Sign up
                </span>
              </motion.button>
            </div>

            {/* ── HAMBURGER ── */}
            <motion.button
              onClick={() => setMobileOpen((p) => !p)}
              whileTap={{ scale: 0.9, rotate: 10 }}
              className="md:hidden text-slate-700 p-2 rounded-xl border-2 border-slate-300 bg-white hover:border-red-300 hover:text-red-600 transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="men"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── MOBILE MENU ── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden border-t-2 border-slate-300 py-4 px-2 overflow-hidden bg-white"
              >
                <div className="flex flex-col gap-1.5">
                  {navItems.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.button
                        key={item.path}
                        onClick={() => handleNav(item.path)}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.055,
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`mobile-item text-left px-5 py-3.5 rounded-xl text-base font-semibold
                          ${
                            isActive
                              ? "bg-red-600 text-white shadow-md shadow-red-200 border border-red-700"
                              : "text-slate-600 hover:bg-slate-100 border border-transparent"
                          }`}
                      >
                        <span className="flex items-center gap-3">
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                          )}
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}

                  <motion.button
                    onClick={() => {
                      setOpen(true);
                      setMobileOpen(false);
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: navItems.length * 0.055,
                      duration: 0.3,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-semibold text-base transition-all border-2 border-red-700 shadow-md shadow-red-100 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    Login / Sign Up
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Login open={open} setOpen={setOpen} />
      </motion.nav>
    </>
  );
}

export default Header;
