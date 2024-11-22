'use client';

import React, { useEffect, useRef } from 'react';
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
import {
  createCity,
  getProvince,
} from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore'; // Import useFormStore
import { useDrawer } from '@hooks/useDrawer';
import { cityDefaultValues } from '@constants/defaultValues';
import Combobox from '@components/shared/Combobox';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CITY, GET_PROVINCE } from '@constants/queryKey';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';

const CreateCity = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    // control,
    formState: { errors },
  } = useForm<CityFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(citySchema),
    defaultValues: cityDefaultValues,
  });

  const code = watch('city_code');
  const name = watch('city_name');
  const province = watch('province');
  const province_code = watch('province_code');
  const ring_area = watch('ring_area');
  const location = watch('location');

  const canSave = Boolean(code && name && province && province_code);

  useEffect(() => {
    setChangeStatus(
      Boolean(
        code || name || province || province_code || ring_area || location
      )
    );
  }, [
    code,
    name,
    province,
    province_code,
    setChangeStatus,
    ring_area,
    location,
  ]);

  // const { canSave } = useFormChanges({
  //   defaultValues: cityDefaultValues,
  //   control,
  //   ignoredFields: ['ring_area', 'location'],
  // });

  const { handleCloseDrawer } = useDrawer(reset);

  const { mutate: mutationCreateCity } = useMutation({
    mutationFn: createCity,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      closeDrawer();
      setIsLoading(false);
      setChangeStatus(false);
      openDetailDrawer({
        ...data.data,
        province: watch('province'),
        province_code: watch('province_code'),
      } as ICity);
      reset();
      queryClient.invalidateQueries({ queryKey: [GET_CITY] });
      openToast('City successfuly added', 'warning');
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        openToast('City failed to added', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<CityFormBody> = (data) => {
    mutationCreateCity(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Add City">
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              type="submit"
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'saving...' : 'save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
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
                    placeholder="Text here.."
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <Combobox
                    label="Province"
                    placeholder="Select Province"
                    queryKey={[GET_PROVINCE]}
                    queryFn={getProvince}
                    dataLabel="province_name"
                    dataValue="province_code"
                    message={
                      errors.province
                        ? { text: errors.province.message!, type: 'danger' }
                        : undefined
                    }
                    value={{
                      label: watch('province'),
                      value: watch('province_code'),
                    }}
                    onChange={(val) => {
                      setValue('province', val.label, { shouldDirty: true });
                      setValue('province_code', val.value, {
                        shouldDirty: true,
                      });
                      setError('province', { type: 'disabled' });
                    }}
                  />
                  <InputField
                    {...register('ring_area')}
                    message={
                      errors.ring_area
                        ? { text: errors.ring_area.message!, type: 'danger' }
                        : undefined
                    }
                    label="Ring Area"
                    placeholder="Text here.."
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('location')}
                    message={
                      errors.location
                        ? { text: errors.location.message!, type: 'danger' }
                        : undefined
                    }
                    label="Location"
                    placeholder="Text here.."
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

export default CreateCity;
