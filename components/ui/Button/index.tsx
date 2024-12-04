'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/classNames';
import IconComponent, { IconProps } from '@components/ui/Icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm shadow-Shadow/s px-3 py-2 ring-offset-white focus:ring-offset-0 focus:ring-Blue-200 focus:ring-[3px] w-full capitalize',
  {
    variants: {
      variant: {
        primary: 'bg-Blue-500 text-Neutral-50 hover:bg-Blue-700',
        secondary: 'border border-Neutral-200 bg-White text-Neutral-600',
        outlined:
          'border border-Blue-700 text-Blue-600 bg-white hover:text-Blue-700',
        danger: 'bg-Red-500 text-white hover:bg-Red-700',
        sidebar:
          'rounded-sm bg-transparent shadow-none text-Neutral-600 hover:bg-Neutral-100 focus:ring-transparent ',
        backDrawer:
          'bg-White text-Neutral-600 hover:bg-Neutral-100 shadow-none px-2 py-1',
        disabled:
          'bg-Blue-200 text-Neutral-50 pointer-events-none	 border border-solid border-Blue-300',
        navbarSettings:
          'bg-transparent shadow-none border-none hover-none focus:ring-transparent',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        outline:
          'border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
      },
      size: {
        small: 'font-semibold text-base',
        normal: 'font-semibold text-lg',
        big: 'font-bold text-xl',
        icon: 'p-[7px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'small',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: IconProps;
  end_icon?: IconProps;
  iconClassName?: string;
  iconSize?: 'small' | 'medium' | 'large' | null;
}

// Button Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon: Icon,
      end_icon: EndIcon,
      iconClassName, // Custom class untuk ikon
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          'flex items-center justify-between w-full',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-1">
          {Icon && <IconComponent {...Icon} className={cn(iconClassName)} />}{' '}
          {children}
        </div>
        {EndIcon && (
          <div className="flex items-center">
            <IconComponent {...EndIcon} />
          </div>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button'; // Name for debugging

export { Button, buttonVariants };
