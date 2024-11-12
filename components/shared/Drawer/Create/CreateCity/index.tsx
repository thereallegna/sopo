'use client';

import React from 'react';
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
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { citySchema } from '@constants/schemas/ConfigurationSchema/general';
import { createCity } from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore'; // Import useFormStore
import { useDrawer } from '@hooks/useDrawer';
import { cityDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import Combobox from '@components/ui/Combobox';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';

const CreateCity = () => {
  const { isOpen, closeDrawer } = useDrawerStore();
  const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<CityFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(citySchema),
    defaultValues: cityDefaultValues,
  });

  const { handleCloseDrawer } = useDrawer(isDirty, reset);
  const { hasChanged } = useFormChanges(
    cityDefaultValues,
    control,
    setValue,
    'every' // or 'every' depending on your needs
  );

  const { mutate: mutationCreateCity } = useMutation({
    mutationFn: createCity,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      reset();
      closeDrawer();
      setIsLoading(false);
      setIsDirty(false);
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<CityFormBody> = (data) => {
    mutationCreateCity(data);
  };

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Add City">
            <DrawerEndHeader>
              <Button
                variant={!hasChanged ? 'disabled' : 'primary'}
                icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'saving...' : 'save'}
              </Button>
            </DrawerEndHeader>
          </DrawerHeader>
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
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <Combobox
                    label="Province"
                    placeholder="Select Province"
                    items={[
                      { label: 'Jakarta', value: '1' },
                      { label: 'Jawa Tengah', value: '2' },
                      { label: 'Jawa Timur', value: '3' },
                    ]}
                    message={
                      errors.province
                        ? { text: errors.province.message!, type: 'danger' }
                        : undefined
                    }
                    value={watch('province')}
                    onChange={(val) => {
                      setValue('province', val, { shouldDirty: true });
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
