import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  RiDashboardLine,
  RiUserLine,
  RiCarLine,
  RiFileListLine,
  // RiWrenchLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
  RiUserStarLine,
  RiBarChartLine,
  RiStackLine,
  RiSettings3Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri";
import { FaDotCircle } from "react-icons/fa";

const NAV = [
  { to: "/dashboard", icon: RiDashboardLine, label: "Dashboard" },
  { to: "/customers", icon: RiUserLine, label: "Customers" },
  { to: "/vehicles", icon: RiCarLine, label: "Vehicles" },
  { to: "/estimates", icon: RiFileListLine, label: "Estimates" },
  { to: "/jobsheets", icon: FaDotCircle, label: "Job Sheets" },
  // { to: "/invoices", icon: RiFileTextLine, label: "Invoices" },
  // { to: "/payments", icon: RiMoneyDollarCircleLine, label: "Payments" },
  // { to: "/mechanics", icon: RiUserStarLine, label: "Mechanics" },
  // { to: "/reports", icon: RiBarChartLine, label: "Reports" },
  // { to: "/inventory", icon: RiStackLine, label: "Inventory" },
  { to: "/settings", icon: RiSettings3Line, label: "Settings" },
];

const Sidebar = ({ collapsed, setCollapsed }) => (
  <aside
    className={`fixed top-0 left-0 h-screen bg-white  border-r border-slate-200 shadow-sm z-30
    flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}
  >
    {/* Brand */}
    <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 shrink-0 overflow-hidden">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0 text-sm">
        🚗
      </div>
      {!collapsed && (
        <div>
          <div className="font-bold text-slate-800 text-sm leading-tight">
            AUTOCARE
          </div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            GARAGE
          </div>
        </div>
      )}
    </div>

    {/* Nav */}
    <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
      {NAV.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
            ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`
          }
        >
          <Icon className="text-lg shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </NavLink>
      ))}
    </nav>

    {/* User + collapse */}
    <div className="border-t border-slate-100 p-3 shrink-0 space-y-1.5">
      {!collapsed && (
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
            JS
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">
              John Smith
            </div>
            <div className="text-[10px] text-slate-400">Admin</div>
          </div>
        </div>
      )}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors text-sm"
      >
        {collapsed ? (
          <RiMenuUnfoldLine className="text-lg" />
        ) : (
          <>
            <RiMenuFoldLine className="text-lg" />
            <span className="text-xs">Collapse</span>
          </>
        )}
      </button>
    </div>
  </aside>
);

export default Sidebar;
