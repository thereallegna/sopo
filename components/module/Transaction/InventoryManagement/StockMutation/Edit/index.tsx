'use client';

import React, { useState } from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerHeader,
} from '@components/ui/Drawer';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { EditMasterItemMMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { useForm } from '@hooks/useForm';
import {
  editStockMutation,
  getItem,
} from '@services/fetcher/configuration/material-item-warehouse-management';
import { ConfirmationAlert } from '@components/shared/Alert';
import SelectableModal from '@components/ui/Modal';
import { useSetValueForm } from '@hooks/useFormChanges';
import { useDrawerStore } from '@stores/useDrawerStore';
import BasicForm from '../Form/BasicForm';
import MutateFromForm from '../Form/MutateFromForm';

const EditMasterItemMM = () => {
  const [showModalSource, setShowModalSource] = useState<boolean>(false);
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as StockMutationFormBody;

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
    setError,
    setValue,
    register,
    watch,
    isConfirmModalOpen,
    handleConfirm,
    handleCloseConfirmModal,
    confirmMessage,
  } = useForm({
    label: 'Master item',
    queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
    mutationFn: editStockMutation,
    validationSchema: EditMasterItemMMSchema,
    defaultValues: detail_data,
    type: 'edit',
    requireAllFields: true,
  });

  useSetValueForm<StockMutationFormBody>(detail_data, setValue, isOpenEdit);

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawerEdit}
          drawerTitle="Edit Stock Mutation"
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
            <BasicForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
            />
            <MutateFromForm
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
      <SelectableModal
        isOpen={showModalSource}
        onClose={() => setShowModalSource(false)}
        title="Find Master Item"
        queryKey={GET_MASTER_ITEM_MATERIAL_MANAGEMENT}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'item_code',
              header: 'Item Code',
            },
            {
              accessor: 'item_name',
              header: 'Item Name',
            },
            {
              accessor: 'local_code',
              header: 'Local Code',
            },
            {
              accessor: 'foreign_name',
              header: 'Foreign Name',
            },
            {
              accessor: 'old_code',
              header: 'Old Code',
            },
            {
              accessor: 'category_name',
              header: 'Category Name',
            },
            {
              accessor: 'spesification',
              header: 'Specification',
            },
            {
              accessor: 'active',
              header: 'Active',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
          hasAction: false,
        }}
        queryFn={getItem}
        onSelectRow={(data: StockMutationFormBody) => {
          setValue('document', data.document);
          setShowModalSource(false);
        }}
      />
    </Drawer>
  );
};

export default EditMasterItemMM;
