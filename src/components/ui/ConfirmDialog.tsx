"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm must be used within ConfirmProvider");
  return context;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolve, setResolve] = useState<(value: boolean) => void>(() => {});

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise<boolean>((res) => {
      setResolve(() => res);
    });
  };

  const handleConfirm = () => {
    resolve(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolve(false);
    setIsOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCancel} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1528] mb-2">
                {options.title || "Konfirmasi"}
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                {options.message}
              </p>
              <div className="flex w-full gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 font-bold text-slate-600 border-slate-200 h-11" 
                  onClick={handleCancel}
                >
                  {options.cancelText || "Batal"}
                </Button>
                <Button 
                  type="button" 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-11" 
                  onClick={handleConfirm}
                >
                  {options.confirmText || "Hapus"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
