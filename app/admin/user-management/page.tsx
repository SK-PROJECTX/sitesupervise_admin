export default function UserManagementPage() {
  const users = [
    {
      id: 1,
      username: "mike.johnson",
      role: "Superintendent",
      lastActive: "10:15 AM",
      status: "active",
    },
    {
      id: 2,
      username: "sarah.chen",
      role: "Project Manager",
      lastActive: "10:12 AM",
      status: "active",
    },
    {
      id: 3,
      username: "alex.rodriguez",
      role: "Field Worker",
      lastActive: "10:10 AM",
      status: "disabled",
    },
    {
      id: 4,
      username: "client_xyz",
      role: "Client Viewer",
      lastActive: "Yesterday",
      status: "active",
    },
    {
      id: 5,
      username: "jane.smith",
      role: "Admin",
      lastActive: "09:45 AM",
      status: "active",
    },
  ];

  return (
    <main className="min-h-screen p-8">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0A1B2E]">
          User Management Console
        </h1>
        <div>
          <button className="px-4 py-2 border border-gray-300 bg-white rounded text-sm">
            Filter: Active User
          </button>
        </div>
      </div>

      <section className="space-y-8">
        {/* User Directory Table */}
        <div>
          <h2 className="text-lg font-bold text-[#0A1B2E] mb-4">
            USER DIRECTORY TABLE
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="w-16 py-4">SEL</th>
                    <th className="py-4">USERNAME</th>
                    <th className="py-4">ROLE</th>
                    <th className="py-4">LAST ACTIVE</th>
                    <th className="py-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-gray-100">
                      <td className="py-4">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="py-4">{u.username}</td>
                      <td className="py-4">{u.role}</td>
                      <td className="py-4">{u.lastActive}</td>
                      <td className="py-4">
                        {u.status === "active" ? (
                          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                            Active
                          </span>
                        ) : (
                          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                            Disabled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Details Panel */}
        <div>
          <h2 className="text-lg font-bold text-[#0A1B2E] mb-4">
            USER DETAILS PANEL
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">
                  USER DETAILS:{" "}
                  <span className="font-medium">Mike Johnson</span>
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>Email: mike.j@abcconstruction.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Company: ABC construction</li>
                  <li>Projects: ABC Tower, River Bridge</li>
                  <li>Devices: iPhone, iPad, AR Glasses</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">PERMISSION SUMMARY</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>Can create tasks</li>
                  <li>Can approve expenses up to $5,000</li>
                  <li>Can access AR features</li>
                  <li>Cannot delete projects</li>
                </ul>
              </div>
              <div className="mt-6 col-span-1 md:col-span-2">
                <h4 className="text-sm font-semibold mb-2">QUICK ACTIONS:</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-3 bg-slate-900 text-white rounded-2xl text-sm">
                    Impersonate
                  </button>
                  <button className="px-4 py-3 bg-blue-600 text-white rounded-2xl text-sm">
                    Reset Password
                  </button>
                  <button className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm">
                    View Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        <div id="permissions">
          <h2 className="text-lg font-bold text-[#0A1B2E] mb-4">
            BULK ACTIONS TOOLBAR
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-3">
                SELECTED: <span className="font-medium">3 users</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="px-5 py-3 bg-slate-900 text-white rounded-2xl text-sm">
                  Add to Project
                </button>
                <button className="px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm">
                  Assign Role
                </button>
                <button className="px-5 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-sm">
                  Send Notification
                </button>
              </div>
              <div className="flex gap-3 flex-wrap mt-4">
                <button className="px-5 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-sm">
                  Export Users
                </button>
                <button className="px-5 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-sm">
                  Deactivate
                </button>
                <button className="px-5 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-sm">
                  Add Tags
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-3">USER IMPORT/EXPORT</h4>
              <div className="flex gap-3">
                <button className="px-5 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-sm">
                  Import from CSV
                </button>
                <button className="px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm">
                  Export to Excel
                </button>
                <button className="px-5 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-sm">
                  Sync with AD
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex gap-3">
          <button className="px-18 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-base">
            Import from CSV
          </button>
          <button className="px-18 py-3 bg-blue-600 text-white rounded-2xl text-base">
            Export to Excel
          </button>
          <button className="px-18 py-3 bg-slate-900 text-white border border-gray-200 rounded-2xl text-base">
            Sync with AD
          </button>
        </div>
      </section>
    </main>
  );
}
