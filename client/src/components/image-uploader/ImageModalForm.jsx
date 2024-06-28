import React from "react";
import { withFormik, Field, ErrorMessage } from "formik";
import { FormSchema } from "./schema";
import { useFilePreview } from "../../hooks";
import { uploadImageFile } from "../../logic/images.logic";

const ImageModalFormik = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  setSubmitting,
  isSubmitting,
  handleSubmit
}) => {
  const fileInputRef = React.createRef();
  const filePreviewSrc = useFilePreview(values.file);

  const handleFileUpload = async (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue("file", file);

  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div>

        {filePreviewSrc && <img src={filePreviewSrc} alt="image-preview" />}
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <Field
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="name" component="div" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Field
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="description" component="div" />
      </div>
      <input
        type="file"
        name="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <button type="submit" disabled={isSubmitting} onClick={() => setSubmitting(true)}>
        Submit
      </button>
    </>
  );
};

export default withFormik({
  validationSchema: FormSchema,
  mapPropsToValues: (props) => ({
    name: props.name ?? "",
    description: props.description ?? "",
    file: props.file ?? null,
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    console.log('485');
    const { file, ...formData } = values;

    const data = await uploadImageFile(file)
      .then(() => {
        props.closePopup?.();
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });

    if (data) {
      props.addImage({
        url: data.url,
        name: data.name,
        description: data.description,
        width: 100,
        height: 100,
        top: 50,
        left: 50,
      });
    }
  },
})(ImageModalFormik);
