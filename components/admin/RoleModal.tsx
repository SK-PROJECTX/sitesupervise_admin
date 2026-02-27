"use client";

import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  role?: any;
}

export const RoleModal = ({
  isOpen,
  onClose,
  onSave,
  role,
}: RoleModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [
      {
        module: "Tasks",
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      {
        module: "Documents",
        create: false,
        read: true,
        update: false,
        delete: false,
      },
      {
        module: "Financial",
        create: false,
        read: false,
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
    ],
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || "",
        description: role.description || "",
        permissions: role.permissions || formData.permissions,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: [
          {
            module: "Tasks",
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          {
            module: "Documents",
            create: false,
            read: true,
            update: false,
            delete: false,
          },
          {
            module: "Financial",
            create: false,
            read: false,
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
        ],
      });
    }
  }, [role, isOpen]);

  const togglePermission = (index: number, action: string) => {
    const newPermissions = [...formData.permissions];
    newPermissions[index] = {
      ...newPermissions[index],
      [action]:
        !newPermissions[index][action as keyof (typeof newPermissions)[0]],
    };
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={role ? "Edit Role Configuration" : "Define New System Role"}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Role Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Senior Superintendent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Role Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm min-h-[100px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the responsibilities and scope of this role..."
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#0A1B2E] uppercase border-b border-gray-100 pb-2">
              Module-Specific Permissions
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 text-xs uppercase">
                    <th className="py-2">Module</th>
                    <th className="py-2 text-center">C</th>
                    <th className="py-2 text-center">R</th>
                    <th className="py-2 text-center">U</th>
                    <th className="py-2 text-center">D</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {formData.permissions.map((p, idx) => (
                    <tr key={p.module}>
                      <td className="py-4 font-medium text-gray-700">
                        {p.module}
                      </td>
                      {["create", "read", "update", "delete"].map((action) => (
                        <td key={action} className="py-4 text-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            checked={p[action as keyof typeof p] as boolean}
                            onChange={() => togglePermission(idx, action)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-8"
          >
            {role ? "Update Config" : "Create Role"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
