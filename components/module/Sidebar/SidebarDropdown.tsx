'use client';

import { Button } from '@components/ui/Button';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@libs/classNames';
import { SidebarItem } from '../../../types/sidebar';

interface SidebarDropdownProps {
  item: SidebarItem;
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  item: { title, icon: Icon, children },
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        type="button"
        className="flex items-center justify-between p-2 "
        onClick={() => setIsOpen(!isOpen)}
        icon={Icon}
        variant="sidebar"
        end_icon={{
          icon: IconChevronDown,
          className: cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          ),
        }}
      >
        <h1
          className={cn(
            'leading-[18px] text-start overflow-hidden ml-2 whitespace-pre-line',
            isOpen ? 'font-semibold' : 'font-normal'
          )}
        >
          {title}
        </h1>
      </Button>

      {isOpen && children && (
        <div className="ml-4 mt-1 space-y-1">
          {children.map((child) => (
            <div key={child.path || child.title}>
              {child.path ? (
                <Link href={child.path}>
                  <Button
                    type="button"
                    className="flex items-center justify-between p-2"
                    variant="sidebar"
                    icon={child.icon}
                  >
                    <h1 className="ml-2 font-normal">{child.title}</h1>
                  </Button>
                </Link>
              ) : (
                <SidebarDropdown item={child} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarDropdown;
