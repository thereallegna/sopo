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
import { Card, CardContent } from '@components/ui/Card';
import InputField from '@components/shared/InputField';
import { useForm } from '@hooks/useForm';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { GET_WAREHOUSE_CATEGORY } from '@constants/queryKey';
import { warehouseCategorySchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { warehouseCategoryDefaultValues } from '@constants/defaultValues';
import { createWarehouseCatrgory } from '@services/fetcher/configuration/material-item-warehouse-management';

const CreateWarehouseCategory = () => {
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
    register,
  } = useForm({
    label: 'Warehouse Category',
    queryKey: GET_WAREHOUSE_CATEGORY,
    mutationFn: createWarehouseCatrgory,
    validationSchema: warehouseCategorySchema,
    defaultValues: warehouseCategoryDefaultValues,
    type: 'add',
    requireAllFields: true,
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Create Warehouse Category"
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

        <form ref={formRef} onSubmit={handleSubmit}>
          <DrawerBody>
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6 items-start">
                <InputField
                  {...register('warehouse_category_code')}
                  message={
                    errors.warehouse_category_code
                      ? {
                          text: errors.warehouse_category_code.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Warehouse Category Code"
                  placeholder="Warehouse Category Code"
                  right
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('warehouse_category_name')}
                  message={
                    errors.warehouse_category_name
                      ? {
                          text: errors.warehouse_category_name.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Warehouse Category Name"
                  placeholder="Warehouse Category Name"
                  right
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateWarehouseCategory;
