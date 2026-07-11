import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  RiArrowDownSLine,
  RiBellLine,
  RiCalendarLine,
  RiDashboardLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiSearchLine,
  RiSettings3Line,
  RiUserLine,
} from "react-icons/ri";

const TITLES = {
  "/dashboard": ["Dashboard", "A live view of your workshop performance"],
  "/customers": ["Customers", "Manage customer records and relationships"],
  "/vehicles": ["Vehicles", "Track every vehicle in your workshop"],
  "/estimates": ["Estimates", "Create and manage service quotations"],
  "/jobsheets": ["Job Sheets", "Follow active work from bay to delivery"],
  "/jobSheets": ["Job Sheets", "Follow active work from bay to delivery"],
  "/invoices": ["Invoices", "Manage billing, collections and payments"],
  "/settings": ["Settings", "Configure your workshop preferences"],
};

const Header = ({ collapsed, onMenu }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [title, subtitle] = TITLES[pathname] || ["AutoForge", "Garage management workspace"];

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("users") || "{}");
    } catch {
      return {};
    }
  }, []);

  const displayName = user?.name || user?.fullName || "Administrator";
  const email = user?.email || "admin@autoforge.com";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "AD";

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setProfileOpen(false);
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return (
    <header
      className={`fixed right-0 top-0 z-20 h-[78px] border-b border-slate-200/90 bg-white/92 px-4 shadow-[0_10px_35px_rgba(15,23,42,.055)] backdrop-blur-2xl transition-[left] duration-500 sm:px-6 lg:px-8 ${
        collapsed ? "left-0 lg:left-[92px]" : "left-0 lg:left-[278px]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1720px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onMenu}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 lg:hidden"
            aria-label="Open navigation"
          >
            <RiMenuLine className="text-xl" />
          </motion.button>

          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-rose-600">
              <RiDashboardLine className="text-sm" /> Workshop workspace
            </div>
            <div className="flex min-w-0 items-baseline gap-3">
              <h2 className="truncate font-[Sora] text-lg font-extrabold tracking-[-0.035em] text-slate-950 sm:text-[21px]">{title}</h2>
              <span className="hidden truncate text-xs text-slate-400 xl:block">{subtitle}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden w-52 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 transition focus-within:border-rose-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-100/70 lg:flex xl:w-72">
            <RiSearchLine className="shrink-0 text-slate-400" />
            <input placeholder="Search workspace..." className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
            <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-400 xl:block">⌘K</kbd>
          </div>

          {[RiCalendarLine, RiBellLine, RiSettings3Line].map((Icon, index) => (
            <motion.button
              type="button"
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-slate-200 hover:bg-slate-50 hover:text-rose-600"
              aria-label={index === 0 ? "Calendar" : index === 1 ? "Notifications" : "Settings"}
            >
              <Icon className="text-lg" />
              {index === 1 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />}
            </motion.button>
          ))}

          <div ref={menuRef} className="relative ml-1">
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className={`flex items-center gap-2 rounded-xl border bg-white p-1.5 pr-2 text-left shadow-sm transition ${profileOpen ? "border-rose-200 ring-4 ring-rose-50" : "border-slate-200 hover:border-rose-200 hover:shadow-md"}`}
              aria-expanded={profileOpen}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 text-[10px] font-black text-white shadow-sm">{initials}</span>
              <span className="hidden xl:block">
                <span className="block max-w-28 truncate text-xs font-extrabold text-slate-800">{displayName}</span>
                <span className="block text-[9px] text-slate-400">Administrator</span>
              </span>
              <RiArrowDownSLine className={`hidden text-slate-400 transition-transform xl:block ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,.16)]"
                >
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-xs font-black text-white">{initials}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-900">{displayName}</p>
                        <p className="truncate text-xs text-slate-400">{email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1">
                    <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                      <RiUserLine className="text-lg" /> My profile
                    </button>
                    <button type="button" onClick={() => { setProfileOpen(false); navigate("/settings"); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                      <RiSettings3Line className="text-lg" /> Account settings
                    </button>
                  </div>

                  <div className="my-2 border-t border-slate-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl bg-rose-50 px-3 py-2.5 text-left text-sm font-extrabold text-rose-600 transition hover:bg-rose-600 hover:text-white"
                  >
                    <RiLogoutBoxRLine className="text-lg" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
