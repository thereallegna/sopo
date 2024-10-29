import { create } from 'zustand';

type DrawerType = 'CREATE_COUNTRY' | 'EDIT_COUNTRY' | 'DELETE_COUNTRY' | null;

type DrawerState = {
  drawerType: DrawerType;
  isOpen: boolean;
  initialValues: Record<string, any> | null;
  openDrawer: (type: DrawerType, values?: Record<string, any>) => void;
  closeDrawer: () => void;
};

const initialDrawerState = {
  drawerType: null,
  isOpen: false,
  initialValues: null,
};

export const useDrawerStore = create<DrawerState>((set) => ({
  ...initialDrawerState,

  openDrawer: (type, values = undefined) =>
    set({ drawerType: type, isOpen: true, initialValues: values }),

  closeDrawer: () =>
    set({ drawerType: null, isOpen: false, initialValues: null }),
}));
