import React from "react";
import { withFormikDevtools } from "formik-devtools-extension";
import { withFormik, Field, ErrorMessage } from "formik";
import { FormSchema } from "./schema";
import { useFilePreview } from "../hooks";
import { useSelector } from "react-redux";
import { getUserMembersSelector } from "../../store/selectors/user.selector";
const ImageModalFormik = (formikProps) => {
  withFormikDevtools(formikProps);
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    handleSubmit,
  } = formikProps;
  const members = useSelector(getUserMembersSelector);
  const membersOptions = members.map((member) => ({ value: member.name, label: member.name }));
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
        {membersOptions.map((option) => (
          <label key={option.value}>
            <Field
              type="checkbox"
              name="members"
              value={option.value}
            />
            {option.label}
          </label>
        ))}
      </div>
      <input
        type="file"
        name="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      {touched.file && errors.file && (
        <ErrorMessage name="file" component="div" />
      )}

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
      .then(() => { })
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
