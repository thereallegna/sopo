import React from 'react';
import { cn } from '@libs/classNames';
import { IconLayersLinked, IconXboxX } from '@tabler/icons-react';
import IconComponent from '../Icon';

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  activeGroup?: boolean;
  onGroup?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, activeGroup, onGroup, ...props }, ref) => (
    <th ref={ref} className="bg-Neutral-100" {...props}>
      <div
        className={cn(
          'py-3 px-4 flex gap-x-2 items-center text-base font-semibold w-full min-w-max bg-Neutral-100'
        )}
      >
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
  )
);
TableHead.displayName = 'TableHead';

export default TableHead;
