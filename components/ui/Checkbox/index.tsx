'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@libs/classNames';
import Label, { LabelProps } from '../Label';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  id?: string;
  label?: string;
  preChecked?: boolean;
  labelProps?: LabelProps;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, id, label, preChecked, labelProps, ...props }, ref) => (
  <div className="flex gap-[8px] items-center">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-[16px] w-[16px] rounded-[4px] border border-neutral-300 focus:outline-none focus:ring-[2px] focus:ring-blue-200 checked:border-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=checked]:text-neutral-100 flex items-center justify-center',
        className
      )}
      id={id}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
      {preChecked && <div className="bg-blue-500 w-[8px] h-[8px]" />}
    </CheckboxPrimitive.Root>
    {label && (
      <Label htmlFor={id} {...labelProps}>
        {label}
      </Label>
    )}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
