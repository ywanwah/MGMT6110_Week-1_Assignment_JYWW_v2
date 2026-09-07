import React from 'react';

interface ToastProps {
  message: string | null;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  if (!visible || !message) return null;

  return (
    <div
      id="toast"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform scale-100"
    >
      <div className="bg-dbs-card-sub text-white text-[12px] font-medium py-2 px-4 rounded-full shadow-2xl backdrop-blur-md flex items-center space-x-2 border border-dbs-border">
        <span className="material-symbols-outlined text-dbs-green text-[18px]">
          check_circle
        </span>
        <span id="toast-text">{message}</span>
      </div>
    </div>
  );
};
