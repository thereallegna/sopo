import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@libs/classNames';

const drawerVariants = cva(
  'absolute z-20 top-0 right-0 h-full bg-red-500 shadow-lg transition-all duration-300 ease-in-out',
  {
    variants: {
      open: {
        true: 'w-full',
        false: 'w-0',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

const Drawer = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof drawerVariants> & React.HTMLAttributes<HTMLDivElement>
>(({ className, open, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(drawerVariants({ open, className }))}
    {...props}
  />
));
Drawer.displayName = 'Drawer';

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between ', className)}
    {...props}
  />
));
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-[20px] text-Neutral-Black font-bold', className)}
    {...props}
  >
    {props.children || 'Judul Drawer'}
  </h2>
));
DrawerTitle.displayName = 'DrawerTitle';

const DrawerButtonHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between gap-2 ', className)}
    {...props}
  />
));
DrawerButtonHeader.displayName = 'DrawerButtonHeader';

const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
));
DrawerBody.displayName = 'DrawerBody';

const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-end p-4 border-t', className)}
    {...props}
  />
));
DrawerFooter.displayName = 'DrawerFooter';

export {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerButtonHeader,
};
