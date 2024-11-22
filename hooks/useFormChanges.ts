import { useWatch, UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import useFormStore from '@stores/useFormStore';

interface UseFormStatusProps<T> {
  defaultValues?: T;
  control: any;
  ignoredFields?: (keyof T)[];
  requireAllFields?: boolean;
}

export const useFormChanges = <T extends Record<string, any>>({
  defaultValues,
  control,
  ignoredFields = [],
  requireAllFields = false,
}: UseFormStatusProps<T>) => {
  const { setChangeStatus } = useFormStore();
  const watchedFields = useWatch({ control });

  // Normalize fields to handle empty strings as null
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

  // Get all fields excluding ignored ones
  const relevantFields = useMemo(
    () =>
      defaultValues
        ? Object.keys(defaultValues).filter(
            (key) => !ignoredFields.includes(key as keyof T)
          )
        : [],
    [defaultValues, ignoredFields]
  );

  // Compare values
  const valuesAreEqual = (value1: any, value2: any) => {
    if (
      (value1 === null || value1 === '') &&
      (value2 === null || value2 === '')
    ) {
      return true;
    }
    return value1 === value2;
  };

  // Check for any changes in all fields (including ignored ones)
  const hasChanges = useMemo(() => {
    if (!defaultValues) return false;

    const allFields = Object.keys(defaultValues);
    return allFields.some(
      (key) => !valuesAreEqual(defaultValues[key], normalizedWatchedFields[key])
    );
  }, [normalizedWatchedFields, defaultValues]);

  useEffect(() => {
    setChangeStatus(hasChanges);
  }, [hasChanges, setChangeStatus]);

  // Determine if form can be saved
  const canSave = useMemo(() => {
    if (!defaultValues) return false;

    // Check if fields are valid based on requireAllFields
    const fieldsValidation = requireAllFields
      ? relevantFields.every((key) => {
          const value = normalizedWatchedFields[key];
          return value !== undefined && value !== '' && value !== null;
        })
      : relevantFields.some((key) => {
          const value = normalizedWatchedFields[key];
          return value !== undefined && value !== '' && value !== null;
        });

    // Check if any relevant field has changed
    const hasChangedFields = relevantFields.some(
      (key) => !valuesAreEqual(defaultValues[key], normalizedWatchedFields[key])
    );

    return fieldsValidation && hasChangedFields;
  }, [
    relevantFields,
    normalizedWatchedFields,
    defaultValues,
    requireAllFields,
  ]);

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
