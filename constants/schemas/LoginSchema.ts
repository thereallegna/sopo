import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  companyId: Yup.string(),
  usercode: Yup.string().required('Usercode is required'),
  password: Yup.string().required('Password is required'),
});

export default loginSchema;
