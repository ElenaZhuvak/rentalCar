import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import css from './BookingForm.module.css';
import * as Yup from 'yup';

const BookingForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    date: null,
    comment: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch();
    actions.resetForm();
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(16, 'Name must be at most 16 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    date: Yup.date()
      .min(new Date(), 'Date cannot be in the past')
      .nullable(),

    comment: Yup.string().max(512, 'Comment must be at most 512 characters'),
  });

  return (
    <div className={css.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formTitle}>
            <h3 className={css.title}>Book your car now</h3>
            <p className={css.text}>
              Stay connected! We are always ready to help you.
            </p>
          </div>

          <Field
            type="text"
            placeholder="Name"
            name="name"
            className={css.input}
          ></Field>
          <ErrorMessage name="name" component="span" className={css.error} />

          <Field
            type="text"
            placeholder="Email"
            name="email"
            className={css.input}
          ></Field>
          <ErrorMessage name="email" component="span" className={css.error} />

          <Field
            type="date"
            placeholder="Booking date"
            name="date"
            className={css.input}
          ></Field>

          <Field
            type="textarea"
            name="comment"
            placeholder="Comment"
            rows="3"
            className={css.input}
          ></Field>

          <button type="submit">Send</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
