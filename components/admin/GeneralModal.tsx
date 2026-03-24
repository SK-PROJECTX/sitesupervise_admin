"use client";

import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Info, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

interface GeneralModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type?: "info" | "success" | "warning" | "question";
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
}

export const GeneralModal = ({
  isOpen,
  onClose,
  title,
  description,
  type = "info",
  actionLabel,
  onAction,
  loading = false,
}: GeneralModalProps) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={40} className="text-green-500" />;
      case "warning":
        return <AlertCircle size={40} className="text-yellow-500" />;
      case "question":
        return <HelpCircle size={40} className="text-blue-500" />;
      default:
        return <Info size={40} className="text-blue-500" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-yellow-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        <div
          className={`w-20 h-20 ${getIconBg()} rounded-full flex items-center justify-center`}
        >
          {getIcon()}
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-bold text-[#0A1B2E]">{title}</h4>
          <p className="text-sm text-gray-500 max-w-sm whitespace-pre-wrap">
            {description}
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
            Close
          </Button>
          {actionLabel && onAction && (
            <Button
              type="button"
              onClick={onAction}
              className="flex-1 bg-[#0A1B2E] text-white hover:bg-black rounded-xl px-6 h-12 shadow-lg"
              disabled={loading}
            >
              {loading ? "Processing..." : actionLabel}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
