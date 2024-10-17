import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/classNames';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm  shadow-Shadow/s px-3 py-2 ring-offset-white focus:ring-offset-0 focus:ring-Blue-200 focus:ring-[3px]',
  {
    variants: {
      variant: {
        primary:
          'bg-Blue-500 text-Neutral-White hover:bg-neutral-900/90 hover:bg-Blue-700 ',
        outlined:
          'border border-Blue-700 text-Blue-600 bg-white hover:border-Blue-700 hover:text-Blue-700 ',
      },
      size: {
        small: 'font-semibold text-base',
        normal: 'font-semibold text-lg ',
        big: 'font-bold text-xl',
        icon: 'h-10 w-10',
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
  icon?: React.ElementType;
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
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} //
        ref={ref}
        {...props}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button'; // Nama untuk debugging

export { Button, buttonVariants };
