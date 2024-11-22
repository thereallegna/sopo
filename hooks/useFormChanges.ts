import { useWatch, UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import useFormStore from '@stores/useFormStore';

interface UseFormStatusProps<T> {
  defaultValues?: T; // Optional for create form
  control: any; // control from react-hook-form
  ignoredFields?: (keyof T)[]; // List of fields to ignore
}

export const useFormChanges = <T extends Record<string, any>>({
  defaultValues,
  control,
  ignoredFields = [],
}: UseFormStatusProps<T>) => {
  const { setChangeStatus } = useFormStore();

  const watchedFields = useWatch({ control });

  // Normalize watchedFields to handle null vs "" issue
  const normalizedWatchedFields = useMemo(
    () =>
      Object.keys(watchedFields).reduce(
        (acc, key) => ({
          ...acc,
          [key]: watchedFields[key] === '' ? null : watchedFields[key],
        }),
        {} as T
      ),
    [watchedFields]
  );

  const filteredKeys = useMemo(
    () =>
      defaultValues
        ? Object.keys(defaultValues).filter(
            (key) => !ignoredFields.includes(key as keyof T)
          )
        : [],
    [defaultValues, ignoredFields]
  );

  const valuesAreEqual = (value1: any, value2: any) => {
    if (
      (value1 === null || value1 === '') &&
      (value2 === null || value2 === '')
    ) {
      return true;
    }
    return value1 === value2;
  };

  const hasChanges = useMemo(
    () =>
      filteredKeys.some(
        (key) =>
          defaultValues &&
          !valuesAreEqual(defaultValues[key], normalizedWatchedFields[key])
      ),
    [filteredKeys, normalizedWatchedFields, defaultValues]
  );

  useEffect(() => {
    setChangeStatus(hasChanges);
  }, [hasChanges, setChangeStatus]);

  const canSave = useMemo(() => {
    if (!defaultValues) return false;

    // Ensure all fields have values and at least one field has changed from its default value
    const allFieldsValid = filteredKeys.every(
      (key) =>
        normalizedWatchedFields[key] !== undefined &&
        normalizedWatchedFields[key] !== ''
    );

    const anyFieldChanged = filteredKeys.some(
      (key) => !valuesAreEqual(defaultValues[key], normalizedWatchedFields[key])
    );

    return allFieldsValid && anyFieldChanged;
  }, [filteredKeys, normalizedWatchedFields, defaultValues]);

  console.log('canSave', canSave);
  console.log('defaultValues', defaultValues);
  console.log('watchedFields', watchedFields);
  console.log('normalizedWatchedFields', normalizedWatchedFields);
  console.log('changeStatus', hasChanges);

  return { canSave };
};

export const useSetValueForm = <T extends Record<string, any>>(
  detailData: T,
  setValue: UseFormSetValue<T>
) => {
  useEffect(() => {
    if (detailData) {
      (Object.keys(detailData) as Array<keyof T>).forEach((key) => {
        setValue(key as Path<T>, detailData[key] as PathValue<T, Path<T>>);
      });
    }
  }, [detailData, setValue]); // Re-run when detailData changes
};
