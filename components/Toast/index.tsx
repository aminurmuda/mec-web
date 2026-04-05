'use client';

import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onClose();
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  let bgColor = 'bg-gray-900';

  if (type === 'success') {
    bgColor = 'bg-green-600';
  }

  if (type === 'error') {
    bgColor = 'bg-red-400';
  }

  if (type === 'info') {
    bgColor = 'bg-blue-600';
  }

  return (
    <div
      className={`
        ${bgColor}
        text-white
        px-5 py-3
        rounded-full
        shadow-lg
        text-md
        font-medium
        flex items-center gap-3
        pointer-events-auto
        transition duration-300
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}
      `}
    >
      <span>{message}</span>

      <button
        onClick={() => {
          setVisible(false);

          setTimeout(() => {
            onClose();
          }, 300);
        }}
        className="ml-2 text-white/70 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
