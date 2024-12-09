import { useCallback, useEffect } from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';
import { UseFormReset } from 'react-hook-form';
import { usePathname } from 'next/navigation';

export const useDrawer = (reset?: UseFormReset<any>, detail_data?: object) => {
  const pathname = usePathname();
  const {
    isOpen,
    isOpenFilter,
    isOpenTable,
    isOpenDetail,
    isOpenEdit,
    closeDrawer,
    closeEditDrawer,
    closeAllDrawer,
  } = useDrawerStore();
  const { setReset, isReset, setLeavingPage, changeStatus, setChangeStatus } =
    useFormStore();

  useEffect(() => {
    closeAllDrawer();
  }, [pathname, closeAllDrawer]);

  const handleClose = useCallback(
    (closeFunction: () => void) => {
      console.log(changeStatus, 'CEKKKKKK');
      if (changeStatus) {
        setLeavingPage(true);
      } else {
        console.log('Closing drawer without setting leaving page');
        closeFunction();
        if (reset) {
          reset(detail_data);
        }
        setChangeStatus(false);
        setReset(false);
      }
    },
    [
      changeStatus,
      setLeavingPage,
      setReset,
      reset,
      setChangeStatus,
      detail_data,
    ]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen || isOpenFilter || isOpenTable || isOpenDetail || isOpenEdit) {
      timer = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 500);
    }

    return () => {
      clearTimeout(timer);
      document.body.style.pointerEvents = '';
    };
  }, [isOpen, isOpenFilter, isOpenTable, isOpenDetail, isOpenEdit]);

  // Reset the form if `isReset` is true
  useEffect(() => {
    if (isReset) {
      setReset(false);
      if (reset) reset(detail_data);
    }
  }, [isReset, reset, setReset, detail_data]);

  return {
    handleCloseDrawer: () => handleClose(closeDrawer),
    handleCloseDrawerEdit: () => handleClose(closeEditDrawer),
    isOpen,
    isOpenFilter,
    isOpenTable,
  };
};
