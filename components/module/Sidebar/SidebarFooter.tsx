'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import { IconChevronUp, IconWorld } from '@tabler/icons-react';
import { cn } from '@libs/classNames';

const SidebarFooter: React.FC = () => (
  <div className="px-[20px] py-[10px] border border-Neutral-200 border-solid w-full">
    <Button
      type="button"
      className="flex items-center justify-between p-2"
      onClick={() => {
        console.log('clicked');
      }}
      icon={{ icon: IconWorld }}
      variant="sidebar"
      end_icon={{
        icon: IconChevronUp,
        className: cn('transition-transform duration-200'),
      }}
    >
      <h1
        className={cn(
          'leading-[18px] text-start overflow-hidden ml-2 font-normal whitespace-pre-line'
        )}
      >
        English
      </h1>
    </Button>
  </div>
);

export default SidebarFooter;
