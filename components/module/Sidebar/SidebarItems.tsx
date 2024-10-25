'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@components/ui/Button';
import { usePathname } from 'next/navigation';
import { cn } from '@libs/classNames';
import { useSidebar } from '@hooks/useSidebar';
import { useSidebarStore } from '@stores/useSidebarStore';
import SidebarDropdown from './SidebarDropdown';
import { SidebarItem } from '../../../types/sidebar';

type SidebarItemsProps = {
  items: SidebarItem[];
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ items }) => {
  const pathname = usePathname();
  const searchQuery = useSidebarStore((state) =>
    state.searchQuery.toLowerCase()
  );
  const { isOpen } = useSidebar();

  // Fungsi untuk memfilter item berdasarkan searchQuery
  const filterItems = (item: SidebarItem): boolean => {
    const matchesTitle = item.title.toLowerCase().includes(searchQuery);

    // Jika item cocok dengan judul atau jika ada anak yang cocok
    const childrenMatch =
      item.children?.some((child) => filterItems(child)) ?? false;

    // Kembalikan true jika item cocok atau ada anak yang cocok
    return matchesTitle || childrenMatch;
  };

  return (
    <div className="space-y-1 py-1">
      {items
        .filter(filterItems) // Menerapkan filter
        .map((item) => {
          const isActive = pathname === item.path;

          return (
            <div key={item.title}>
              {item.path ? (
                <Link href={item.path}>
                  <Button
                    type="button"
                    iconClassName={cn(
                      isActive ? 'text-blue-500 font-bold' : ''
                    )}
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
                        isActive ? 'font-semibold' : 'font-normal',
                        isOpen ? 'block' : 'hidden'
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
