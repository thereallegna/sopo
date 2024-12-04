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
import Combobox from '@components/shared/Combobox';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InitialStockSchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import {
  createInitialStock,
  getInitialStock,
} from '@services/fetcher/transaction/inventory-material-management';
import { getWarehouse } from '@services/fetcher/configuration/material-management';
import { useDrawer } from '@hooks/useDrawer';
import { InitialStockDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import {
  GET_CURRENCY,
  GET_INITIAL_STOCK,
  GET_WAREHOUSE,
} from '@constants/queryKey';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';
import useFormStore from '@stores/useFormStore';
// import { Calendar } from '@components/ui/Calendar';
import TableDrawer from '@components/shared/Drawer/Table/TableDrawer';
import { getCurrency } from '@services/fetcher/configuration/financial-management';

const CreateInitialStock = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const [isLoading, setIsLoading] = React.useState(false);
  // const [isCalendarVisible, setIsCalendarVisible] = React.useState(false);
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { setChangeStatus } = useFormStore();
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();
  // const [isModalOpen, setModalOpen] = React.useState(false);
  // const { item_form, setItemForm } = useFormStore();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InitialStockFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(InitialStockSchema),
    defaultValues: InitialStockDefaultValues,
  });

  const { canSave } = useFormChanges({
    defaultValues: InitialStockDefaultValues,
    control,
    requireAllFields: true,
  });

  const { handleCloseDrawer } = useDrawer(reset);

  const { mutate: mutationCreateInitialStock } = useMutation({
    mutationFn: createInitialStock,
    onMutate: () => {
      setIsLoading(true);
      console.log('Mutation started...');
    },
    onSuccess: (data) => {
      console.log('Mutation successful:', data);
      reset();
      closeDrawer();
      setChangeStatus(false);
      setIsLoading(false);
      openDetailDrawer(data.data);
      queryClient.invalidateQueries({ queryKey: [GET_INITIAL_STOCK] });
      openToast('Initial Stock successfully added', 'success');
    },
    onError: (error: any) => {
      console.log('Mutation error:', error);
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        openToast('Country failed to added', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<InitialStockFormBody> = (data) => {
    console.log('Form submitted with data:', data);
    mutationCreateInitialStock(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  // const openModalForField = (fieldName: string) => {
  //     setModalOpen(true);
  //     setItemForm(fieldName);
  // };

  // const clearField = (fieldName: keyof InitialStockFormBody) => {
  //     if (
  //         fieldName === "item_code" ||
  //         fieldName === "item_name" ||
  //         fieldName === "local_code" ||
  //         fieldName === "uom_name"
  //     ) {
  //         setValue("item_code", "");
  //         setValue("item_name", "");
  //         setValue("local_code", "");
  //         setValue("uom_name", "");
  //     }
  // };

  // const renderIcon = (fieldName: keyof InitialStockFormBody) => {
  //     const fieldValue = watch(fieldName);
  //     if (fieldValue) {
  //         return (
  //             <IconComponent
  //                 onClick={() => clearField(fieldName)}
  //                 size="medium"
  //                 icon={IconX}
  //                 className="cursor-pointer"
  //             />
  //         );
  //     }
  //     return (
  //         <IconComponent
  //             onClick={() => openModalForField(fieldName)}
  //             size="medium"
  //             icon={IconSearch}
  //             className="cursor-pointer"
  //         />
  //     );
  // };

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Create Initial Stock"
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
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
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
                    queryKey={[GET_WAREHOUSE]}
                    queryFn={getWarehouse}
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
                      setValue('warehouse', val.label);
                      setValue('warehouse_code', val.value);
                      setError('warehouse', { type: 'disabled' });
                    }}
                  />
                  <Combobox
                    label="Currency"
                    placeholder="Select Currency"
                    queryKey={[GET_CURRENCY]}
                    queryFn={getCurrency}
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
                      setValue('currency', val.label);
                      setValue('currency_code', val.value);
                      setError('currency', { type: 'disabled' });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
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
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('remark')}
                    message={
                      errors.remark
                        ? {
                            text: errors.remark.message!,
                            type: 'danger',
                          }
                        : undefined
                    }
                    label="Remark"
                    placeholder="Remark"
                    right
                    type="text"
                    className="w-full gap-2"
                    textarea
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <TableDrawer
                  title="Find Initial Stock"
                  queryKey={GET_INITIAL_STOCK}
                  columns={{
                    columns: [
                      {
                        accessor: 'item_name',
                        header: "Item's Name",
                      },
                      {
                        accessor: 'local_code',
                        header: 'Local Code',
                      },
                      {
                        accessor: 'batch',
                        header: 'Batch',
                      },
                      {
                        accessor: 'quantity',
                        header: 'Quantity',
                      },
                      {
                        accessor: 'uom_name',
                        header: 'UOM',
                      },
                      {
                        accessor: 'price',
                        header: 'Price',
                      },
                    ],
                  }}
                  queryFn={getInitialStock}
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateInitialStock;
