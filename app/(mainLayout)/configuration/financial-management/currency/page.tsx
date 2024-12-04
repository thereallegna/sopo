'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getCurrency } from '@services/fetcher/configuration/financial-management';
import { GET_CURRENCY } from '@constants/queryKey';
import dynamic from 'next/dynamic';

// Dynamically import Drawer components
const FilterCurrency = dynamic(
  () => import('@components/shared/Drawer/Filter/CurrencyFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateCurrency = dynamic(
  () =>
    import(
      '@components/module/Configuration/FinancialManagement/Currency/Create'
    ),
  { ssr: false }
);
const DetailCurrency = dynamic(
  () =>
    import(
      '@components/module/Configuration/FinancialManagement/Currency/Detail'
    ),
  { ssr: false }
);
const EditCurrency = dynamic(
  () =>
    import(
      '@components/module/Configuration/FinancialManagement/Currency/Edit'
    ),
  { ssr: false }
);

const Currency = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterCurrency');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Currency" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Currency
            </p>
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
      <FilterCurrency />
      <TableDrawer
        title="Find Currency"
        queryKey={GET_CURRENCY}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'currency_code',
              header: 'Currency Code',
            },
            {
              accessor: 'currency_name',
              header: 'Currency Name',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getCurrency}
      />
      <CreateCurrency />
      <DetailCurrency />
      <EditCurrency />
    </>
  );
};

export default Currency;
