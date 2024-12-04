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
import { currencySchema } from '@constants/schemas/ConfigurationSchema/FinancialManagement';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges, useSetValueForm } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CURRENCY } from '@constants/queryKey';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';
import useFormStore from '@stores/useFormStore';
import { editCurrency } from '@services/fetcher/configuration/financial-management';

const EditCurrency = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as CurrencyFormBody;
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<CurrencyFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(currencySchema),
    defaultValues: detail_data,
  });

  useSetValueForm<CurrencyFormBody>(detail_data, setValue);

  const { canSave } = useFormChanges({
    defaultValues: detail_data,
    control,
  });

  const { handleCloseDrawerEdit } = useDrawer(reset, detail_data);
  const { mutate: mutationEditCurrency } = useMutation({
    mutationFn: editCurrency,
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
      setChangeStatus(false);
      queryClient.invalidateQueries({ queryKey: [GET_CURRENCY] });
      showToast('Currency successfully edited', 'success');
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('Currency failed to edited', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<CurrencyFormBody> = (data) => {
    console.log('Edit form submitted with data:', data);
    mutationEditCurrency(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawerEdit}
          drawerTitle="Edit Currency"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
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
                  {...register('currency_code')}
                  message={
                    errors.currency_code
                      ? { text: errors.currency_code.message!, type: 'danger' }
                      : undefined
                  }
                  label="Currency Code"
                  placeholder="Currency Code"
                  right
                  type="text"
                  disabled
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('currency_name')}
                  message={
                    errors.currency_name
                      ? { text: errors.currency_name.message!, type: 'danger' }
                      : undefined
                  }
                  label="Currency Name"
                  placeholder="Currency Name"
                  right
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditCurrency;
