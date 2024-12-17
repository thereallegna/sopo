import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import DatePickerRange from '@components/shared/DatePickerRange';
import {
  GET_WAREHOUSE,
  GET_CATEGORY_MATERIAL_MANAGEMENT,
} from '@constants/queryKey';
import {
  getItemCategory,
  getWarehouse,
} from '@services/fetcher/configuration/material-item-warehouse-management';

const StockMovementHeaderForm = () => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center">
      <div className="flex flex-col gap-[14px] flex-1">
        <DatePickerRange placeholder="Select Date" />
        <Combobox
          label="Multi Warehouse"
          placeholder="Select Warehouse"
          queryKey={[GET_WAREHOUSE]}
          queryFn={getWarehouse}
          dataLabel="warehouse_name"
          dataValue="warehouse_code"
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full">
        <Combobox
          label="Type"
          placeholder="Select Type"
          data={[
            { label: 'Initial Stock', value: 'initial_stock' },
            { label: 'Stock Adjustment', value: 'stock_adjustment' },
            { label: 'Stock Mutation', value: 'stock_movement' },
          ]}
          dataLabel="label"
          dataValue="value"
        />
        <Combobox
          label="Item's Category"
          placeholder="Select Item's Category"
          queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
          queryFn={getItemCategory}
          dataLabel="item_category_name"
          dataValue="Item_category_code"
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full">
        <InputField
          label="Item's Code"
          placeholder="Enter Item's Code"
          type="text"
          right
          className="w-full gap-2"
        />
        <InputField
          label="Item's Name"
          placeholder="Enter Item's Name"
          type="text"
          right
          className="w-full gap-2"
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full">
        <InputField
          label="Batch"
          placeholder="Enter Batch"
          type="text"
          right
          className="w-full gap-2"
        />
      </div>
    </CardContent>
  </Card>
);

export default StockMovementHeaderForm;
