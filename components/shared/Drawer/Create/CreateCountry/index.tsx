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
import { countrySchema } from '@constants/schemas/ConfigurationSchema/general';
import { createCountry } from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore'; // Import useFormStore
import { useDrawer } from '@hooks/useDrawer';
import { countryDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';

const CreateCountry = () => {
  const { isOpen, closeDrawer } = useDrawerStore();
  const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<CountryFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(countrySchema),
    defaultValues: countryDefaultValues,
  });

  const { handleCloseDrawer } = useDrawer(isDirty, reset);
  const { hasChanged } = useFormChanges(
    countryDefaultValues,
    control,
    setValue,
    'every' // or 'every' depending on your needs
  );

  const { mutate: mutationCreateCountry } = useMutation({
    mutationFn: createCountry,
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

  const onSubmit: SubmitHandler<CountryFormBody> = (data) => {
    mutationCreateCountry(data);
  };

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerHeader
            onClick={handleCloseDrawer}
            drawerTitle="Create Country"
          >
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
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6 items-start">
                <InputField
                  {...register('country_code')}
                  message={
                    errors.country_code
                      ? { text: errors.country_code.message!, type: 'danger' }
                      : undefined
                  }
                  label="Country Code"
                  placeholder="Country Code"
                  right
                  type="text"
                />
                <InputField
                  {...register('country_name')}
                  message={
                    errors.country_name
                      ? { text: errors.country_name.message!, type: 'danger' }
                      : undefined
                  }
                  label="Country Name"
                  placeholder="Country Name"
                  right
                  type="text"
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCountry;
