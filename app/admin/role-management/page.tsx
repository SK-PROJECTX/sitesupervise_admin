export default function RoleManagementPage() {
  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="bg-white border-b border-blue-500 px-8 py-6 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-[#0A1B2E]">
          Role & Permission Management
        </h1>

        <button className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm text-gray-700">
          Role: Superintendent
        </button>
      </div>

      {/* Content */}
      <section className="px-8 py-12">
        <h2 className="text-lg font-bold text-[#0A1B2E] mb-6">
          ROLE TEMPLATE LIBRARY
        </h2>

        <div className="bg-white rounded-3xl p-12 shadow-sm">
          {/* Predefined Roles */}
          <div className="mb-10">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-4">
              📁 PREDEFINED ROLES
            </h3>

            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Superintendent (Full Field control)</li>
              <li>• Project Manager (Financial + oversight)</li>
              <li>• Field worker (Task execution)</li>
              <li>• Safety officer (HSE focus)</li>
              <li>• Client Viewer (Read-only)</li>
              <li>• System Admin (Full platform access)</li>
            </ul>
          </div>

          {/* Custom Roles */}
          <div className="mb-16">
            <h3 className="text-sm font-semibold mb-4">CUSTOM ROLES:</h3>

            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Assistant Superintendent</li>
              <li>• Quality Inspector</li>
              <li>• Equipment Manager</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm">
              Create New Role
            </button>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm">
              Duplicate Role
            </button>

            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm">
              Export Role Templates
            </button>
          </div>
        </div>
      </section>

      {/* PERMISSION MATRIX */}
      <section className="px-8 pb-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
            🔒 PERMISSION FOR: SUPERINTENDENT
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-left text-gray-600">
                  <th className="py-3">MODULE</th>
                  <th className="py-3">CREATE</th>
                  <th className="py-3">READ</th>
                  <th className="py-3">UPDATE</th>
                  <th className="py-3">DELETE</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {[
                  ["Tasks", true, true, true, true],
                  ["Documents", true, true, true, false],
                  ["Financial", false, true, false, false],
                  ["User management", false, false, false, false],
                  ["AR Features", true, true, true, false],
                  ["AI Tools", true, true, true, false],
                  ["Client Portal", false, true, false, false],
                  ["System Settings", false, false, false, false],
                ].map(([module, c, r, u, d]) => (
                  <tr
                    key={module as string}
                    className="border-b border-gray-100"
                  >
                    <td className="py-3">{module}</td>
                    {[c, r, u, d].map((val, i) => (
                      <td key={i} className="py-3">
                        {val ? "✓" : "✕"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advanced Permissions */}
          <div className="mt-10">
            <h4 className="text-xs font-semibold mb-3">
              ADVANCED PERMISSIONS:
            </h4>

            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>Max approval amount: $10,000</li>
              <li>Can export data: Yes</li>
              <li>Can invite users: Yes (same role or lower)</li>
              <li>Can access audit logs: Limited</li>
              <li>API access: Read-only</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PERMISSION MATRIX */}
      <section className="px-8 pb-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
            🔒 PERMISSION FOR: SUPERINTENDENT
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-left text-gray-600">
                  <th className="py-3">MODULE</th>
                  <th className="py-3">CREATE</th>
                  <th className="py-3">READ</th>
                  <th className="py-3">UPDATE</th>
                  <th className="py-3">DELETE</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {[
                  ["Tasks", true, true, true, true],
                  ["Documents", true, true, true, false],
                  ["Financial", false, true, false, false],
                  ["User management", false, false, false, false],
                  ["AR Features", true, true, true, false],
                  ["AI Tools", true, true, true, false],
                  ["Client Portal", false, true, false, false],
                  ["System Settings", false, false, false, false],
                ].map(([module, c, r, u, d]) => (
                  <tr
                    key={module as string}
                    className="border-b border-gray-100"
                  >
                    <td className="py-3">{module}</td>
                    {[c, r, u, d].map((val, i) => (
                      <td key={i} className="py-3">
                        {val ? "✓" : "✕"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advanced Permissions */}
          <div className="mt-10">
            <h4 className="text-xs font-semibold mb-3">
              ADVANCED PERMISSIONS:
            </h4>

            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>Max approval amount: $10,000</li>
              <li>Can export data: Yes</li>
              <li>Can invite users: Yes (same role or lower)</li>
              <li>Can access audit logs: Limited</li>
              <li>API access: Read-only</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ROLE ASSIGNMENT OVERVIEW */}
      <section className="px-8 pb-12">
        <h2 className="text-sm font-bold text-[#0A1B2E] mb-4">
          ROLE ASSIGNMENT OVERVIEW
        </h2>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Role Distribution */}
            <div>
              <h4 className="text-xs font-semibold mb-4">ROLE DISTRIBUTION</h4>

              <ul className="text-sm text-gray-600 space-y-2">
                <li>Superintendent: 34 users</li>
                <li>Project Manager: 18 users</li>
                <li>Field Worker: 642 users</li>
                <li>Client Viewer: 47 users</li>
                <li>System Admin: 4 users</li>
              </ul>
            </div>

            {/* Conflict Detection */}
            <div>
              <h4 className="text-xs font-semibold mb-4">
                ROLE CONFLICT DETECTION
              </h4>

              <ul className="text-sm text-gray-600 space-y-2">
                <li>2 users have conflicting permissions</li>
                <li>1 role has unused permissions</li>
                <li>3 users need permission upgrades</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-4">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm">
              Review Conflicts
            </button>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm">
              Run Role Audit
            </button>
          </div>
        </div>
      </section>

      {/* FINAL ACTION BAR */}
      <div className="px-8 pb-12 flex gap-4">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-sm">
          Apply to All Users
        </button>

        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-sm">
          Test Permission Set
        </button>
      </div>
    </main>
  );
}
