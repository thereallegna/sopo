// stores/useFormStore.ts
import { create } from 'zustand';

type FormState = {
  leavingPage: boolean;
  isReset: boolean;

  changeStatus: boolean;
};

type FormActions = {
  setLeavingPage: (status: boolean) => void;
  setReset: (status: boolean) => void;
  resetForm: () => void; // Fungsi isReset untuk form
  setChangeStatus: (data: boolean) => void;
};

type FormStore = FormState & FormActions;

const initialValues: FormState = {
  changeStatus: false,

  leavingPage: false,
  isReset: false,
};

const useFormStore = create<FormStore>((set) => ({
  ...initialValues,
  setChangeStatus: (data) => set({ changeStatus: data }),

  setLeavingPage: (status) => set({ leavingPage: status }),
  setReset: (status) => set({ isReset: status }),
  resetForm: () => set({ isReset: true }), // Reset form
}));

export default useFormStore;
