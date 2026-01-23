"use client";

import Link from "next/link";
import {
  Pencil,
  Bell,
  ChevronDown,
  User,
  Layers,
  Boxes,
  Search,
  Upload,
  SlidersHorizontal,
  Folder,
  Download,
  ArrowUpRight,
} from "lucide-react";

const statsCards = [
  {
    title: "Active User",
    value: "1,842",
    badge: "Live",
    badgeClass: "bg-green-500",
    cardClass: "bg-gray-900 text-white",
    textClass: "text-white",
    border: "",
    corner: "br", // bottom-right straight
  },
  {
    title: "Live Projects",
    value: "47",
    badge: "Active",
    badgeClass: "bg-red-500",
    cardClass: "bg-white",
    textClass: "text-gray-900",
    border: "border-2 border-gray-200",
    corner: "bl", // bottom-left straight
  },
  {
    title: "System Health",
    value: "98.7%",
    badge: "Optimal",
    badgeClass: "bg-green-500",
    cardClass: "bg-white",
    textClass: "text-gray-900",
    border: "border-2 border-gray-200",
    corner: "tr", // top-right straight
  },
  {
    title: "Revenue Today",
    value: "$12,450",
    badge: "+12%",
    badgeClass: "bg-green-500",
    cardClass: "bg-white",
    textClass: "text-gray-900",
    border: "border-2 border-gray-200",
    corner: "tl", // top-left straight
  },
];

const systemMetrics = [
  {
    label: "API Response Time",
    value: "85ms",
    progress: 85,
    barClass: "bg-green-500",
  },
  {
    label: "Database Performance",
    value: "98%",
    progress: 98,
    barClass: "bg-slate-900",
  },
  {
    label: "File Storage",
    value: "82% used",
    progress: 82,
    barClass: "bg-green-500",
  },
  {
    label: "AR Processing Queue",
    value: "45% load",
    progress: 45,
    barClass: "bg-red-500",
  },
  {
    label: "AI Model Performance",
    value: "99.2%",
    progress: 99.2,
    barClass: "bg-slate-900",
  },
];

