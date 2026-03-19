"use client";

import { PageHeader } from "../../../components/admin/PageHeader";
import { Card } from "../../../components/ui/Card";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { useUsers } from "../../../lib/hooks";
import { useState, useEffect } from "react";
import { UserModal } from "../../../components/admin/UserModal";
import { ConfirmDeleteModal } from "../../../components/admin/ConfirmDeleteModal";

export default function UserManagementPage() {
  const { users, fetchUsers, createUser, updateUser, deleteUser, loading } =
    useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user: any = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (data: any) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
      } else {
        await createUser(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const toggleUserSelection = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        setSelectedUser(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleResetPassword = (user: any) => {
    alert(
      `Password reset initiation for ${user.username}. An email was dispatched.`,
    );
  };

  const handleImpersonate = (user: any) => {
    alert(`Impersonating ${user.username}... redirecting to session context.`);
  };

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
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading users...
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#0A1B2E] font-semibold border-b border-gray-200 bg-gray-50">
                    <th className="w-20 px-6 py-5 text-center">SEL</th>
                    <th className="px-6 py-5">USERNAME</th>
                    <th className="px-6 py-5">ROLE</th>
                    <th className="px-6 py-5">STATUS</th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">
                  {users.map((u: any) => (
                    <tr
                      key={u.id}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedUser(u)}
                    >
                      <td
                        className="px-6 py-5 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedUserIds.includes(u.id)}
                          onChange={() => toggleUserSelection(u.id)}
                        />
                      </td>

                      <td className="px-6 py-5 font-medium">{u.username}</td>
                      <td className="px-6 py-5">
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold uppercase text-gray-600">
                          {u.role}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {u.status?.toLowerCase() === "active" ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="danger">
                            {u.status || "Disabled"}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-10 text-center text-gray-500"
                      >
                        No users found in directory.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </section>

      {/* USER DETAILS PANEL */}
      <section className="px-8 pb-12">
        <SectionHeader title="USER DETAILS PANEL" className="text-sm" />

        <Card>
          {selectedUser ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* User Details */}
              <div>
                <h3 className="flex items-center gap-2 font-semibold mb-6 text-base text-[#0A1B2E]">
                  👤 USER DETAILS:{" "}
                  <span className="font-normal text-blue-600">
                    {selectedUser.username}
                  </span>
                </h3>

                <ul className="text-sm text-gray-600 space-y-4">
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium text-gray-400">Email:</span>
                    <span>{selectedUser.email || "N/A"}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium text-gray-400">Company:</span>
                    <span>{selectedUser.company || "N/A"}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium text-gray-400">Role:</span>
                    <span className="font-bold text-[#0A1B2E]">
                      {selectedUser.role}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="font-medium text-gray-400">Status:</span>
                    <span
                      className={
                        selectedUser.status?.toLowerCase() === "active"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {selectedUser.status?.toUpperCase() || "DISABLED"}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col justify-center">
                <h4 className="text-xs font-bold text-[#0A1B2E] mb-6 uppercase tracking-wider">
                  Account Actions:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleOpenModal(selectedUser)}
                    className="bg-blue-600 text-white h-auto py-3 rounded-xl text-sm hover:bg-blue-700 shadow-md transition-all"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 h-auto py-3 rounded-xl text-sm hover:bg-red-50"
                    onClick={() => openDeleteModal(selectedUser)}
                  >
                    Delete Account
                  </Button>
                  <Button
                    onClick={() => handleResetPassword(selectedUser)}
                    className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm"
                  >
                    Reset Password
                  </Button>
                  <Button
                    onClick={() => handleImpersonate(selectedUser)}
                    className="bg-slate-900 text-white h-auto py-3 rounded-xl text-sm"
                  >
                    Impersonate
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center text-gray-400 italic">
              Select a user from the directory to view detailed profile and
              actions.
            </div>
          )}
        </Card>
      </section>

      {/* PRIMARY ACTION BAR */}
      <div className="fixed bottom-8 right-8 flex flex-wrap gap-4">
        <Button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white h-auto px-8 py-4 rounded-2xl text-sm font-bold shadow-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New User
        </Button>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Terminate User Access"
        itemName={userToDelete?.username || "this user"}
        loading={loading}
      />
    </main>
  );
}
