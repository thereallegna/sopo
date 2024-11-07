import { TableDrawerProps } from '@components/shared/Drawer/Table/TableCountryDrawer';
import { useDrawerStore } from '@stores/useDrawerStore';
import { useEffect } from 'react';

const useSetTableState = (setting: TableDrawerProps) => {
  const setTable = useDrawerStore((state) => state.setTableDrawer);
  useEffect(() => {
    setTable(setting);
  }, []);
};

export default useSetTableState;
