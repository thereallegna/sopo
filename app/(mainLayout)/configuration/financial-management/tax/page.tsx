'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getTax } from '@services/fetcher/configuration/financial-management';
import { GET_TAX } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterTax = dynamic(
  () => import('@components/shared/Drawer/Filter/TaxFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateTax = dynamic(
  () =>
    import('@components/module/Configuration/FinancialManagement/Tax/Create'),
  { ssr: false }
);
const DetailTax = dynamic(
  () =>
    import('@components/module/Configuration/FinancialManagement/Tax/Detail'),
  { ssr: false }
);
const EditTax = dynamic(
  () => import('@components/module/Configuration/FinancialManagement/Tax/Edit'),
  { ssr: false }
);

const Tax = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterTax');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Tax" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="Empty State"
              width={200}
              height={200}
            />
            <p className="text-Neutral-500 text-lg">Filter to find data Tax</p>
            <div className="pb-[10px]">
              <FilterButton
                iconColor="secondary"
                variant="outlined"
                onClick={handleOpenFilter}
              />
            </div>
            <button
              type="button"
              onClick={handleOpenTable}
              className="underline text-base text-Blue-500"
            >
              Show latest data
            </button>
          </div>
        </BodyContent>
      </Content>
      <FilterTax />
      <TableDrawer
        title="Find Tax"
        queryKey={GET_TAX}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'tax_code',
              header: 'Tax Code',
            },
            {
              accessor: 'tax_name',
              header: 'Tax Name',
            },
            {
              accessor: 'tax_rate',
              header: 'Tax Rate',
            },
            {
              accessor: 'tax_group',
              header: 'Tax Group',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getTax}
      />
      <CreateTax />
      <DetailTax />
      <EditTax />
    </>
  );
};

export default Tax;
