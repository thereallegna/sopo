import React, { useState } from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox, { FrameworkItem } from '@components/shared/Combobox';
import {
  GET_CATEGORY_MATERIAL_MANAGEMENT,
  GET_STOCK_SUMMARY,
  GET_WAREHOUSE,
} from '@constants/queryKey';
import {
  getItemCategory,
  getWarehouse,
} from '@services/fetcher/configuration/material-item-warehouse-management';
import { useTableStore } from '@stores/useTableStore';
import MultiSelectCombobox from '@components/shared/Combobox/MultiSelect';

const StockSummaryHeaderForm = () => {
  const query = useTableStore(
    (state) => state.options[GET_STOCK_SUMMARY].query
  ) as StockSummaryFilterQuery;
  const { setQuery } = useTableStore();

  const [multi, setMulti] = useState<FrameworkItem[]>([]);

  const handleAddFilter = (key: keyof StockSummaryFilterQuery, val: string) => {
    setQuery(GET_STOCK_SUMMARY, {
      ...query,
      [key]: val,
    });
  };

  return (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
      <CardContent className="flex-wrap flex flex-row gap-6">
        <div className="flex flex-col gap-[14px] flex-1">
          <Combobox
            label="Item's Category"
            placeholder="Selecy Item's Category"
            queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
            queryFn={getItemCategory}
            dataLabel="item_category_name"
            dataValue="item_category_code"
            value={
              query?.item_category_name && query?.item_category
                ? {
                    label: query.item_category_name,
                    value: query.item_category,
                  }
                : undefined
            }
            onChange={(val) => {
              if (query.item_category !== val.value) {
                setQuery(GET_STOCK_SUMMARY, {
                  ...query,
                  item_category: val.value,
                  item_category_name: val.label,
                });
              } else {
                setQuery(GET_STOCK_SUMMARY, {
                  ...query,
                  item_category: undefined,
                  item_category_name: undefined,
                });
              }
            }}
          />
          <InputField
            label="Item's Code"
            placeholder="Enter Item's Code"
            type="text"
            right
            className="w-full gap-2"
            onChange={(e) => {
              handleAddFilter('item_code', e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
          <InputField
            label="Item's Name"
            placeholder="Enter Item's Name"
            type="text"
            right
            className="w-full gap-2"
            onChange={(e) => {
              handleAddFilter('item_name', e.target.value);
            }}
          />
          <MultiSelectCombobox
            label="Multi Warehosue"
            placeholder="Select Warehouse"
            queryKey={[GET_WAREHOUSE]}
            queryFn={getWarehouse}
            dataLabel="warehouse_name"
            dataValue="warehouse_code"
            value={multi}
            onChange={(val) => {
              setMulti(val);
              handleAddFilter(
                'warehouse',
                JSON.stringify(val.map((item) => item.value))
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-[14px] flex-1 h-full">
          <InputField
            label="Date"
            placeholder="Text here.."
            type="date"
            right
            className="w-full gap-2"
            onChange={(e) => {
              handleAddFilter('date', e.target.value);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StockSummaryHeaderForm;
