import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSidebarStore } from '@stores/useSidebarStore';
import { SidebarItem } from '../types/sidebar';

type UseSidebarProps = {
  path?: string;
  title?: string;
  children?: SidebarItem[];
};

export const useSidebar = ({ path, title, children }: UseSidebarProps = {}) => {
  const pathname = usePathname();
  const {
    activePathId,
    isOpen,
    openDropdowns,
    searchQuery,
    setActivePath,
    toggleDropdown,
    toggleSidebar,
  } = useSidebarStore();

  const dropdownOpen = title ? openDropdowns[title] || false : false;
  const currentSearchQuery = searchQuery.toLowerCase();

  const hasVisibleChildren = (items: SidebarItem[]): boolean =>
    items.some((child) => {
      if (child.title.toLowerCase().includes(currentSearchQuery)) {
        return true;
      }
      if (child.children) {
        return hasVisibleChildren(child.children);
      }
      return false;
    });

  const getVisibleChildren = (childrenItems?: SidebarItem[]) => {
    if (!childrenItems) return [];

    return childrenItems.filter(
      (child) =>
        child.title.toLowerCase().includes(currentSearchQuery) ||
        (child.children && hasVisibleChildren(child.children))
    );
  };

  const visibleChildren = getVisibleChildren(children);

  const handleDropdownToggle = () => {
    if (!isOpen) toggleSidebar();
    if (title) toggleDropdown(title);
  };

  useEffect(() => {
    if (path) {
      setActivePath(path);
    } else {
      setActivePath(pathname);
    }
  }, [pathname, path, setActivePath]);

  useEffect(() => {
    if (currentSearchQuery && children && title) {
      const hasMatches =
        hasVisibleChildren(children) ||
        title.toLowerCase().includes(currentSearchQuery);

      if (hasMatches && !dropdownOpen) {
        toggleDropdown(title);
      } else if (!dropdownOpen && currentSearchQuery) {
        toggleDropdown(title);
      }
    }
  }, [currentSearchQuery, children, title, dropdownOpen, toggleDropdown]);

  const isActive = path ? activePathId === path : activePathId === pathname;
  const shouldRender =
    !currentSearchQuery || (visibleChildren && visibleChildren.length > 0);

  return {
    isActive,
    isOpen,
    dropdownOpen,
    visibleChildren,
    shouldRender,
    handleDropdownToggle,
    toggleSidebar,
    currentSearchQuery,
  };
};
