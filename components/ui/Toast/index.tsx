'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@libs/classNames';
import {
  IconCircleCheckFilled,
  IconInfoCircleFilled,
  IconXboxXFilled,
} from '@tabler/icons-react';
import IconComponent, { IconProps } from '../Icon';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn('fixed top-0 z-[100] flex w-full flex-col p-4', className)}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'relative group pointer-events-auto relative flex w-full items-center justify-between space-x-3 overflow-hidden rounded-md border-neutral-200 p-2 pl-3 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-neutral-800',
  {
    variants: {
      variant: {
        default:
          'border border-Neutral-200 bg-white rounded-sm text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50',
        destructive:
          'destructive group border-red-500 bg-red-500 text-neutral-50 dark:border-red-900 dark:bg-red-900 dark:text-neutral-50',
      },
      size: {
        default: 'w-[300px] h-[48px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const themeVariant = cva('absolute rounded-l-md left-0 top-0 w-2 h-full', {
  variants: {
    theme: {
      danger: 'bg-Red-500',
      warning: 'bg-Yellow-500',
      success: 'bg-Green-500',
    },
  },
  defaultVariants: {
    theme: 'success',
  },
});

type ToastTheme = 'success' | 'warning' | 'danger';

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & { theme?: ToastTheme }
>(({ className, variant, theme, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  >
    <div className={cn(themeVariant({ theme }))} />
    {props.children}
  </ToastPrimitives.Root>
));

Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-neutral-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-neutral-50 group-[.destructive]:focus:ring-red-500 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:focus:ring-neutral-300 dark:group-[.destructive]:border-neutral-800/40 dark:group-[.destructive]:hover:border-red-900/30 dark:group-[.destructive]:hover:bg-red-900 dark:group-[.destructive]:hover:text-neutral-50 dark:group-[.destructive]:focus:ring-red-900',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-neutral-950/50 opacity-0 transition-opacity hover:text-neutral-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:text-neutral-50/50 dark:hover:text-neutral-50',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(
      'text-sm font-semibold p-1 rounded-full bg-Green-100',
      className
    )}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(
      'opacity-90 text-lg text-Neutral-900 font-semibold',
      className
    )}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

type ToastAlertProps = ToastProps & {
  iconProps?: IconProps;
  title: string;
};

const ToastApp = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastAlertProps
>(({ iconProps, title, theme, ...props }, ref) => {
  let icon = IconCircleCheckFilled;
  if (theme === 'warning') {
    icon = IconInfoCircleFilled;
  }
  if (theme === 'danger') {
    icon = IconXboxXFilled;
  }
  return (
    <>
      <Toast
        ref={ref}
        {...props}
        className={`${toastVariants({
          variant: 'default',
        })} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 overflow-hidden`}
      >
        <div className="flex items-center gap-3">
          <ToastTitle>
            <IconComponent
              icon={icon}
              size="x_large"
              className="text-green-500"
              {...iconProps}
            />
          </ToastTitle>
          <ToastDescription>{title}</ToastDescription>
        </div>
      </Toast>
      <ToastViewport />
    </>
  );
});

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  toastVariants,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastApp,
  type ToastTheme,
};
