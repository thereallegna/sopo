import { useWatch, UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import useFormStore from '@stores/useFormStore';

interface DefaultValues {
  [key: string]: any;
}
type allField = 'some' | 'every';
export const useFormChanges = <T extends DefaultValues>(
  initialValues: T,
  control: any,
  setValue?: any,
  allField: allField = 'some',
  ignoredFields?: string[]
) => {
  const watchedValues = useWatch({
    control,
  });
  // const [hasChanged, setHasChanged] = useState<boolean>(false)

  const { setChanged } = useFormStore();

  // Use ref to store initial values
  const initialValuesRef = useRef<T | null>(initialValues || null);

  // Effect to set initial values in the form
  useEffect(() => {
    if (initialValues && setValue) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key, initialValues[key]);
      });
      initialValuesRef.current = initialValues;
    }
  }, [initialValues, setValue]);

  let hasChanged = false;

  if (initialValuesRef.current) {
    const ignored = ignoredFields || [];
    const fieldsToCheck = Object.keys(initialValuesRef.current).filter(
      (key) => !ignored.includes(key)
    );

    if (allField === 'some') {
      // setHasChanged(() => fieldsToCheck.some((key) => {
      //     const currentValue = watchedValues?.[key];
      //     const initialValue = initialValuesRef.current![key];

      //     return currentValue !== initialValue;
      //   })
      // )
      hasChanged = fieldsToCheck.some((key) => {
        const currentValue = watchedValues?.[key];
        const initialValue = initialValuesRef.current![key];

        return currentValue !== initialValue;
      });
    } else if (allField === 'every') {
      // setHasChanged(() => fieldsToCheck.every((key) => {
      //     const currentValue = watchedValues?.[key];
      //     const initialValue = initialValuesRef.current![key];

      //     return currentValue !== initialValue;
      //   })
      // )
      hasChanged = fieldsToCheck.every((key) => {
        const currentValue = watchedValues?.[key];
        const initialValue = initialValuesRef.current![key];

        return currentValue !== initialValue;
      });
    }
  }

  useEffect(() => {
    // Set isDirty to true if there are changes
    setChanged(hasChanged);
  }, [hasChanged, watchedValues, initialValuesRef, setChanged]);

  return {
    watchedValues,
    hasChanged,
    // setHasChanged
  };
};

export const useDetailForm = <T extends Record<string, any>>(
  detailData: T,
  setValue: UseFormSetValue<T>
) => {
  useEffect(() => {
    if (detailData) {
      (Object.keys(detailData) as Array<keyof T>).forEach((key) => {
        setValue(key as Path<T>, detailData[key] as PathValue<T, Path<T>>);
      });
    }
  }, [detailData, setValue]);
};
