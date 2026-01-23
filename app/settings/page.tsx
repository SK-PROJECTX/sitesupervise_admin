"use client";
import { useState } from "react";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-[#0A1B2E] mb-4">{children}</h2>;
}

export default function AdminSettingsIndex() {
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [timezone, setTimezone] = useState("UTC-06:00 Eastern Time");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [integrations, setIntegrations] = useState({
    weather: true,
    bim: true,
    accounting: false,
    erp: false,
  });

  function toggleIntegration(key: keyof typeof integrations) {
    setIntegrations((s) => ({ ...s, [key]: !s[key] }));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0A1B2E]">
          Platform Configuration
        </h1>
        <div>
          <button className="px-4 py-2 border border-gray-300 bg-white rounded text-sm">
            Save Changes
          </button>
        </div>
      </div>

      <section className="space-y-8">
        <div className="bg-gray-200 rounded p-6">
          <div className="flex gap-3 flex-wrap">
            <a
              href="#general"
              className="px-4 py-2 bg-slate-900 text-white rounded"
            >
              General
            </a>
            <a
              href="#integrations"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Integrations
            </a>
            <a
              href="#modules"
              className="px-4 py-2 bg-slate-900 text-white rounded"
            >
              Modules
            </a>
            <button className="px-4 py-2 bg-slate-900 text-white rounded">
              Security
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Network
            </button>
          </div>
        </div>

        <div id="general" className="bg-white rounded-2xl p-8 shadow-sm">
          <SectionHeader>General Settings</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold">
                  Company Information
                </legend>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">
                    Platform Name
                  </label>
                  <div className="text-sm text-gray-600">Sitesupervise</div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">
                    Company Logo
                  </label>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Upload
                  </button>
                  <span className="text-sm text-gray-500">
                    (current: logo.png)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">
                    Support Email
                  </label>
                  <input
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-80 text-sm"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-80 text-sm"
                  >
                    <option>UTC-06:00 Eastern Time</option>
                    <option>UTC+00:00 UTC</option>
                    <option>UTC+05:30 India</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">
                    Date Format
                  </label>
                  <input
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-80 text-sm"
                  />
                </div>
              </fieldset>

              <fieldset className="mt-6 space-y-4">
                <legend className="text-sm font-semibold">
                  Performance Setting
                </legend>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">
                    AR processing priority
                  </label>
                  <div className="px-3 py-1 border rounded text-sm">
                    Balanced
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-700">
                    AI model refresh
                  </label>
                  <div className="px-3 py-1 border rounded text-sm">Daily</div>
                </div>
              </fieldset>
            </div>

            <div>
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold">
                  Storage Settings
                </legend>
                <div className="flex items-center gap-4">
                  <label className="w-48 text-sm text-gray-700">
                    Max project size
                  </label>
                  <input
                    className="border rounded px-3 py-2 w-full text-sm"
                    defaultValue="500GB"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48 text-sm text-gray-700">
                    Max file size
                  </label>
                  <input
                    className="border rounded px-3 py-2 w-full text-sm"
                    defaultValue="250MB"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48 text-sm text-gray-700">
                    Retention policy
                  </label>
                  <div className="px-3 py-1 border rounded text-sm">
                    Active 7 years, archived 3 years
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48 text-sm text-gray-700">
                    Auto-cleanup
                  </label>
                  <div className="px-3 py-1 border rounded text-sm">
                    Enabled
                  </div>
                </div>
              </fieldset>

              <fieldset className="mt-6 space-y-4">
                <legend className="text-sm font-semibold">
                  Module Configuration
                </legend>
                <div className="border rounded p-4 text-sm text-gray-700">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="pb-2">Module</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Version</th>
                        <th className="pb-2">Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Task Management</td>
                        <td>Enabled</td>
                        <td>v2.4.1</td>
                        <td>High (98%)</td>
                      </tr>
                      <tr>
                        <td className="py-2">AR Tools</td>
                        <td>Enabled</td>
                        <td>v3.1.2</td>
                        <td>Medium (65%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div id="integrations" className="bg-white rounded-2xl p-8 shadow-sm">
          <SectionHeader>Integration Settings</SectionHeader>
          <div className="space-y-6">
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-2">Active Integration</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={integrations.weather}
                    onChange={() => toggleIntegration("weather")}
                  />
                  <div>
                    <div className="font-semibold">
                      Weather API (Openweather)
                    </div>
                    <div className="text-xs text-gray-500">
                      Status: Connected | Usage: 1245 calls/day
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={integrations.bim}
                    onChange={() => toggleIntegration("bim")}
                  />
                  <div>
                    <div className="font-semibold">
                      BIM Software (Autodesk BIM 360)
                    </div>
                    <div className="text-xs text-gray-500">
                      Status: Connected | Last sync: 10:15AM
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={integrations.accounting}
                    onChange={() => toggleIntegration("accounting")}
                  />
                  <div>
                    <div className="font-semibold">
                      Accounting Software (QuickBooks)
                    </div>
                    <div className="text-xs text-gray-500">
                      Status: Connected | Sync: Bi-directional
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={integrations.erp}
                    onChange={() => toggleIntegration("erp")}
                  />
                  <div>
                    <div className="font-semibold">ERP System (SAP)</div>
                    <div className="text-xs text-gray-500">
                      Status: Not configured
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Add New Integration</p>
              <div className="flex gap-3 flex-wrap">
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Select: Weather</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>BIM</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Accounting</option>
                </select>
                <button className="px-3 py-2 border rounded text-sm">
                  Custom API
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <button className="px-6 py-3 bg-slate-900 text-white rounded">
            Test All Settings
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded">
            Revert to Defaults
          </button>
          <button className="px-6 py-3 border rounded">
            Export Configuration
          </button>
        </div>
      </section>
    </main>
  );
}
