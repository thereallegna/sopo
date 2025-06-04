'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getTaxGroup } from '@services/fetcher/configuration/financial-management';
import { GET_TAX_GROUP } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterTaxGroup = dynamic(
  () => import('@components/shared/Drawer/Filter/TaxGroupFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateTaxGroup = dynamic(
  () =>
    import(
      '@components/module/Configuration/FinancialManagement/TaxGroup/Create'
    ),
  { ssr: false }
);
const DetailTaxGroup = dynamic(
  () =>
    import(
      '@components/module/Configuration/FinancialManagement/TaxGroup/Detail'
    ),
  { ssr: false }
);
const EditTaxGroup = dynamic(
  () =>
    import(
      '@components/module/Configuration/FinancialManagement/TaxGroup/Edit'
    ),
  { ssr: false }
);

const TaxGroup = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterTaxGroup');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Tax Group" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="Empty State"
              width={200}
              height={200}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Tax Group
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
      <FilterTaxGroup />
      <TableDrawer
        title="Find Tax Group"
        queryKey={GET_TAX_GROUP}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'tax_group_code',
              header: 'Tax Group Code',
            },
            {
              accessor: 'tax_group_name',
              header: 'Tax Group Name',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getTaxGroup}
      />
      <CreateTaxGroup />
      <DetailTaxGroup />
      <EditTaxGroup />
    </>
  );
};

export default TaxGroup;
