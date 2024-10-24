'use client';

import { cn } from '@libs/classNames';
import React from 'react';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn('py-3 px-4 text-base', className)} {...props} />
));
TableRow.displayName = 'TableRow';

export default TableRow;
