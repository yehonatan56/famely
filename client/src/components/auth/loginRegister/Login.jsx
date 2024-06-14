import React, { useState } from "react";
import { Formik } from "formik";
import { withFormikDevtools } from "formik-devtools-extension";
import { Link, useNavigate } from "react-router-dom";
import validationSchema from "./Login.validation";
import { loginUser } from "../../../requests/auth.proxy";
import './auth.css';
import { useDispatch } from "react-redux";
import { pushUser } from "../../../store/userSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    // check on meeting
    const { name, password } = values;
    try {
      const user = await loginUser({ name, password });

      if (!user._id) {
        setErrorMessage("Invalid username or password.");
        return;
      }
      dispatch(pushUser({ user })); // Pass the user object
      navigate("/welcome");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to login. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{ name: "", password: "" }}
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
