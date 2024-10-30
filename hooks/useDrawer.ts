import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDrawerStore } from '@stores/useDrawerStore';

export const useCloseDrawerOnPathChange = () => {
  const { closeDrawer, isOpen } = useDrawerStore();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      closeDrawer();
    }
  }, [pathname, closeDrawer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
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
  }, [isOpen]);
};
