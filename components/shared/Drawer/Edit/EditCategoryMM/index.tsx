'use client';

import React, { useRef, useCallback } from 'react';
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
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { editCategoryMM } from '@services/fetcher/configuration/material-management';
import { CategoryMMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';

const EditCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as ICategoryMM;
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
    defaultValues: detail_data,
  });

  const { handleCloseDrawerEdit } = useDrawer(isDirty, reset, detail_data);
  const { hasChanged } = useFormChanges(detail_data, control, setValue);

  const { mutate: mutationEditCategoryMM } = useMutation({
    mutationFn: editCategoryMM,
    onMutate: () => {
      setIsLoading(true);
      console.log('Edit mutation started...');
    },
    onSuccess: (data) => {
      console.log('Edit mutation successdul:', data);
      reset();
      setDetailData(data.data);
      closeEditDrawer();
      setIsLoading(false);
      setIsDirty(false);
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORY_MATERIAL_MANAGEMENT],
      });
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<CategoryMMFormBody> = (data) => {
    console.log('Edit form submitted with data:', data);
    mutationEditCategoryMM(data);
  };

  const handleSaveClick = () => {
    console.log('Save button clicked in edit form');
    formRef.current?.requestSubmit();
  };

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        console.log('Enter key pressed');
        if (!isLoading && hasChanged) {
          formRef.current?.requestSubmit();
        }
      }
    },
    [isLoading, hasChanged]
  );

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawerEdit}
          drawerTitle="Edit Category MM"
        >
          <DrawerEndHeader>
            <Button
              variant={!hasChanged ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'saving' : 'save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  disabled
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
                  disabled
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

export default EditCategoryMM;
