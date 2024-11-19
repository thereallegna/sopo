'use client';

import React, { useRef } from 'react';
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
import {
  editProvince,
  getCountry,
} from '@services/fetcher/configuration/general';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_COUNTRY, GET_PROVINCE } from '@constants/queryKey';
import Combobox from '@components/shared/Combobox';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';

const EditProvince = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData, openDetailDrawer } =
    useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as IProvince;
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
    },
    onSuccess: (data) => {
      setDetailData(data.data);
      closeEditDrawer();
      setIsLoading(false);
      setIsDirty(false);
      openDetailDrawer({
        ...data.data,
        country: watch('country'),
        country_code: watch('country_code'),
      } as IProvince);
      reset();
      queryClient.invalidateQueries({ queryKey: [GET_PROVINCE] });
      showToast('Province successfully edited', 'success');
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('Province failed to edited', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<ProvinceFormBody> = (data) => {
    mutationEditProvince(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged,
  });

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
                  className="flex-1"
                  label="Country"
                  placeholder="Select Country"
                  queryKey={[GET_COUNTRY]}
                  queryFn={() => getCountry()}
                  dataLabel="country_name"
                  dataValue="country_code"
                  message={
                    errors.country
                      ? { text: errors.country.message!, type: 'danger' }
                      : undefined
                  }
                  value={{
                    label: watch('country'),
                    value: watch('country_code'),
                  }}
                  onChange={(val) => {
                    setValue('country', val.label, { shouldDirty: true });
                    setValue('country_code', val.value, { shouldDirty: true });
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

export default EditProvince;
