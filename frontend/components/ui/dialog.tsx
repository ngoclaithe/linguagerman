'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export function Dialog({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    className
}: DialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Content */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={cn(
                                "relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl",
                                className
                            )}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-6">
                                <h2 className="text-2xl font-black text-slate-900 mb-2">{title}</h2>
                                {description && (
                                    <p className="text-slate-500 font-medium">{description}</p>
                                )}
                            </div>

                            <div className="mb-8">{children}</div>

                            {footer && (
                                <div className="flex flex-col sm:flex-row-reverse gap-3">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

interface ConfirmDialogProps extends Omit<DialogProps, 'children' | 'footer'> {
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    title,
    description,
    onConfirm,
    confirmText = "Xc nhn",
    cancelText = "Hy b",
    isLoading = false
}: ConfirmDialogProps) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            footer={
                <>
                    <Button
                        onClick={onConfirm}
                        className="bg-[#C53030] hover:bg-[#A51F1F] text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-rose-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            confirmText
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="rounded-xl px-8 h-12 font-bold text-slate-600 hover:bg-slate-100"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                </>
            }
        />
    );
}
