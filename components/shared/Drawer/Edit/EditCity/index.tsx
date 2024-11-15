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
import { citySchema } from '@constants/schemas/ConfigurationSchema/general';
import { editCity } from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CITY } from '@constants/queryKey';
import Combobox from '@components/ui/Combobox';
import useToastStore from '@stores/useToastStore';

const EditCity = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as ICity;
  const { setIsDirty } = useFormStore();
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
    formState: { errors, isDirty },
  } = useForm<CityFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(citySchema),
    defaultValues: detail_data,
  });

  const { handleCloseDrawerEdit } = useDrawer(isDirty, reset, detail_data);
  const { hasChanged } = useFormChanges(detail_data, control, setValue);

  const { mutate: mutationEditCity } = useMutation({
    mutationFn: editCity,
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
      queryClient.invalidateQueries({ queryKey: [GET_CITY] });
      showToast('City successfully edited', 'success');
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('City failed to edited', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<CityFormBody> = (data) => {
    console.log('Edit form submitted with data:', data);
    mutationEditCity(data);
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

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('city_code')}
                    message={
                      errors.city_code
                        ? { text: errors.city_code.message!, type: 'danger' }
                        : undefined
                    }
                    label="City Code"
                    placeholder="INA09-10"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    disabled
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('city_name')}
                    message={
                      errors.city_name
                        ? { text: errors.city_name.message!, type: 'danger' }
                        : undefined
                    }
                    label="City Name"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <Combobox
                    value={watch('province')}
                    placeholder="Select Province"
                    message={
                      errors.province
                        ? { text: errors.province.message!, type: 'danger' }
                        : undefined
                    }
                    label="Province"
                    items={[
                      {
                        label: 'Nanggroe Aceh Darussalam',
                        value: '11.00.00.0000',
                      },
                      { label: 'Jawa Tengah', value: '2' },
                      { label: 'Jawa Timur', value: '3' },
                    ]}
                    onChange={(val) =>
                      setValue('province', val, { shouldDirty: true })
                    }
                  />
                  <InputField
                    {...register('ring_area')}
                    message={
                      errors.ring_area
                        ? { text: errors.ring_area.message!, type: 'danger' }
                        : undefined
                    }
                    label="Ring Area"
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('location')}
                    label="Location"
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
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

export default EditCity;
