import React from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withFormikDevtools } from 'formik-devtools-extension';
import { useFilePreview } from '../hooks';


const AddForm = (formikProps) => {
    withFormikDevtools(formikProps);
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        handleSubmit,
    } = formikProps;

    const fileInputRef = React.createRef();
    const filePreviewSrc = useFilePreview(values.profileImage);

    const handleFileUpload = async (event) => {
        const file = event.currentTarget.files[0];
        setFieldTouched("profileImage", true);
        setFieldValue("profileImage", file);
    };



    return (
        <div id="addFormContainer">

            <div id="addForm">
                <div>
                    <label htmlFor="name">Name:</label>
                    <Field type="text" id="name" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                    {touched.name && errors.name && (
                        <ErrorMessage name="name" component="div" />
                    )}
                </div>

                <div>
                    <label htmlFor="longDescription">Long Description:</label>
                    <Field as="textarea" id="longDescription" name="longDescription" onChange={handleChange} onBlur={handleBlur} value={values.longDescription} />
                    {touched.longDescription && errors.longDescription && (
                        <ErrorMessage name="longDescription" component="div" />
                    )}
                </div>

                <div>
                    <label htmlFor="birthdate">Birthdate:</label>
                    <Field type="date" id="birthdate" name="birthdate" onChange={handleChange} onBlur={handleBlur} value={values.birthdate} />
                    {touched.birthdate && errors.birthdate && (
                        <ErrorMessage name="birthdate" component="div" />
                    )}
                </div>
            </div>
            <div>
                <label
                    htmlFor="profileImage"
                    id="profileImageLabel"
                    style={{
                        backgroundImage: `url(${filePreviewSrc || ""})`,
                    }}
                >Profile Image:</label>
                <input ref={fileInputRef} type="file" id="profileImage"
                    name="profileImage" onChange={handleFileUpload} />
                {touched.profileImage && errors.profileImage && (
                    <ErrorMessage name="profileImage" component="div" />
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}>
                Add
            </button>
        </div>
    );
}
export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        longDescription: '',
        birthdate: '',
        profileImage: null,
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        longDescription: Yup.string().required('Long description is required'),
        birthdate: Yup.date().required('Birthdate is required'),
        profileImage: Yup.mixed().required('Profile image is required'),
    }),
    handleSubmit: (values, {setSubmitting,props}) => {
        props.addFamilyMember(values);

        setSubmitting(false);
    },
})(AddForm);

