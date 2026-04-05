'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: {
        success: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
    };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    }, [removeToast]);

    const toast = {
        success: (msg: string) => addToast(msg, 'success'),
        error: (msg: string) => addToast(msg, 'error'),
        info: (msg: string) => addToast(msg, 'info'),
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={cn(
                                "pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md min-w-[320px] max-w-[420px]",
                                t.type === 'success' && "bg-emerald-50/90 border-emerald-100 text-emerald-900",
                                t.type === 'error' && "bg-rose-50/90 border-rose-100 text-rose-900",
                                t.type === 'info' && "bg-blue-50/90 border-blue-100 text-blue-900"
                            )}
                        >
                            <div className={cn(
                                "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                                t.type === 'success' && "bg-emerald-500 text-white",
                                t.type === 'error' && "bg-rose-500 text-white",
                                t.type === 'info' && "bg-blue-500 text-white"
                            )}>
                                {t.type === 'success' && <CheckCircle className="w-6 h-6" />}
                                {t.type === 'error' && <AlertCircle className="w-6 h-6" />}
                                {t.type === 'info' && <Info className="w-6 h-6" />}
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-bold leading-snug">{t.message}</p>
                            </div>

                            <button
                                onClick={() => removeToast(t.id)}
                                className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
                            >
                                <X className="w-4 h-4 opacity-40" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context.toast;
}
