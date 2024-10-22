'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@libs/classNames';
import { IconInfoCircle } from '@tabler/icons-react';

const labelVariants = cva(
  'flex gap-[4px] items-center text-base text-neutral-600',
  {
    variants: {
      font: {
        normal: 'font-normal',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      sizes: {
        small: 'text-base',
        medium: 'text-md',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      font: 'normal',
      sizes: 'small',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants>,
    React.PropsWithChildren {
  required?: boolean;
  info?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, info, sizes, font, required, children, ...props }, ref) => (
    <label
      className={cn(labelVariants({ className, sizes, font }))}
      ref={ref}
      {...props}
    >
      {children} {required && <span className="text-red-500">*</span>}
      {info && <IconInfoCircle size={12} />}
    </label>
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
