// stores/useFormStore.ts
import { ToastTheme } from '@components/ui/Toast';
import { create } from 'zustand';

type ToastState = {
  show: boolean;
  title: string;
  theme: ToastTheme;
};

type ToastAction = {
  showToast: (title: string, theme: ToastTheme) => void;
  setToast: (val: boolean) => void;
};

const initialValues: ToastState = {
  show: false,
  title: '',
  theme: 'success', // Set a default theme if needed
};

const useToastStore = create<ToastState & ToastAction>((set) => ({
  ...initialValues,
  showToast: (title, theme) => set({ show: true, title, theme }),
  setToast: (val: boolean) => set({ show: val }),
}));

export default useToastStore;
