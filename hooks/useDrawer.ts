// hooks/useCloseDrawerOnPathChange.ts
import { useEffect } from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';

export const useCloseDrawerOnPathChange = () => {
  const { isOpenFilter, isOpen } = useDrawerStore();

  // Mengatur pointer events
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen || isOpenFilter) {
      timer = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 500);
    } else {
      document.body.style.pointerEvents = 'none';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.pointerEvents = '';
    };
  }, [isOpen, isOpenFilter]);
};
