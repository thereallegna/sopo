import { TableDrawerProps } from '@components/shared/Drawer/Table/TableCountryDrawer';
import { FilterDrawerType, useDrawerStore } from '@stores/useDrawerStore';
import { useEffect } from 'react';

const useSetTableState = (
  tableSetting: TableDrawerProps,
  filterKey: FilterDrawerType
) => {
  const {
    openFilterDrawer,
    openTableDrawer,
    closeFilterDrawer,
    setTableDrawer,
  } = useDrawerStore();
  useEffect(() => {
    setTableDrawer(tableSetting);
  }, []);

  const handleOpenFilter = () => {
    openFilterDrawer(filterKey);
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return {
    handleOpenFilter,
    handleOpenTable,
    closeFilterDrawer,
  };
};

export default useSetTableState;
