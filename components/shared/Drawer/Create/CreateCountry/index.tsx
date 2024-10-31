'use client';

import React, { useEffect, useMemo } from 'react';
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
import { IconDeviceFloppy } from '@node_modules/@tabler/icons-react/dist/esm/tabler-icons-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { countrySchema } from '@constants/schemas/ConfigurationSchema/general';
import { createCountry } from '@services/fetcher/configuration/general';
import bindCurrentValueAndChangeValue from '@hooks/useBindCurrentValAndChangeVal';
import useFormStore from '@stores/useFormStore';

const CreateCountry = () => {
  const { isOpen, closeDrawer } = useDrawerStore();
  const { setChangeStatus, changeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CountryFormBody>({
    mode: 'onChange',
    resolver: yupResolver(countrySchema),
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
    },
    onError: (error: any) => {
      setIsLoading(false);
      if (error?.response?.data) {
        const { errorField, message } = error.response.data;

        if (errorField === 'usercode') {
          setError('country_code', { type: 'server', message });
        } else if (errorField === 'password') {
          setError('country_name', { type: 'server', message });
        }
      }
    },
  });

  const watchCountryCode = watch('country_code');
  const watchCountryName = watch('country_name');

  const currentValue = useMemo(
    () => ({
      country_code: '',
      country_name: '',
    }),
    []
  );

  const changeValue = useMemo(
    () => ({
      country_code: watchCountryCode,
      country_name: watchCountryName,
    }),
    [watchCountryCode, watchCountryName]
  );

  useEffect(() => {
    setChangeStatus(bindCurrentValueAndChangeValue(currentValue, changeValue));
  }, [currentValue, changeValue, setChangeStatus]);

  const onSubmit: SubmitHandler<CountryFormBody> = (data) => {
    mutationCreateCountry(data);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (changeStatus === true) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [changeStatus]);

  // reset ketika isOpen false dan inClose true
  const handleCloseDrawer = () => {
    clearErrors();
    reset();
  };

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerHeader
            onClick={handleCloseDrawer}
            drawerTitle="Create Country"
          >
            <DrawerEndHeader>
              <Button
                icon={{
                  size: 'large',
                  icon: IconDeviceFloppy,
                  color: 'drawer',
                }}
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
