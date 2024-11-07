// stores/useFormStore.ts
import { create } from 'zustand';

type FormState = {
  leavingPage: boolean; // State untuk konfirmasi navigasi
  isDirty: boolean; // State untuk mengecek apakah formulir mengalami perubahan
};

type FormActions = {
  setLeavingPage: (status: boolean) => void; // Action untuk konfirmasi navigasi
  setIsDirty: (status: boolean) => void; // Action untuk mengubah status isDirty
};

type FormStore = FormState & FormActions;

const initialValues: FormState = {
  leavingPage: false, // Inisialisasi state leavingPage
  isDirty: false, // Inisialisasi state isDirty
};

const useFormStore = create<FormStore>((set) => ({
  ...initialValues,
  setLeavingPage: (status) => set({ leavingPage: status }), // Implementasi action leavingPage
  setIsDirty: (status) => set({ isDirty: status }), // Implementasi action isDirty
}));

export default useFormStore;
