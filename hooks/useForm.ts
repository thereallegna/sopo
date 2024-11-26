import { useRef, useState } from 'react';
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
} from 'react-hook-form';
import { useDrawer } from './useDrawer';
import { useFormChanges } from './useFormChanges';
import { useFormSave } from './useFormSave';

export type UseFormProps<T> = {
  label: string;
  queryKey: string;
  validationSchema: ObjectSchema<any>;
  defaultValues: any;
  mutationFn: (body: T) => Promise<any>;
  type: 'add' | 'edit'; // Menentukan apakah form digunakan untuk add atau edit
};

export const useForm = <T extends FieldValues>({
  validationSchema,
  queryKey,
  defaultValues,
  mutationFn,
  type,
  label,
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

  const { canSave } = useFormChanges({
    defaultValues,
    control,
    requireAllFields: true,
  });

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
