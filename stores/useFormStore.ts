// stores/useFormStore.ts
import { create } from 'zustand';

type FormState = {
  leavingPage: boolean;
  isDirty: boolean;
  isReset: boolean;
};

type FormActions = {
  setLeavingPage: (status: boolean) => void;
  setIsDirty: (status: boolean) => void;
  setReset: (status: boolean) => void;
  resetForm: () => void; // Fungsi isReset untuk form
};

type FormStore = FormState & FormActions;

const initialValues: FormState = {
  leavingPage: false,
  isDirty: false,
  isReset: false,
};

const useFormStore = create<FormStore>((set) => ({
  ...initialValues,
  setLeavingPage: (status) => set({ leavingPage: status }),
  setIsDirty: (status) => set({ isDirty: status }),
  setReset: (status) => set({ isReset: status }),
  resetForm: () => set({ isReset: true, isDirty: false }), // Reset form
}));

export default useFormStore;
