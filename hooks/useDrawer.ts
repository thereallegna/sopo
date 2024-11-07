import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';

export const useCloseDrawerOnPathChange = () => {
  const {
    isOpenFilter,
    isOpenTable,
    isOpen,
    closeFilterDrawer,
    closeTableDrawer,
  } = useDrawerStore();

  const pathname = usePathname();
  const { changeStatus, setIsAlertOpen } = useFormStore();

  // Membuka AlertDialog jika `changeStatus dan pathname berubah`
  useEffect(() => {
    if (changeStatus) {
      setIsAlertOpen(true);
    }
    if (isOpenFilter) {
      closeFilterDrawer();
    }
    if (isOpenTable) {
      closeTableDrawer();
    }
  }, [pathname]);

  // Mengatur delay untuk pointer events saat drawer terbuka
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen || isOpenFilter || isOpenTable) {
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
  }, [isOpen, isOpenFilter, isOpenTable]);
};
