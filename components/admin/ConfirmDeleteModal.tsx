"use client";

import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  loading?: boolean;
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  loading = false,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
          <AlertTriangle size={40} />
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-bold text-[#0A1B2E]">
            Are you absolutely sure?
          </h4>
          <p className="text-sm text-gray-500 max-w-sm">
            This action cannot be undone. This will permanently delete the
            <span className="font-bold text-[#0A1B2E]"> {itemName} </span>
            and remove all associated data from our servers.
          </p>
        </div>

        <div className="flex gap-3 w-full pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl px-6 h-12 border-gray-200 text-gray-600 hover:bg-gray-50"
            disabled={loading}
          >
            Cancel, keep it
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white hover:bg-red-700 rounded-xl px-6 h-12 shadow-lg shadow-red-100"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, delete it"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
