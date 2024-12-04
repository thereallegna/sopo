'use client';

import { cn } from '@libs/classNames';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const tableCellVariant = cva('text-base text-Neutral-Black', {
  variants: {
    size: {
      normal: 'py-[5px] px-[10px]',
      compact: 'py-1 px-[10px]',
      narrow: 'px-2',
    },
    columnPinning: {
      true: 'sticky left-0',
      false: '',
    },
  },
  defaultVariants: {
    columnPinning: false,
    size: 'normal',
  },
});

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariant> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, ...props }, ref) => (
    <td
      className={cn(tableCellVariant({ size, className }))}
      ref={ref}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export default TableCell;
