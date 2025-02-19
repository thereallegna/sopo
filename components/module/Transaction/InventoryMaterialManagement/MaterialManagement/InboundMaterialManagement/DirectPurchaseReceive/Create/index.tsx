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
import { DirectPurchaseReceiveDefaultValues } from '@constants/defaultValues';
import { GET_DIRECT_PURCHASE_RECEIVE } from '@constants/queryKey';
import { CreateDirectPurchaseReceiveSchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import { useForm } from '@hooks/useForm';
import { createDirectPurchaseReceive } from '@services/fetcher/transaction/inventory-material-management/material-management';
import { ConfirmationAlert } from '@components/shared/Alert';
import DirectPurchaseReceiveHeaderForm from '../Form/HeaderForm';
import DirectPurchaseReceiveDetailForm from '../Form/DetailForm';

const CreateDirectPurchaseReceive = () => {
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
    label: 'Direct Purchase Receive',
    requireAllFields: false,
    queryKey: GET_DIRECT_PURCHASE_RECEIVE,
    mutationFn: createDirectPurchaseReceive,
    defaultValues: DirectPurchaseReceiveDefaultValues,
    validationSchema: CreateDirectPurchaseReceiveSchema,
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
          drawerTitle="Add Direct Purchase Receive"
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
            <DirectPurchaseReceiveHeaderForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              type="add"
            />
            <DirectPurchaseReceiveDetailForm
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

export default CreateDirectPurchaseReceive;
