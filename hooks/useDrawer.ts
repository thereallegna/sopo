import { useEffect, useCallback } from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';

type UseDrawerOptions = {
  isDirty?: boolean;
  reset?: () => void;
};

export const useDrawer = ({
  isDirty = false,
  reset = () => {},
}: UseDrawerOptions = {}) => {
  const { isOpen, isOpenFilter, closeDrawer } = useDrawerStore();
  const { setIsDirty } = useFormStore();

  // Function to handle closing the drawer, considering unsaved changes
  const handleCloseDrawer = useCallback(() => {
    if (isDirty) {
      closeDrawer();
      reset();
    } else {
      closeDrawer();
      reset();
      setIsDirty(false);
    }
  }, [isDirty, closeDrawer, reset, setIsDirty]);

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

  // Update the global store with the current dirty state whenever it changes
  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty, setIsDirty]);

  return { handleCloseDrawer, isOpen, isOpenFilter };
};
