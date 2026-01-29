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
    <main className="min-h-screen  bg-[#EAEAEA]">
      <div className="bg-white border-b border-gray-200 px-8 py-6 w-full flex items-center justify-between">
        <h1 className="text-sm font-semibold text-[#0A1B2E]">
          User management Console
        </h1>

        <button className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm text-gray-700">
          Filter: Active User
        </button>
      </div>

      <section className="px-8 py-10">
        <h2 className="text-lg font-bold text-[#0A1B2E] mb-6">
          USER DIRECTORY TABLE
        </h2>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#0A1B2E] font-semibold border-b border-gray-200">
                  <th className="w-20 px-6 py-5">SEL</th>
                  <th className="px-6 py-5">USERNAME</th>
                  <th className="px-6 py-5">ROLE</th>
                  <th className="px-6 py-5">LAST ACTIVE</th>
                  <th className="px-6 py-5">STATUS</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-100 last:border-none"
                  >
                    <td className="px-6 py-5">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>

                    <td className="px-6 py-5">{u.username}</td>
                    <td className="px-6 py-5">{u.role}</td>
                    <td className="px-6 py-5">{u.lastActive}</td>

                    <td className="px-6 py-5">
                      {u.status === "active" ? (
                        <span className="inline-flex items-center justify-center bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-medium">
                          Idle
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* USER DETAILS PANEL */}
      <section className="px-8 pb-12">
        <h2 className="text-sm font-bold text-[#0A1B2E] mb-4">
          USER DETAILS PANEL
        </h2>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* User Details */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-4 text-sm">
                👤 USER DETAILS:{" "}
                <span className="font-normal">Mike Johnson</span>
              </h3>

              <ul className="text-sm text-gray-600 space-y-2">
                <li>Email: mike.j@abcconstruction.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Company: ABC Construction</li>
                <li>Projects: ABC Tower, River Bridge</li>
                <li>Devices: iPhone, iPad, AR Glasses</li>
                <li>Login History: 245 sessions (last 30 days)</li>
              </ul>
            </div>

            {/* Permission Summary */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-4 text-sm">
                🔐 PERMISSION SUMMARY
              </h3>

              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Can create tasks</li>
                <li>Can approve expenses up to $5,000</li>
                <li>Can access AR features</li>
                <li>Cannot delete projects</li>
                <li>Cannot modify user roles</li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10">
            <h4 className="text-xs font-semibold mb-4">QUICK ACTIONS:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Impersonate
              </button>
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm">
                Reset Password
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                View Activity
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Change Role
              </button>
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm">
                Suspend Account
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BULK ACTIONS TOOLBAR */}
      <section className="px-8 pb-12">
        <h2 className="text-sm font-bold text-[#0A1B2E] mb-4">
          BULK ACTIONS TOOLBAR
        </h2>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="mb-8">
            <div className="text-sm text-gray-600 mb-4">
              SELECTED: <span className="font-medium">3 users</span>
            </div>

            <h4 className="text-xs font-semibold mb-3">BULK ACTIONS:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Add to Project
              </button>
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm">
                Assign Role
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Send Notification
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Export Users
              </button>
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm">
                Deactivate
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Add Tags
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-3">USER IMPORT / EXPORT</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Import from CSV
              </button>
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm">
                Export to Excel
              </button>
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm">
                Sync with AD
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY ACTION BAR */}
      <div className="px-8 pb-12 flex flex-wrap gap-4">
        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-sm">
          Add New User
        </button>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-sm">
          Create User Group
        </button>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-sm">
          Run User Analytics
        </button>
      </div>
    </main>
  );
}
