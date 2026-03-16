"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import {
  useProjectOnboarding,
  useProjectAccess,
  useUsers,
} from "../../../lib/hooks";

interface ProjectUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
  };
}

export const ProjectUsersModal = ({
  isOpen,
  onClose,
  project,
}: ProjectUsersModalProps) => {
  const {
    onboardings,
    fetchOnboardings,
    loading: onboardingLoading,
  } = useProjectOnboarding();
  const { grantAccess, loading: accessLoading } = useProjectAccess();
  const { users, fetchUsers, loading: usersLoading } = useUsers();
  const [isGranting, setIsGranting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      fetchOnboardings();
      fetchUsers();
    }
  }, [isOpen, project.id]);

  // Filter onboardings for this project
  const projectOnboardings = Array.isArray(onboardings)
    ? onboardings.filter((o) => o.project === project.id)
    : [];

  const handleGrantAccess = async () => {
    if (!selectedUser) return;
    try {
      await grantAccess({ project: project.id, user: parseInt(selectedUser) });
      setIsGranting(false);
      setSelectedUser("");
      fetchOnboardings(); // Refresh list
    } catch (error) {
      console.error("Failed to grant access:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Users - ${project.name}`}
    >
      <div className="space-y-6">
        {/* Onboarded Users */}
        <div>
          <h3 className="text-xs font-bold text-[#0A1B2E] mb-4 uppercase">
            Authorized Users & Induction Status
          </h3>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 font-semibold border-b border-gray-100">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {onboardingLoading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : projectOnboardings.length > 0 ? (
                  projectOnboardings.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-gray-50 last:border-none"
                    >
                      <td className="px-4 py-3 text-gray-900">
                        User ID: {o.id}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{o.role}</td>
                      <td className="px-4 py-3">
                        <Badge variant={o.is_completed ? "success" : "danger"}>
                          {o.is_completed ? "Inducted" : "Pending Induction"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No users found for this project.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grant Access Section */}
        <div className="pt-6 border-t border-gray-100">
          {!isGranting ? (
            <Button
              onClick={() => setIsGranting(true)}
              className="bg-blue-600 text-white w-full"
            >
              Grant New Access
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0A1B2E] uppercase">
                  Select User
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Choose a user...</option>
                  {users.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.username} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsGranting(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-600 text-white"
                  disabled={!selectedUser || accessLoading}
                  onClick={handleGrantAccess}
                >
                  {accessLoading ? "Granting..." : "Confirm Access"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
