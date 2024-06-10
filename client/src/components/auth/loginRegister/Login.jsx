import React, { useState } from "react";
import { Formik } from "formik";
import { withFormikDevtools } from "formik-devtools-extension";
import { Link, useNavigate } from "react-router-dom";
import validationSchema from "./Login.validation";
import { writeToStore } from "../../../logic/store";
import { loginUser } from "../../../requests/auth.proxy";
import './auth.css'
function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event, { name, password }) => {
    event?.preventDefault();
    const user = await loginUser({ name, password });

    if (!user._id) {
      setErrorMessage("Invalid username or password.");
      return;
    }
    writeToStore("user", user);
    navigate("/welcome");
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          return handleSubmit(null, values)
            .catch((error) =>
              setErrorMessage("Failed to login. Please try again later.")
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
              {/* todo: add register link */}
              <div className="header-form">
              <h2>Login</h2>
              <Link to="/register">Register</Link>
              </div>

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
                Login
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
