import Customers from "../page/admin/customers/Customers";
import Dashboard from "../page/admin/dashboard/Dashboard";
import Estimates from "../page/admin/estimates/Estimates";
import Invoice from "../page/admin/invoice/Invoice";
import JobSheets from "../page/admin/jobSheets/JobSheets";
import Settings from "../page/admin/settings/Settings";
import Vehicles from "../page/admin/vehicles/Vehicles";

export const routes = [
  {
    id: 1,
    path: "/dashboard",
    component: <Dashboard />,
    navItem: "dashboard",
    isHeader: false,
  },
  {
    id: 2,
    path: "/customers",
    component: <Customers />,
    navItem: "dashboard",
    isHeader: false,
  },
  {
    id: 3,
    path: "/vehicles",
    component: <Vehicles />,
    navItem: "Vehicles",
    isHeader: false,
  },
  {
    id: 4,
    path: "/estimates",
    component: <Estimates />,
    navItem: "Estimates",
    isHeader: false,
  },
  {
    id: 5,
    path: "/jobSheets",
    component: <JobSheets />,
    navItem: "JobSheets",
    isHeader: false,
  },
  {
    id: 6,
    path: "/invoices",
    component: <Invoice />,
    navItem: "Invoice",
    isHeader: false,
  },
  {
    id: 7,
    path: "/settings",
    component: <Settings />,
    navItem: "Settings",
    isHeader: false,
  },
];
