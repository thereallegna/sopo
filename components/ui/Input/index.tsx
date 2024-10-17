'use client';

import * as React from 'react';

import { cn } from '@libs/classNames';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariant = cva(
  'flex items-center px-[12px] gap-[8px] border-[1px] rounded-[6px] shadow-sm focus-within:outline-none focus-within:ring-[2px]',
  {
    variants: {
      theme: {
        normal: 'focus-within:ring-blue-200 text-neutral-500',
        success: 'focus-within:ring-green-200 text-green-500',
        warning: 'focus-within:ring-yellow-200 text-yellow-500',
        danger: 'focus-within:ring-red-200 text-red-500',
      },
      sizes: {
        small: 'text-base py-[6px] gap-[8px] rounded-[6px]',
        medium: 'text-lg py-[7px] gap-[8px] rounded-[6px]',
        large: 'text-xl py-[8px] gap-[8px] rounded-[6px]',
      },
    },
    defaultVariants: {
      theme: 'normal',
      sizes: 'small',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {
  start_icon?: React.ReactElement;
  end_icon?: React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, theme, type, start_icon, end_icon, sizes, disabled, ...props },
    ref
  ) => (
    <div
      className={`${cn(inputVariant({ className, theme, sizes }))} ${disabled ? 'bg-neutral-100' : ''}`}
    >
      {start_icon}
      <input
        type={type}
        className={cn('outline-none bg-transparent', className)}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      {end_icon}
    </div>
  )
);
Input.displayName = 'Input';

export default Input;
