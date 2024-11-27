import React from 'react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 bg-[#0dab77] text-white px-4 py-2 rounded shadow-lg z-50">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white font-bold"
          aria-label="Fechar mensagem"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
