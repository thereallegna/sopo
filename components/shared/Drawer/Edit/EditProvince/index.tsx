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
import { provinceSchema } from '@constants/schemas/ConfigurationSchema/general';
import { editProvince } from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_PROVINCE } from '@constants/queryKey';
import Combobox from '@components/ui/Combobox';

const EditProvince = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as IProvince;
  const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<ProvinceFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(provinceSchema),
    defaultValues: detail_data,
  });

  const { handleCloseDrawerEdit } = useDrawer(isDirty, reset, detail_data);
  const { hasChanged } = useFormChanges(detail_data, control, setValue);

  const { mutate: mutationEditProvince } = useMutation({
    mutationFn: editProvince,
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
      queryClient.invalidateQueries({ queryKey: [GET_PROVINCE] });
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

  const onSubmit: SubmitHandler<ProvinceFormBody> = (data) => {
    console.log('Edit form submitted with data:', data);
    mutationEditProvince(data);
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
        <DrawerHeader onClick={handleCloseDrawerEdit} drawerTitle="Edit City">
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
                  {...register('province_code')}
                  message={
                    errors.province_code
                      ? { text: errors.province_code.message!, type: 'danger' }
                      : undefined
                  }
                  label="Province Code"
                  placeholder="INA09-10"
                  right
                  type="text"
                  required
                  className="flex-1 gap-2"
                  disabled
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('province_name')}
                  message={
                    errors.province_name
                      ? { text: errors.province_name.message!, type: 'danger' }
                      : undefined
                  }
                  label="Province Name"
                  right
                  type="text"
                  required
                  className="flex-1 gap-2"
                  onKeyDown={handleInputKeyDown}
                />
                <Combobox
                  className="flex-1 gap-2"
                  value={watch('country')}
                  placeholder="Select Country"
                  message={
                    errors.country
                      ? { text: errors.country.message!, type: 'danger' }
                      : undefined
                  }
                  label="Country"
                  items={[
                    {
                      label: 'Nanggroe Aceh Darussalam',
                      value: '11.00.00.0000',
                    },
                    { label: 'Jawa Tengah', value: '2' },
                    { label: 'Jawa Timur', value: '3' },
                  ]}
                  onChange={(val) =>
                    setValue('country', val, { shouldDirty: true })
                  }
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProvince;
