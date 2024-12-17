import { UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { useEffect } from 'react';

export const useSetValueForm = <T extends Record<string, any>>(
  detailData: T,
  setValue: UseFormSetValue<T>,
  dependencies?: any
) => {
  useEffect(() => {
    if (detailData) {
      (Object.keys(detailData) as Array<keyof T>).forEach((key) => {
        setValue(key as Path<T>, detailData[key] as PathValue<T, Path<T>>);
      });
    }
  }, [detailData, setValue, dependencies]); // Re-run when detailData changes
};
