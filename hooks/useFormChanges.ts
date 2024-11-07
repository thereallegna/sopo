import { useWatch } from 'react-hook-form';

interface DefaultValues {
  [key: string]: any;
}

export const useFormChanges = <T extends DefaultValues>(
  defaultValues: T,
  control: any
) => {
  const watchedValues = useWatch({
    control,
  });

  // Cek apakah semua field sudah terisi (tidak kosong) dan berbeda dari default
  const hasChanged = Object.keys(defaultValues).every((key) => {
    const currentValue = watchedValues?.[key];
    const defaultValue = defaultValues[key];

    // Pastikan field tidak kosong dan berbeda dari default
    return (
      currentValue !== '' &&
      currentValue !== undefined &&
      currentValue !== defaultValue
    );
  });

  return {
    watchedValues,
    hasChanged,
  };
};
