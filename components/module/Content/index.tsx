'use client';

import React, { PropsWithChildren } from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import { cn } from '@libs/classNames';

interface ContentProps extends PropsWithChildren {
  className?: string;
}

const Content: React.FC<ContentProps> = ({ children, className }) => {
  const { isOpen } = useDrawerStore();

  return (
    <div
      className={cn(
        'transition-colors duration-300 ease-in-out',
        className,
        isOpen ? 'bg-black/80' : 'bg-transparent'
      )}
    >
      {children}
    </div>
  );
};

export default Content;
