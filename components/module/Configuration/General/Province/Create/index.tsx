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
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useForm } from '@hooks/useForm';
import { provinceSchema } from '@constants/schemas/ConfigurationSchema/General';
import {
  createProvince,
  getCountry,
} from '@services/fetcher/configuration/general';
import { ProvinceDefaultValues } from '@constants/defaultValues';
import Combobox from '@components/shared/Combobox';
import { GET_COUNTRY, GET_PROVINCE } from '@constants/queryKey';

const CreateCity = () => {
  const {
    handleCloseDrawer,
    handleInputKeyDown,
    handleSaveClick,
    handleSubmit,
    isLoading,
    formRef,
    isOpen,
    canSave,
    watch,
    setValue,
    setError,
    errors,
    register,
  } = useForm({
    label: 'Province',
    queryKey: GET_PROVINCE,
    mutationFn: createProvince,
    validationSchema: provinceSchema,
    defaultValues: ProvinceDefaultValues,
    type: 'add',
    requireAllFields: true,
  });
  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Add Province">
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
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                <InputField
                  {...register('province_code')}
                  message={
                    errors.province_code
                      ? { text: errors.province_code.message!, type: 'danger' }
                      : undefined
                  }
                  label="Province Code"
                  placeholder="INA09-10"
                  right
                  type="text"
                  required
                  className="flex-1 gap-2"
                  onKeyDown={handleInputKeyDown}
                />
                <InputField
                  {...register('province_name')}
                  message={
                    errors.province_name
                      ? { text: errors.province_name.message!, type: 'danger' }
                      : undefined
                  }
                  label="Province Name"
                  placeholder="Text here.."
                  right
                  type="text"
                  required
                  className="flex-1 gap-2"
                  onKeyDown={handleInputKeyDown}
                />
                <Combobox
                  className="flex-1"
                  label="Country"
                  placeholder="Select Country"
                  queryKey={[GET_COUNTRY]}
                  queryFn={() => getCountry({ all: true })}
                  dataLabel="country_name"
                  dataValue="country_code"
                  message={
                    errors.country
                      ? { text: errors.country.message!, type: 'danger' }
                      : undefined
                  }
                  value={{
                    label: watch('country'),
                    value: watch('country_code'),
                  }}
                  onChange={(val) => {
                    setValue('country', val.label, { shouldDirty: true });
                    setValue('country_code', val.value, { shouldDirty: true });
                    setError('country', { type: 'disabled' });
                  }}
                />
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCity;
