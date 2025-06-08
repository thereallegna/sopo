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
// import { Checkbox } from "@components/ui/Checkbox";
import { useForm } from '@hooks/useForm';
import { siteSchema } from '@constants/schemas/ConfigurationSchema/General';
import { editSite } from '@services/fetcher/configuration/general';
import { GET_SITE } from '@constants/queryKey';
import { useSetValueForm } from '@hooks/useSetValueForm';

const EditSite = () => {
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as SiteFormBody;

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
    // setError,
    // watch,
    setValue,
    register,
  } = useForm({
    label: 'Site',
    queryKey: GET_SITE,
    mutationFn: editSite,
    validationSchema: siteSchema,
    defaultValues: detail_data,
    type: 'edit',
    requireAllFields: true,
  });

  useSetValueForm<SiteFormBody>(detail_data, setValue, isOpenEdit);

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader onClick={handleCloseDrawerEdit} drawerTitle="Edit Site">
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
              <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('site_code')}
                    message={
                      errors.site_code
                        ? { text: errors.site_code.message!, type: 'danger' }
                        : undefined
                    }
                    label="Site Code"
                    placeholder="Site Code"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    disabled
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('site_name')}
                    message={
                      errors.site_name
                        ? { text: errors.site_name.message!, type: 'danger' }
                        : undefined
                    }
                    label="Site Name"
                    placeholder="Site Name"
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  {/* <Checkbox 
                                        label="Active"
                                        checked={watch("active")}
                                        onCheckedChange={(val: boolean) => setValue && setValue("active", val)}
                                        disabled={false}
                                    /> */}
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <InputField
                    {...register('address')}
                    message={
                      errors.address
                        ? { text: errors.address.message!, type: 'danger' }
                        : undefined
                    }
                    label="Address"
                    placeholder="Address"
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('remark')}
                    message={
                      errors.remark
                        ? { text: errors.remark.message!, type: 'danger' }
                        : undefined
                    }
                    label="Remark"
                    placeholder="Remark"
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

export default EditSite;
