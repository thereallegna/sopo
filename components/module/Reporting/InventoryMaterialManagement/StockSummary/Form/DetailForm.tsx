import React from 'react';
import { Card, CardContent } from '@components/ui/Card';
import { GET_STOCK_SUMMARY } from '@constants/queryKey';
import TableContent from '@components/shared/TableContent';
import { getStockSummary } from '@services/fetcher/reporting/inventory-material-management';
import useTable from '@hooks/useTable';
import { GenerateColumnsOption } from '../../../../../../types/client/table';

const detailFormColumn: GenerateColumnsOption = {
  columns: [
    {
      accessor: 'number',
      header: '#',
    },
    {
      accessor: 'warehouse_name',
      header: 'Warehouse',
    },
    {
      accessor: 'item_code',
      header: "Item's Code",
    },
    {
      accessor: 'local_code',
      header: 'Local Code',
    },
    {
      accessor: 'item_name',
      header: "Item's Name",
    },
    {
      accessor: 'active',
      header: 'Active',
    },
    {
      accessor: 'quantity',
      header: 'Quantity',
    },
    {
      accessor: 'uom',
      header: 'UOM',
    },
  ],
  hasAction: false,
};

const StockSummaryDetailForm = () => {
  const tableProps = useTable<any[]>({
    queryFn: getStockSummary,
    columns: detailFormColumn,
    queryKey: GET_STOCK_SUMMARY,
  });

  return (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
      <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
        <TableContent {...tableProps} />
      </CardContent>
    </Card>
  );
};

export default StockSummaryDetailForm;
