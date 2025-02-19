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
import { DirectSalesDeliveryDefaultValues } from '@constants/defaultValues';
import { GET_DIRECT_SALES_DELIVERY } from '@constants/queryKey';
import { CreateDirectSalesDeliverySchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import { useForm } from '@hooks/useForm';
import { createDirectSalesDelivery } from '@services/fetcher/transaction/inventory-material-management/material-management';
import { ConfirmationAlert } from '@components/shared/Alert';
import DirectSalesDeliveryHeaderForm from '../Form/HeaderForm';
import DirectSalesDeliveryDetailForm from '../Form/DetailForm';

const CreateDirectSalesDelivery = () => {
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
    label: 'Direct Sales Delivery',
    requireAllFields: false,
    queryKey: GET_DIRECT_SALES_DELIVERY,
    mutationFn: createDirectSalesDelivery,
    defaultValues: DirectSalesDeliveryDefaultValues,
    validationSchema: CreateDirectSalesDeliverySchema,
    ignoredFields: ['remark', 'document_number'],
  });

  React.useEffect(() => {
    console.log('schema', errors);
  }, [errors]);

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Add Direct Sales Delivery"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              type="submit"
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="overflow-auto">
          <DrawerBody>
            <DirectSalesDeliveryHeaderForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              type="add"
            />
            <DirectSalesDeliveryDetailForm
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

export default CreateDirectSalesDelivery;
