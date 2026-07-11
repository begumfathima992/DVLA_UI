import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  RiArrowRightSLine,
  RiCarLine,
  RiCloseLine,
  RiDashboardLine,
  RiFileListLine,
  RiLogoutBoxRLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiPulseLine,
  RiSettings3Line,
  RiToolsLine,
  RiUserLine,
} from "react-icons/ri";

const NAV = [
  { to: "/dashboard", icon: RiDashboardLine, label: "Dashboard", hint: "Overview" },
  { to: "/customers", icon: RiUserLine, label: "Customers", hint: "Client records" },
  { to: "/vehicles", icon: RiCarLine, label: "Vehicles", hint: "Garage fleet" },
  { to: "/estimates", icon: RiFileListLine, label: "Estimates", hint: "Quotes & approvals" },
  { to: "/jobSheets", icon: RiToolsLine, label: "Job Sheets", hint: "Workshop jobs" },
  { to: "/invoices", icon: RiFileListLine, label: "Invoices", hint: "Billing & payments" },
  { to: "/settings", icon: RiSettings3Line, label: "Settings", hint: "Preferences" },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setMobileOpen(false);
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col overflow-hidden border-r border-slate-200 bg-white shadow-[18px_0_55px_rgba(15,23,42,.06)] transition-all duration-500 ease-out ${
        collapsed ? "w-[92px]" : "w-[278px]"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-indigo-50 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.025)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      <div className="relative flex h-[78px] shrink-0 items-center gap-3 overflow-hidden border-b border-slate-200 px-5">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.06 }}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-[0_10px_25px_rgba(225,29,72,.24)]"
        >
          <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.45),transparent_48%)]" />
          <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.7}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate font-[Sora] text-[20px] font-extrabold tracking-[-0.045em] text-slate-950">
              Auto<span className="text-rose-600">Forge</span>
            </div>
            <div className="text-[8px] font-extrabold uppercase tracking-[0.21em] text-slate-400">Garage management</div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Close navigation"
        >
          <RiCloseLine className="text-xl" />
        </button>
      </div>

      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-4 mt-4 overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-4 shadow-sm"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-100/70 blur-2xl" />
          <div className="relative mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-rose-600">
              <RiPulseLine className="text-base" /> Live status
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Online
            </span>
          </div>
          <p className="relative text-[11px] leading-relaxed text-slate-500">All workshop operations are synced and running normally.</p>
        </motion.div>
      )}

      <nav className="relative flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {!collapsed && <p className="mb-3 px-3 text-[9px] font-extrabold uppercase tracking-[0.22em] text-slate-400">Main workspace</p>}

        {NAV.map(({ to, icon: Icon, label, hint }, index) => (
          <motion.div key={to} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04, duration: 0.32 }}>
            <NavLink
              to={to}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `group relative flex min-h-[52px] items-center gap-3 overflow-hidden rounded-xl border px-3 text-sm transition-all duration-250 ${
                  isActive
                    ? "border-rose-100 bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 shadow-sm"
                    : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="admin-active-line" className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-rose-500" />}
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${isActive ? "bg-white text-rose-600 shadow-sm" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-rose-600 group-hover:shadow-sm"}`}>
                    <Icon className="text-[19px]" />
                  </span>
                  {!collapsed && (
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-extrabold">{label}</span>
                      <span className={`block truncate text-[9px] font-medium ${isActive ? "text-rose-400" : "text-slate-400"}`}>{hint}</span>
                    </span>
                  )}
                  {isActive && !collapsed && <RiArrowRightSLine className="text-lg text-rose-400" />}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="relative shrink-0 border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className={`mb-2 flex w-full items-center rounded-xl border border-rose-100 bg-rose-50 text-rose-600 transition hover:border-rose-600 hover:bg-rose-600 hover:text-white ${collapsed ? "justify-center p-3" : "gap-3 px-3 py-3"}`}
          title={collapsed ? "Logout" : undefined}
        >
          <RiLogoutBoxRLine className="shrink-0 text-lg" />
          {!collapsed && <span className="text-[11px] font-extrabold uppercase tracking-[0.12em]">Logout</span>}
        </button>

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="hidden w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-slate-50 hover:text-rose-600 lg:flex"
        >
          {collapsed ? (
            <RiMenuUnfoldLine className="text-lg" />
          ) : (
            <>
              <RiMenuFoldLine className="text-lg" />
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Collapse sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
