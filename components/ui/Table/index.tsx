'use client';

import * as React from 'react';
import { TableProvider } from '@context/TableContext';
import { cn } from '@libs/classNames';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableRow from './TableRow';
import TableCell from './TableCell';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  type?: 'default' | 'form';
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, type = 'default', ...props }, ref) => (
    <TableProvider value={{ type }}>
      <div
        className={`w-full ${
          type === 'default' ? 'border border-1' : 'border-0 -mx-[10px]'
        } border-neutral-200 rounded-sm h-full overflow-auto`}
      >
        <table
          ref={ref}
          className={cn(
            'w-full',
            type === 'default'
              ? 'border-collapse'
              : 'border-separate border-spacing-[10px]',
            className
          )}
          {...props}
        />
      </div>
    </TableProvider>
  )
);
Table.displayName = 'Table';

export { TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell };

export default Table;
