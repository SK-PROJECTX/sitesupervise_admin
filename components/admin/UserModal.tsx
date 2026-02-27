"use client";

import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  user?: any;
}

export const UserModal = ({
  isOpen,
  onClose,
  onSave,
  user,
}: UserModalProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Field Worker",
    status: "active",
    company: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "Field Worker",
        status: user.status || "active",
        company: user.company || "",
      });
    } else {
      setFormData({
        username: "",
        email: "",
        role: "Field Worker",
        status: "active",
        company: "",
      });
    }
  }, [user, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User Profile" : "Add New User Account"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="e.g. mike.johnson"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="mike.j@abcconstruction.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Assigned Role
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option>Superintendent</option>
              <option>Project Manager</option>
              <option>Field Worker</option>
              <option>Safety Officer</option>
              <option>Client Viewer</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Account Status
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="disabled">Disabled / Suspended</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-[#0A1B2E] uppercase">
              Company / Organization
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="ABC Construction"
            />
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
            {user ? "Save Changes" : "Create Account"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
