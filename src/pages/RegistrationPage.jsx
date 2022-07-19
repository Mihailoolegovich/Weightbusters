import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authOperations from '../redux/auth/auth-operations';
import s from '../sass/styleComponents/Identification.module.scss';

export default function RegistrationPage() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too short')
      .max(254, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      // .oneOf(['.com' '.net', '.ua'])
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 symbols!')
      .max(100, 'Too Long!')
      .required('Required'),
  });

  const onSubmit = ({ name, email, password }) => {
    dispatch(authOperations.register({ name, email, password }));
    // alert(JSON.stringify({ name, email, password }, null, 2));
  };

  const renderError = message => <p className={s.error}>{message}</p>;

  return (
    <>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ name, email, password }, { resetForm }) => {
          await onSubmit({ name, email, password });
          resetForm();
        }}
      >
        <Form>
          {/* <div className={s.imageContainer}> */}
          <div>
            <div className={s.formContainer}>
              <h2 className={s.title}>Register</h2>
              <div className="field">
                <label className="label" htmlFor="name"></label>
                <div className="control">
                  <Field
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Name *"
                  />
                  <ErrorMessage name="name" render={renderError} />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="email"></label>
                <div className="control">
                  <Field
                    name="email"
                    type="text"
                    className="input"
                    placeholder=" Email *"
                  />
                  <ErrorMessage name="email" render={renderError} />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="password"></label>
                <div className="control">
                  <Field
                    name="password"
                    type="text"
                    className="input"
                    placeholder="Password *"
                  />
                  <ErrorMessage name="password" render={renderError} />
                </div>
              </div>
              <div className={s.wrapper}>
                <button type="submit" className={s.button}>
                  Register
                </button>

                <Link to="/auth/login" className={s.button}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}