'use client';

import React, { useEffect, useMemo, useRef } from 'react';
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
import { Checkbox } from '@components/ui/Checkbox';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy, IconSearch, IconX } from '@tabler/icons-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import useFormStore from '@stores/useFormStore';
import { useDrawer } from '@hooks/useDrawer';
import { useFormChanges, useSetValueForm } from '@hooks/useFormChanges';
import { errorMapping } from '@utils/errorMapping';
import { AxiosError } from 'axios';
import { GET_CATEGORY_MATERIAL_MANAGEMENT, GET_COA } from '@constants/queryKey';
import { editItemCategory } from '@services/fetcher/configuration/material-management';
import { ItemCategorySchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import useToastStore from '@stores/useToastStore';
import { useFormSave } from '@hooks/useFormSave';
import SelectableModal from '@components/ui/Modal';
import { getCoa } from '@services/fetcher/configuration/general';
import IconComponent from '@components/ui/Icon';
import bindCurrentValueAndChangeValue from '@hooks/useBindCurrentValAndChangeVal';

const EditCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as IItemCategory;

  const { setChangeStatus, changeStatus } = useFormStore();

  const [isLoading, setIsLoading] = React.useState(false);
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = React.useState(false);

  const {
    watch,
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
    defaultValues: detail_data,
  });

  const { coa_form, setCoaForm } = useFormStore();

  useSetValueForm<ItemCategoryFormBody>(detail_data, setValue);

  const { canSave } = useFormChanges({
    defaultValues: detail_data,
    control,
  });

  const code = watch('item_category_code');
  const name = watch('item_category_name');

  const currentValueMemo = useMemo(
    () => ({
      code: detail_data?.item_category_code || '',
      name: detail_data?.item_category_name || '',
    }),
    [detail_data?.item_category_code, detail_data?.item_category_name]
  );

  const changeValueMemo = useMemo(
    () => ({
      code: detail_data?.item_category_code || code,
      name,
    }),
    [detail_data?.item_category_code, code, name]
  );

  console.log('changeStatus', changeStatus);

  useEffect(() => {
    if (detail_data) {
      setChangeStatus(
        bindCurrentValueAndChangeValue(currentValueMemo, changeValueMemo)
      );
    }
  }, [detail_data, changeValueMemo, setChangeStatus, currentValueMemo]);

  useEffect(() => {
    if (detail_data) {
      setValue('item_category_code', detail_data.item_category_code || '');
      setValue('item_category_name', detail_data.item_category_name || '');
      setValue('active', detail_data.active || false);
    }
  }, [detail_data, setValue]);

  const { handleCloseDrawerEdit } = useDrawer(reset, detail_data);

  const { mutate: mutationEditItemCategory } = useMutation({
    mutationFn: editItemCategory,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      reset();
      setDetailData(data.data);
      closeEditDrawer();
      setIsLoading(false);
      setChangeStatus(false);
      queryClient.invalidateQueries({
        queryKey: [GET_CATEGORY_MATERIAL_MANAGEMENT],
      });
      openToast('Item Category Successfully Edited', 'success');
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.status === 500) {
        openToast('Item Category Failed to Edited', 'danger');
      }
      if (errorRes.response?.data) {
        const { errorField } = errorRes.response.data;
        errorMapping(errorField, setError);
      }
    },
  });

  const onSubmit: SubmitHandler<ItemCategoryFormBody> = (data) => {
    mutationEditItemCategory(data);
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

  const clearField = (fieldName: keyof ItemCategoryFormBody) => {
    setValue(fieldName, '');
    setValue(`${fieldName}_description` as keyof ItemCategoryFormBody, '');
  };

  const renderIcon = (fieldName: keyof ItemCategoryFormBody) => {
    const fieldValue = watch(fieldName);
    if (fieldValue) {
      return (
        <IconComponent
          onClick={() => clearField(fieldName)}
          size="medium"
          icon={IconX}
          className="curdor-pointer"
        />
      );
    }
    return (
      <IconComponent
        onClick={() => openModalForField(fieldName)}
        size="medium"
        icon={IconSearch}
        className="cirsor-pointer"
      />
    );
  };

  return (
    <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
      <DrawerContent>
        <DrawerHeader
          onClick={handleCloseDrawerEdit}
          drawerTitle="Edit Item's Category"
        >
          <DrawerEndHeader>
            <Button
              variant={!canSave ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconDeviceFloppy, color: 'White' }}
              onClick={handleSaveClick}
              disabled={isLoading}
            >
              {isLoading ? 'saving' : 'save'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
          <DrawerBody>
            <Card size="drawer">
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
                  <div className="flex items-start gap-2 ml-[14px] mt-[10px]">
                    <label
                      htmlFor="active"
                      className="cursor-pointer text-base font-semibold"
                    >
                      Active
                    </label>
                    <Checkbox
                      checked={watch('active')}
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
                    </div>
                    {renderIcon('coa_stock')}
                  </div>
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="flex flex-grow items-center gap-[10px]">
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
                        className="flex-1"
                      />
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
                        className="flex-1"
                      />
                    </div>
                    {renderIcon('coa_sales')}
                  </div>
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="flex flex-grow items-center gap-[10px]">
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
                        className="flex-1"
                      />
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
                        className="flex-1"
                      />
                    </div>
                    {renderIcon('coa_cogs')}
                  </div>
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="flex flex-grow items-center gap-[10px]">
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
                        className="flex-1"
                      />
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
                        className="flex-1"
                      />
                    </div>
                    {renderIcon('coa_sales_return')}
                  </div>
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="flex flex-grow items-center gap-[10px]">
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
                        className="flex-1"
                      />
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
                        className="flex-1"
                      />
                    </div>
                    {renderIcon('coa_purchase_return')}
                  </div>
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="flex flex-grow items-center gap-[10px]">
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
                        className="flex-1"
                      />
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
                        className="flex-1"
                      />
                    </div>
                    {renderIcon('coa_consumption_cost')}
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
          setModalOpen(false);
        }}
      />
    </Drawer>
  );
};

export default EditCategoryMM;
