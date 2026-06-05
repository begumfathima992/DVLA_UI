import {
  RiSearchLine,
  RiCalendarLine,
  RiBellLine,
  RiSettings3Line,
} from "react-icons/ri";
import { useLocation } from "react-router-dom";

const TITLES = {
  "/": "Dashboard",
  "/customers": "Customers",
  "/vehicles": "Vehicles",
  "/estimates": "Estimates",
  "/jobsheets": "Job Sheets",
  "/invoices": "Invoices",
  "/payments": "Payments",
  "/mechanics": "Mechanics",
  "/reports": "Reports",
  "/inventory": "Inventory",
  "/settings": "Settings",
};

const Header = ({ collapsed }) => {
  const { pathname } = useLocation();
  return (
    <header
      className={`fixed top-0 right-0 z-20 bg-white border-b border-slate-200 shadow-sm
      h-14 flex items-center justify-between px-5 transition-all duration-300
      ${collapsed ? "left-16" : "left-56"}`}
    >
      <h2 className="font-bold text-slate-800 text-base">
        {TITLES[pathname] || "AutoCare"}
      </h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-48">
          <RiSearchLine className="text-slate-400 shrink-0" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-slate-600 w-full text-sm placeholder-slate-400"
          />
        </div>
        {[RiCalendarLine, RiBellLine, RiSettings3Line].map((Icon, i) => (
          <button
            key={i}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors relative"
          >
            <Icon className="text-lg" />
            {i === 1 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          JS
        </div>
      </div>
    </header>
  );
};
export default Header;
