import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDrawerStore } from '@stores/useDrawerStore';

export const useCloseDrawerOnPathChange = () => {
  const { isOpenFilter, closeDrawer, isOpen } = useDrawerStore();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen || isOpenFilter) {
      closeDrawer();
    }
  }, [pathname, closeDrawer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen || isOpenFilter) {
      timer = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 500); // 2-second delay
    } else {
      document.body.style.pointerEvents = 'none';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.pointerEvents = '';
    };
  }, [isOpen, isOpenFilter]);
};
