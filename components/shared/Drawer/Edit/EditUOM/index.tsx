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
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_UOM } from '@constants/queryKey';
import { editUOM } from '@services/fetcher/configuration/material-management';
import { UOMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';

const EditUOM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as IUOM;
  const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<UOMFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(UOMSchema),
    defaultValues: detail_data,
  });

  const { handleCloseDrawerEdit } = useDrawer(isDirty, reset, detail_data);
  const { hasChanged } = useFormChanges(detail_data, control, setValue);

  const { mutate: mutationEditUOM } = useMutation({
    mutationFn: editUOM,
    onMutate: () => {
      setIsLoading(true);
      console.log('Edit mutation started...');
    },
    onSuccess: (data) => {
      console.log('Edit mutation successful:', data);
      reset();
      setDetailData(data.data);
      closeEditDrawer();
      setIsLoading(false);
      setIsDirty(false);
      queryClient.invalidateQueries({ queryKey: [GET_UOM] });
      showToast('UoM successfully edited', 'success');
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('UoM failed to edited', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<UOMFormBody> = (data) => {
    console.log('Edit form submitted with data:', data);
    mutationEditUOM(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged,
  });

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawerEdit} drawerTitle="Edit UoM">
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

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerBody>
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                <InputField
                  {...register('uom_code')}
                  message={
                    errors.uom_code
                      ? { text: errors.uom_code.message!, type: 'danger' }
                      : undefined
                  }
                  label="UoM Code"
                  placeholder="UoM Code"
                  right
                  type="text"
                  disabled
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('uom_name')}
                  message={
                    errors.uom_name
                      ? { text: errors.uom_name.message!, type: 'danger' }
                      : undefined
                  }
                  label="UoM Name"
                  placeholder="UoM Name"
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

export default EditUOM;
