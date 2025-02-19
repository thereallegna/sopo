import React, { useEffect } from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerHeader,
} from '@components/ui/Drawer';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { GET_DIRECT_SALES_DELIVERY } from '@constants/queryKey';
import { useForm } from '@hooks/useForm';
import { ConfirmationAlert } from '@components/shared/Alert';
import { editDirectSalesDelivery } from '@services/fetcher/transaction/inventory-material-management/material-management';
import { useSetValueForm } from '@hooks/useSetValueForm';
import { useDrawerStore } from '@stores/useDrawerStore';
import { CreateDirectSalesDeliverySchema } from '@constants/schemas/TransactionSchema/InventoryMaterialManagement';
import DirectSalesDeliveryHeaderForm from '../Form/HeaderForm';
import DirectSalesDeliveryDetailForm from '../Form/DetailForm';

const EditDirectSalesDelivery = () => {
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as DirectSalesDeliveryFormBody;

  const {
    handleInputKeyDown,
    handleSaveClick,
    handleSubmit,
    isLoading,
    formRef,
    isOpenEdit,
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
    label: 'Edit Direct Sales Delivery',
    queryKey: GET_DIRECT_SALES_DELIVERY,
    mutationFn: editDirectSalesDelivery,
    validationSchema: CreateDirectSalesDeliverySchema,
    defaultValues: detail_data,
    type: 'edit',
    requireAllFields: true,
  });

  useEffect(() => {
    console.log('Error => ', errors, watch());
  }, [errors]);

  useSetValueForm<DirectSalesDeliveryFormBody>(
    detail_data,
    setValue,
    isOpenEdit
  );

  return (
    <Drawer>
      <DrawerContent>
        <DrawerHeader>
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
        <form ref={formRef} onSubmit={handleSubmit}>
          <DrawerBody>
            <DirectSalesDeliveryHeaderForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              disableAll
            />
            <DirectSalesDeliveryDetailForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
              formType="edit"
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

export default EditDirectSalesDelivery;
