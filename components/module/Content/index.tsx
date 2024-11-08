'use client';

import React, { PropsWithChildren } from 'react';
import { cn } from '@libs/classNames';

interface ContentProps extends PropsWithChildren {
  className?: string;
}

const Content: React.FC<ContentProps> = ({ children, className }) => (
  <div className={cn('transition-colors duration-300 ease-in-out', className)}>
    {children}
  </div>
);

export default Content;