export default function AdminDashboardPage() {
  const cornerClassMap: Record<string, string> = {
    br: "rounded-xl rounded-br-none",
    bl: "rounded-xl rounded-bl-none",
    tr: "rounded-xl rounded-tr-none",
    tl: "rounded-xl rounded-tl-none",
  };
  const services = [
    {
      id: "auth",
      name: "Authentication",
      status: "Operational",
      detail: "All Processing: Normal Queue (32 sec avg)",
    },
    { id: "ai", name: "AI Inference", status: "98ms" },
    { id: "db", name: "Database", status: "Replication sync: 7s" },
    { id: "storage", name: "File Storage", status: "82% capacity" },
  ];

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white px-8 py-16 w-full">
        <div>
          <h1 className="text-3xl font-semibold text-gray-600 mb-1">
            Platform Command Center - Super Admin
          </h1>
        </div>
        <div className="text-sm text-gray-600 border p-6">Refresh: 10s</div>
      </div>

      <div className="gap-6 p-6 md:p-10 ">
        <div className="space-y-16">
          {/* KEY PLATFORM METRICS & SYSTEM HEALTH SECTION */}
          <section id="platform-metrics">
            <div className="grid md:grid-cols-2 gap-3 mb-28 ">
              {/* Key Platform Metrics */}
              <div className="rounded-lg col-span-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  KEY PLATFORM METRICS
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6 h-full">
                  {statsCards.map((card) => (
                    <div
                      key={card.title}
                      className={`
                        ${card.cardClass}
                        ${card.border}
                        ${cornerClassMap[card.corner]}
                        p-6 relative overflow-hidden flex flex-col justify-between
                      `}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`text-sm ${
                            card.cardClass.includes("bg-gray-900")
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {card.title}
                        </span>

                        <button className="p-2 rounded-full bg-[#D9D9D9] hover:bg-gray-300">
                          <ArrowUpRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      <div
                        className={`text-5xl font-bold mb-2 ${card.textClass}`}
                      >
                        {card.value}
                      </div>

                      <div
                        className={`inline-block ${card.badgeClass} text-white text-xs px-2 py-1 rounded-4xlKEY PLATFORM METRICS mt-4 w-18 text-center`}
                      >
                        {card.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health Dashboard */}
              <div className="rounded-lg col-span-1 h-full">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  REAL-TIME SYSTEM MONITOR
                </h3>
                <div className="bg-white px-6 py-8 rounded-2xl shadow-sm h-full">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">
                    SYSTEM HEALTH DASHBOARD
                  </h4>
                  <div className="space-y-6">
                    {systemMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center gap-4"
                      >
                        <div className="w-44 text-sm text-gray-600">
                          {metric.label}
                        </div>

                        <div className="flex-1">
                          <div className="w-full h-8 md:h-10 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${metric.barClass} rounded-full`}
                              style={{ width: `${metric.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="w-16 text-right text-sm text-gray-900">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LIVE SERVICE STATUS SECTION */}
          <section id="service-status">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-6 tracking-wide">
                LIVE SERVICE STATUS:
              </h3>

              {/* Service List */}
              <ul className="space-y-4 text-sm text-gray-800">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Authentication: Operational</span>
                </li>

                <li className="flex gap-2">
                  <span>•</span>
                  <span>AR Processing: Normal Queue (12 sec avg)</span>
                </li>

                <li className="flex gap-2">
                  <span>•</span>
                  <span>AI inference: 98ms response time</span>
                </li>

                <li className="flex gap-2">
                  <span>•</span>
                  <span>Database: Replication sync &lt;1s</span>
                </li>

                <li className="flex gap-2">
                  <span>•</span>
                  <span>File Storage: 82% capacity</span>
                </li>
              </ul>

              {/* Actions */}
              <div className="mt-10 flex gap-6 ">
                <Link href="/admin/system-health-monitor">
                  <button className="bg-slate-900 text-white py-4 px-16 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
                    View Detailed Health
                  </button>
                </Link>

                <button className="bg-primary text-white py-4 px-16 rounded-xl text-sm font-medium hover:bg-primary/80 transition">
                  Run Diagnostics
                </button>
              </div>
            </div>
          </section>

          {/* PLATFORM ACTIVITY FEED SECTION */}
          <section id="activity-feed">
            <div className="rounded-2xl pb-16">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                PLATFORM ACTIVITY FEED
              </h2>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-6">
                  LIVE PLATFORM ACTIVITY
                </h3>

                {/* Table */}
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-sm text-gray-600">
                        <th className="px-6 py-4 text-left font-semibold border-b border-gray-200">
                          TIME
                        </th>
                        <th className="px-6 py-4 text-left font-semibold border-b border-gray-200 border-l">
                          USER
                        </th>
                        <th className="px-6 py-4 text-left font-semibold border-b border-gray-200 border-l">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-sm text-gray-900">
                      {[
                        ["10:15", "Mike (ABC Tower)", "AR Scan Completed"],
                        [
                          "10:12",
                          "Sarah (River Bridge)",
                          "AI prediction generated",
                        ],
                        ["10:10", "System", "Backup completed"],
                        ["10:08", "Client Portal", "Invoice paid"],
                        ["10:05", "Jane (Highway)", "AI reassignment exec"],
                        ["10:00", "System", "Daily report generated"],
                      ].map(([time, user, action], i) => (
                        <tr key={i} className="last:border-b-0">
                          <td className="px-6 py-3">{time}</td>
                          <td className="px-6 py-3 border-l border-l-gray-200">
                            {user}
                          </td>
                          <td className="px-6 py-3 border-l border-l-gray-200">
                            {action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Filters */}
                <div className="mt-10">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    FILTER ACTIVITY BY:
                  </h4>

                  <div className="space-y-4">
                    {/* Row 1 */}
                    <div className="flex gap-4">
                      <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 w-52">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>User Type</span>
                        </div>
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                      </button>

                      <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 w-52">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          <span>Project</span>
                        </div>
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                      </button>

                      <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 w-52">
                        <div className="flex items-center gap-2">
                          <Boxes className="w-4 h-4" />
                          <span>Module</span>
                        </div>
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Row 2 */}
                    <div className="flex gap-4">
                      <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 w-52">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          <span>Search Activity</span>
                        </div>
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                      </button>

                      <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 w-52">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          <span>Export Logs</span>
                        </div>
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ALERTS & NOTIFICATION CENTER SECTION */}
        <section id="alerts-center">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  ALERT & NOTIFICATION CENTER
                </h2>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-gray-900" />

                  <h3 className="text-sm font-semibold text-gray-900">
                    ACTIVE ALERTS (3)
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Alert 1 */}
                  <div className="border-l-4 border-yellow-500 bg-gray-50 p-4 rounded-r">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-gray-900">
                        1. Medium: Storage at 82% capacity
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800">
                        Action
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Alert 2 */}
                  <div className="border-l-4 border-red-500 bg-gray-50 p-4 rounded-r">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-gray-900">
                        2. High: Unusual login pattern detected
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800">
                        Action
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Alert 3 */}
                  <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-gray-900">
                        3. Low: API response time increasing
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-900 text-white text-xs rounded hover:bg-gray-800">
                        Action
                      </button>
                      <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-10 flex gap-6 ">
                    <button className="bg-slate-900 text-white py-4 px-16 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
                      View All Alerts
                    </button>

                    <button className="bg-primary text-white py-4 px-16 rounded-xl text-sm font-medium hover:bg-primary/80 transition">
                      Configure Alert Rules
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
