'use client';

import { cn } from '@libs/classNames';
import React from 'react';

// const tableCellVariant = cva(
//   "py-[5px] px-[10px] text-base text-Neutral-Black",
//   {
//     variants: {
//       columnPinning: {
//         true: "sticky left-0",
//         false: "",
//       }
//     },
//     defaultVariants: {
//       columnPinning: false
//     }
//   }
// )

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      className={cn(
        'py-[5px] px-[10px] text-base text-Neutral-Black',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export default TableCell;
