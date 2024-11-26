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
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { ItemCategoryDefaultValues } from '@constants/defaultValues';
import { useFormChanges } from '@hooks/useFormChanges';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import { GET_CATEGORY_MATERIAL_MANAGEMENT, GET_COA } from '@constants/queryKey';
import { ItemCategorySchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createItemCategory } from '@services/fetcher/configuration/material-management';
import { Checkbox } from '@components/ui/Checkbox';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';
import SelectableModal from '@components/ui/Modal';
import { getCoa } from '@services/fetcher/configuration/general';
import IconComponent from '@components/ui/Icon';

const CreateCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, closeDrawer, openDetailDrawer } = useDrawerStore();
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<ItemCategoryFormBody>({
    mode: 'onBlur',
    resolver: yupResolver(ItemCategorySchema),
    defaultValues: ItemCategoryDefaultValues,
  });

  const { coa_form, setCoaForm } = useFormStore();

  const { canSave } = useFormChanges<ItemCategoryFormBody>({
    defaultValues: ItemCategoryDefaultValues,
    control,
    requireAllFields: true,
    ignoredFields: [
      'coa_stock',
      'coa_sales',
      'coa_cogs',
      'coa_sales_return',
      'coa_purchase_return',
      'coa_consumption_cost',
      'coa_stock_description',
      'coa_sales_description',
      'coa_cogs_description',
      'coa_sales_return_description',
      'coa_purchase_return_description',
      'coa_consumption_cost_description',
    ],
  });

  const { handleCloseDrawer } = useDrawer(reset);

  const { mutate: mutationCreateCategoryMM } = useMutation({
    mutationFn: createItemCategory,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      reset();
      closeDrawer();
      setIsLoading(false);
      setChangeStatus(false);
      openDetailDrawer(data.data);
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORY_MATERIAL_MANAGEMENT],
      });
      openToast('Item Category Successfully Created', 'success');
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        openToast('Item Category Failed to Created', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<ItemCategoryFormBody> = (data) => {
    mutationCreateCategoryMM(data);
  };

  const { handleSaveClick, handleInputKeyDown } = useFormSave({
    ref: formRef,
    isLoading,
    hasChanged: canSave,
  });

  const openModalForField = (fieldName: string) => {
    setModalOpen(true);
    setCoaForm(fieldName);
  };

  return (
    <Drawer onClose={handleCloseDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawer}
          drawerTitle="Add Item Category"
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
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
              <CardContent className="flex-wrap flex flex-row gap-4">
                <div className="flex flex-row gap-[10px] flex-1 h-full">
                  <InputField
                    {...register('item_category_code')}
                    className="flex-grow"
                    message={
                      errors.item_category_code
                        ? {
                            text: errors.item_category_code.message!,
                            type: 'danger',
                          }
                        : undefined
                    }
                    label="Item Category Code"
                    placeholder="Item Category Code"
                    right
                    type="text"
                    onKeyDown={handleInputKeyDown}
                  />
                  <InputField
                    {...register('item_category_name')}
                    className="flex-grow"
                    message={
                      errors.item_category_name
                        ? {
                            text: errors.item_category_name.message!,
                            type: 'danger',
                          }
                        : undefined
                    }
                    label="Item Category Name"
                    placeholder="Item Category Name"
                    right
                    type="text"
                    onKeyDown={handleInputKeyDown}
                  />
                  <div className="flex items-start gap-2 ml-[10px] mt-[8px]">
                    <label
                      htmlFor="active"
                      className="cursor-pointer text-base font-semibold"
                    >
                      Active
                    </label>
                    <Checkbox
                      {...register('active')}
                      message={
                        errors.active
                          ? {
                              text: errors.active.message!,
                              type: 'danger',
                            }
                          : undefined
                      }
                      label=""
                      checked={ItemCategoryDefaultValues.active}
                      disabled
                      onCheckedChange={(checked) =>
                        setValue('active', !!checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              size="drawer"
              className="border border-Neutral-200 shadow-none"
            >
              <CardContent className="flex-wrap flex flex-row gap-4">
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="flex flex-grow items-center gap-[10px]">
                      <InputField
                        {...register('coa_stock')}
                        message={
                          errors.coa_stock
                            ? {
                                text: errors.coa_stock.message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        label="COA's Account (Stock)"
                        placeholder="COA's Account (Stock)"
                        disabled
                        right
                        className="flex-1"
                      />
                      <InputField
                        {...register('coa_stock_description')}
                        message={
                          errors.coa_stock_description
                            ? {
                                text: errors.coa_stock_description.message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        placeholder="COA's Account (Stock)"
                        disabled
                        className="flex-1"
                      />
                      {/* <div className="w-8/10">
                      </div> */}
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_stock')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full mb-[8px] gap-3">
                    <div className="flex flex-grow gap-0">
                      <div className="w-2/10">
                        <InputField
                          {...register('coa_sales')}
                          message={
                            errors.coa_stock
                              ? {
                                  text: errors.coa_stock.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          label="COA's Account (Sales)"
                          placeholder="COA's Account (Sales)"
                          disabled
                          right
                        />
                      </div>
                      <div className="w-8/10">
                        <InputField
                          {...register('coa_sales_description')}
                          message={
                            errors.coa_sales_description
                              ? {
                                  text: errors.coa_sales_description.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          placeholder="COA's Account (Sales)"
                          disabled
                          right
                        />
                      </div>
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_sales')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full mb-[12px] gap-4">
                    <div className="flex flex-grow gap-0">
                      <div className="w-2/10">
                        <InputField
                          {...register('coa_cogs')}
                          message={
                            errors.coa_cogs
                              ? {
                                  text: errors.coa_cogs.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          label="COA's Account (COGS)"
                          placeholder="COA's Account (COGS)"
                          disabled
                          right
                        />
                      </div>
                      <div className="w-8/10">
                        <InputField
                          {...register('coa_cogs_description')}
                          message={
                            errors.coa_cogs_description
                              ? {
                                  text: errors.coa_cogs_description.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          placeholder="COA's Account (COGS)"
                          disabled
                          right
                        />
                      </div>
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_cogs')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                  <div className="flex justify-between items-center w-full mb-[12px] gap-4">
                    <div className="flex flex-grow gap-0">
                      <div className="w-2/10">
                        <InputField
                          {...register('coa_sales_return')}
                          message={
                            errors.coa_sales_return
                              ? {
                                  text: errors.coa_sales_return.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          label="COA's Account (Sales Return)"
                          placeholder="COA's Account (Sales Return)"
                          disabled
                          right
                        />
                      </div>
                      <div className="w-8/10">
                        <InputField
                          {...register('coa_sales_return_description')}
                          message={
                            errors.coa_sales_return_description
                              ? {
                                  text: errors.coa_sales_return_description
                                    .message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          placeholder="COA's Account (Sales Return)"
                          disabled
                          right
                        />
                      </div>
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_sales_return')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full mb-[12px] gap-4">
                    <div className="flex flex-grow">
                      <div className="w-2/10">
                        <InputField
                          {...register('coa_purchase_return')}
                          message={
                            errors.coa_purchase_return
                              ? {
                                  text: errors.coa_purchase_return.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          label="COA's Account (Purchase Return)"
                          placeholder="COA's Account (Purchase Return)"
                          disabled
                          right
                        />
                      </div>
                      <div className="w-8/10">
                        <InputField
                          {...register('coa_purchase_return_description')}
                          message={
                            errors.coa_purchase_return_description
                              ? {
                                  text: errors.coa_purchase_return_description
                                    .message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          placeholder="COA's Account (Purchase Return)"
                          disabled
                          right
                        />
                      </div>
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_purchse_return')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full mb-[12px] gap-4">
                    <div className="flex-grow">
                      <InputField
                        {...register('coa_consumption_cost')}
                        message={
                          errors.coa_consumption_cost
                            ? {
                                text: errors.coa_consumption_cost.message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        label="COA's Account (Consumption Cost)"
                        placeholder="COA's Account (Consumption Cost)"
                        disabled
                        right
                      />
                    </div>
                    <div className="w-8/10">
                      <InputField
                        {...register('coa_consumption_cost_description')}
                        message={
                          errors.coa_consumption_cost_description
                            ? {
                                text: errors.coa_consumption_cost_description
                                  .message!,
                                type: 'danger',
                              }
                            : undefined
                        }
                        placeholder="COA's Account (Cosumption Cost)"
                        disabled
                        right
                      />
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_consumption_cost')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
      <SelectableModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Find Coa"
        queryKey={GET_COA}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'account',
              header: 'Coa Code',
            },
            {
              accessor: 'description',
              header: 'Coa Description',
            },
          ],
          hasAction: false,
        }}
        queryFn={getCoa}
        onSelectRow={(data: ICoa) => {
          setValue(`${coa_form}` as keyof ItemCategoryFormBody, data.account, {
            shouldDirty: true,
          });
          setValue(
            `${coa_form}_description` as keyof ItemCategoryFormBody,
            data.description,
            { shouldDirty: true }
          );
          setModalOpen(false); // Close the modal after selection
        }}
      />
    </Drawer>
  );
};

export default CreateCategoryMM;
