"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { GeneralModal } from "../../../components/admin/GeneralModal";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold text-[#0A1B2E] mb-6 uppercase tracking-wide">
      {children}
    </h2>
  );
}

export default function AdminSettingsIndex() {
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

  const handleExport = () => {
    // Current configuration snapshot
    const config = {
      general: {
        platformName: "Sitesupervise Pro",
        supportEmail: "support@sitesupervise.com",
        timezone: "UTC-06:00 Eastern Time",
        dateFormat: "MM/DD/YYYY",
      },
      performance: {
        arPriority: "Balanced",
        aiRefresh: "Daily",
        cacheDuration: "24 hours",
        backupFrequency: "Every 6 hours",
      },
      storage: {
        maxProjectSize: "1000GB",
        maxFileSize: "2GB",
        retentionPolicy: "Active 7 years, archived 3 years",
        autoCleanup: "Enabled",
      },
      exportTimestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sitesupervise-config-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    openModal({
      title: "Configuration Exported",
      description:
        "The current platform configuration has been successfully compiled into a JSON manifest and dispatched to your local downloads.\n\nFilename: sitesupervise-config.json",
      type: "success",
    });
  };

  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-[#0A1B2E]">
          Platform Configuration
        </h1>
        <button
          onClick={() =>
            openModal({
              title: "Save Configuration",
              description:
                "Commit all changes to the platform core. This will update company metadata, performance thresholds, and storage policies across all instances.",
              type: "question",
              actionLabel: "Save Changes",
              onAction: () => closeModal(),
            })
          }
          className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          Save Changes
        </button>
      </div>

      {/* Content */}
      <section className="px-8 py-10 space-y-12">
        {/* GENERAL SETTINGS */}
        <div id="general">
          <SectionHeader>GENERAL SETTINGS</SectionHeader>

          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <fieldset className="space-y-6 mb-10">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                COMPANY INFORMATION
              </legend>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Platform Name
                  </label>
                  <span className="text-sm text-gray-600">
                    (Sitesupervise Pro)
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Company Logo
                  </label>
                  <button
                    onClick={() =>
                      openModal({
                        title: "Asset Management",
                        description:
                          "Upload a high-resolution logo for your platform instance. Supported formats: .PNG, .SVG, .JPG.",
                        type: "info",
                        actionLabel: "Select Image",
                        onAction: () => closeModal(),
                      })
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Upload
                  </button>
                  <span className="text-sm text-gray-500">
                    (current: logo.png)
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="support@sitesupervise.com"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">Timezone</label>
                  <input
                    type="text"
                    defaultValue="UTC-06:00 Eastern Time"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Date Format
                  </label>
                  <input
                    type="text"
                    defaultValue="MM/DD/YYYY"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-6 mb-10">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                PERFORMANCE SETTING
              </legend>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    AR processing priority
                  </label>
                  <input
                    type="text"
                    defaultValue="Balanced"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    AI model refresh
                  </label>
                  <input
                    type="text"
                    defaultValue="Daily"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Data cache duration
                  </label>
                  <input
                    type="text"
                    defaultValue="24 hours"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Auto-backup frequency
                  </label>
                  <input
                    type="text"
                    defaultValue="Every 6 hours"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                STORAGE SETTINGS
              </legend>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Max project size
                  </label>
                  <input
                    type="text"
                    defaultValue="1000GB"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Max file size
                  </label>
                  <input
                    type="text"
                    defaultValue="2GB"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Retention policy
                  </label>
                  <input
                    type="text"
                    defaultValue="Active 7 years, archived 3 years"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-700">
                    Auto-cleanup
                  </label>
                  <input
                    type="text"
                    defaultValue="Enabled"
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 w-64 text-sm"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        {/* INTEGRATIONS */}
        <div id="integrations">
          <SectionHeader>INTEGRATION SETTINGS</SectionHeader>

          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <fieldset className="space-y-8 mb-10">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
                ACTIVE INTEGRATION
              </legend>

              <div className="space-y-6">
                {/* Weather API */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4"
                    />
                    <label className="text-sm font-medium text-gray-800">
                      Weather API (Openweather)
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 ml-7">
                    Status: Connected | Usage: 1245 calls/day
                  </p>
                </div>

                {/* BIM Software */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4"
                    />
                    <label className="text-sm font-medium text-gray-800">
                      BIM Software (Autodesk BIM 360)
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 ml-7">
                    Status: Connected | Last sync: 10:15AM
                  </p>
                </div>

                {/* Accounting Software */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4" />
                    <label className="text-sm font-medium text-gray-800">
                      Accounting Software (QuickBooks)
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 ml-7">
                    Status: Connected | Sync: Bi-directional
                  </p>
                </div>

                {/* ERP System */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4" />
                    <label className="text-sm font-medium text-gray-800">
                      ERP System (SAP)
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 ml-7">
                    Status: Not configured
                  </p>
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                ADD NEW INTEGRATION
              </legend>

              <div className="flex gap-3 flex-wrap">
                <select className="border border-gray-300 text-gray-700 rounded px-4 py-2 text-sm min-w-48 hover:border-gray-400">
                  <option>Select: Weather</option>
                </select>
                <select className="border border-gray-300 text-gray-700 rounded px-4 py-2 text-sm min-w-32 hover:border-gray-400">
                  <option>BIM</option>
                </select>
                <select className="border border-gray-300 text-gray-700 rounded px-4 py-2 text-sm min-w-40 hover:border-gray-400">
                  <option>Accounting</option>
                </select>
                <button
                  onClick={() =>
                    openModal({
                      title: "Custom API Integration",
                      description:
                        "Register a new external data source. This will allow the platform to ingest third-party telemetry and synchronize project metadata.",
                      type: "question",
                      actionLabel: "Add Endpoint",
                      onAction: () => closeModal(),
                    })
                  }
                  className="border border-gray-300 text-gray-700 rounded px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Custom API
                </button>
              </div>
            </fieldset>
          </div>
        </div>

        {/* MODULE CONFIGURATION */}
        <div id="module-config">
          <SectionHeader>MODULE CONFIGURATION TAB</SectionHeader>

          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <fieldset className="space-y-8 mb-12">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-6">
                ENABLED MODULES
              </legend>

              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-300">
                      <th className="px-6 py-4 text-left font-bold text-[#0A1B2E]">
                        MODULE
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-[#0A1B2E]">
                        STATUS
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-[#0A1B2E]">
                        VERSION
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-[#0A1B2E]">
                        USAGE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4">Task Management</td>
                      <td className="px-6 py-4">Enabled</td>
                      <td className="px-6 py-4">v2.41</td>
                      <td className="px-6 py-4">High (98%)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4">AR Tools</td>
                      <td className="px-6 py-4">Enabled</td>
                      <td className="px-6 py-4">v3.1.2</td>
                      <td className="px-6 py-4">Medium (65%)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4">AI Engine</td>
                      <td className="px-6 py-4">Enabled</td>
                      <td className="px-6 py-4">v4.0.1</td>
                      <td className="px-6 py-4">High (92%)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4">Client Portal</td>
                      <td className="px-6 py-4">Limited</td>
                      <td className="px-6 py-4">v1.8.3</td>
                      <td className="px-6 py-4">Low (42%)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Financial Module</td>
                      <td className="px-6 py-4">Disabled</td>
                      <td className="px-6 py-4">--</td>
                      <td className="px-6 py-4">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide mb-4">
                MODULE SETTINGS
              </legend>

              <div className="space-y-3 text-sm text-gray-700">
                <p>AR: Max scans/day: 1,000</p>
                <p>AI: Max prediction/hour: 10,000</p>
                <p>Task: Max concurrent: 500</p>
                <p>Storage: Max per project: 500GB</p>
              </div>
            </fieldset>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-12 pb-6">
            <Button
              className="bg-slate-900 text-white rounded-xl px-8 py-6 h-auto text-sm font-semibold hover:bg-slate-800 shadow-md transition-all active:scale-95"
              onClick={() =>
                openModal({
                  title: "Platform Diagnostics",
                  description:
                    "Running a comprehensive audit of all configuration parameters, API connectivity, and storage integrity. This process will identify any potential misconfigurations.",
                  type: "info",
                  actionLabel: "Start Test",
                  onAction: () => closeModal(),
                })
              }
            >
              Test All Settings
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 bg-white rounded-xl px-8 py-6 h-auto text-sm font-semibold hover:bg-blue-50 shadow-sm transition-all active:scale-95"
              onClick={() => {
                openModal({
                  title: "Emergency Factory Reset",
                  description:
                    "WARNING: This action will revert all platform settings to their initial factory states. All custom integrations, module configs, and company metadata will be reset.",
                  type: "warning",
                  actionLabel: "Reset Everything",
                  onAction: () => closeModal(),
                });
              }}
            >
              Reset to Defaults
            </Button>
            <Button
              className="bg-primary text-white rounded-xl px-8 py-6 h-auto text-sm font-semibold hover:bg-primary/90 shadow-lg transition-all active:scale-95 flex items-center gap-2"
              onClick={handleExport}
            >
              <span>Download Config</span>
              <span className="text-xs opacity-70">(JSON)</span>
            </Button>
          </div>
        </div>

        {/* SECURITY & COMPLIANCE */}
        <div id="security-compliance">
          <SectionHeader>SECURITY & COMPLIANCE</SectionHeader>

          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <p className="text-sm text-gray-600 mb-4">
              Configure security settings and access controls.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Two-Factor Authentication</p>
              <p>• Password Policy</p>
              <p>• Session Timeout</p>
              <p>• IP Whitelist</p>
            </div>
          </div>
        </div>
        </div>
      </section>

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
