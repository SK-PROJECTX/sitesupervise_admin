"use client";

import { PageHeader } from "../../../components/admin/PageHeader";
import { Card } from "../../../components/ui/Card";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

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
    <main className="min-h-screen bg-[#EAEAEA]">
      <PageHeader title="User management Console">
        <Button
          variant="outline"
          className="bg-white text-gray-700 border-gray-300"
        >
          Filter: Active User
        </Button>
      </PageHeader>

      <section className="px-8 py-10">
        <SectionHeader title="USER DIRECTORY TABLE" />

        <Card>
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
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="danger">Idle</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* USER DETAILS PANEL */}
      <section className="px-8 pb-12">
        <SectionHeader title="USER DETAILS PANEL" className="text-sm" />

        <Card>
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
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Impersonate
              </Button>
              <Button className="bg-blue-600 text-white h-auto py-3 rounded-xl text-sm hover:bg-blue-700">
                Reset Password
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                View Activity
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Change Role
              </Button>
              <Button className="bg-blue-600 text-white h-auto py-3 rounded-xl text-sm hover:bg-blue-700">
                Suspend Account
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* BULK ACTIONS TOOLBAR */}
      <section className="px-8 pb-12">
        <SectionHeader title="BULK ACTIONS TOOLBAR" className="text-sm" />

        <Card>
          <div className="mb-8">
            <div className="text-sm text-gray-600 mb-4">
              SELECTED: <span className="font-medium">3 users</span>
            </div>

            <h4 className="text-xs font-semibold mb-3">BULK ACTIONS:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Add to Project
              </Button>
              <Button className="bg-blue-600 text-white h-auto py-3 rounded-xl text-sm hover:bg-blue-700">
                Assign Role
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Send Notification
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Export Users
              </Button>
              <Button className="bg-blue-600 text-white h-auto py-3 rounded-xl text-sm hover:bg-blue-700">
                Deactivate
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Add Tags
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-3">USER IMPORT / EXPORT</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Import from CSV
              </Button>
              <Button className="bg-blue-600 text-white h-auto py-3 rounded-xl text-sm hover:bg-blue-700">
                Export to Excel
              </Button>
              <Button className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm">
                Sync with AD
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* PRIMARY ACTION BAR */}
      <div className="px-8 pb-12 flex flex-wrap gap-4">
        <Button className="bg-slate-900 text-white h-auto px-8 py-4 rounded-xl text-sm">
          Add New User
        </Button>
        <Button className="bg-blue-600 text-white h-auto px-8 py-4 rounded-xl text-sm hover:bg-blue-700">
          Create User Group
        </Button>
        <Button className="bg-slate-900 text-white h-auto px-8 py-4 rounded-xl text-sm">
          Run User Analytics
        </Button>
      </div>
    </main>
  );
}
