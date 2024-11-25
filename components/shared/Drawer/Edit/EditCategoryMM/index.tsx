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
import { Checkbox } from '@components/ui/Checkbox';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy, IconSearch } from '@tabler/icons-react';
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

const EditCategoryMM = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpenEdit, closeEditDrawer, setDetailData } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as IItemCategory;
  const { setChangeStatus } = useFormStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const openToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [, setModalTargetField] = React.useState('');

  const [] = React.useState({
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
                  <div className="flex justify-between items-center w-full mb-[12px] gap-4">
                    <div className="flex flex-grow">
                      <div className="flex-grow-[2]">
                        <InputField
                          {...register('coa_stock_account')}
                          message={
                            errors.coa_stock_account
                              ? {
                                  text: errors.coa_stock_account.message!,
                                  type: 'danger',
                                }
                              : undefined
                          }
                          label="COA's Account (Stock)"
                          placeholder="COA's Account (Stock)"
                          disabled
                          right
                        />
                      </div>
                      <div className="flex-grow-[8]">
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
                          right
                        />
                      </div>
                    </div>
                    <IconComponent
                      onClick={() => openModalForField('coa_stock')}
                      size="medium"
                      icon={IconSearch}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full mb-[12px] gap-4">
                    <div className="flex flex-grow gap-0">
                      <div className="w-2/10">
                        <InputField
                          {...register('coa_sales_account')}
                          message={
                            errors.coa_stock_account
                              ? {
                                  text: errors.coa_stock_account.message!,
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
                          placeholder="COA's Account (Stock)"
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
                          {...register('coa_cogs_account')}
                          message={
                            errors.coa_cogs_account
                              ? {
                                  text: errors.coa_cogs_account.message!,
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
                          {...register('coa_sales_return_account')}
                          message={
                            errors.coa_sales_return_account
                              ? {
                                  text: errors.coa_sales_return_account
                                    .message!,
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
                          {...register('coa_purchase_return_account')}
                          message={
                            errors.coa_purchase_return_account
                              ? {
                                  text: errors.coa_purchase_return_account
                                    .message!,
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
                        {...register('coa_consumption_cost_account')}
                        message={
                          errors.coa_consumption_cost_account
                            ? {
                                text: errors.coa_consumption_cost_account
                                  .message!,
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
      />
    </Drawer>
  );
};

export default EditCategoryMM;
