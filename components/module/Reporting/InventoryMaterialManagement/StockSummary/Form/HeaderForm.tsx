import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import {
  GET_CATEGORY_MATERIAL_MANAGEMENT,
  GET_WAREHOUSE,
} from '@constants/queryKey';
import {
  getItemCategory,
  getWarehouse,
} from '@services/fetcher/configuration/material-item-warehouse-management';

const StockSummaryHeaderForm = () => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center">
      <div className="flex flex-col gap-[14px] flex-1">
        <Combobox
          label="Item's Category"
          placeholder="Selecy Item Category"
          queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
          queryFn={getItemCategory}
          dataLabel="item_category_name"
          dataValue="item_category_code"
        />
        <InputField
          label="Item's Code"
          placeholder="Enter Item's Code"
          type="text"
          right
          className="w-full gap-2"
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          label="Item's Name"
          placeholder="Enter Item's Name"
          type="text"
          right
          className="w-full gap-2"
        />
        <Combobox
          label="Multi Warehosue"
          placeholder="Select Warehouse"
          queryKey={[GET_WAREHOUSE]}
          queryFn={getWarehouse}
          dataLabel="warehouse_name"
          dataValue="warehouse_code"
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full">
        <InputField
          label="Date"
          placeholder="Text here.."
          type="date"
          right
          className="w-full gap-2"
        />
      </div>
    </CardContent>
  </Card>
);

export default StockSummaryHeaderForm;
