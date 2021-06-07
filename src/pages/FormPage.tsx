import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import TextField from '../components/TextField';
import CustomContainer from '../components/Container';
import { db } from '../firebase';
import Header from '../components/Header';

export const FormPage = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const validate = Yup.object({
    fullName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Fullname is Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    hesCode: Yup.string()
      .min(6, 'HES Code must be at least 6 charaters')
      .max(30, 'Must be 30 characters or less')
      .required('HES Code is required'),
  });

  const onFormChangeHandler = () => setSuccess(false);

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        hesCode: '',
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        const participantsRef = db.ref('participants');
        const newParticipant = participantsRef.push();
        newParticipant.set({
          ...values,
          isAttended: false,
          id: uuidv4(),
        });
        setSuccess(true);
        resetForm();
      }}
    >
      {() => (
        <CustomContainer maxWidth={450}>
          <>
            <Header name="List" path="/participant-list" />
            <h1 className="my-4 font-weight-bold">Participant Registration</h1>
            {success && (
              <p className="text-success">
                Participant successfully registered!
              </p>
            )}
            <Form onChange={onFormChangeHandler}>
              <TextField label="Full Name" name="fullName" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="HES Code" name="hesCode" type="text" />
              <button className="btn btn-dark mt-3" type="submit">
                Register
              </button>
            </Form>
          </>
        </CustomContainer>
      )}
    </Formik>
  );
};
