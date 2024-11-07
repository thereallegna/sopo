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

const CreateCountry = () => {
  const { isOpen, closeDrawer } = useDrawerStore();
  const { setIsDirty } = useFormStore(); // Ambil setIsDirty dari useFormStore
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<CountryFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(countrySchema),
    defaultValues: {
      country_code: '',
      country_name: '',
    },
  });

  const { mutate: mutationCreateCountry } = useMutation({
    mutationFn: createCountry,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      reset();
      closeDrawer();
      setIsLoading(false);
      setIsDirty(false); // Reset status dirty setelah berhasil menyimpan
    },
    onError: (error: any) => {
      setIsLoading(false);
      if (error?.response?.data) {
        const { errorField, message } = error.response.data;

        if (errorField === 'country_code') {
          setError('country_code', { type: 'server', message });
        } else if (errorField === 'country_name') {
          setError('country_name', { type: 'server', message });
        }
      }
    },
  });

  const onSubmit: SubmitHandler<CountryFormBody> = (data) => {
    mutationCreateCountry(data);
  };

  // Trigger perubahan status dirty saat ada perubahan input
  React.useEffect(() => {
    setIsDirty(isDirty); // Update state isDirty di useFormStore berdasarkan form state
  }, [isDirty, setIsDirty]);

  const handleCloseDrawer = () => {
    if (isDirty) {
      // Jika ada perubahan, tampilkan konfirmasi sebelum menutup drawer
      closeDrawer();
    } else {
      closeDrawer();
      reset();
      setIsDirty(false); // Reset status dirty saat drawer ditutup tanpa perubahan
    }
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
                icon={{ size: 'large', icon: IconDeviceFloppy }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'saving...' : 'save'}
              </Button>
            </DrawerEndHeader>
          </DrawerHeader>
          <DrawerBody>
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
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
