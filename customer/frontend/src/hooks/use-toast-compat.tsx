import React, { createContext, useContext, useState } from "react";

// Define types
type ToastType = "default" | "success" | "error" | "warning" | "info" | "destructive";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
  onClose?: () => void;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Toast Provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = generateId();
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
        toast.onClose?.();
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToastCompat = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return {
    toast: (props: Omit<Toast, "id">) => context.addToast(props),
    dismiss: (id: string) => context.removeToast(id),
  };
};

// Toast UI component
const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const variantClasses = {
    default: "bg-white border-gray-200",
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
    destructive: "bg-red-50 border-red-200",
  };
  
  const variant = toast.variant || "default";

  return (
    <div 
      className={`p-4 rounded-md shadow-md border ${variantClasses[variant]} max-w-sm w-full transition-all flex items-start`}
      role="alert"
    >
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{toast.title}</h3>
        {toast.description && <p className="text-sm text-gray-600 mt-1">{toast.description}</p>}
      </div>
      <button 
        onClick={onClose} 
        className="ml-4 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

// Toast container component
const ToastContainer: React.FC = () => {
  const context = useContext(ToastContext);
  if (!context) return null;
  
  const { toasts, removeToast } = context;
  
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50 w-full max-w-sm">
      {toasts.map((toast) => (
        <div key={toast.id} className="transition-all duration-300 ease-in-out">
          <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
};

// Helper component for React 19 compatibility
export const ToastProviderCompat: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};
