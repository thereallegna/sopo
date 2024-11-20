'use client';

import React, { useRef } from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerHeader,
} from '@components/ui/Drawer';
import { Card, CardContent } from '@components/ui/Card';
import InputField from '@components/shared/InputField';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { CategoryMMDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { CategoryMMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createCategoryMM } from '@services/fetcher/configuration/material-management';
import { useFormSave } from '@hooks/useFormSave';

const CreateCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<CategoryMMFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(CategoryMMSchema),
    defaultValues: CategoryMMDefaultValues,
  });

  const { handleCloseDrawer } = useDrawer(isDirty, reset);
  const { hasChanged } = useFormChanges(
    CategoryMMDefaultValues,
    control,
    setValue,
    'every'
  );

  const { mutate: mutationCreateCategoryMM } = useMutation({
    mutationFn: createCategoryMM,
    onMutate: () => {
      setIsLoading(true);
      console.log('Mutation started...');
    },
    onSuccess: (data) => {
      console.log('Mutation successful:', data);
      reset();
      closeDrawer();
      setIsLoading(false);
      setIsDirty(false);
      openDetailDrawer(data.data);
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORY_MATERIAL_MANAGEMENT],
      });
    },
    onError: (error: any) => {
      console.log('Mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<CategoryMMFormBody> = (data) => {
    console.log('Form submitted with data:', data);
    mutationCreateCategoryMM(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged,
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Create Category MM"
        >
          <DrawerEndHeader>
            <Button
              variant={!hasChanged ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'saving...' : 'save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                <InputField
                  {...register('categoryMM_code')}
                  message={
                    errors.categoryMM_code
                      ? {
                          text: errors.categoryMM_code.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Category MM Code"
                  placeholder="Category MM Code"
                  right
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('categoryMM_name')}
                  message={
                    errors.categoryMM_name
                      ? {
                          text: errors.categoryMM_name.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Category MM Name"
                  placeholder="Category MM Name"
                  right
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCategoryMM;
