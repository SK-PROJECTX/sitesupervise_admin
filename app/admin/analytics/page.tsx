import { ArrowUpRight, Calendar } from "lucide-react";
import PieChart from "../../../components/PieChart";
import LineChart from "../../../components/LineChart";
import { StatCard } from "../../../components/admin/StatCard";
import { useState } from "react";
import { GeneralModal } from "../../../components/admin/GeneralModal";

export default function AdminAnalyticsPage() {
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type?: "info" | "success" | "warning" | "question";
    actionLabel?: string;
    onAction?: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
  });

  const openModal = (config: Omit<typeof modalConfig, "isOpen">) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A1B2E]">
          Platform Analytics & Reporting
        </h1>
        <div>
          <button
            onClick={() =>
              openModal({
                title: "Analytics Timeframe",
                description:
                  "Adjust the reporting period for the entire dashboard. You can select custom ranges or compare against previous periods.",
                type: "info",
              })
            }
            className="px-4 py-2 border border-gray-300 bg-white rounded text-sm flex items-center gap-2 hover:bg-gray-50"
          >
            <Calendar size={16} />
            Date Range: This Month
          </button>
        </div>
      </div>

      <div className=" px-8 py-10 space-y-8">
        {/* Top stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: 2x2 grid of metrics */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
              KEY METRICS OVERVIEW
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* MAU Card */}
              <StatCard
                title="MAU (Monthly)"
                value="1,842"
                badge="+2.4%"
                badgeColor="green"
                style="dark"
                corner="tl"
              />

              {/* DAU Card */}
              <StatCard
                title="DAU (Daily)"
                value="847"
                badge="+1.1%"
                badgeColor="green"
                style="outlined"
                corner="tr"
              />

              {/* Growth Health Card */}
              <StatCard
                title="Growth Health"
                value="12.4%"
                badge="Strong"
                badgeColor="green"
                style="outlined"
                corner="bl"
              />

              {/* Engagement Score Card */}
              <StatCard
                title="Engagement Score"
                value="8.7/10"
                badge="High"
                badgeColor="green"
                style="outlined"
                corner="br"
              />
            </div>
          </div>

          {/* Right: Chart */}
          <div>
            <h2 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
              USAGE ANALYTICS CHARTS
            </h2>

            <div className="bg-white  rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="text-xs text-gray-600 mb-3">
                DAILY ACTIVE USERS (30-day trend)
              </div>
              <LineChart />
              {/* <div className="h-48 bg-gray-50 rounded-lg"></div> */}
            </div>
          </div>
        </div>

        {/* Usage Analytics Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - two stacked charts */}
          <div className="space-y-4">
            {/* Module Usage Distribution */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-[#0A1B2E] mb-4">
                MODULE USAGE DISTRIBUTION
              </div>
              <PieChart />
            </div>
          </div>

          {/* Right: Daily Active Users Chart */}
          {/* Device & Platform Usage */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm font-semibold text-[#0A1B2E] mb-6">
              DEVICE & PLATFORM USAGE
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 font-medium">Mobile:</div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-blue-500 bg-white relative">
                  <span className="text-xs font-bold text-blue-600">64%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 font-medium">
                  Desktop:
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-red-500 bg-white relative">
                  <span className="text-xs font-bold text-red-600">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 font-medium">Tablet:</div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-gray-400 bg-white relative">
                  <span className="text-xs font-bold text-gray-600">8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 font-medium">iOS:</div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-red-500 bg-white relative">
                  <span className="text-xs font-bold text-red-600">31%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 font-medium">
                  Android:
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-red-500 bg-white relative">
                  <span className="text-xs font-bold text-red-600">33%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Section */}
        <section>
          <h2 className="text-lg font-bold text-[#0A1B2E] mb-4">
            PERFORMANCE METRICS
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">
                  SYSTEM PERFORMANCE
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• API response time: 85ms (target &lt;100ms)</li>
                  <li>
                    • Uptime: <strong>99.99%</strong> (this month)
                  </li>
                  <li>• Error rate: 0.23% (low)</li>
                  <li>• AR processing time: 12.4s avg</li>
                  <li>• AI inference time: 98ms avg</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">
                  USER SATISFACTION
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• NPS Score: +48 (Excellent)</li>
                  <li>• CSAT: 4.7/5</li>
                  <li>
                    • Support tickets: 42{" "}
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded ml-2">
                      -10% from last month
                    </span>
                  </li>
                  <li>• Feature requests: 128</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Report Generator Section */}
        <section>
          <h2 className="text-lg font-bold text-[#0A1B2E] mb-4">
            REPORT GENERATOR
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">GENERATE REPORTS</h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <div>
                    Report Type:{" "}
                    <span className="font-medium">Performance</span>
                  </div>
                  <div>
                    Date Range: <span className="font-medium">This Month</span>
                  </div>
                  <div>
                    Format: <span className="font-medium">PDF</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">
                  SCHEDULED REPORTS
                </h3>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                  <li>Weekly Usage Report (Mon 9 AM)</li>
                  <li>Monthly Performance Review (1st of month)</li>
                  <li>Quarterly Business Review</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  openModal({
                    title: "Report Generation",
                    description:
                      "Compiling data and generating your Performance Report for 'This Month' in PDF format. This might take a few moments.",
                    type: "success",
                    actionLabel: "Download PDF",
                    onAction: () => closeModal(),
                  })
                }
                className="px-6 py-3 bg-slate-900 text-white rounded hover:bg-slate-800"
              >
                Generate Now
              </button>
              <button
                onClick={() =>
                  openModal({
                    title: "Schedule Automated Report",
                    description:
                      "Configure recurring report delivery to your email. You can customize participants, frequency, and content depth.",
                    type: "question",
                    actionLabel: "Set Schedule",
                    onAction: () => closeModal(),
                  })
                }
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Schedule New Report
              </button>
              <button
                onClick={() =>
                  openModal({
                    title: "Report Repository",
                    description:
                      "Accessing all previously generated reports. You can download, share, or delete historical reports from this archive.",
                    type: "info",
                  })
                }
                className="px-6 py-3 bg-white border border-gray-200 rounded hover:bg-gray-50"
              >
                View Report History
              </button>
            </div>
          </div>
        </section>

        {/* Footer action buttons */}
        <section className="flex gap-4 mt-6">
          <button
            onClick={() =>
              openModal({
                title: "Full Data Export",
                description:
                  "Exporting all platform raw data for 'This Month'. This include user metrics, system logs, and project metadata.",
                type: "warning",
                actionLabel: "Confirm Export",
                onAction: () => closeModal(),
              })
            }
            className="px-6 py-3 bg-slate-900 text-white rounded hover:bg-slate-800"
          >
            Export All Data
          </button>
          <button
            onClick={() =>
              openModal({
                title: "Comparative Analysis",
                description:
                  "Initializing comparison mode. Selected periods will be overlaid on all charts to highlight growth and trends.",
                type: "info",
                actionLabel: "Select Period",
                onAction: () => closeModal(),
              })
            }
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Compare Periods
          </button>
          <button
            onClick={() =>
              openModal({
                title: "Analytics Alerts",
                description:
                  "Configure threshold alerts for key metrics. You will be notified via email or SMS when metrics deviate from expected patterns.",
                type: "question",
                actionLabel: "Configure Alerts",
                onAction: () => closeModal(),
              })
            }
            className="px-6 py-3 bg-white border border-gray-200 rounded hover:bg-gray-50"
          >
            Set Up Alerts
          </button>
        </section>
      </div>

      <GeneralModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        description={modalConfig.description}
        type={modalConfig.type}
        actionLabel={modalConfig.actionLabel}
        onAction={modalConfig.onAction}
      />
    </main>
  );
}
