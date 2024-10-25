import { create } from 'zustand';

type SidebarState = {
  activePathId: string;
  isOpen: boolean;
  openDropdowns: Record<string, boolean>; // Menyimpan status dropdown untuk setiap item
  setActivePath: (path: string) => void;
  toggleDropdown: (path: string) => void; // Menambahkan parameter untuk path
  toggleSidebar: (forceClose?: boolean) => void;
};

const initialSidebarState = {
  activePathId: '',
  isOpen: true,
  openDropdowns: {},
};

export const useSidebarStore = create<SidebarState>((set, get) => ({
  ...initialSidebarState,

  setActivePath: (path: string) => set({ activePathId: path }),

  toggleDropdown: (path: string) =>
    set((state) => ({
      openDropdowns: {
        ...state.openDropdowns,
        [path]: !state.openDropdowns[path], // Toggle status dropdown untuk item tertentu
      },
    })),

  toggleSidebar: (forceClose = false) =>
    set({ isOpen: forceClose ? false : !get().isOpen }),
}));
