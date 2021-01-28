import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './Forgot.scss';
import { RESET_PASSWORD } from '../../../graphql/mutation/password';
import { basicAlert } from '../../../shared/alerts/toast';
import { TYPE_ALERT } from '../../../shared/alerts/values.config';

const initialValue = () => {
  return {
    email: '',
  };
};
const Forgot = () => {
  const [values, setValues] = useState({
    email: '',
  });

  const [resetPassword, { data }] = useMutation(RESET_PASSWORD);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    }),
    onSubmit: async formData => {
      try {
        setValues(formData);
        await resetPassword({ variables: { email: formData.email } });
        // formik.resetForm();
      } catch (error) {
        // formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (data) {
      const { status, message } = data.resetPassword;
      if (status) {
        basicAlert(TYPE_ALERT.SUCCESS, message);
        formik.resetForm();
        return;
      }

      basicAlert(TYPE_ALERT.WARNING, message);
      return;
    }
  }, [data]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg"></div>
          <div className="col-lg-6">
            <form onSubmit={formik.handleSubmit}>
              <h1>Insert your email</h1>
              <p>
                We will send you a link to your email address to reset your
                password
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
                value={values.email}
                onChange={formik.handleChange}
                {...formik.getFieldProps('email')}
              />
              <div className="alert-danger">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </div>

              <div className="row">
                <div className="col-lg">
                  <button type="submit" className="signup-btn">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
