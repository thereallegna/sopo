// useSidebarStore.ts
import { create } from 'zustand';

type SidebarState = {
  activePathId: string;
  isOpen: boolean;
  openDropdowns: Record<string, boolean>;
  searchQuery: string; // Menyimpan query pencarian
  setSearchQuery: (query: string) => void; // Fungsi untuk mengubah searchQuery
  setActivePath: (path: string) => void;
  toggleDropdown: (path: string) => void;
  toggleSidebar: (forceClose?: boolean) => void;
};

const initialSidebarState = {
  activePathId: '',
  isOpen: true,
  openDropdowns: {},
  searchQuery: '', // Default kosong
};

export const useSidebarStore = create<SidebarState>((set, get) => ({
  ...initialSidebarState,

  setActivePath: (path: string) => set({ activePathId: path }),

  toggleDropdown: (path: string) =>
    set((state) => ({
      openDropdowns: {
        ...state.openDropdowns,
        [path]: !state.openDropdowns[path],
      },
    })),

  toggleSidebar: (forceClose = false) =>
    set({ isOpen: forceClose ? false : !get().isOpen }),

  setSearchQuery: (query: string) => set({ searchQuery: query }), // Fungsi baru
}));
