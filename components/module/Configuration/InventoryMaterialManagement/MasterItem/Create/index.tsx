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
import { masterItemDefaultValues } from '@constants/defaultValues';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { MasterItemMMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { useForm } from '@hooks/useForm';
import { createItem } from '@services/fetcher/configuration/material-management';
import BasicForm from './BasicForm';
import DetailForm from './DetailForm';

const CreateMasterItemMM = () => {
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
  } = useForm({
    label: 'Master item',
    queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
    mutationFn: createItem,
    validationSchema: MasterItemMMSchema,
    defaultValues: masterItemDefaultValues,
    type: 'add',
    requireAllFields: true,
    ignoredFields: [
      'local_code',
      'tax_liable',
      'foreign_name',
      'hs_code',
      'inventory_item',
      'old_code',
      'sales_item',
      'service_item',
      'purchase_item',
      'spesification',
      'remark',
    ],
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Add Master Item">
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
            <DetailForm
              errors={errors}
              watch={watch}
              setValue={setValue}
              register={register}
              handleInputKeyDown={handleInputKeyDown}
              setError={setError}
            />
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateMasterItemMM;
