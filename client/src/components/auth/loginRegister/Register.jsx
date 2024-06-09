import React, { useState } from "react";
import { withFormikDevtools } from "formik-devtools-extension";
import { writeToStore } from "../../../logic/store";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../../requests/auth.proxy";
import validationSchema from "./Login.validation";
import { Formik } from "formik";
import "./auth.css";

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event, { name, password }) => {
    event?.preventDefault();

    const user = await registerUser({ name, password });
    if (!user) {
      throw Error("user not registered");
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
            .catch((error) => {
              console.error(error);
              setErrorMessage("Failed to register. Please try again later.");
            })
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
              <div className="header-from">
                <h2>Register</h2>
                <Link to="/login">login</Link>
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
