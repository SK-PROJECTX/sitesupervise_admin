"use client";

import { ToggleRight } from "lucide-react";

function CircularProgress({
  percentage,
  label,
  size = 100,
}: {
  percentage: number;
  label: string;
  size?: number;
}) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-2">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: `rotate(-90deg)`,
            transformOrigin: `${size / 2}px ${size / 2}px`,
          }}
        />
        {/* Percentage text */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dy="0.3em"
          className="text-sm font-bold fill-gray-800"
        >
          {percentage}%
        </text>
      </svg>
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
  );
}

export default function SystemHealthMonitorPage() {
  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white px-8 py-16 w-full">
        <h1 className="text-3xl font-bold text-[#0A1B2E]">
          System Health Monitor
        </h1>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-700">Auto-refresh: ON</span>
          <ToggleRight size={20} className="text-green-600" />
        </div>
      </div>

      <div className="px-8 pb-12">
        {/* Infrastructure Status Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
            INFRASTRUCTURE STATUS
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            {/* System Component Health */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-[#0A1B2E] uppercase tracking-wide mb-6 pb-4 border-b border-gray-200">
                SYSTEM COMPONENT HEALTH
              </h3>

              <div className="grid grid-cols-4 gap-6">
                {/* Web Servers */}
                <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-8">
                  <div className="text-sm font-bold text-[#0A1B2E] mb-6">
                    WEB SERVERS
                  </div>
                  <div className="text-3xl font-bold text-[#0A1B2E] mb-6">
                    5/5
                  </div>
                  <CircularProgress percentage={100} label="load" size={90} />
                </div>

                {/* API Servers */}
                <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-8">
                  <div className="text-sm font-bold text-[#0A1B2E] mb-6">
                    API SERVERS
                  </div>
                  <div className="text-3xl font-bold text-[#0A1B2E] mb-6">
                    8/8
                  </div>
                  <CircularProgress percentage={75} label="load" size={90} />
                </div>

                {/* Database Cluster */}
                <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-8">
                  <div className="text-sm font-bold text-[#0A1B2E] mb-6">
                    DATABASE CLUSTER
                  </div>
                  <div className="text-3xl font-bold text-[#0A1B2E] mb-6">
                    3/3
                  </div>
                  <CircularProgress percentage={65} label="load" size={90} />
                </div>

                {/* Storage System */}
                <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-8">
                  <div className="text-sm font-bold text-[#0A1B2E] mb-6">
                    STORAGE SYSTEM
                  </div>
                  <div className="text-right">
                    <svg width={90} height={90} className="mb-2 mx-auto">
                      {/* Background circle */}
                      <circle
                        cx={45}
                        cy={45}
                        r={40}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      {/* Progress circle for 82% */}
                      <circle
                        cx={45}
                        cy={45}
                        r={40}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeDasharray={251.33}
                        strokeDashoffset={45.24}
                        strokeLinecap="round"
                        style={{
                          transform: `rotate(-90deg)`,
                          transformOrigin: `45px 45px`,
                        }}
                      />
                      {/* Percentage text */}
                      <text
                        x={45}
                        y={45}
                        textAnchor="middle"
                        dy="0.3em"
                        className="text-sm font-bold fill-gray-800"
                      >
                        82%
                      </text>
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">
                      used
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
                PERFORMANCE METRICS
              </h3>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>CPU utilization</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Memory usage</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Network I/O: 245 Mbps</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Disk I/O: 1245 ops/sec</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Dependency Map Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
            SERVICE DEPENDENCY MAP
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-3 gap-8">
              {/* Left: Concentric circles diagram */}
              <div className="flex items-center justify-center col-span-1">
                <svg
                  width={280}
                  height={280}
                  viewBox="0 0 280 280"
                  className="drop-shadow-sm"
                >
                  {/* Outer red ring */}
                  <circle
                    cx={140}
                    cy={140}
                    r={120}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="20"
                    opacity="0.8"
                  />
                  {/* Middle green ring */}
                  <circle
                    cx={140}
                    cy={140}
                    r={80}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="20"
                    opacity="0.8"
                  />
                  {/* Inner yellow circle (mostly filled) */}
                  <circle
                    cx={140}
                    cy={140}
                    r={45}
                    fill="#eab308"
                    opacity="0.9"
                  />
                  {/* Light pink overlay on green */}
                  <circle
                    cx={140}
                    cy={140}
                    r={80}
                    fill="#fce7f3"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Right: Legend and filters */}
              <div className="col-span-2 flex flex-col justify-between">
                {/* Legend */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Green node: Healthy Services
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Yellow node: Warning
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Red node: Critical
                    </span>
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-4">
                  <div className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide">
                    FILTER:
                  </div>
                  <div className="flex gap-3">
                    <button className="px-12 py-4 bg-slate-900 text-white text-sm rounded-xl font-medium hover:bg-slate-800">
                      Show All
                    </button>
                    <button className="px-12 py-4 bg-blue-600 text-white text-sm rounded-xl font-medium hover:bg-blue-700">
                      Only Critical
                    </button>
                    <button className="px-12 py-4 bg-slate-900 text-white text-sm rounded-xl font-medium hover:bg-slate-800">
                      By Region
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert History & Forecast Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
            ALERT HISTORY & FORECAST
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            {/* Alert Trends */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                ALERT TRENDS (LAST 7 DAYS)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Critical: 2</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Warning: 10</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Info: 245</span>
                </li>
              </ul>
            </div>

            {/* Predictive Maintenance */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                PREDICTIVE MAINTENANCE:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Storage full: Predictive in 14 days</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Database performance drop: Predicted in 21 days</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>API server overload: Low risk</span>
                </li>
              </ul>
            </div>

            {/* Recommended Actions */}
            <div>
              <h3 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                RECOMMENDED ACTIONS:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Add 500GB storage within 7 days</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Optimize database indexes this weekend</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Scale API servers by 2 next month</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Maintenance Controls Section */}
        <div className="mt-8 mb-16">
          <h2 className="text-2xl font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
            MAINTENANCE CONTROLS
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            {/* Schedule Maintenance */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
                SCHEDULE MAINTENANCE
              </h3>

              {/* Type */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium text-gray-700 w-24">
                  Type:
                </label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400">
                  <option>Database Optimization</option>
                  <option>Server Update</option>
                  <option>Storage Cleanup</option>
                </select>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium text-gray-700 w-24">
                  Schedule:
                </label>
                <div className="flex gap-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-400">
                    <option>This Weekend</option>
                    <option>Next Week</option>
                    <option>Custom Date</option>
                  </select>
                  <input
                    type="text"
                    placeholder="8:00am - 9:00am"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700"
                  />
                </div>
              </div>

              {/* Impact */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium text-gray-700 w-24">
                  Impact:
                </label>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400">
                  Low - Read-only mode
                </button>
              </div>

              {/* Notify Users */}
              <div className="flex items-center gap-4 mb-8">
                <label className="text-sm font-medium text-gray-700 w-24">
                  Notify Users:
                </label>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400">
                    24 hours before
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400">
                    During
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400">
                    After
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                  Schedule Maintenance
                </button>
                <button className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                  View Maintenance Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
              Run Full Diagnostic
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
              View Logs
            </button>
            <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
              Open Support Ticket
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
