"use client";

import { useRoles } from "../../../lib/hooks";
import { useState, useEffect, useCallback } from "react";
import { RoleModal } from "../../../components/admin/RoleModal";
import { ConfirmDeleteModal } from "../../../components/admin/ConfirmDeleteModal";
import { GeneralModal } from "../../../components/admin/GeneralModal";

interface Permission {
  module: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface Role {
  id: string | number;
  name: string;
  description?: string;
  is_system: boolean;
  permissions: Permission[];
}

export default function RoleManagementPage() {
  const {
    roles,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    applyRole,
    auditRoles,
    optimizeRoles,
    loading,
  } = useRoles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [editedPermissions, setEditedPermissions] = useState<Permission[]>([]);
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

  const stableFetchRoles = useCallback(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    stableFetchRoles();
  }, [stableFetchRoles]);

  const handleOpenModal = (role: Role | null = null) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setEditedPermissions(role.permissions || []);
  };

  const togglePermission = (module: string, field: keyof Permission) => {
    setEditedPermissions((prev) =>
      prev.map((p) => (p.module === module ? { ...p, [field]: !p[field] } : p)),
    );
  };

  const handleApplyToAll = async () => {
    if (!selectedRole)
      return openModal({
        title: "Selection Required",
        description: "Please select a role template first.",
        type: "warning",
      });
    try {
      await applyRole(selectedRole.id);
      openModal({
        title: "Policy Deployment",
        description: `Strategic application of "${selectedRole.name}" policy initiated. This process will update permissions for all users currently assigned to this role.`,
        type: "success",
      });
    } catch (error) {
      openModal({
        title: "Deployment Failed",
        description: "Application failed. Check system logs for details.",
        type: "warning",
      });
    }
  };

  const handleRunAudit = async () => {
    try {
      await auditRoles();
      setIsAuditModalOpen(true);
    } catch (error) {
      alert("Audit execution failed.");
    }
  };

  const handleOptimize = async () => {
    try {
      await optimizeRoles();
      openModal({
        title: "Optimization Complete",
        description:
          "Permission set optimization complete. Redundant permissions have been consolidated and security defaults applied.",
        type: "success",
      });
      fetchRoles();
    } catch (error) {
      openModal({
        title: "Optimization Failed",
        description: "Optimization failed. Check system logs.",
        type: "warning",
      });
    }
  };

  const handleSaveRole = async (data: Partial<Role>) => {
    try {
      if (selectedRole) {
        await updateRole(selectedRole.id, data);
      } else {
        await createRole(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save role:", error);
    }
  };

  const handleDeleteRole = async () => {
    if (roleToDelete) {
      try {
        await deleteRole(roleToDelete.id);
        setIsDeleteModalOpen(false);
        setRoleToDelete(null);
      } catch (error) {
        console.error("Failed to delete role:", error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#EAEAEA] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <h1 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wide">
          Role & Permission Management
        </h1>

        <div className="flex items-center gap-3">
          <button className="px-6 py-2 border border-gray-200 bg-white rounded-md text-xs font-bold text-[#0A1B2E] shadow-sm hover:bg-gray-50 flex items-center gap-2">
            Role: {selectedRole?.name || "Select Role"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        {/* ROLE TEMPLATE LIBRARY */}
        <section>
          <h2 className="text-sm font-bold text-[#0A1B2E] mb-4 uppercase tracking-wide">
            ROLE TEMPLATE LIBRARY
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#0A1B2E] flex items-center gap-2">
                  <span>📁</span> PREDEFINED ROLES
                </h3>
                <ul className="text-xs text-gray-600 space-y-3 ml-6 list-disc">
                  {roles
                    .filter((r: Role) => r.is_system)
                    .map((role: Role) => (
                      <li
                        key={role.id}
                        className={`cursor-pointer hover:text-blue-600 transition-colors ${
                          selectedRole?.id === role.id
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                        onClick={() => handleSelectRole(role)}
                      >
                        {role.name}{" "}
                        {role.description ? `(${role.description})` : ""}
                      </li>
                    ))}
                </ul>

                <h3 className="text-xs font-bold text-[#0A1B2E] mt-6">
                  CUSTOM ROLES
                </h3>
                <ul className="text-xs text-gray-600 space-y-3 ml-6 list-disc">
                  {roles
                    .filter((r: Role) => !r.is_system)
                    .map((role: Role) => (
                      <li
                        key={role.id}
                        className={`cursor-pointer hover:text-blue-600 transition-colors ${
                          selectedRole?.id === role.id
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                        onClick={() => handleSelectRole(role)}
                      >
                        {role.name}
                      </li>
                    ))}
                  {roles.filter((r: any) => !r.is_system).length === 0 && (
                    <li className="italic text-gray-400">
                      No custom roles defined.
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col justify-end gap-3">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleRunAudit}
                    className="bg-[#0A1B2E] text-white px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    Manage Roles
                  </button>
                  <button
                    onClick={() => handleOpenModal(selectedRole)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0A1B2E] text-white px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    New Role Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PERMISSION MATRIX EDITOR */}
        <section>
          <h2 className="text-sm font-bold text-[#0A1B2E] mb-4 uppercase tracking-wide">
            PERMISSION MATRIX EDITOR
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xs font-bold mb-6 flex items-center gap-2 text-[#0A1B2E] uppercase">
              <span>👥</span> PERMISSION FOR:{" "}
              {selectedRole?.name || "SELECT A ROLE"}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-[#0A1B2E] font-bold uppercase">
                    <th className="py-4">MODULE</th>
                    <th className="py-4 text-center">CREATE</th>
                    <th className="py-4 text-center">READ</th>
                    <th className="py-4 text-center">UPDATE</th>
                    <th className="py-4 text-center">DELETE</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 divide-y divide-gray-100">
                  {(editedPermissions.length > 0
                    ? editedPermissions
                    : selectedRole?.permissions || [
                        {
                          module: "Tasks",
                          create: true,
                          read: true,
                          update: true,
                          delete: true,
                        },
                        {
                          module: "Documents",
                          create: true,
                          read: true,
                          update: true,
                          delete: false,
                        },
                        {
                          module: "Financial",
                          create: false,
                          read: true,
                          update: false,
                          delete: false,
                        },
                        {
                          module: "User management",
                          create: false,
                          read: false,
                          update: false,
                          delete: false,
                        },
                        {
                          module: "AR Features",
                          create: true,
                          read: true,
                          update: true,
                          delete: false,
                        },
                        {
                          module: "AI Tools",
                          create: true,
                          read: true,
                          update: true,
                          delete: false,
                        },
                        {
                          module: "Client Portal",
                          create: false,
                          read: true,
                          update: false,
                          delete: false,
                        },
                        {
                          module: "System Settings",
                          create: false,
                          read: false,
                          update: false,
                          delete: false,
                        },
                      ]
                  ).map((p: Permission) => (
                    <tr
                      key={p.module}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 font-medium">{p.module}</td>
                      {["create", "read", "update", "delete"].map((field) => (
                        <td key={field} className="py-4 text-center text-lg">
                          <button
                            onClick={() =>
                              togglePermission(
                                p.module,
                                field as keyof Permission,
                              )
                            }
                            className={`transition-all hover:scale-125 ${
                              p[field as keyof Permission]
                                ? "text-blue-600"
                                : "text-gray-200"
                            }`}
                          >
                            {p[field as keyof Permission] ? "✓" : "✕"}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 space-y-4 border-t border-gray-100 pt-8">
              <h4 className="text-xs font-bold text-[#0A1B2E] uppercase">
                ADVANCED PERMISSIONS:
              </h4>
              <ul className="text-xs text-gray-600 space-y-3 ml-6 list-disc">
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
        <section>
          <h2 className="text-sm font-bold text-[#0A1B2E] mb-4 uppercase tracking-wide">
            ROLE ASSIGNMENT OVERVIEW
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-[#0A1B2E] mb-4 uppercase">
                    ROLE DISTRIBUTION
                  </h3>
                  <ul className="text-xs text-gray-600 space-y-3 ml-6 list-disc">
                    <li>Superintendent: 24 users</li>
                    <li>Project Manager: 18 users</li>
                    <li>Field Worker: 642 users</li>
                    <li>Client Viewer: 47 users</li>
                    <li>System Admin: 12 users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#0A1B2E] mb-4 uppercase">
                    ROLE CONFLICT DETECTION:
                  </h3>
                  <ul className="text-xs text-gray-600 space-y-3 ml-6 list-disc">
                    <li>2 users have conflicting permissions</li>
                    <li>1 role has unused permissions</li>
                    <li>3 users need permission upgrades</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-3">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleRunAudit}
                    className="bg-[#0A1B2E] text-white px-8 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    Access Auditor
                  </button>
                  <button
                    onClick={handleOptimize}
                    className="bg-blue-600 text-white px-8 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    Optimize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FIXED FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              handleSaveRole({
                ...selectedRole,
                permissions: editedPermissions,
              })
            }
            className="bg-[#0A1B2E] text-white px-10 py-3 rounded-md text-xs font-bold uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Save Role Changes
          </button>
          <button
            onClick={handleApplyToAll}
            className="bg-blue-600 text-white px-10 py-3 rounded-md text-xs font-bold uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Apply to All Users
          </button>
          <button
            onClick={handleRunAudit}
            className="bg-[#0A1B2E] text-white px-10 py-3 rounded-md text-xs font-bold uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Audit Permissions Test
          </button>
        </div>
      </footer>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        role={selectedRole}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteRole}
        title="Delete Security Role"
        itemName={roleToDelete?.name || "this role"}
        loading={loading}
      />

      <GeneralModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        description={modalConfig.description}
        type={modalConfig.type}
        actionLabel={modalConfig.actionLabel}
        onAction={modalConfig.onAction}
      />

      {/* Audit Results Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-[#0A1B2E] uppercase tracking-wider">
                System Audit Results
              </h3>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-tight">
                  Security Score
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-blue-600">94</span>
                  <span className="text-lg font-bold text-gray-400 mb-1">
                    /100
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Findings
                </h4>
                <ul className="text-xs space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span className="text-gray-600">
                      2 users found with redundant "Super User" privileges in
                      restricted sub-projects.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-0.5">ℹ️</span>
                    <span className="text-gray-600">
                      Role "Field Worker" has unused "Update" permissions on
                      Financial modules.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">
                      All system roles satisfy the Principle of Least Privilege
                      (PoLP).
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="w-full bg-[#0A1B2E] text-white py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
