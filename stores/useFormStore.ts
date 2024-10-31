import { create } from 'zustand';

type FormState = {
  changeStatus: boolean;
};

type FormActions = {
  setChangeStatus: (status: boolean) => void;
};

type FormStore = FormState & FormActions;

const initialValues: FormState = {
  changeStatus: false,
};

const useFormStore = create<FormStore>((set) => ({
  ...initialValues,
  setChangeStatus: (data) => set({ changeStatus: data }),
}));

export default useFormStore;
