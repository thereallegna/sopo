import { useSidebarStore } from '@stores/useSidebarStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type UseSidebarProps = {
  path?: string;
};

export const useSidebar = ({ path }: UseSidebarProps = {}) => {
  const pathname = usePathname();
  const {
    activePathId,
    isOpen,
    openDropdowns,
    setActivePath,
    toggleDropdown,
    toggleSidebar,
  } = useSidebarStore();

  useEffect(() => {
    // Update active path when pathname changes
    if (path) {
      setActivePath(path);
    } else {
      setActivePath(pathname);
    }
  }, [pathname, path, setActivePath]);

  const isActive = path ? activePathId === path : activePathId === pathname;

  return {
    isActive,
    isOpen,
    openDropdowns,
    toggleDropdown,
    toggleSidebar,
  };
};
