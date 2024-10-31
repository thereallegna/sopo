import React from 'react';
import { cn } from '@libs/classNames';
import { IconX } from '@tabler/icons-react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { DrawerBack } from '.';

const FilterDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg text-Neutral-Black font-bold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
FilterDrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const FilterDrawerHeader = ({
  className,
  title,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { title: string }) => (
  <div
    className={cn(
      'flex items-center justify-between border-[#E4E7EC] gap-[10px]',
      className
    )}
    {...props}
  >
    <FilterDrawerTitle>{title}</FilterDrawerTitle>
    <DrawerBack icon={IconX} />
  </div>
);
FilterDrawerHeader.displayName = 'DrawerHeader';

export { FilterDrawerTitle };
export default FilterDrawerHeader;
