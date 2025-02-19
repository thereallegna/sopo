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
import { IconDeviceFloppy } from '@tabler/icons-react';
import { StockAdjustmentDefaultValues } from '@constants/defaultValues';
import { GET_STOCK_ADJUSTMENT } from '@constants/queryKey';
import { StockAdjustmentSchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import { useForm } from '@hooks/useForm';
import { createStockAdjustment } from '@services/fetcher/transaction/inventory-material-management/inventory-management';
import { ConfirmationAlert } from '@components/shared/Alert';
import StockAdjustmentHeaderForm from '../Form/HeaderForm';
import StockAdjustmentDetailForm from '../Form/DetailForm';

const CreateStockAdjustment = () => {
  const {
    handleCloseDrawer,
    handleInputKeyDown,
    handleSaveClick,
    handleSubmit,
    isLoading,
    formRef,
    isOpen,
    canSave,
    errors,
    setError,
    setValue,
    register,
    watch,
    isConfirmModalOpen,
    handleConfirm,
    handleCloseConfirmModal,
    confirmMessage,
    control,
  } = useForm({
    type: 'add',
    label: 'Stock Adjustment',
    requireAllFields: false,
    queryKey: GET_STOCK_ADJUSTMENT,
    mutationFn: createStockAdjustment,
    defaultValues: StockAdjustmentDefaultValues,
    validationSchema: StockAdjustmentSchema,
    ignoredFields: ['remark', 'document_number'],
  });

  //
  React.useEffect(() => {
    console.log('schema', errors);
  }, [errors]);

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Add Stock Adjustment"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              type="submit"
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'saving...' : 'save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="overflow-auto">
          <DrawerBody>
            <StockAdjustmentHeaderForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              type="add"
            />
            <StockAdjustmentDetailForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              control={control}
            />
          </DrawerBody>
        </form>
        <ConfirmationAlert
          open={isConfirmModalOpen}
          description={confirmMessage}
          action={handleConfirm}
          onClose={handleCloseConfirmModal}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default CreateStockAdjustment;
