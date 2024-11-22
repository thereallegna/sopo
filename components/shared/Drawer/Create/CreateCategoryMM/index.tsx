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
import { ItemCategoryDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { ItemCategorySchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createItemCategory } from '@services/fetcher/configuration/material-management';
import { Checkbox } from '@components/ui/Checkbox';
import { useFormSave } from '@hooks/useFormSave';

const CreateCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const {
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
    defaultValues: ItemCategoryDefaultValues,
  });

  const { canSave } = useFormChanges({
    defaultValues: ItemCategoryDefaultValues,
    control,
    requireAllFields: true,
  });

  const { handleCloseDrawer } = useDrawer(reset);

  const { mutate: mutationCreateCategoryMM } = useMutation({
    mutationFn: createItemCategory,
    onMutate: () => {
      setIsLoading(true);
      console.log('Mutation started...');
    },
    onSuccess: (data) => {
      console.log('Mutation successful:', data);
      reset();
      closeDrawer();
      setIsLoading(false);
      setChangeStatus(false);
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

  const onSubmit: SubmitHandler<ItemCategoryFormBody> = (data) => {
    console.log('Form submitted with data:', data);
    mutationCreateCategoryMM(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Create Item Category"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
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
                    checked={ItemCategoryDefaultValues.active}
                    disabled
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

export default CreateCategoryMM;
