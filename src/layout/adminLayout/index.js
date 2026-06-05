import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Header collapsed={collapsed} />
      <main
        className={`transition-all duration-300 pt-14 min-h-screen ${collapsed ? "pl-16" : "pl-56"}`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};
export default Layout;
