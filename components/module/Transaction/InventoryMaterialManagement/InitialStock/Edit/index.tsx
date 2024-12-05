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
import { InitialStockSchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import { editInitialStock } from '@services/fetcher/transaction/inventory-material-management';
import { getWarehouse } from '@services/fetcher/configuration/material-item-warehouse-management';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges, useSetValueForm } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CURRENCY, GET_WAREHOUSE } from '@constants/queryKey';
import Combobox from '@components/shared/Combobox';
// import { Calendar } from '@components/ui/Calendar';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';
import { getCurrency } from '@services/fetcher/configuration/financial-management';

const EditInitialStock = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData, openDetailDrawer } =
    useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as InitialStockFormBody;
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isCalendarVisible, setIsCalendarVisible] = React.useState(false);
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
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
    formState: { errors },
  } = useForm<InitialStockFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(InitialStockSchema),
    defaultValues: detail_data,
  });

  useSetValueForm<InitialStockFormBody>(detail_data, setValue);

  const { canSave } = useFormChanges({
    defaultValues: detail_data,
    control,
  });

  const { handleCloseDrawerEdit } = useDrawer(reset, detail_data);

  const { mutate: mutationEditInitialStock } = useMutation({
    mutationFn: editInitialStock,
    onMutate: () => {
      setIsLoading(true);
      console.log('Edit mutation started...');
    },
    onSuccess: (data) => {
      setDetailData(data.data);
      closeEditDrawer();
      setChangeStatus(false);
      setIsLoading(false);
      openDetailDrawer({
        ...data.data,
        warehouse: watch('warehouse'),
        warehouse_code: watch('warehouse_code'),
      });
      reset();
      queryClient.invalidateQueries({ queryKey: [GET_WAREHOUSE] });
      showToast('Initial Stock succssfully edited', 'success');
    },
    onError: (error: any) => {
      console.log('Edit mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        showToast('Initial Stock failed to edit', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<InitialStockFormBody> = (data) => {
    console.log('Edit form submmitted with data:', data);
    mutationEditInitialStock(data);
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
          drawerTitle="Edit Initial Stock"
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
              <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('document_number')}
                    message={
                      errors.document_number
                        ? {
                            text: errors.document_number.message!,
                            type: 'danger',
                          }
                        : undefined
                    }
                    label="Document Number"
                    placeholder="Document Number"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    disabled
                    onKeyDown={handleInputKeyDown}
                  />
                  {/* <InputField
                    label="Date"
                    placeholder="Select a Date"
                    value={date ? date.toLocaleDateString() : ''}
                    onClick={() => setIsCalendarVisible(true)}
                    readOnly
                    required
                    className="w-full gap-2"
                  />
                  {isCalendarVisible && (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setIsCalendarVisible(false);
                      }}
                      className="rounded-md border"
                    />
                  )} */}
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <Combobox
                    label="Warehouse"
                    placeholder="Select Warehouse"
                    disabled
                    queryKey={[GET_WAREHOUSE]}
                    queryFn={() => getWarehouse()}
                    dataLabel="warehouse_name"
                    dataValue="warehouse_code"
                    message={
                      errors.warehouse
                        ? { text: errors.warehouse.message!, type: 'danger' }
                        : undefined
                    }
                    value={{
                      label: watch('warehouse'),
                      value: watch('warehouse_code'),
                    }}
                    onChange={(val) => {
                      setValue('warehouse', val.label, { shouldDirty: true });
                      setValue('warehouse_code', val.value, {
                        shouldDirty: true,
                      });
                      setError('warehouse', { type: 'disabled' });
                    }}
                  />
                  <Combobox
                    label="Currency"
                    placeholder="Select Currency"
                    disabled
                    queryKey={[GET_CURRENCY]}
                    queryFn={() => getCurrency()}
                    dataLabel="currency_name"
                    dataValue="currency_code"
                    message={
                      errors.currency
                        ? { text: errors.currency.message!, type: 'danger' }
                        : undefined
                    }
                    value={{
                      label: watch('currency'),
                      value: watch('currency_code'),
                    }}
                    onChange={(val) => {
                      setValue('currency', val.label, { shouldDirty: true });
                      setValue('currency_code', val.value, {
                        shouldDirty: true,
                      });
                      setError('currency', { type: 'disabled' });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('rate')}
                    message={
                      errors.rate
                        ? { text: errors.rate.message!, type: 'danger' }
                        : undefined
                    }
                    label="Rate"
                    placeholder="Rate"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    disabled
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('remark')}
                    message={
                      errors.remark
                        ? { text: errors.remark.message!, type: 'danger' }
                        : undefined
                    }
                    label="Remark"
                    placeholder="Remark"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    textarea
                    disabled
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

export default EditInitialStock;
