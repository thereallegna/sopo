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
import { InitialStockDefaultValues } from '@constants/defaultValues';
import { GET_INITIAL_STOCK } from '@constants/queryKey';
import { InitialStockSchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import { useForm } from '@hooks/useForm';
import { createInitialStock } from '@services/fetcher/transaction/inventory-material-management';
import { ConfirmationAlert } from '@components/shared/Alert';
import InitialStockHeaderForm from '../Form/HeaderForm';
import InitialStockDetailForm from '../Form/DetailForm';

const CreateInitialStock = () => {
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
  } = useForm({
    label: 'Initial Stock',
    queryKey: GET_INITIAL_STOCK,
    mutationFn: createInitialStock,
    validationSchema: InitialStockSchema,
    defaultValues: InitialStockDefaultValues,
    type: 'add',
    requireAllFields: true,
    ignoredFields: ['remark'],
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Add Initial Stock"
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
        <form ref={formRef} onSubmit={handleSubmit}>
          <DrawerBody>
            <InitialStockHeaderForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
            />
            <InitialStockDetailForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
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

export default CreateInitialStock;
