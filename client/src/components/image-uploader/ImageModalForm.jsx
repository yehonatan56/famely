import React from "react";
import { withFormikDevtools } from "formik-devtools-extension";
import { withFormik, Field, ErrorMessage } from "formik";
import { FormSchema } from "./schema";
import { useFilePreview } from "../hooks";
import { uploadImageFile } from "../../logic/images.logic";

const ImageModalFormik = (formikProps) => {
  withFormikDevtools(formikProps);
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    handleSubmit,
  } = formikProps;

  const fileInputRef = React.createRef();
  const filePreviewSrc = useFilePreview(values.file);

  const handleFileUpload = async (event) => {
    const file = event.currentTarget.files[0];
    setFieldTouched("file", true);
    setFieldValue("file", file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
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

      <div>
        {filePreviewSrc && (
          <img
            src={filePreviewSrc}
            alt="image-preview"
            style={{ maxHeight: "350px" }}
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
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
    props
      .onSubmit(values)
      .then(() => {
      
     })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });

    // if (data) {
        // }
  },
})(ImageModalFormik);
