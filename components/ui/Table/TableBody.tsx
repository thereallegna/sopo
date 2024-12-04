'use client';

import { useTableContext } from '@context/TableContext';
import { cn } from '@libs/classNames';
import React from 'react';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { type } = useTableContext();
  return (
    <tbody
      ref={ref}
      className={cn(
        type === 'default'
          ? '[&_tr:last-child]:border-0 divide-y-[1px] divide-Neutral-200'
          : '',
        className
      )}
      {...props}
    />
  );
});
TableBody.displayName = 'TableBody';

export default TableBody;
