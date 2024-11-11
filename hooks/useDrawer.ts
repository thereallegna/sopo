import { useCallback, useEffect } from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';
import { UseFormReset } from 'react-hook-form';

export const useDrawer = (
  isDirty?: boolean,
  reset?: UseFormReset<any>,
  detail_data?: object
) => {
  const {
    isOpen,
    isOpenFilter,
    isOpenTable,
    isOpenDetail,
    isOpenEdit,
    closeDrawer,
    closeEditDrawer,
  } = useDrawerStore();
  const { setIsDirty, setReset, isReset, setLeavingPage, isChanged } =
    useFormStore();

  useEffect(() => {
    if (typeof isDirty !== 'undefined') {
      setIsDirty(isDirty);
    }
  }, [isDirty, setIsDirty]);

  const handleCloseDrawer = useCallback(() => {
    if (isDirty) {
      console.log('isDirty (handleCloseDrawer):', isDirty);
      setLeavingPage(true);
    } else {
      console.log('Closing drawer without setting leaving page');
      closeDrawer();
      setIsDirty(false);
      setReset(false);
    }
  }, [isDirty, closeDrawer, setIsDirty, setReset, setLeavingPage]);

  const handleCloseDrawerEdit = useCallback(() => {
    if (isChanged) {
      console.log('isDirty (handleCloseDrawerEdit):', isDirty);
      setLeavingPage(true);
    } else {
      console.log('Closing edit drawer without setting leaving page');
      closeEditDrawer();
      setIsDirty(false);
      setReset(false);
    }
  }, [
    closeEditDrawer,
    setIsDirty,
    setReset,
    setLeavingPage,
    isChanged,
    isDirty,
  ]);

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
    handleCloseDrawer,
    isOpen,
    isOpenFilter,
    isOpenTable,
    handleCloseDrawerEdit,
  };
};
