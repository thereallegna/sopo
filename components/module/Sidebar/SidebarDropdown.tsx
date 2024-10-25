'use client';

import { Button } from '@components/ui/Button';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@libs/classNames';
import { useSidebar } from '@hooks/useSidebar';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '../../../types/sidebar';

type SidebarDropdownProps = {
  item: SidebarItem;
};

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  item: { title, icon: Icon, children, path },
}) => {
  const pathname = usePathname();
  const { dropdownOpen, visibleChildren, shouldRender, handleDropdownToggle } =
    useSidebar({ title, children, path });

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        className="flex items-center justify-between p-2"
        onClick={handleDropdownToggle}
        icon={Icon}
        variant="sidebar"
        end_icon={{
          icon: IconChevronDown,
          className: cn(
            'transition-transform duration-200',
            dropdownOpen && 'rotate-180'
          ),
        }}
      >
        <h1
          className={cn(
            'leading-[18px] text-start overflow-hidden ml-2 whitespace-pre-line',
            dropdownOpen ? 'font-semibold' : 'font-normal'
          )}
        >
          {title}
        </h1>
      </Button>

      {dropdownOpen && visibleChildren && visibleChildren.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {visibleChildren.map((child) => {
            const isActive = pathname === child.path;

            return (
              <div key={child.path || child.title}>
                {child.path ? (
                  <Link href={child.path}>
                    <Button
                      type="button"
                      className={cn(
                        'flex items-center justify-between p-2',
                        isActive ? 'bg-blue-50 text-blue-500' : ''
                      )}
                      variant="sidebar"
                      icon={child.icon}
                    >
                      <h1
                        className={cn(
                          'ml-2 font-normal',
                          isActive ? 'font-semibold' : 'font-normal'
                        )}
                      >
                        {child.title}
                      </h1>
                    </Button>
                  </Link>
                ) : (
                  <SidebarDropdown item={child} key={child.title} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SidebarDropdown;
