'use client';

import * as React from 'react';
import { cn } from '@libs/classNames';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableRow from './TableRow';
import TableCell from './TableCell';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full border-[1px] border-neutral-200 rounded-sm h-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full border-collapse border-spacing-0', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

export { TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell };

export default Table;
