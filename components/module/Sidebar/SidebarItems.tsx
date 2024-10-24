'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/Button';
import SidebarDropdown from './SidebarDropdown';
import { SidebarItem } from '../../../types/sidebar';

type SidebarItemsProps = {
  items: SidebarItem[];
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ items }) => (
  <div className="space-y-1 py-1">
    {items.map((item) => (
      <div key={item.title}>
        {item.path ? (
          <Link href={item.path}>
            <Button
              type="button"
              className="flex items-center justify-between p-2 "
              variant="sidebar"
              icon={item.icon}
            >
              <h1 className="ml-2 font-normal focus:font-semibold">
                {item.title}
              </h1>
            </Button>
          </Link>
        ) : (
          <SidebarDropdown item={item} />
        )}
      </div>
    ))}
  </div>
);

export default SidebarItems;
