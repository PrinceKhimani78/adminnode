// components/Common/Modal.tsx
"use client";
import React from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onSave,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-3 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 bg-gray-50 px-6 py-3 rounded-b-lg sticky bottom-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 text-sm font-medium"
          >
            Close
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="px-5 py-2 bg-[#00C9FF] text-white rounded-md hover:bg-[#00a7d6] text-sm font-medium"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
