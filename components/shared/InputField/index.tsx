'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/classNames';
import Input, { InputProps } from '@components/ui/Input';
import Label, { LabelProps } from '@components/ui/Label';
import { IconProps } from '@components/ui/Icon';

const inputFieldVariant = cva('flex', {
  variants: {
    right: {
      true: 'flex-row  items-center gap-2 self-stretch',
      false: 'flex-col gap-1',
    },
  },
  defaultVariants: {
    right: false,
  },
});

export const messageInputFieldVariant = cva('', {
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
  defaultChecked?: boolean;
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
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  start_icon?: IconProps;
  end_icon?: IconProps;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>; // Add onKeyDown here
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      defaultChecked,
      message,
      required,
      disabled,
      size,
      right,
      className,
      inputProps,
      labelProps,
      value,
      type,
      placeholder,
      start_icon,
      end_icon,
      onChange,
      ...rest
    } = props;

    return (
      <div className={cn(inputFieldVariant({ className }))}>
        <div
          className={`flex ${
            right
              ? 'flex-row  items-center gap-2 self-stretch'
              : 'flex-col gap-1'
          }`}
        >
          <Label
            required={required}
            sizes={size}
            className="shrink-0 w-[100px] font-semibold"
            {...labelProps}
          >
            {label}
          </Label>
          <Input
            defaultChecked={defaultChecked}
            ref={ref} // Pass ref to the Input component
            {...rest}
            disabled={disabled}
            required={required}
            sizes={size}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            theme={message?.type}
            start_icon={start_icon}
            end_icon={end_icon}
            {...inputProps}
          />
        </div>

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
  }
);

export default InputField;
