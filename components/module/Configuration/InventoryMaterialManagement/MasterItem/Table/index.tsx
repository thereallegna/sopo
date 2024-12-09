import React from 'react'
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { getItem } from "@services/fetcher/configuration/material-item-warehouse-management";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);

export const MasterItemColumns = {
  columns: [
    {
      accessor: 'number',
      header: '#',
      size: 65
    },
    {
      accessor: 'item_code',
      header: 'Item Code',
    },
    {
      accessor: 'item_name',
      header: 'Item Name',
    },
    {
      accessor: 'local_code',
      header: 'Local Code',
    },
    {
      accessor: 'foreign_name',
      header: 'Foreign Name',
    },
    {
      accessor: 'old_code',
      header: 'Old Code',
    },
    {
      accessor: 'category_name',
      header: 'Category Name',
    },
    {
      accessor: 'spesification',
      header: 'Specification',
    },
    {
      accessor: 'active',
      header: 'Active',
    },
    {
      accessor: 'create_date',
      header: 'Create Date',
    },
  ],
}

const TableMasterItem = () => (
  <TableDrawer
    title="Find Master Items"
    queryKey={GET_MASTER_ITEM_MATERIAL_MANAGEMENT}
    columns={MasterItemColumns}
    queryFn={getItem}
  />
)

export default TableMasterItem