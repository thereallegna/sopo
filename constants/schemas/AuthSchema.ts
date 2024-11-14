import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  companyId: Yup.string(),
  user_code: Yup.string().required('Usercode is required'),
  password: Yup.string().required('Password is required'),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

export const resetPasswordSchema = Yup.object().shape({
  new_password: Yup.string().required('New Password is required'),
  confirm_password: Yup.string().required('Confirm Password is required'),
});

export default { loginSchema, forgotPasswordSchema, resetPasswordSchema };
