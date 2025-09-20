'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

// --- Tipe Data dan Props ---
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
type ButtonColor = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  color: ButtonColor;
  children: React.ReactNode;
  className?: string;
}

// --- Definisi Style untuk Setiap Kombinasi ---
const styles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
    secondary:
      'bg-slate-700 text-white hover:bg-slate-800 disabled:bg-slate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
  },
  outline: {
    primary:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-200 disabled:text-blue-200',
    secondary:
      'border-2 border-slate-600 text-slate-600 hover:bg-slate-100 disabled:border-slate-300 disabled:text-slate-300',
    danger:
      'border-2 border-red-600 text-red-600 hover:bg-red-50 disabled:border-red-200 disabled:text-red-200',
  },
  ghost: {
    primary: 'text-blue-600 hover:bg-blue-100 disabled:text-blue-200',
    secondary: 'text-slate-600 hover:bg-slate-100 disabled:text-slate-200',
    danger: 'text-red-600 hover:bg-red-100 disabled:text-red-200',
  },
  link: {
    primary:
      'text-blue-600 underline-offset-4 hover:underline disabled:text-blue-200',
    secondary:
      'text-slate-600 underline-offset-4 hover:underline disabled:text-slate-200',
    danger:
      'text-red-600 underline-offset-4 hover:underline disabled:text-red-200',
  },
};

const Button = ({
  variant = 'solid',
  color = 'primary',
  children,
  className,
  ...props
}: ButtonProps) => {
  // --- Class Dasar untuk semua tombol ---
  const baseClasses =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';

  // Ambil style spesifik dari objek `styles`
  const variantColorClasses = styles[variant][color];

  return (
    <button
      className={twMerge(
        clsx(baseClasses, variantColorClasses, className ?? undefined)
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
