'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

// --- Tipe Data dan Props ---
type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  className?: string;
  onClose?: () => void;
}

// --- Definisi Ikon SVG ---
const icons: Record<AlertVariant, React.ReactNode> = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

// --- Definisi Style untuk Setiap Varian ---
const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; title: string }
> = {
  success: {
    container: 'bg-green-100 border-green-400 text-green-700',
    icon: 'text-green-500',
    title: 'text-green-800',
  },
  error: {
    container: 'bg-red-100 border-red-400 text-red-700',
    icon: 'text-red-500',
    title: 'text-red-800',
  },
  warning: {
    container: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
  },
  info: {
    container: 'bg-blue-100 border-blue-400 text-blue-700',
    icon: 'text-blue-500',
    title: 'text-blue-800',
  },
};

const Alert = ({
  children,
  variant = 'info',
  title,
  className,
  onClose,
}: AlertProps) => {
  const styles = variantStyles[variant];
  const icon = icons[variant];

  return (
    <div
      className={twMerge(
        'relative rounded-lg border p-4', // Base styles
        styles.container, // Variant styles
        className // Custom styles from props
      )}
      role="alert"
    >
      <div className="flex items-start gap-4">
        <span className={styles.icon}>{icon}</span>
        <div className="flex-1">
          {title && (
            <strong className={twMerge('block font-medium', styles.title)}>
              {title}
            </strong>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-current opacity-70 transition-opacity hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
