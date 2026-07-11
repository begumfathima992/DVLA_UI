// import { useApp } from "../context/AppContext";
import { activities, revenueData, jobStatusData } from "../../../utils/data";
import { Card, StatCard, PageHeader } from "../../../components/ui/UI";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ICONS = { estimate: "📋", job: "🔧", invoice: "🧾", customer: "👤" };

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="space-y-6 fade-up">
      <PageHeader
        title="Workshop Overview"
        sub="Track customers, vehicles, jobs and revenue from one premium workspace."
        action={
          <div className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-xs font-bold text-[#6f7783]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Live data synced
          </div>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon="👥"
          label="Total Customers"
          // value={customers.length}
          value={543}
          change="+12%"
          changeLabel="from last month"
          iconBg="!bg-[#fff1f2] !text-[#be123c]"
        />
        <StatCard
          icon="🚗"
          label="Total Vehicles"
          // value={vehicles.length}
          value={345}
          change="+8%"
          changeLabel="from last month"
          iconBg="bg-green-100"
        />
        <StatCard
          icon="🔧"
          label="Open Job Sheets"
          value={12}
          // value={openJobs}
          change="+5%"
          changeLabel="from yesterday"
          iconBg="bg-amber-100"
        />
        <StatCard
          icon="✅"
          label="Completed Jobs"
          // value={completedJobs}
          value={544}
          change="+15%"
          changeLabel="from yesterday"
          iconBg="bg-emerald-100"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon="📋"
          label="Pending Estimates"
          // value={
          //   estimates.filter((e) => e.status === "Draft" || e.status === "Sent")
          //     .length
          // }
          value={90}
          change="+3%"
          changeLabel="from yesterday"
          iconBg="bg-violet-100"
        />
        <Card className="p-5">
          <div className="text-[10px] font-extrabold text-[#64748b] uppercase tracking-[0.14em] mb-1.5">
            Unpaid Invoices
          </div>
          {/* <div className="font-[Sora] text-2xl font-extrabold tracking-[-0.04em] text-[#0f172a]">{unpaidInv}</div> */}
          <div className="font-[Sora] text-2xl font-extrabold tracking-[-0.04em] text-[#0f172a]">453</div>
          <div className="text-xs text-red-500 font-medium mt-1">
            £7,650.00{" "}
            <span className="text-slate-400 font-normal">outstanding</span>
          </div>
          <button
            onClick={() => nav("/invoices")}
            className="mt-3 text-xs text-[#be123c] font-extrabold hover:underline"
          >
            View all
          </button>
        </Card>
        <Card className="p-5">
          <div className="text-[10px] font-extrabold text-[#64748b] uppercase tracking-[0.14em] mb-1.5">
            Today's Revenue
          </div>
          <div className="font-[Sora] text-2xl font-extrabold tracking-[-0.04em] text-[#0f172a]">£2,850.00</div>
          <div className="text-xs text-green-600 font-medium mt-1">
            +18%{" "}
            <span className="text-slate-400 font-normal">from yesterday</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[10px] font-extrabold text-[#64748b] uppercase tracking-[0.14em] mb-1.5">
            This Month Revenue
          </div>
          <div className="font-[Sora] text-2xl font-extrabold tracking-[-0.04em] text-[#0f172a]">£28,650.00</div>
          <div className="text-xs text-green-600 font-medium mt-1">
            +25%{" "}
            <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="font-[Sora] font-extrabold tracking-[-0.03em] text-[#0f172a] mb-4">Monthly Revenue</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v) => [`£${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 18px 45px rgba(7,17,31,0.14)",
                }}
              />
              <Bar dataKey="revenue" fill="#e11d48" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <div className="font-[Sora] font-extrabold tracking-[-0.03em] text-[#0f172a] mb-4">
            Job Status Overview
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {jobStatusData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 18px 45px rgba(7,17,31,0.14)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {jobStatusData.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: d.color }}
                  />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-700">
                  {d.value} ({Math.round((d.value / 90) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-slate-800">Recent Activities</div>
            <button className="text-xs text-[#be123c] font-extrabold hover:underline flex items-center gap-1">
              View all <RiArrowRightLine />
            </button>
          </div>
          <div className="space-y-3">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shrink-0">
                  {ICONS[a.icon] || "📌"}
                </div>
                <div className="flex-1 text-sm text-slate-600">{a.text}</div>
                <div className="text-xs text-slate-400 shrink-0">{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="font-[Sora] font-extrabold tracking-[-0.03em] text-[#0f172a] mb-4">Quick Actions</div>
          <div className="space-y-2">
            {[
              {
                label: "New Customer",
                icon: "👤",
                to: "/customers",
                color: "bg-[#fff1f2] text-[#8c601b] hover:bg-[#fecdd3] border border-[#fecdd3]",
              },
              {
                label: "New Estimate",
                icon: "📋",
                to: "/estimates",
                color: "bg-violet-50 text-violet-700 hover:bg-violet-100",
              },
              {
                label: "New Job Sheet",
                icon: "🔧",
                to: "/jobsheets",
                color: "bg-amber-50 text-amber-700 hover:bg-amber-100",
              },
              {
                label: "New Invoice",
                icon: "🧾",
                to: "/invoices",
                color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
              },
            ].map(({ label, icon, to, color }) => (
              <button
                key={label}
                onClick={() => nav(to)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-extrabold transition-all hover:-translate-y-0.5 ${color}`}
              >
                <span>{icon}</span>
                {label}
                <RiArrowRightLine className="ml-auto" />
              </button>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Workflow
            </div>
            <div className="flex items-center justify-between gap-1">
              {[
                { icon: "👤", label: "Customer" },
                { icon: "🚗", label: "Vehicle" },
                { icon: "📋", label: "Estimate" },
                { icon: "✅", label: "Approval" },
                { icon: "🔧", label: "Job" },
                { icon: "🧾", label: "Invoice" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-lg bg-[#fff1f2] flex items-center justify-center text-xs">
                      {s.icon}
                    </div>
                    <div className="text-[9px] text-slate-400 font-medium text-center leading-tight">
                      {s.label}
                    </div>
                  </div>
                  {i < 5 && (
                    <span className="text-slate-300 text-xs mb-3">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
