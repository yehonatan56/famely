import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(5, 'Too Short!')
    .max(200, 'Too Long!')
    });