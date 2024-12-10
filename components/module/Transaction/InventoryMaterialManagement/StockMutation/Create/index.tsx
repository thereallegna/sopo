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
import { StockMutationDefaultValues } from '@constants/defaultValues';
import { GET_STOCK_MUTATION } from '@constants/queryKey';
import { useForm } from '@hooks/useForm';
import { ConfirmationAlert } from '@components/shared/Alert';
import { createStockMutation } from '@services/fetcher/transaction/inventory-material-management';
import { CreateStockMutationSchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import BasicForm from '../Form/BasicForm';
import MutateFromForm from '../Form/MutateFromForm';
import MutateToForm from '../Form/MutateToForm';

const CreateStockMutation = () => {
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
    label: 'Stock Mutation',
    queryKey: GET_STOCK_MUTATION,
    mutationFn: createStockMutation,
    validationSchema: CreateStockMutationSchema,
    defaultValues: StockMutationDefaultValues,
    type: 'add',
    requireAllFields: true,
    ignoredFields: ['cancel', 'reason_for_cancellation', 'remark'],
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Add Stock Mutation"
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
            <BasicForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              type="add"
            />
            <MutateFromForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              control={control}
            />
            <MutateToForm
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

export default CreateStockMutation;
