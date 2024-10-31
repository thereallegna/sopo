'use client';

import { Button, ButtonProps } from '@components/ui/Button';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

export type HeaderContentProps = {
  title: string;
  onAdd?: () => void;
  onAddButtonProps?: ButtonProps;
};

const HeaderContent = ({
  title,
  onAdd,
  onAddButtonProps,
}: HeaderContentProps) => (
  <div className="p-5 border-b border-Neutral-200 flex justify-between items-center">
    <p className="text-[20px] text-Neutral-Black font-bold">{title}</p>
    {onAdd && (
      <div>
        <Button
          icon={{
            icon: IconPlus,
            color: 'White',
          }}
          onClick={onAdd}
          {...onAddButtonProps}
        >
          Add
        </Button>
      </div>
    )}
  </div>
);

export default HeaderContent;
