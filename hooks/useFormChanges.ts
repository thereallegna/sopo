import { useWatch } from 'react-hook-form';
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
  allField: allField = 'some'
) => {
  const watchedValues = useWatch({
    control,
  });

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
    if (allField === 'some') {
      hasChanged = Object.keys(initialValuesRef.current).some((key) => {
        const currentValue = watchedValues?.[key];
        const initialValue = initialValuesRef.current![key];
        return currentValue !== initialValue;
      });
    } else if (allField === 'every') {
      hasChanged = Object.keys(initialValuesRef.current).every((key) => {
        const currentValue = watchedValues?.[key];
        const initialValue = initialValuesRef.current![key];
        return currentValue !== initialValue;
      });
    }
  }

  useEffect(() => {
    console.log('hasChanged:', hasChanged);
    console.log('watchedValues:', watchedValues);
    console.log('initialValues:', initialValuesRef.current);

    // Set isDirty to true if there are changes
    setChanged(hasChanged);
  }, [hasChanged, watchedValues, initialValuesRef, setChanged]);

  return {
    watchedValues,
    hasChanged,
  };
};
