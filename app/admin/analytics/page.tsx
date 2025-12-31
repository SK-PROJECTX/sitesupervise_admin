export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0A1B2E]">
          Platform Analytics & Reporting
        </h1>
        <div>
          <button className="px-4 py-2 border border-gray-300 bg-white rounded text-sm">
            Date Range: This Month
          </button>
        </div>
      </div>

      <section className="space-y-8">
        {/* Top stats + chart row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-2  gap-4">
            <div className="bg-[#0A1B2E] rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-500">MAU (Monthly)</div>
              <div className="text-3xl font-bold text-white mt-2">
                1,842
              </div>
              <div className="mt-3 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded">
                +2.4%
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-500">DAU (Daily)</div>
              <div className="text-3xl font-bold text-[#0A1B2E] mt-2">847</div>
              <div className="mt-3 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded">
                +1.1%
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-500">Growth Health</div>
              <div className="text-2xl font-bold text-[#0A1B2E] mt-2">
                12.4%
              </div>
              <div className="mt-3 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded">
                Strong
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-500">Engagement Score</div>
              <div className="text-2xl font-bold text-[#0A1B2E] mt-2">
                8.7/10
              </div>
              <div className="mt-3 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded">
                High
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-500 mb-2">
              Daily Active Users (30-day trend)
            </div>
            <div className="h-36 bg-gray-50 rounded"></div>
          </div>
        </div>

        {/* Middle charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
            <div className="text-sm text-gray-500 mb-4">
              MODULE USAGE DISTRIBUTION
            </div>
            <div className="h-44 bg-gray-50 rounded"></div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-4">
              DEVICE & PLATFORM USAGE
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    M
                  </div>
                  <div className="text-sm text-gray-700">Mobile</div>
                </div>
                <div className="text-sm text-gray-600">64%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    D
                  </div>
                  <div className="text-sm text-gray-700">Desktop</div>
                </div>
                <div className="text-sm text-gray-600">28%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    T
                  </div>
                  <div className="text-sm text-gray-700">Tablet</div>
                </div>
                <div className="text-sm text-gray-600">8%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
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
        </div>

        {/* Report Generator */}
        <div>
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
        </div>

        {/* Footer action buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-slate-900 text-white rounded">
            Export All Data
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded">
            Compare Periods
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded">
            Set Up Alerts
          </button>
        </div>
      </section>
    </main>
  );
}
