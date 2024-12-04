import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

type FormType<T> = {
  detail_data?: T;
  errors?: FieldErrors<T>;
  disableAll?: boolean;
  watch: UseFormWatch<T>;
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  setError?: UseFormSetError<T>;
  handleInputKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
