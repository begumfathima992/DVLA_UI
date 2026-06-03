import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../../page/auth/Login";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vehicle Search", path: "/find-vehicle" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm shadow-slate-200/80 border-b border-slate-100"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm shadow-red-200">
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
              className="font-black text-2xl text-slate-900"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              AUTO<span className="text-red-600">FORGE</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center relative bg-slate-100 rounded-3xl p-1 border border-slate-200">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative px-7 py-2.5 text-sm font-semibold capitalize transition-colors rounded-3xl z-10
                    ${isActive ? "text-white" : "text-slate-500 hover:text-slate-800"}`}
                >
                  {item.label}
                </button>
              );
            })}
            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl shadow-md shadow-red-200"
              animate={{
                left: `${navItems.findIndex((i) => i.path === location.pathname) * 25}%`,
                width: "25%",
              }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
            />
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setOpen(true)}
              className="text-red-600 border border-red-300 bg-red-50 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2"
            >
              Login / Sign up
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-700 p-2"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 py-4 px-2 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`text-left px-5 py-3.5 rounded-xl text-base font-semibold transition-all
                      ${
                        location.pathname === item.path
                          ? "bg-red-600 text-white shadow-sm shadow-red-200"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setOpen(true)}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-semibold text-base transition-all"
                >
                  Login / Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Login open={open} setOpen={setOpen} />
    </nav>
  );
}

export default Header;
