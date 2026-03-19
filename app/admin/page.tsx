"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  Bell,
  User,
  Layers,
  Boxes,
  Search,
  Upload,
  SlidersHorizontal,
} from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Button } from "../../components/ui/Button";

import { StatCard } from "../../components/admin/StatCard";
import { useActiveAlerts } from "../../lib/hooks";

const statsCards = [
  {
    title: "Active User",
    value: "1,842",
    badge: "Live",
    badgeColor: "green" as const,
    style: "default" as const,
    corner: "br" as const,
  },
  {
    title: "Live Projects",
    value: "47",
    badge: "Active",
    badgeColor: "red" as const,
    style: "outlined" as const,
    corner: "bl" as const,
  },
  {
    title: "System Health",
    value: "98.7%",
    badge: "Optimal",
    badgeColor: "green" as const,
    style: "outlined" as const,
    corner: "tr" as const,
  },
  {
    title: "Revenue Today",
    value: "$12,450",
    badge: "+12%",
    badgeColor: "green" as const,
    style: "outlined" as const,
    corner: "tl" as const,
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
  const { alerts, count, fetchActiveAlerts, dismissAlert, loading } =
    useActiveAlerts();

  useEffect(() => {
    fetchActiveAlerts();
  }, [fetchActiveAlerts]);

  const getPriorityStyles = (priority: string, color?: string) => {
    const styles: Record<string, string> = {
      CRITICAL: "border-red-600",
      HIGH: "border-red-500",
      MEDIUM: "border-yellow-500",
      LOW: "border-blue-500",
    };

    // If API provides a color that looks like a tailwind color name (e.g. "red-500")
    if (color && !styles[priority]) {
      return `border-${color}`;
    }

    return styles[priority] || "border-gray-300";
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Header */}
      <PageHeader title="Platform Command Center - Super Admin">
        <div className="text-sm text-gray-600 border p-2 rounded">
          Refresh: 10s
        </div>
      </PageHeader>

      <div className="gap-6 p-6 md:p-10 ">
        <div className="space-y-16">
          {/* KEY PLATFORM METRICS & SYSTEM HEALTH SECTION */}
          <section id="platform-metrics">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 xl:gap-3 mb-28 ">
              {/* Key Platform Metrics */}
              <div className="rounded-lg col-span-1">
                <SectionHeader title="KEY PLATFORM METRICS" />

                <div className="grid grid-cols-2 gap-4 mb-6 h-full">
                  {statsCards.map((card) => (
                    <StatCard
                      key={card.title}
                      title={card.title}
                      value={card.value}
                      badge={card.badge}
                      badgeColor={card.badgeColor}
                      style={card.style}
                      corner={card.corner}
                      className="h-full"
                    />
                  ))}
                </div>
              </div>

              {/* System Health Dashboard */}
              <div className="rounded-lg col-span-1 h-full">
                <SectionHeader title="REAL-TIME SYSTEM MONITOR" />
                <Card className="h-full">
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
                </Card>
              </div>
            </div>
          </section>

          {/* LIVE SERVICE STATUS SECTION */}
          <section id="service-status">
            <Card>
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
                  <Button className="bg-slate-900 text-white py-4 px-4 md:px-8 xl:px-16 h-auto rounded-xl text-sm font-medium hover:bg-slate-800 transition">
                    View Detailed Health
                  </Button>
                </Link>

                <Button className="bg-primary text-white py-4 px-4 md:px-8 xl:px-16 h-auto rounded-xl text-sm font-medium hover:bg-primary/80 transition">
                  Run Diagnostics
                </Button>
              </div>
            </Card>
          </section>

          {/* PLATFORM ACTIVITY FEED SECTION */}
          <section id="activity-feed">
            <div className="rounded-2xl pb-16">
              <SectionHeader title="PLATFORM ACTIVITY FEED" />

              <Card>
                <h3 className="text-sm font-semibold text-gray-900 mb-6">
                  LIVE PLATFORM ACTIVITY
                </h3>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full border-collapse min-w-[600px]">
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
              </Card>
            </div>
          </section>

          {/* ALERTS & NOTIFICATION CENTER SECTION */}
          <section id="alerts-center">
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <SectionHeader
                    title="ALERT & NOTIFICATION CENTER"
                    className="mb-0"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-5 h-5 text-gray-900" />

                    <h3 className="text-sm font-semibold text-gray-900">
                      ACTIVE ALERTS ({count})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {loading && (
                      <div className="text-sm text-gray-500">
                        Loading alerts...
                      </div>
                    )}

                    {!loading && alerts.length === 0 && (
                      <div className="text-sm text-gray-500">
                        No active alerts.
                      </div>
                    )}

                    {alerts.map(
                      (
                        alert: {
                          id: number | string;
                          priority: string;
                          priority_color?: string;
                          title: string;
                          formatted_message: string;
                        },
                        index: number,
                      ) => (
                        <div
                          key={alert.id}
                          className={`border-l-4 ${getPriorityStyles(
                            alert.priority,
                            alert.priority_color,
                          )} bg-gray-50 p-4 rounded-r`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-gray-900">
                              {index + 1}. {alert.priority}: {alert.title}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mb-3">
                            {alert.formatted_message}
                          </div>
                          <div className="flex gap-2">
                            <Button className="px-3 py-1 bg-gray-900 text-white text-xs h-auto rounded hover:bg-gray-800">
                              Action
                            </Button>
                            <Button
                              onClick={() => dismissAlert(alert.id)}
                              className="px-3 py-1 bg-blue-500 text-white text-xs h-auto rounded hover:bg-blue-600"
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  {/* Actions */}
                  <div className="mt-10 flex gap-6 ">
                    <Button className="bg-slate-900 text-white py-4 px-4 md:px-8 xl:px-16 h-auto rounded-xl text-sm font-medium hover:bg-slate-800 transition">
                      View All Alerts
                    </Button>

                    <Button className="bg-primary text-white py-4 px-4 md:px-8 xl:px-16 h-auto rounded-xl text-sm font-medium hover:bg-primary/80 transition">
                      Configure Alert Rules
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
