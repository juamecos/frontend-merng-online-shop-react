import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import './ChangePassword.scss';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../../graphql/mutation/password';
import { basicAlert } from '../../../shared/alerts/toast';
import { TYPE_ALERT } from '../../../shared/alerts/values.config';

const initialValue = () => {
  return {
    password: '',
    passwordTwo: '',
  };
};

const ChangePassword = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [changePassword, { data }] = useMutation(CHANGE_PASSWORD);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          'Must have at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'
        ),
      passwordTwo: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Repeat password is required')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          'Must have at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'
        ),
    }),
    onSubmit: async formData => {
      try {
        console.log('Change Password');
        changePassword({
          variables: {
            id: user.id,
            password: formData.password,
          },
          context: {
            headers: {
              Authorization: token ? `${token}` : '',
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      const { status, message } = data.changePassword;
      if (status) {
        setIsPasswordChanged(true);
        basicAlert(TYPE_ALERT.SUCCESS, message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, message);
    }
  }, [data]);

  let { token } = useParams();
  const user = JSON.parse(atob(token.split('.')[1])).user;
  return (
    <>
      {!isPasswordChanged ? (
        <div>
          <div class="container">
            <div class="row">
              <div class="col-lg"></div>
              <div class="col-lg-6">
                <form onSubmit={formik.handleSubmit}>
                  <h1>Change password</h1>
                  <p>Insert a password and verify to change it</p>

                  <label htmlFor="password">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                    {...formik.getFieldProps('password')}
                  />
                  {/* pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" */}
                  <div className="alert-danger">
                    {formik.errors.password &&
                      formik.touched.password &&
                      formik.errors.password}
                  </div>
                  <label htmlFor="password">
                    <b>Repeat password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    name="passwordTwo"
                    required
                    value={formik.values.passwordTwo}
                    onChange={formik.handleChange}
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                    {...formik.getFieldProps('passwordTwo')}
                  />
                  {/* pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" */}
                  <div className="alert-danger">
                    {formik.errors.passwordTwo &&
                      formik.touched.passwordTwo &&
                      formik.errors.passwordTwo}
                  </div>
                  <div className="row">
                    <div className="col-lg">
                      <button type="submit" className="signup-btn">
                        Change password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-lg"></div>
            </div>
          </div>
        </div>
      ) : (
        Redirect('/login')
      )}
    </>
  );
};

export default ChangePassword;
