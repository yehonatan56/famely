import React, { useState } from "react";
import { withFormikDevtools } from "formik-devtools-extension";
import { useNavigate, Link } from "react-router-dom";
import { registerUserRequest } from "../../../requests/auth.proxy";
import validationSchema from "./Login.validation";
import { Formik } from "formik";
import "./auth.css";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../../store/slices/user.slice";

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event, { name, password }) => {
    // todo: move to user.logic
    event?.preventDefault();

    const user = await registerUserRequest({ name, password });
    if (!user) {
      throw Error("user not registered");
    }

    dispatch(setUserAction({ user })); // Pass the user object
    navigate("/login");
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
              <div className="header-form">
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
