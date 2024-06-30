import React, { useState } from "react";
import { Formik } from "formik";
import { withFormikDevtools } from "formik-devtools-extension";
import { Link, useNavigate } from "react-router-dom";
import validationSchema from "./Login.validation";
import { loginUser } from "../../../logic/user.logic";
import "./auth.css";

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    loginUser({ name: values.name, password: values.password })
      .then((user) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error + "\nFailed to login. Please try again later.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{ name: "abb", password: "11001100" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
          } = formikProps;

          return (
            <form onSubmit={handleSubmit}>
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
