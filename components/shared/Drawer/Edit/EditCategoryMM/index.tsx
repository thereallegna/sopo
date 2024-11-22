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
import { Checkbox } from '@components/ui/Checkbox';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges, useSetValueForm } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { editItemCategory } from '@services/fetcher/configuration/material-management';
import { ItemCategorySchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';

const EditCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as ICategoryMM;
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<ItemCategoryFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(ItemCategorySchema),
    defaultValues: detail_data,
  });

  useSetValueForm<ItemCategoryFormBody>(detail_data, setValue);

  const { canSave } = useFormChanges({
    defaultValues: detail_data,
    control,
  });

  const { handleCloseDrawerEdit } = useDrawer(reset, detail_data);

  const { mutate: mutationEditItemCategory } = useMutation({
    mutationFn: editItemCategory,
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
      setChangeStatus(false);
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORY_MATERIAL_MANAGEMENT],
      });
      showToast('Item Category successfully edited:', 'success');
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('Item Category failed to edited', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<ItemCategoryFormBody> = (data) => {
    console.log('Edit form submitted with data:', data);
    mutationEditItemCategory(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawerEdit}
          drawerTitle="Edit Item's Category"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
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
                  {...register('item_category_code')}
                  message={
                    errors.item_category_code
                      ? {
                          text: errors.item_category_code.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Item Category Code"
                  placeholder="Item Category Code"
                  right
                  type="text"
                  disabled
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('item_category_name')}
                  message={
                    errors.item_category_name
                      ? {
                          text: errors.item_category_name.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Item Category Name"
                  placeholder="Item Category Name"
                  right
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="active"
                    className="cursor-pointer text-base font-semibold"
                  >
                    Active
                  </label>
                  <Checkbox
                    checked={watch('active')}
                    {...register('active')}
                    message={
                      errors.active
                        ? {
                            text: errors.active.message!,
                            type: 'danger',
                          }
                        : undefined
                    }
                    label=""
                    onCheckedChange={(checked) => setValue('active', !!checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditCategoryMM;
