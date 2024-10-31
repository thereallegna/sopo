import { create } from 'zustand';

type FormState = {
  changeStatus: boolean;
  isAlertOpen: boolean;
};

type FormActions = {
  setChangeStatus: (status: boolean) => void;
  setIsAlertOpen: (status: boolean) => void;
};

type FormStore = FormState & FormActions;

const initialValues: FormState = {
  changeStatus: false,
  isAlertOpen: false,
};

const useFormStore = create<FormStore>((set) => ({
  ...initialValues,
  setChangeStatus: (data) => set({ changeStatus: data }),
  setIsAlertOpen: (data) => set({ isAlertOpen: data }),
}));

export default useFormStore;
