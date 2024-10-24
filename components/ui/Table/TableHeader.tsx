'use client';

import { cn } from '@libs/classNames';
import React from 'react';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-Neutral-100 border-b-[1px] border-Neutral-200',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

export default TableHeader;
