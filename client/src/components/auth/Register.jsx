import React, { useState } from 'react';
import { withFormikDevtools } from "formik-devtools-extension";
import { writeToStore } from '../../logic/store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../requests/auth.proxy';
import validationSchema from './Login.validation';

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();
  const handleSubmit = async (event, { name, password }) => {
    event?.preventDefault();    
      const user = await registerUser({ name, password });

      if (!user) {
        setErrorMessage("Invalid username or password.");
        return;
      }
  
      writeToStore("user", user);
      navigate("/welcome");
  }


  return (
    <div className="form-container">
    <Formik
      initialValues={{ name: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        return handleSubmit(null, values)
          .catch((error) =>
            setErrorMessage("Failed to register. Please try again later.")
          )
          .finally(() => setSubmitting(false));
      }}
    >
      {(formikProps) => {
        withFormikDevtools(formikProps);

        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        } = formikProps;

        return (
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </div>
            {errors.name && touched.name && (
              <p className="error">{errors.name}</p>
            )}

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}

            {errorMessage && <p className="error">{errorMessage}</p>}
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </form>
        );
      }}
    </Formik>
  </div>

  );
}

export default RegisterForm;
