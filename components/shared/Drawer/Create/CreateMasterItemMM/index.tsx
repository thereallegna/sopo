'use client';

import React, { useRef } from 'react';
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
import { IconDeviceFloppy, IconSearch } from '@tabler/icons-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
// import useFormStore from '@stores/useFormStore'; // Import useFormStore
import { useDrawer } from '@hooks/useDrawer';
import {
  cityDefaultValues,
  masterItemDefaultValues,
} from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';
import { MasterItemMMSchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createItem } from '@services/fetcher/configuration/material-management';
import { Checkbox } from '@components/ui/Checkbox';
import Label from '@components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs';

const CreateMasterItemMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  // const { setIsDirty } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    // setValue,
    control,
    formState: { errors },
  } = useForm<MasterItemFormBody>({
    mode: 'onSubmit',
    resolver: yupResolver(MasterItemMMSchema),
    defaultValues: masterItemDefaultValues,
  });

  const { handleCloseDrawer } = useDrawer(reset);
  // const { hasChanged } = useFormChanges(
  //   cityDefaultValues,
  //   control,
  //   setValue,
  //   'every' // or 'every' depending on your needs
  // );
  const { canSave } = useFormChanges({
    defaultValues: cityDefaultValues,
    control,
    ignoredFields: ['ring_area', 'location'],
    requireAllFields: true,
  });

  const { mutate: mutationCreateMasterItemMM } = useMutation({
    mutationFn: createItem,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      closeDrawer();
      setIsLoading(false);
      // setIsDirty(false);
      openDetailDrawer(data.data);
      reset();
      queryClient.invalidateQueries({
        queryKey: [GET_MASTER_ITEM_MATERIAL_MANAGEMENT],
      });
      openToast('Master item successfuly added', 'warning');
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        openToast('Master item failed to added', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<MasterItemFormBody> = (data) => {
    mutationCreateMasterItemMM(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
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
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                <div className="flex flex-col gap-[14px] flex-1">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-[10px]">
                      <InputField
                        {...register('item_code')}
                        message={
                          errors.item_code
                            ? {
                                text: errors.item_code.message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        label="Item Code"
                        // placeholder="Text here.."
                        right
                        type="text"
                        disabled
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                      />
                      <Checkbox label="Active" />
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <InputField
                        {...register('source')}
                        message={
                          errors.source
                            ? { text: errors.source.message!, type: 'danger' }
                            : undefined
                        }
                        label="Source"
                        // placeholder="Text here.."
                        right
                        type="text"
                        disabled
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                      />
                      <Button
                        type="button"
                        className="w-min"
                        variant="backDrawer"
                        icon={{ icon: IconSearch }}
                      />
                    </div>
                  </div>
                  <InputField
                    {...register('item_name')}
                    message={
                      errors.item_name
                        ? { text: errors.item_name.message!, type: 'danger' }
                        : undefined
                    }
                    label="Item Name"
                    placeholder="Text here.."
                    right
                    type="text"
                    required
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('local_code')}
                    message={
                      errors.local_code
                        ? { text: errors.local_code.message!, type: 'danger' }
                        : undefined
                    }
                    label="Item Local Code"
                    placeholder="Text here.."
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                {/* <div className='flex-1 gap-6 flex items-start'>
                </div> */}
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <InputField
                    {...register('foreign_name')}
                    message={
                      errors.foreign_name
                        ? { text: errors.foreign_name.message!, type: 'danger' }
                        : undefined
                    }
                    label="Foreign Name"
                    placeholder="Text here.."
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('old_code')}
                    message={
                      errors.old_code
                        ? { text: errors.old_code.message!, type: 'danger' }
                        : undefined
                    }
                    label="Old Code"
                    placeholder="Text here.."
                    right
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('item_request')}
                    message={
                      errors.item_request
                        ? { text: errors.item_request.message!, type: 'danger' }
                        : undefined
                    }
                    label="Item Request#"
                    placeholder="Text here.."
                    right
                    disabled
                    type="text"
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="flex flex-col gap-[14px]">
                  <Label font="bold">Item Type</Label>
                  <div className="flex flex-col gap-2">
                    <Checkbox label="Inventory Item" />
                    <Checkbox label="Sales Item" />
                    <Checkbox label="Purchase Item" />
                    <Checkbox label="Service Item" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
              <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                <Tabs defaultValue="general">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="general"
                    className="flex-wrap flex flex-row gap-6 items-start"
                  >
                    <div className="flex flex-col gap-[14px] flex-1">
                      <InputField
                        {...register('category_code')}
                        message={
                          errors.category_code
                            ? {
                                text: errors.category_code.message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        label="Category Name"
                        placeholder="Text here.."
                        right
                        type="text"
                        required
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                      />
                      <InputField
                        {...register('uom_code')}
                        message={
                          errors.uom_code
                            ? { text: errors.uom_code.message!, type: 'danger' }
                            : undefined
                        }
                        label="UoM"
                        placeholder="Text here.."
                        right
                        type="text"
                        required
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                      />
                      <InputField
                        {...register('spesification')}
                        message={
                          errors.spesification
                            ? {
                                text: errors.spesification.message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        label="Spesification"
                        placeholder="Text here.."
                        right
                        type="text"
                        className="w-full gap-2"
                        textarea
                        onKeyDown={handleInputKeyDown}
                      />
                    </div>
                    <div className="flex flex-col gap-[14px] flex-1">
                      <InputField
                        {...register('hs_code')}
                        message={
                          errors.hs_code
                            ? { text: errors.hs_code.message!, type: 'danger' }
                            : undefined
                        }
                        label="HS Code"
                        placeholder="Text here.."
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
                        placeholder="Text here.."
                        right
                        type="text"
                        className="w-full gap-2"
                        textarea
                        onKeyDown={handleInputKeyDown}
                      />
                      <Checkbox label="Tax Liable" />
                    </div>
                    {/* <div className="flex flex-col gap-[14px]">
                    </div> */}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateMasterItemMM;
