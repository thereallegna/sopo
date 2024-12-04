import React from 'react';
import { cn } from '@libs/classNames';
import { cva, VariantProps } from 'class-variance-authority';
import { IconLayersLinked, IconXboxX } from '@tabler/icons-react';
import { useTableContext } from '@context/TableContext';
import IconComponent from '../Icon';

const tableHeadvariant = cva(
  'flex gap-x-2 items-center text-base font-semibold w-full min-w-max',
  {
    variants: {
      type: {
        default: 'py-3 px-4 bg-Neutral-100',
        form: 'p-0',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  }
);

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadvariant> {
  activeGroup?: boolean;
  onGroup?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, activeGroup, className, onGroup, ...props }, ref) => {
    const { type } = useTableContext();
    return (
      <th
        ref={ref}
        className={type === 'default' ? 'bg-Neutral-100' : ''}
        {...props}
      >
        <div className={cn(tableHeadvariant({ type, className }))}>
          {onGroup && (
            <IconComponent
              icon={activeGroup ? IconXboxX : IconLayersLinked}
              size="large"
              color={activeGroup ? 'danger' : 'light'}
              onClick={onGroup}
              className="cursor-pointer"
            />
          )}
          {children}
        </div>
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

export default TableHead;
