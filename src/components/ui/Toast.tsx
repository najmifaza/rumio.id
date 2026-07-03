"use client";

import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";

export type ToastType = "success" | "error";

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast: (m, t="error") => setToast({message: m, type: t}) }}>
      {children}
      {toast && (
        <div className="fixed top-4 right-4 z-[9999] flex items-center gap-3 bg-white p-4 pr-12 rounded-xl shadow-lg border border-slate-100 animate-in slide-in-from-top-5 duration-300">
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <p className="text-sm font-medium text-slate-800">{toast.message}</p>
          <button 
            onClick={() => setToast(null)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}
