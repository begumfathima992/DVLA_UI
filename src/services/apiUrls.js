"use client";

export const API_URLs = {
  register: "/auth/register",
  logout: "/auth/logout",
  login: "/auth/login",
  dashboard: "/Dashboard",
  userList: "/UserList",
  slotInfo: "/Slotinfo",

  // customer api start
  getCustomerList: "/customer",
  createCustomer: "/customer",
  updateCustomer: "/customer",
  // customer api end
  // customer api start
  getVehicleList: "/vehicle",
  createVehicle: "/vehicle",
  updateVehicle: "/vehicle",
  getByIdCustomerBasedVehicle: "/vehicle",
  // customer api end
  estimateList: "/estimate",
  createEstimate: "/estimate",
  estimateDelete: "/estimate",
  approvedEstimate: "/estimate/status",

  // job sheets api
  getJobSheets: "/jobSheets",
  updateJobSheets: "/jobSheets",
  updatePriorityJobSheets: "/jobSheets/priority",
  updateStatusJobSheets: "/jobSheets/status",

  // settings api
  settings: "/settings",
};
