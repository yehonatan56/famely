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
  isSubmitting,
}) => {
  const filePreviewSrc = useFilePreview(values.file);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    debugger;
    // todo: check how to save image file in formik props
    setFieldValue("file", file);
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
          onBlue={handleBlur}
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
          onBlue={handleBlur}
        />
        <ErrorMessage name="description" component="div" />
      </div>
      <input
        type="file"
        accept="image/*"
        value={values.file}
        onChange={handleFileUpload}
      />

      <button type="submit" disabled={isSubmitting}>
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
    const { file, ...formData } = values;

    const data = await uploadImageFile(file)
      .then(() => {
        // todo: send data to server of name & description image
      })
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
