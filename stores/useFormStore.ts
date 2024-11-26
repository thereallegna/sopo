// stores/useFormStore.ts
import { create } from 'zustand';

type FormState = {
  leavingPage: boolean;
  isReset: boolean;
  coa_form: string | null;
  changeStatus: boolean;
};

type FormActions = {
  setLeavingPage: (status: boolean) => void;
  setReset: (status: boolean) => void;
  resetForm: () => void; // Fungsi isReset untuk form
  setChangeStatus: (data: boolean) => void;
  setCoaForm: (val: string) => void;
};

type FormStore = FormState & FormActions;

const initialValues: FormState = {
  changeStatus: false,
  coa_form: null,
  leavingPage: false,
  isReset: false,
};

const useFormStore = create<FormStore>((set) => ({
  ...initialValues,
  setChangeStatus: (data) => set({ changeStatus: data }),

  setLeavingPage: (status) => set({ leavingPage: status }),
  setReset: (status) => set({ isReset: status }),
  resetForm: () => set({ isReset: true }),
  setCoaForm: (val: string) => set({ coa_form: val }),
}));

export default useFormStore;
