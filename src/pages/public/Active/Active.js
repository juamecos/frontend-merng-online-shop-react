import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import subYears from 'date-fns/subYears';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Active.scss';
import { useParams } from 'react-router-dom';

import { useMutation } from '@apollo/client';

import { ACTIVE_USER } from '../../../graphql/mutation/user';
import { basicAlert } from '../../../shared/alerts/toast';
import { TYPE_ALERT } from '../../../shared/alerts/values.config';

const CURRENTDAY = new Date();
const MINDAY = format(subYears(CURRENTDAY, 100), 'yyyy-MM-dd');
const MAXDAY = format(subYears(CURRENTDAY, 18), 'yyyy-MM-dd');

function Active() {
  const [isActivated, setIsActivated] = useState(false);

  const [activateUser, { data }] = useMutation(ACTIVE_USER);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      birthday: Yup.string().required('Birthdate is required'),

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
        const { password, birthday } = formData;
        await activateUser({
          variables: {
            id: user.id,
            birthday,
            password,
          },
          context: {
            headers: {
              Authorization: token ? `${token}` : '',
            },
          },
        });

        // formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { birthday, password, passwordTwo } = formik.values;

  let { token } = useParams();
  const user = JSON.parse(atob(token.split('.')[1])).user;

  useEffect(() => {
    if (data) {
      const { status, message } = data.activeUserAction;
      if (status) {
        setIsActivated(true);
        basicAlert(TYPE_ALERT.SUCCESS, message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, message);
      return;
    }
  }, [data]);

  return (
    <>
      {!isActivated ? (
        <div class="container">
          <div class="row">
            <div class="col-lg"></div>
            <div class="col-lg-6">
              <form onSubmit={formik.handleSubmit}>
                <h1>Activate user</h1>
                <p>
                  Select your birthdate. Insert a password and verify it before
                </p>
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
                  {...formik.getFieldProps('birthday')}
                />
                <div className="alert-danger">
                  {formik.errors.birthday &&
                    formik.touched.birthday &&
                    formik.errors.birthday}
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
                  value={passwordTwo}
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
                      Activate User
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg"></div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

const initialValue = () => {
  return {
    birthday: '',
    password: '',
    passwordTwo: '',
  };
};

export default Active;
