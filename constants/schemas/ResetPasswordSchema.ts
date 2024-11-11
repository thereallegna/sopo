import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  new_password: Yup.string().required('New Password is required'),
  confirm_password: Yup.string().required('Confirm Password is required'),
});

export default resetPasswordSchema;
