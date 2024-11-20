'use client';

import React, { useEffect, useMemo, useRef } from 'react';
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
import { UOMDefaultValues } from '@constants/defaultValues';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import { GET_UOM } from '@constants/queryKey';
import { UOMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createUOM } from '@services/fetcher/configuration/material-management';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';

const CreateUOM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const { changeStatus, setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<UOMFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(UOMSchema),
    defaultValues: UOMDefaultValues,
  });

  const code = watch('uom_code');
  const name = watch('uom_name');

  // Memantau perubahan untuk tombol Save
  const canSave = Boolean(code && name);

  // Memantau perubahan untuk modal konfirmasi
  useEffect(() => {
    // Set changeStatus true jika salah satu field diisi
    setChangeStatus(Boolean(code || name));
  }, [code, name, setChangeStatus]);

  const { handleCloseDrawer } = useDrawer(reset);

  const { mutate: mutationCreateUOM } = useMutation({
    mutationFn: createUOM,
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
      queryClient.invalidateQueries({ queryKey: [GET_UOM] });
      showToast('UoM successfully added', 'success');
    },
    onError: (error: any) => {
      console.log('Mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('UoM failed to added', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<UOMFormBody> = (data) => {
    console.log('Form submitted with data:', data);
    mutationCreateUOM(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave, // Menggunakan canSave untuk tombol Save
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Create UoM">
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              onClick={handleSaveClick}
              disabled={isLoading || !canSave}
            >
              {isLoading ? 'saving...' : 'save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerBody>
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6 items-start">
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

export default CreateUOM;
