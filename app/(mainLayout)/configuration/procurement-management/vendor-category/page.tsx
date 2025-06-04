'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getVendorCategory } from '@services/fetcher/configuration/procurement-management';
import { GET_VENDOR_CATEGORY } from '@constants/queryKey';
import dynamic from '@node_modules/next/dynamic';

const FilterVendorCategory = dynamic(
  () => import('@components/shared/Drawer/Filter/VendorCategoryFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateVendorCategory = dynamic(
  () =>
    import(
      '@components/module/Configuration/ProcurementManagement/VendorCategory/Create'
    ),
  { ssr: false }
);
const DetailVendorCategory = dynamic(
  () =>
    import(
      '@components/module/Configuration/ProcurementManagement/VendorCategory/Detail'
    ),
  { ssr: false }
);
const EditVendorCategory = dynamic(
  () =>
    import(
      '@components/module/Configuration/ProcurementManagement/VendorCategory/Edit'
    ),
  { ssr: false }
);

const VendorCategory = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterVendorCategory');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Vendor Category" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="images/api-empty-state.png"
              alt="Empty State"
              width={200}
              height={200}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Vendor Category
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
      <FilterVendorCategory />
      <TableDrawer
        title="Find Vendor Category"
        queryKey={GET_VENDOR_CATEGORY}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'vendor_category_code',
              header: 'Vendor Category Code',
            },
            {
              accessor: 'vendor_category_name',
              header: 'Vendor Category Name',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getVendorCategory}
      />
      <CreateVendorCategory />
      <DetailVendorCategory />
      <EditVendorCategory />
    </>
  );
};

export default VendorCategory;
