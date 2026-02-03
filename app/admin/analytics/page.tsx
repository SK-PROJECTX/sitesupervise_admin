import { ArrowUpRight, Calendar } from "lucide-react";
import PieChart from "../../../components/PieChart";
import LineChart from "../../../components/LineChart";

export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A1B2E]">
          Platform Analytics & Reporting
        </h1>
        <div>
          <button className="px-4 py-2 border border-gray-300 bg-white rounded text-sm flex items-center gap-2 hover:bg-gray-50">
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
              <div className="bg-[#0A1B2E] rounded-tl-3xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-2">
                      MAU (Monthly)
                    </div>
                    <div className="text-4xl font-bold text-white">1,842</div>
                    <div className="mt-3 inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      +2.4%
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-[#D9D9D9] hover:bg-gray-300 ml-2 flex-shrink-0">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                      className="text-gray-600"
                    />
                  </button>
                </div>
              </div>

              {/* DAU Card */}
              <div className="bg-white rounded-tr-3xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-2">
                      DAU (Daily)
                    </div>
                    <div className="text-4xl font-bold text-[#0A1B2E]">847</div>
                    <div className="mt-3 inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      +1.1%
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-[#D9D9D9] hover:bg-gray-300 ml-2 flex-shrink-0">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                      className="text-gray-600"
                    />
                  </button>
                </div>
              </div>

              {/* Growth Health Card */}
              <div className="bg-white rounded-bl-3xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-2">
                      Growth Health
                    </div>
                    <div className="text-4xl font-bold text-[#0A1B2E]">
                      12.4%
                    </div>
                    <div className="mt-3 inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      Strong
                    </div>
          cd        </div>
                  <button className="p-2 rounded-full bg-[#D9D9D9] hover:bg-gray-300 ml-2 flex-shrink-0">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                      className="text-gray-600"
                    />
                  </button>
                </div>
              </div>

              {/* Engagement Score Card */}
              <div className="bg-white rounded-br-3xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-2">
                      Engagement Score
                    </div>
                    <div className="text-4xl font-bold text-[#0A1B2E]">
                      8.7/10
                    </div>
                    <div className="mt-3 inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      High
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-[#D9D9D9] hover:bg-gray-300 ml-2 flex-shrink-0">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                      className="text-gray-600"
                    />
                  </button>
                </div>
              </div>
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
              <button className="px-6 py-3 bg-slate-900 text-white rounded">
                Generate Now
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded">
                Schedule New Report
              </button>
              <button className="px-6 py-3 bg-white border border-gray-200 rounded">
                View Report History
              </button>
            </div>
          </div>
        </section>

        {/* Footer action buttons */}
        <section className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-slate-900 text-white rounded">
            Export All Data
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded">
            Compare Periods
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded">
            Set Up Alerts
          </button>
        </section>
      </div>
    </main>
  );
}
