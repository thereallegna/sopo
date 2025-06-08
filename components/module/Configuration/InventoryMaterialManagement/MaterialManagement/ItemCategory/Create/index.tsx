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
// import { IconDeviceFloppy, IconSearch, IconX } from '@tabler/icons-react';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useForm } from '@hooks/useForm';
// import useFormStore from '@stores/useFormStore';
import { ItemCategoryDefaultValues } from '@constants/defaultValues';
// import { GET_CATEGORY_MATERIAL_MANAGEMENT, GET_COA } from '@constants/queryKey';
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { ItemCategorySchema } from '@constants/schemas/ConfigurationSchema/InventoryMaterialManagement';
import { createItemCategory } from '@services/fetcher/configuration/inventory-management';
import { Checkbox } from '@components/ui/Checkbox';
// import SelectableModal from '@components/ui/Modal';
// import { getCoa } from '@services/fetcher/configuration/general';
// import IconComponent from '@components/ui/Icon';

const CreateItemCategory = () => {
  // const [isModalOpen, setModalOpen] = React.useState(false);
  // const { coa_form, setCoaForm } = useFormStore();

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
    setValue,
    register,
    // watch,
  } = useForm({
    label: 'Items Category',
    queryKey: GET_CATEGORY_MATERIAL_MANAGEMENT,
    mutationFn: createItemCategory,
    validationSchema: ItemCategorySchema,
    defaultValues: ItemCategoryDefaultValues,
    type: 'add',
    requireAllFields: true,
    // ignoredFields: [
    //   'coa_stock',
    //   'coa_sales',
    //   'coa_cogs',
    //   'coa_sales_return',
    //   'coa_purchase_return',
    //   'coa_consumption_cost',
    //   'coa_stock_description',
    //   'coa_sales_description',
    //   'coa_cogs_description',
    //   'coa_sales_return_description',
    //   'coa_purchase_return_description',
    //   'coa_consumption_cost_description',
    // ],
  });

  //   const openModalForField = (fieldName: string) => {
  //     setModalOpen(true);
  //     // setCoaForm(fieldName);
  //   };

  //   const clearField = (fieldName: keyof ItemCategoryFormBody) => {
  //     setValue(fieldName, '');
  //     setValue(`${fieldName}_description` as keyof ItemCategoryFormBody, '');
  //   };

  //   const renderIcon = (fieldName: keyof ItemCategoryFormBody) => {
  //     const fieldValue = watch(fieldName);
  //     if (fieldValue) {
  //       return (
  //         <IconComponent
  //           onClick={() => clearField(fieldName)}
  //           size="medium"
  //           icon={IconX}
  //           className="curdor-pointer"
  //         />
  //       );
  //     }
  //     return (
  //       <IconComponent
  //         onClick={() => openModalForField(fieldName)}
  //         size="medium"
  //         icon={IconSearch}
  //         className="cirsor-pointer"
  //       />
  //     );
  //   };

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
        <form ref={formRef} onSubmit={handleSubmit}>
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
                    required
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
                    required
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
            {/* <Card
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
            </Card> */}
          </DrawerBody>
        </form>
      </DrawerContent>
      {/* <SelectableModal
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
      /> */}
    </Drawer>
  );
};

export default CreateItemCategory;
