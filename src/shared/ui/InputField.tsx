'use client';

import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({
  id,
  label,
  register,
  error,
  className,
  ...props
}: InputFieldProps) => {
  const baseInputClasses =
    'bg-background dark:bg-foreground w-full border-2 text-black px-5 py-3 text-lg focus:ring-0 focus:outline-none rounded-md';

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>
      <input
        id={id}
        className={twMerge(baseInputClasses, className)}
        {...register}
        {...props}
      />
      {error && <p className="font-bold text-red-600">{error.message}</p>}
    </div>
  );
};

export default InputField;
