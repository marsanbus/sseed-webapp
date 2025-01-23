import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a1a48f] hover:text-[#3f3222]"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;