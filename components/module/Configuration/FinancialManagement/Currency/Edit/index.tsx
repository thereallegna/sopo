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
import { useForm } from '@hooks/useForm';
import { currencySchema } from '@constants/schemas/ConfigurationSchema/FinancialManagement';
import { useSetValueForm } from '@hooks/useSetValueForm';
import { GET_CURRENCY } from '@constants/queryKey';
import { editCurrency } from '@services/fetcher/configuration/financial-management';

const EditCurrency = () => {
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as CurrencyFormBody;

  const {
    handleCloseDrawerEdit,
    handleInputKeyDown,
    handleSaveClick,
    handleSubmit,
    isLoading,
    formRef,
    isOpenEdit,
    canSave,
    errors,
    setValue,
    register,
  } = useForm({
    label: 'Currency',
    queryKey: GET_CURRENCY,
    mutationFn: editCurrency,
    validationSchema: currencySchema,
    defaultValues: detail_data,
    type: 'edit',
  });

  useSetValueForm<CurrencyFormBody>(detail_data, setValue, isOpenEdit);

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
        <form ref={formRef} onSubmit={handleSubmit}>
          <DrawerBody>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
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
                  required
                  className="w-full gap-2"
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
                  required
                  className="w-full gap-2"
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
