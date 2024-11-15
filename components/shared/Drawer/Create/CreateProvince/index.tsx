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
import { provinceSchema } from '@constants/schemas/ConfigurationSchema/general';
import { createProvince } from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore'; // Import useFormStore
import { useDrawer } from '@hooks/useDrawer';
import { provinceDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import Combobox from '@components/ui/Combobox';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_PROVINCE } from '@constants/queryKey';
import useToastStore from '@stores/useToastStore';

const CreateCity = () => {
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
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm<ProvinceFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(provinceSchema),
    defaultValues: provinceDefaultValues,
  });

  const { handleCloseDrawer } = useDrawer(isDirty, reset);
  const { hasChanged } = useFormChanges(
    provinceDefaultValues,
    control,
    setValue,
    'every' // or 'every' depending on your needs
  );

  const { mutate: mutationCreateCity } = useMutation({
    mutationFn: createProvince,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      reset();
      closeDrawer();
      setIsLoading(false);
      setIsDirty(false);
      openDetailDrawer(data.data);
      queryClient.invalidateQueries({ queryKey: [GET_PROVINCE] });
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('Province failed to added', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<ProvinceFormBody> = (data) => {
    mutationCreateCity(data);
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
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Add Province">
          <DrawerEndHeader>
            <Button
              variant={!hasChanged ? 'disabled' : 'primary'}
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
                  placeholder="Text here.."
                  right
                  type="text"
                  required
                  className="flex-1 gap-2"
                  onKeyDown={handleInputKeyDown}
                />
                <Combobox
                  className="flex-1"
                  label="Country"
                  placeholder="Select Country"
                  items={[
                    { label: 'Jawir', value: '1' },
                    { label: 'INDONESIA', value: '2' },
                    { label: 'Sunda', value: '3' },
                  ]}
                  message={
                    errors.country
                      ? { text: errors.country.message!, type: 'danger' }
                      : undefined
                  }
                  value={watch('country')}
                  onChange={(val) => {
                    setValue('country', val, { shouldDirty: true });
                    setError('country', { type: 'disabled' });
                  }}
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCity;
