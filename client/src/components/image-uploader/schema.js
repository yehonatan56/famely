import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(5, 'Too Short!')
    .max(200, 'Too Long!'),
  image: Yup.mixed().required('required')
    .test('fileFormat', 'Only PDF files are allowed', value => {
      if (value) {
        const supportedFormats = ['jpg', 'png'];
        return supportedFormats.includes(value.split('.').pop());
      }
      return true;
    })
    .test('fileSize', 'File size must not be more than 3MB',
      value => {
        if (value) {
          return value.size <= 3145728;
        }
        return true;
      }),

      
});