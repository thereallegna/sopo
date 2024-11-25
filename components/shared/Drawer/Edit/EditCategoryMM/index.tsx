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
import { IconDeviceFloppy } from '@tabler/icons-react';
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
import bindCurrentValueAndChangeValue from '@hooks/useBindCurrentValAndChangeVal';

const EditCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as IItemCategory;
  // const { setIsDirty } = useFormStore();
  const { setChangeStatus, changeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [modalTargetField, setModalTargetField] = React.useState('');

  const [fieldValues, setFieldValues] = React.useState({
    coa_stock: '',
    coa_sales: '',
    coa_cogs: '',
    coa_sales_return: '',
    coa_purchase_return: '',
    coa_consumption_cost: '',
  });

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
    setModalTargetField(fieldName);
    setModalOpen(true);
  };

  const handleModalSelect = (value: string) => {
    setFieldValues((prevValues) => {
      const updatedValues = { ...prevValues, [modalTargetField]: value };
      return updatedValues;
    });
    setModalOpen(false);
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
              <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-row gap-[14px] flex-1 h-full">
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
                    disabled
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
            <Card size="drawer">
              <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                  <InputField
                    {...register('coa_stock')}
                    value={fieldValues.coa_stock}
                    onClick={() => openModalForField('coa_stock')}
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
                    right
                    readOnly
                  />
                  <InputField
                    {...register('coa_sales')}
                    value={fieldValues.coa_sales}
                    onClick={() => openModalForField('coa_sales')}
                    message={
                      errors.coa_sales
                        ? {
                            text: errors.coa_sales.message!,
                            type: 'danger',
                          }
                        : undefined
                    }
                    label="COA's Account (Sales)"
                    placeholder="COA's Account (Sales)"
                    right
                    readOnly
                  />
                  <InputField
                    {...register('coa_cogs')}
                    value={fieldValues.coa_cogs}
                    onClick={() => openModalForField('coa_cogs')}
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
                    right
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                  <InputField
                    {...register('coa_sales_return')}
                    value={fieldValues.coa_sales_return}
                    onClick={() => openModalForField('coa_sales_return')}
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
                    right
                    readOnly
                  />
                  <InputField
                    {...register('coa_purchase_return')}
                    value={fieldValues.coa_purchase_return}
                    onClick={() => openModalForField('coa_purchase_return')}
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
                    right
                    readOnly
                  />
                  <InputField
                    {...register('coa_consumption_cost')}
                    value={fieldValues.coa_consumption_cost}
                    onClick={() => openModalForField('coa_consumption_cost')}
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
                    right
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>
          </DrawerBody>
        </form>
      </DrawerContent>
      <SelectableModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleModalSelect}
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
        }}
        queryFn={getCoa}
      />
    </Drawer>
  );
};

export default EditCategoryMM;
