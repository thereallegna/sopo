'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/Button';
import { usePathname } from 'next/navigation';
import { cn } from '@libs/classNames';
import SidebarDropdown from './SidebarDropdown';
import { SidebarItem } from '../../../types/sidebar';

type SidebarItemsProps = {
  items: SidebarItem[];
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div className="space-y-1 py-1">
      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <div key={item.title}>
            {item.path ? (
              <Link href={item.path}>
                <Button
                  type="button"
                  iconClassName={cn(isActive ? 'text-blue-500 font-bold' : '')}
                  className={cn(
                    'flex items-center justify-between p-2',
                    isActive ? 'bg-blue-50 text-blue-500' : ''
                  )}
                  variant="sidebar"
                  icon={item.icon}
                >
                  <h1
                    className={cn(
                      'ml-2 font-normal ',
                      isActive ? 'font-semibold' : 'font-normal'
                    )}
                  >
                    {item.title}
                  </h1>
                </Button>
              </Link>
            ) : (
              <SidebarDropdown item={item} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarItems;
