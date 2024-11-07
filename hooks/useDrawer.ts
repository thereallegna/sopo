// hooks/useDrawer.ts
import { useCallback, useEffect } from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';
import { UseFormReset } from 'react-hook-form';

export const useDrawer = (isDirty?: boolean, reset?: UseFormReset<any>) => {
  // Accept reset as a parameter
  const { isOpen, isOpenFilter, isOpenTable, closeDrawer } = useDrawerStore();
  const { setIsDirty, setReset, isReset } = useFormStore();

  useEffect(() => {
    if (typeof isDirty !== 'undefined') {
      setIsDirty(isDirty);
    }
  }, [isDirty, setIsDirty]);

  const handleCloseDrawer = useCallback(() => {
    if (isDirty) {
      closeDrawer();
      setReset(true);
      if (reset) reset(); // Call reset if it's passed
    } else {
      closeDrawer();
      setIsDirty(false);
      setReset(false);
    }
  }, [isDirty, closeDrawer, setIsDirty, setReset, reset]);

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

  // useEffect for resetForm reset if isReset is true
  useEffect(() => {
    if (isReset) {
      setReset(false);
      if (reset) reset();
    }
  }, [isReset, reset, setReset]);

  return { handleCloseDrawer, isOpen, isOpenFilter, isOpenTable };
};
