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
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useForm } from '@hooks/useForm';
import { taxGroupSchema } from '@constants/schemas/ConfigurationSchema/FinancialManagement';
import { useSetValueForm } from '@hooks/useSetValueForm';
import { GET_TAX_GROUP } from '@constants/queryKey';
import { editTaxGroup } from '@services/fetcher/configuration/financial-management';

const EditTaxGroup = () => {
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as TaxGroupFormBody;

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
    setValue,
    register,
  } = useForm({
    label: 'Tax Group',
    queryKey: GET_TAX_GROUP,
    mutationFn: editTaxGroup,
    validationSchema: taxGroupSchema,
    defaultValues: detail_data,
    type: 'edit',
  });

  useSetValueForm<TaxGroupFormBody>(detail_data, setValue, isOpenEdit);

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawerEdit}
          drawerTitle="Edit Tax Group"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'saving...' : 'Save'}
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
                  {...register('tax_group_code')}
                  message={
                    errors.tax_group_code?.message
                      ? { text: errors.tax_group_code.message!, type: 'danger' }
                      : undefined
                  }
                  label="Tax Group Code"
                  placeholder="Tax Group Code"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('tax_group_name')}
                  message={
                    errors.tax_group_name?.message
                      ? { text: errors.tax_group_name.message!, type: 'danger' }
                      : undefined
                  }
                  label="Tax Group Name"
                  placeholder="Tax Group Name"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
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

export default EditTaxGroup;
