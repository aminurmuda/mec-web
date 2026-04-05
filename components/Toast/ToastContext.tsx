'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import Toast from '.';

type ToastType = 'success' | 'error' | 'info';

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();

    setToasts((prev) => {
      return [...prev, { id, message, type }];
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => {
      return prev.filter((toast) => toast.id !== id);
    });
  }, []);

  const value = useMemo(() => {
    return { showToast };
  }, [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed top-5 left-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="flex flex-col gap-2 items-center">
          {toasts.map((toast) => {
            return (
              <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                onClose={() => removeToast(toast.id)}
              />
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
};
