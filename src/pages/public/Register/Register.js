import React, { useState } from "react";
import Calendar from "../../../shared/Calendar";
import subYears from "date-fns/subYears";
import { parse, format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./Register.scss";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../graphql/mutation/user";
import { useEffect } from "react";
import { basicAlert } from "../../../shared/alerts/toast";
import { TYPE_ALERT } from "../../../shared/alerts/values.config";
import { Redirect } from "react-router-dom";

const CURRENTDAY = new Date();
const MINDAY = format(subYears(CURRENTDAY, 100), "yyyy-MM-dd");
const MAXDAY = format(subYears(CURRENTDAY, 18), "yyyy-MM-dd");

const Register = () => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    email: "",
    password: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const [register, { data }] = useMutation(REGISTER, {
    variables: { user: values },
  });
  // TODO change patern in password for production
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      birthday: Yup.string().required("Birthdate is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required")
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          "Incorrect format, it should be mail@mail.com"
        ),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Must haveat least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters"
        ),
    }),
    onSubmit: formData => {
      try {
        console.log(formData);
        setValues(formData);
        register(formData);
        // formik.resetForm();
      } catch (error) {
        setError(error);
        // formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (data) {
      // Check if token exists
      const { status, message, user } = data.register;
      if (status) {
        if (user !== null) {
          setIsRegistered(true);
          basicAlert(TYPE_ALERT.SUCCESS, message);
        }
        basicAlert(TYPE_ALERT.WARNING, message);
      }
      basicAlert(TYPE_ALERT.INFO, message);
    }
  }, [data]);

  const { name, lastname, birthday, email, password } = formik.values;
  return (
    <>
      {!isRegistered ? (
        <div className="container">
          <div className="row">
            <div className="col-lg"></div>
            <div className="col-lg-6">
              <form onSubmit={formik.handleSubmit}>
                <h1>Signup</h1>
                <p>
                  Fill in the data in the form to register your user account.
                </p>
                <hr />
                <label htmlFor="firstname">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  required
                  value={name}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("name")}
                />
                <div className="alert-danger">
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </div>
                <label htmlFor="lastname">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastname"
                  required
                  value={lastname}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("lastname")}
                />
                <div className="alert-danger">
                  {formik.errors.lastname &&
                    formik.touched.lastname &&
                    formik.errors.lastname}
                </div>
                <label htmlFor="birthday">
                  <b>Birthday</b>
                </label>
                <input
                  type="date"
                  placeholder="Enter your birthday"
                  name="birthday"
                  required
                  value={birthday}
                  onChange={formik.handleChange}
                  min={MINDAY}
                  max={MAXDAY}
                  {...formik.getFieldProps("birthday")}
                />
                <div className="alert-danger">
                  {formik.errors.birthday &&
                    formik.touched.birthday &&
                    formik.errors.birthday}
                </div>
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  required
                  value={email}
                  onChange={formik.handleChange}
                  pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
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
                  placeholder="Enter Password"
                  name="password"
                  required
                  value={password}
                  onChange={formik.handleChange}
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                  {...formik.getFieldProps("password")}
                />
                {/* pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" */}
                <div className="alert-danger">
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </div>
                <p>
                  By creating an account you agree to our
                  <a href="#">Terms and Privacy</a>.
                </p>
                <p>
                  Already have an account?
                  <a>Login</a>.
                </p>
                <div className="row">
                  <div className="col-lg">
                    <button type="submit" className="signup-btn">
                      Signup
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg"></div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Register;

const initialValue = () => {
  return {
    name: "",
    lastname: "",
    birthday: "",
    email: "",
    password: "",
  };
};
