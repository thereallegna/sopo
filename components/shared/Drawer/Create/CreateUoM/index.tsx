'use client';

import React, { useCallback, useRef } from 'react';
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
import { useFormChanges } from '@hooks/useFormChanges';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import { GET_UOM } from '@constants/queryKey';
import { UOMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createUOM } from '@services/fetcher/configuration/material-management';
import useToastStore from '@stores/useToastStore';

const CreateUOM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
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
    defaultValues: UOMDefaultValues,
  });

  const { handleCloseDrawer } = useDrawer(isDirty, reset);
  const { hasChanged } = useFormChanges(
    UOMDefaultValues,
    control,
    setValue,
    'every'
  );

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
      setIsDirty(false);
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

  const handleSaveClick = () => {
    console.log('Save button clicked');
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
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Create UoM">
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
