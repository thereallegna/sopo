'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getVendor } from '@services/fetcher/configuration/procurement-management';
import { GET_VENDOR } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterVendor = dynamic(
  () => import('@components/shared/Drawer/Filter/VendorFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateVendor = dynamic(
  () =>
    import(
      '@components/module/Configuration/ProcurementManagement/Vendor/Create'
    ),
  { ssr: false }
);
const DetailVendor = dynamic(
  () =>
    import(
      '@components/module/Configuration/ProcurementManagement/Vendor/Detail'
    ),
  { ssr: false }
);
const EditVendor = dynamic(
  () =>
    import(
      '@components/module/Configuration/ProcurementManagement/Vendor/Edit'
    ),
  { ssr: false }
);

const Vendor = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterVendor');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Vendor" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="Empty State"
              width={200}
              height={200}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Vendor
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
      <FilterVendor />
      <TableDrawer
        title="Find Vendor"
        queryKey={GET_VENDOR}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'vendor_code',
              header: 'Vendor Code',
            },
            {
              accessor: 'vendor_name',
              header: 'Vendor Name',
            },
            {
              accessor: 'vendor_category',
              header: 'Vendor Category',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getVendor}
      />
      <CreateVendor />
      <DetailVendor />
      <EditVendor />
    </>
  );
};

export default Vendor;
