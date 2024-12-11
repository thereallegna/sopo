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
// import { useForm, SubmitHandler } from 'react-hook-form';
import { citySchema } from '@constants/schemas/ConfigurationSchema/general';
import {
  createCity,
  getProvince,
} from '@services/fetcher/configuration/general';
import { cityDefaultValues } from '@constants/defaultValues';
import Combobox from '@components/shared/Combobox';
import { GET_CITY, GET_PROVINCE } from '@constants/queryKey';
import { useForm } from '@hooks/useForm';

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
    errors,
    setError,
    setValue,
    register,
    watch,
  } = useForm({
    label: 'City',
    queryKey: GET_CITY,
    mutationFn: createCity,
    validationSchema: citySchema,
    defaultValues: cityDefaultValues,
    type: 'add',
    ignoredFields: ['ring_area', 'location'],
    requireAllFields: true,
  });

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawer} drawerTitle="Add City">
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
              <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('city_code')}
                    message={
                      errors.city_code
                        ? { text: errors.city_code.message!, type: 'danger' }
                        : undefined
                    }
                    label="City Code"
                    placeholder="INA09-10"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('city_name')}
                    message={
                      errors.city_name
                        ? { text: errors.city_name.message!, type: 'danger' }
                        : undefined
                    }
                    label="City Name"
                    placeholder="Text here.."
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <Combobox
                    label="Province"
                    placeholder="Select Province"
                    queryKey={[GET_PROVINCE]}
                    queryFn={getProvince}
                    dataLabel="province_name"
                    dataValue="province_code"
                    message={
                      errors.province
                        ? { text: errors.province.message!, type: 'danger' }
                        : undefined
                    }
                    value={{
                      label: watch('province'),
                      value: watch('province_code'),
                    }}
                    onChange={(val) => {
                      setValue('province', val.label);
                      setValue('province_code', val.value);
                      setError('province', { type: 'disabled' });
                    }}
                  />
                  <InputField
                    {...register('ring_area')}
                    message={
                      errors.ring_area
                        ? { text: errors.ring_area.message!, type: 'danger' }
                        : undefined
                    }
                    label="Ring Area"
                    placeholder="Text here.."
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('location')}
                    message={
                      errors.location
                        ? { text: errors.location.message!, type: 'danger' }
                        : undefined
                    }
                    label="Location"
                    placeholder="Text here.."
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCity;
