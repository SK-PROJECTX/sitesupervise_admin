"use client";

import React, { useState } from "react";

interface Project {
  id: number;
  icon: string;
  name: string;
  company: string;
  progress: number;
  status: "good" | "risk";
}

const PROJECTS: Project[] = [
  {
    id: 1,
    icon: "🏢",
    name: "ABC Tower",
    company: "ABC Corset",
    progress: 33,
    status: "good",
  },
  {
    id: 2,
    icon: "🌉",
    name: "River Bridge",
    company: "Slate DoT",
    progress: 68,
    status: "risk",
  },
  {
    id: 3,
    icon: "🛣️",
    name: "Highway Section",
    company: "Fed Highway",
    progress: 85,
    status: "risk",
  },
  {
    id: 4,
    icon: "🏛️",
    name: "Marine Terminal",
    company: "Port Auth",
    progress: 45,
    status: "good",
  },
  {
    id: 5,
    icon: "🏢",
    name: "Office Complex",
    company: "DevCorp",
    progress: 72,
    status: "good",
  },
];

interface MetricCard {
  label: string;
  value: number;
  percentage: number;
  color: "orange" | "blue" | "gray";
}

const METRICS: MetricCard[] = [
  { label: "TOTAL PROJECTS", value: 142, percentage: 0, color: "gray" },
  { label: "ACTIVE PROJECTS", value: 47, percentage: 33, color: "orange" },
  { label: "COMPLETED PROJECTS", value: 82, percentage: 58, color: "blue" },
  { label: "OVERDUE PROJECTS", value: 13, percentage: 9, color: "gray" },
];

function ProgressCircle({
  percentage,
  color,
}: {
  percentage: number;
  color: "orange" | "blue" | "gray";
}) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    orange: "#FF6B35",
    blue: "#1E90FF",
    gray: "#D1D5DB",
  };

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute" width={100} height={100}>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colorMap[color]}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="text-sm font-bold text-gray-700">{percentage}%</span>
    </div>
  );
}

function ProjectRow({
  project,
  onRowClick,
}: {
  project: Project;
  onRowClick: (project: Project) => void;
}) {
  return (
    <tr
      className="border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-50"
      onClick={() => onRowClick(project)}
    >
      <td className="px-6 py-5">
        <span className="text-2xl">{project.icon}</span>
      </td>
      <td className="px-6 py-5 text-sm font-medium text-gray-900">
        {project.name}
      </td>
      <td className="px-6 py-5 text-sm text-gray-700">{project.company}</td>
      <td className="px-6 py-5">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute" width={60} height={60}>
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="4"
            />
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke={project.status === "good" ? "#1E90FF" : "#FF6B35"}
              strokeWidth="4"
              strokeDasharray={`${(project.progress / 100) * 157} 157`}
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
            />
          </svg>
          <span className="text-xs font-semibold text-gray-600">
            {project.progress}%
          </span>
        </div>
      </td>
      <td className="px-6 py-5 text-sm font-medium text-gray-900">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            project.status === "good"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {project.status === "good" ? "Good" : "Risk"}
        </span>
      </td>
    </tr>
  );
}

export default function ProjectManagementPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-[#0A1B2E]">
          Platform Project Management
        </h1>

        <button className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm text-gray-700">
          View: All Active
        </button>
      </div>

      {/* Content */}
      <section className="px-8 py-10" id="analytics">
        <h2 className="text-sm font-bold text-[#0A1B2E] mb-6">
          PROJECT PORTFOLIO DASHBOARD
        </h2>

        <div className="bg-white rounded-3xl p-0 shadow-sm mb-12 overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-8 flex flex-col items-center justify-center"
              >
                <h3 className="text-xs font-bold text-[#0A1B2E] mb-8 text-center">
                  {metric.label}
                </h3>
                <p className="text-5xl font-bold text-gray-900 mb-6">
                  {metric.value}
                </p>
                {metric.percentage > 0 && (
                  <ProgressCircle
                    percentage={metric.percentage}
                    color={metric.color}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE PROJECTS SECTION */}
      <section className="px-8 pb-12" id="active">
        <h2 className="text-sm font-bold text-[#0A1B2E] mb-4">
          ACTIVE PROJECTS GRID
        </h2>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#0A1B2E] font-semibold border-b border-gray-200">
                  <th className="px-6 py-5"></th>
                  <th className="px-6 py-5">PROJECT NAME</th>
                  <th className="px-6 py-5">COMPANY</th>
                  <th className="px-6 py-5">PROGRESS</th>
                  <th className="px-6 py-5">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {PROJECTS.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    onRowClick={setSelectedProject}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide">
                📋 {selectedProject.name} - DETAILS
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-8">
              {/* Project Details Section */}
              <div>
                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                  <li>Client: {selectedProject.company}</li>
                  <li>Value: $5.8M</li>
                  <li>Timeline: Jan 2023 - Dec 2024</li>
                  <li>Users: 42 active</li>
                  <li>Storage: 245GB</li>
                  <li>Last Backup: 08:00 AM Today</li>
                  <li>API calls: 12,450/day avg</li>
                  <li>AR Score: 842 completed</li>
                </ul>
              </div>

              {/* Project Settings Section */}
              <div>
                <h3 className="text-sm font-bold text-[#0A1B2E] mb-4 flex items-center gap-2">
                  ⚙️ PROJECT SETTINGS:
                </h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                  <li>Module enabled: All</li>
                  <li>AI features: Enabled</li>
                  <li>Client Portal: Enabled</li>
                  <li>Data retention: 7 years</li>
                </ul>
              </div>

              {/* Quick Actions Section */}
              <div>
                <h4 className="text-sm font-bold text-[#0A1B2E] mb-4 uppercase tracking-wide">
                  QUICK ACTIONS:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button className="bg-slate-900 text-white px-4 py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    View Analytics
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-3 rounded-lg text-xs font-medium hover:bg-blue-700">
                    Manage Users
                  </button>
                  <button className="bg-slate-900 text-white px-4 py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    Download Logs
                  </button>
                  <button className="bg-slate-900 text-white px-4 py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    Configure
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-3 rounded-lg text-xs font-medium hover:bg-blue-700">
                    Backup
                  </button>
                  <button className="bg-slate-900 text-white px-4 py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    Edit Tags
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full bg-gray-300 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT TEMPLATE*/}
      <section className="px-8 pb-12" id="templates">
        <h2 className="text-sm font-bold text-[#0A1B2E] mb-4">
          PROJECT TEMPLATE
        </h2>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-[#0A1B2E] mb-6 flex items-center gap-2">
              📋 PROJECT TEMPLATES
            </h4>

            <ul className="space-y-3 text-sm text-gray-700 mb-8 list-disc pl-5">
              <li>High-Rate Construction</li>
              <li>Highway Project</li>
              <li>Marine Project</li>
              <li>Renovation Project</li>
            </ul>

            <div className="flex gap-4">
              <button className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium">
                Create from Template
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium">
                Save Current as Template
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY ACTION BAR */}
      <div className="px-8 pb-12 flex flex-wrap gap-4">
        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-sm">
          Create New Project
        </button>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-sm">
          Import Project
        </button>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-sm">
          Export Project List
        </button>
      </div>
    </main>
  );
}
