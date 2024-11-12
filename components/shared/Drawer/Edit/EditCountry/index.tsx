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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { countrySchema } from '@constants/schemas/ConfigurationSchema/general';
import { editCountry } from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore'; // Import useFormStore
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_COUNTRY } from '@constants/queryKey';

const EditCountry = () => {
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as ICountry;
  const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

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
    defaultValues: detail_data,
  });

  const { handleCloseDrawerEdit } = useDrawer(isDirty, reset, detail_data);
  const { hasChanged } = useFormChanges(detail_data, control, setValue);

  const { mutate: mutationEditCountry } = useMutation({
    mutationFn: editCountry,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      reset();
      setDetailData(data.data);

      closeEditDrawer();
      setIsLoading(false);
      setIsDirty(false);
      queryClient.invalidateQueries({ queryKey: [GET_COUNTRY] });
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
    mutationEditCountry(data);
  };

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerHeader
            onClick={handleCloseDrawerEdit}
            drawerTitle="Edit Country"
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
                  disabled
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

export default EditCountry;
