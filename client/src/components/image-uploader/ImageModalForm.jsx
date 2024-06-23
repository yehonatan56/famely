import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormSchema } from './schema';
import { useImagesManagement } from './hooks/useImagesManagement';

const ImageModalForm = ({ closePopup , url }) => {
  const { addImage } = useImagesManagement();
  const uploadImage = ({ name, description }, { setSubmitting }) => {
    setTimeout(() => {
      closePopup();
      addImage({
        url,
        name,
        description,
        width: 100,
        height: 100,
        top: 50,
        left: 50,
      })
      setSubmitting(false);
    }, 400);

  }
  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      validationSchema={FormSchema}
      onSubmit={uploadImage}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ImageModalForm;
