import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../../graphql/query/user";
import { basicAlert } from "../../../shared/alerts/toast";
import { TYPE_ALERT } from "../../../shared/alerts/values.config";
import { setToken, start } from "../../../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/authActions";

import "./Login.scss";

const Login = () => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // useLazyQueries

  const [
    getLogin,
    {
      called: calledLoginQuery,
      data: dataLoginQuery,
      error: errorLoginQuery,
      loading: loadingLoginQuery,
    },
  ] = useLazyQuery(LOGIN_QUERY, { variables: values });

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async formData => {
      try {
        setValues(formData);
        getLogin(formData);
        formik.resetForm();
      } catch (error) {
        setError(error);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (dataLoginQuery) {
      // Check if token exists
      const { status, message, token } = dataLoginQuery.login;

      if (status) {
        if (token) {
          setToken(token);
          const user = start();
          dispatch(login(user));

          basicAlert(TYPE_ALERT.SUCCESS, message);

          return;
        }
        basicAlert(TYPE_ALERT.WARNING, message);
      }
      basicAlert(TYPE_ALERT.INFO, message);
    }
  }, [dataLoginQuery]);

  if (calledLoginQuery && loadingLoginQuery) console.log("loading ...");

  if (errorLoginQuery) console.log(`Error: ${errorLoginQuery}`);

  const { email, password } = formik.values;
  return (
    <>
      {!auth.authenticated ? (
        <div className="container">
          <div className="row">
            <div className="col-lg"></div>
            <div className="col-lg-6">
              <form onSubmit={formik.handleSubmit}>
                <h1>Login</h1>
                <p>Enter your credentials for login</p>
                <p className="psw">
                  Don't you have an account yet? Register
                  <a href="#"> here</a> for free.
                </p>
                <hr />
                <label htmlFor="email">
                  <b>Enter e-mail</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  required
                  value={email}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("email")}
                />
                <div className="alert-danger">
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </div>

                <label htmlFor="password">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  required
                  value={password} // to make reset
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("password")}
                />
                <div className="alert-danger">
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </div>

                <div className="row">
                  <div className="col-lg">
                    <button type="submit" className="signup-btn">
                      Login
                    </button>
                  </div>
                </div>
                <div className="more-options">
                  <p className="psw">
                    Did you forget your <Link to="#">password?</Link>{" "}
                    {/* /forgot */}
                  </p>
                </div>
                {error && <div className="alert-danger">{error}</div>}
              </form>
            </div>
            <div className="col-lg"></div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Login;

const initialValue = () => {
  return {
    email: "",
    password: "",
  };
};
