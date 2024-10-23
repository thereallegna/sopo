'use client';

import React, { ElementType, FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/classNames';

const iconVariants = cva('cursor-pointer', {
  variants: {
    size: {
      small: 'w-3 h-3',
      medium: 'w-[14px] h-[14px]',
      large: 'w-4 h-4',
    },
    color: {
      default: 'text-Neutral-600',
      primary: 'text-Neutral-500',
      secondary: 'text-Blue-500',
      teriary: 'text-Blue-600',
      light: 'text-Neutral-400',
      danger: 'text-Red-500',
      dark: 'text-Neutral-black',
      White: 'text-Neutral-White',
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'default',
  },
});

// Define props for the icon component
export interface IconProps extends VariantProps<typeof iconVariants> {
  icon: ElementType;
  className?: string;
  onClick?: () => void;
}

// Create the IconComponent using the `cva` styles
const IconComponent: FC<IconProps> = ({
  icon: IconElement,
  className,
  size,
  color,
  onClick,
  ...props
}) => (
  <IconElement
    className={cn(iconVariants({ size, color, className }))}
    onClick={onClick}
    data-testid="mock-icon"
    {...props}
  />
);

export default IconComponent;
