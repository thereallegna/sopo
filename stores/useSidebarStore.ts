import { create } from 'zustand';

type SidebarState = {
  activePathId: string;
  isOpen: boolean;
  openDropdowns: Record<string, boolean>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActivePath: (path: string) => void;
  toggleDropdown: (path: string) => void;
  toggleSidebar: (forceClose?: boolean) => void;
};

const initialSidebarState = {
  activePathId: '',
  isOpen: true,
  openDropdowns: {},
  searchQuery: '',
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

  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
