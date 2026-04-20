import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install: npm install lucide-react
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
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
          ? "bg-zinc-950/95 backdrop-blur-lg shadow-xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
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
              className="font-black text-2xl  text-white"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              AUTO<span className="text-red-500">FORGE</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          {/* Ultra Smooth Sliding Indicator */}
          <div className="hidden md:flex items-center relative bg-zinc-900/70 backdrop-blur-xl rounded-3xl p-1 border border-zinc-700/50">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative px-8 py-3.5 text-sm font-medium capitalize transition-colors rounded-3xl z-10
          ${isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"}`}
                >
                  {item.label}
                </button>
              );
            })}

            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl shadow-2xl shadow-red-500/50"
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
              onClick={() => navigate("/book-service")}
              className=" text-red-500 border border-red-600 px-6 py-2.5 rounded-xl !font-bold text-sm transition-all duration-200 flex items-center gap-2"
            >
              📅 Book Service
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-zinc-950 border-t border-zinc-800 py-6 px-6">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-left px-5 py-4 rounded-2xl text-lg font-medium transition-all
                    ${
                      location.pathname === item.path
                        ? "bg-red-600 text-white"
                        : "text-zinc-300 hover:bg-zinc-900"
                    }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => handleNavigation("/book-service")}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all"
              >
                📅 Book Service
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
