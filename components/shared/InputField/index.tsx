'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/classNames';
import Input, { InputProps } from '@components/ui/Input';
import Label, { LabelProps } from '@components/ui/Label';

const inputFieldVariant = cva('flex', {
  variants: {
    right: {
      true: 'flex-row justify-between items-center gap-[8px] self-stretch',
      false: 'flex-col gap-[4px]',
    },
  },
  defaultVariants: {
    right: false,
  },
});

const messageInputFieldVariant = cva('', {
  variants: {
    variant: {
      normal: 'text-neutral-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
    },
    sizes: {
      small: 'text-base',
      medium: 'text-base',
      large: 'text-md',
    },
  },
  defaultVariants: {
    variant: 'normal',
    sizes: 'small',
  },
});

export interface MessageInputProps {
  text: string;
  type: 'normal' | 'danger' | 'success' | 'warning';
}

export interface InputFieldProps
  extends VariantProps<typeof inputFieldVariant> {
  id?: string;
  label?: string;
  /**
   * message is useful for displaying message
   */
  message?: MessageInputProps;
  size?: 'small' | 'medium' | 'large';
  right?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelProps?: LabelProps;
  inputProps?: InputProps;
}

const InputField = (props: InputFieldProps) => {
  const {
    label,
    message,
    required,
    disabled,
    size,
    right,
    className,
    inputProps,
    labelProps,
  } = props;

  return (
    <div className={cn(inputFieldVariant({ className, right }))}>
      <Label required={required} sizes={size} {...labelProps}>
        {label}
      </Label>
      <Input
        disabled={disabled}
        required={required}
        sizes={size}
        {...inputProps}
        theme={message?.type}
      />
      {message && (
        <span
          className={cn(
            messageInputFieldVariant({ variant: message.type, sizes: size })
          )}
        >
          {message.text}
        </span>
      )}
    </div>
  );
};

export default InputField;
