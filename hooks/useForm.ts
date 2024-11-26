import { useEffect, useMemo, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';
import useToastStore from '@stores/useToastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { ObjectSchema } from 'yup';
import {
  useForm as useReactHookForm,
  SubmitHandler,
  FieldValues,
  useWatch,
} from 'react-hook-form';
import { useDrawer } from './useDrawer';
import { useFormSave } from './useFormSave';

export type UseFormProps<T> = {
  label: string;
  queryKey: string;
  validationSchema: ObjectSchema<any>;
  defaultValues: any;
  mutationFn: (body: T) => Promise<any>;
  type: 'add' | 'edit'; // Menentukan apakah form digunakan untuk add atau edit
  ignoredFields?: (keyof T)[];
  requireAllFields?: boolean;
};

export const useForm = <T extends FieldValues>({
  validationSchema,
  queryKey,
  defaultValues,
  mutationFn,
  type,
  label,
  ignoredFields = [],
  requireAllFields = false,
}: UseFormProps<T>) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const { setChangeStatus } = useFormStore();
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useReactHookForm<T>({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleCloseDrawer } = useDrawer(reset);

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

  const { mutate: mutation } = useMutation({
    mutationFn,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      closeDrawer();
      setIsLoading(false);
      setChangeStatus(false);
      openDetailDrawer(data.data);
      reset();
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });

      // Toast sesuai dengan type
      if (type === 'add') {
        openToast(`${label} successfully added`, 'success');
      } else if (type === 'edit') {
        openToast(`${label} successfully edited`, 'success');
      }
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.response?.status === 500) {
        // Toast sesuai dengan type
        if (type === 'add') {
          openToast(`Failed to add ${label}`, 'danger');
        } else if (type === 'edit') {
          openToast(`Failed to edit ${label}`, 'danger');
        }
      } else if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    mutation(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    setError,
    control,
    watch,
    setValue,
    errors,
    isLoading,
    handleSaveClick,
    handleInputKeyDown,
    handleCloseDrawer,
    canSave,
    formRef,
    isOpen,
  };
};
