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
import { GET_VENDOR_CATEGORY } from '@constants/queryKey';
import { createVendorCategory } from '@services/fetcher/configuration/procurement-management';
import { vendorCategorySchema } from '@constants/schemas/ConfigurationSchema/ProcurementManagement';
import { vendorCategoryDefaultValues } from '@constants/defaultValues';

const CreateVendorCategory = () => {
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
    label: 'Vendor Category',
    queryKey: GET_VENDOR_CATEGORY,
    mutationFn: createVendorCategory,
    validationSchema: vendorCategorySchema,
    defaultValues: vendorCategoryDefaultValues,
    type: 'add',
    requireAllFields: true,
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Create Vendor Category"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <DrawerBody>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                <InputField
                  {...register('vendor_category_code')}
                  message={
                    errors.vendor_category_code
                      ? {
                          text: errors.vendor_category_code.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Vendor Category Code"
                  placeholder="Vendor Category Code"
                  right
                  required
                  type="text"
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('vendor_category_name')}
                  message={
                    errors.vendor_category_name
                      ? {
                          text: errors.vendor_category_name.message!,
                          type: 'danger',
                        }
                      : undefined
                  }
                  label="Vendor Category Name"
                  placeholder="Vendor Category Name"
                  right
                  required
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

export default CreateVendorCategory;
