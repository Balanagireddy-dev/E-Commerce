"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, AlertCircle, X } from "@/components/ui/icons";
import { clsx } from "@/lib/utils/clsx";

type ToastTone = "success" | "error" | "info";
interface ToastItem {
  id: string;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted
        ? createPortal(
            <div className="fixed inset-x-0 bottom-20 z-[200] flex flex-col items-center gap-2 px-4 sm:bottom-6" aria-live="polite">
              {toasts.map((t) => (
                <div
                  key={t.id}
                  role="status"
                  className={clsx(
                    "flex w-full max-w-sm animate-toast-in items-center gap-2 rounded-lg px-4 py-3 shadow-lg text-sm font-medium",
                    t.tone === "success" && "bg-success text-white",
                    t.tone === "error" && "bg-danger text-white",
                    t.tone === "info" && "bg-ink text-white"
                  )}
                >
                  {t.tone === "success" ? <CheckCircle /> : <AlertCircle />}
                  <span className="flex-1">{t.message}</span>
                  <button aria-label="Dismiss notification" onClick={() => dismiss(t.id)} className="opacity-80 hover:opacity-100">
                    <X width={16} height={16} />
                  </button>
                </div>
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
