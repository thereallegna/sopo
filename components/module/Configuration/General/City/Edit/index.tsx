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
import { citySchema } from '@constants/schemas/ConfigurationSchema/General';
import { editCity, getProvince } from '@services/fetcher/configuration/general';
import { GET_CITY, GET_PROVINCE } from '@constants/queryKey';
import Combobox from '@components/shared/Combobox';
import { useSetValueForm } from '@hooks/useSetValueForm';

const EditCity = () => {
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as CityFormBody;

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
    watch,
    setValue,
    register,
  } = useForm({
    label: 'City',
    queryKey: GET_CITY,
    mutationFn: editCity,
    validationSchema: citySchema,
    defaultValues: detail_data,
    type: 'edit',
    requireAllFields: true,
    ignoredFields: ['location'],
  });

  useSetValueForm<CityFormBody>(detail_data, setValue, isOpenEdit);

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawerEdit} drawerTitle="Edit City">
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
                    placeholder="City Code"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    disabled
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
                    placeholder="City Name"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <Combobox
                    className="flex-1 gap-2"
                    label="Province"
                    placeholder="Select Province"
                    queryKey={[GET_PROVINCE]}
                    queryFn={() => getProvince()}
                    dataLabel="province"
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
                      setValue('province', val.label, { shouldDirty: true });
                      setValue('province_code', val.value, {
                        shouldDirty: true,
                      });
                      setError('province', { type: 'disabled' });
                    }}
                  />
                  {/* <InputField
                                        {...register("ring_area")}
                                        message={
                                            errors.ring_area
                                                ? { text: errors.ring_area.message!, type: "danger" }
                                                : undefined
                                        }
                                        label="ring_area"
                                        right
                                        type="text"
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    /> */}
                  <InputField
                    {...register('location')}
                    message={
                      errors.location
                        ? { text: errors.location.message!, type: 'danger' }
                        : undefined
                    }
                    label="Location"
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                {/* <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("location")}
                                        message={
                                            errors.location
                                                ? { text: errors.location.message!, type: "danger" }
                                                : undefined
                                        }
                                        label="Location"
                                        right
                                        type="text"
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div> */}
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditCity;
