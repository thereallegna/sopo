'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { IconProps } from '@components/ui/Icon';
import { cn } from '@libs/classNames';
import { IconArrowLeft } from '@node_modules/@tabler/icons-react/dist/esm/tabler-icons-react';
import { Button } from '@components/ui/Button';

const Drawer = ({
  shouldScaleBackground = false,
  dismissible = false,
  // noBodyStyles = true,
  // handleOnly = true,
  modal = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    modal={modal}
    dismissible={dismissible}
    // handleOnly={handleOnly}
    // noBodyStyles={noBodyStyles}
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      'absolute  inset-0 z-50 bg-slate-800/5 backdrop-blur-[1px]',
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

type DrawerContentProps = {
  fixed?: boolean;
} & React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ fixed, className, children, ...props }, ref) => (
  <>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        `${
          fixed ? 'fixed right-0' : 'absolute inset-x-0'
        } h-full inset-y-0 bottom-0 z-50  flex  flex-col rounded-t-[10px] border bg-white`,
        className
      )}
      {...props}
    >
      <div className="mx-auto w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerBack = React.forwardRef<React.ElementRef<typeof Button>, IconProps>(
  ({ icon, className, onClick }) => (
    <Button
      className={cn('rounded-md w-1/6', className)}
      onClick={onClick}
      size="icon"
      variant="backDrawer"
      icon={{
        size: 'large',
        icon: icon || IconArrowLeft,
        color: 'dark',
      }}
    />
  )
);
DrawerBack.displayName = 'DrawerBack';

const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'w-full flex flex-col justify-between p-5 gap-5 overflow-auto',
      className
    )}
    {...props}
  />
);
DrawerBody.displayName = 'DrawerBody';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-[20px] text-Neutral-Black font-bold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerEndHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-row items-center justify-between  gap-2',
      className
    )}
    {...props}
  />
);
DrawerEndHeader.displayName = 'DrawerEndHeader';

const DrawerHeader = ({
  className,
  drawerTitle,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  drawerTitle?: string;
  onClick?: () => void;
}) => (
  <div
    className={cn(
      'flex items-center justify-between p-4 border-[#E4E7EC] border-b',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-[10px]">
      <DrawerBack onClick={onClick} icon={IconArrowLeft} />
      <DrawerTitle>{drawerTitle}</DrawerTitle>
    </div>

    {children}
  </div>
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(' flex flex-col gap-2 ', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerEndHeader,
  DrawerBody,
  DrawerBack,
};
