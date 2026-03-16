"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "../../../components/admin/PageHeader";
import { Card } from "../../../components/ui/Card";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { useActiveProjectsGrid, useProjectDashboard } from "../../../lib/hooks";
import { ProjectUsersModal } from "./ProjectUsersModal";

interface Project {
  id: number;
  icon?: string;
  name: string;
  company: string;
  progress: number;
  status?: string;
  health_status_label?: string;
}

interface MetricCard {
  label: string;
  value: number;
  percentage: number;
  color: "orange" | "blue" | "gray" | "green";
}

function ProgressCircle({
  percentage,
  color,
}: {
  percentage: number;
  color: "orange" | "blue" | "gray" | "green";
}) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    orange: "#FF6B35",
    blue: "#1E90FF",
    gray: "#D1D5DB",
    green: "green",
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
      <span className="text-sm font-bold text-gray-700">
        {Math.round(percentage)}%
      </span>
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
  const status = project.health_status_label || project.status || "Unknown";
  const isGood = status.toLowerCase() === "good";

  return (
    <tr
      className="border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-50"
      onClick={() => onRowClick(project)}
    >
      <td className="px-6 py-5">
        <span className="text-2xl">{project.icon || "🏢"}</span>
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
              stroke={isGood ? "#1E90FF" : "#FF6B35"}
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
        <Badge
          variant={isGood ? "neutral" : "danger"}
          className={
            isGood ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
          }
        >
          {status}
        </Badge>
      </td>
    </tr>
  );
}

export default function ProjectManagementPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const {
    data: gridData,
    fetchActiveProjectsGrid,
    loading: gridLoading,
  } = useActiveProjectsGrid();

  const {
    stats,
    fetchProjectDashboard,
    loading: statsLoading,
  } = useProjectDashboard();

  useEffect(() => {
    fetchProjectDashboard();
    fetchActiveProjectsGrid();
  }, []);

  const metrics: MetricCard[] = [
    {
      label: "TOTAL PROJECTS",
      value: stats.total_projects,
      percentage: 100,
      color: "green",
    },
    {
      label: "ACTIVE PROJECTS",
      value: stats.active_projects,
      percentage: (stats.active_projects / stats.total_projects) * 100 || 0,
      color: "orange",
    },
    {
      label: "COMPLETED PROJECTS",
      value: stats.completed_projects,
      percentage: (stats.completed_projects / stats.total_projects) * 100 || 0,
      color: "blue",
    },
    {
      label: "AT RISK",
      value: stats.at_risk,
      percentage: (stats.at_risk / stats.total_projects) * 100 || 0,
      color: "gray",
    },
  ];

  const projects = gridData.results || [];

  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <PageHeader title="Platform Project Management">
        <Button
          variant="outline"
          className="bg-white text-gray-700 border-gray-300"
          onClick={() => fetchActiveProjectsGrid()}
        >
          {gridLoading ? "Refreshing..." : "View: All Active"}
        </Button>
      </PageHeader>

      {/* Content */}
      <section className="px-8 py-10" id="analytics">
        <SectionHeader
          title="PROJECT PORTFOLIO DASHBOARD"
          className="text-sm"
        />

        <div className="bg-white rounded-3xl p-0 shadow-sm mb-12 overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-8 flex flex-col items-center justify-center"
              >
                <h3 className="text-xs font-bold text-[#0A1B2E] mb-8 text-center uppercase">
                  {metric.label}
                </h3>
                <p className="text-5xl font-bold text-gray-900 mb-6">
                  {statsLoading ? "..." : metric.value}
                </p>
                {!statsLoading && metric.percentage > 0 && (
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

      <section className="px-8 pb-12" id="active">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <SectionHeader
            title="ACTIVE PROJECTS GRID"
            className="text-sm !mb-0"
          />
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={(e) => {
                  const term = e.target.value;
                  if (term.length >= 2 || term.length === 0) {
                    fetchActiveProjectsGrid({ search: term });
                  }
                }}
              />
            </div>
            <select
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) => {
                const status = e.target.value;
                fetchActiveProjectsGrid({ health_status: status || undefined });
              }}
            >
              <option value="">All Health Statuses</option>
              <option value="GOOD">Good</option>
              <option value="RISK">Risk</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>

        <Card>
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
                {gridLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Loading projects...
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project: any) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      onRowClick={setSelectedProject}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No active projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {gridData.count > 0 && (
            <div className="mt-4 flex items-center justify-between px-2">
              <p className="text-xs text-gray-500">
                Showing {projects.length} of {gridData.count} projects
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!gridData.previous || gridLoading}
                  onClick={() => {
                    if (gridData.previous) {
                      const url = new URL(gridData.previous);
                      const page = url.searchParams.get("page") || "1";
                      fetchActiveProjectsGrid({ page });
                    }
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!gridData.next || gridLoading}
                  onClick={() => {
                    if (gridData.next) {
                      const url = new URL(gridData.next);
                      const page = url.searchParams.get("page");
                      fetchActiveProjectsGrid({ page: page || undefined });
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
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
                  <li>
                    Health Status:{" "}
                    {selectedProject.health_status_label ||
                      selectedProject.status}
                  </li>
                  <li>Overall Progress: {selectedProject.progress}%</li>
                  {/* Mock details for static parts of modal */}
                  <li>Timeline: Jan 2023 - Dec 2024</li>
                  <li>Users: 42 active</li>
                  <li>Storage: 245GB</li>
                  <li>API calls: 12,450/day avg</li>
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
                  <Button className="bg-slate-900 text-white h-auto py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    View Analytics
                  </Button>
                  <Button
                    className="bg-blue-600 text-white h-auto py-3 rounded-lg text-xs font-medium hover:bg-blue-700"
                    onClick={() => setIsUserModalOpen(true)}
                  >
                    Manage Users
                  </Button>
                  <Button className="bg-slate-900 text-white h-auto py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    Download Logs
                  </Button>
                  <Button className="bg-slate-900 text-white h-auto py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    Configure
                  </Button>
                  <Button className="bg-blue-600 text-white h-auto py-3 rounded-lg text-xs font-medium hover:bg-blue-700">
                    Backup
                  </Button>
                  <Button className="bg-slate-900 text-white h-auto py-3 rounded-lg text-xs font-medium hover:bg-slate-800">
                    Edit Tags
                  </Button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8">
              <Button
                onClick={() => setSelectedProject(null)}
                variant="outline"
                className="w-full bg-gray-300 text-gray-800 h-auto py-3 rounded-lg text-sm font-medium hover:bg-gray-400 border-none"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <ProjectUsersModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          project={selectedProject}
        />
      )}

      {/* PROJECT TEMPLATE*/}
      <section className="px-8 pb-12" id="templates">
        <SectionHeader title="PROJECT TEMPLATE" className="text-sm" />

        <Card>
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
              <Button className="bg-slate-900 text-white h-auto px-6 py-3 rounded-full text-sm font-medium">
                Create from Template
              </Button>
              <Button className="bg-blue-600 text-white h-auto px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700">
                Save Current as Template
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* PRIMARY ACTION BAR */}
      <div className="px-8 pb-12 flex flex-wrap gap-4">
        <Button className="bg-slate-900 text-white h-auto px-8 py-4 rounded-xl text-sm">
          Create New Project
        </Button>
        <Button className="bg-blue-600 text-white h-auto px-8 py-4 rounded-xl text-sm hover:bg-blue-700">
          Import Project
        </Button>
        <Button className="bg-slate-900 text-white h-auto px-8 py-4 rounded-xl text-sm">
          Export Project List
        </Button>
      </div>
    </main>
  );
}
