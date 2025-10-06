import { Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker.css';
import { enGB } from 'date-fns/locale';
import css from './BookingForm.module.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {

  const initialValues = {
    name: '',
    email: '',
    startDate: null,
    endDate: null,
    comment: '',
  };

  const handleSubmit = (values, actions) => {
    actions.resetForm();
    console.log(values);

    toast.success('You successfully booked your car! 🚘', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  return (
    <div className={css.wrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.formTitle}>
              <h3 className={css.title}>Book your car now</h3>
              <p className={css.text}>
                Stay connected! We are always ready to help you.
              </p>
            </div>

            <Field
              type="text"
              placeholder="Name*"
              name="name"
              minLength={2}
              maxLength={30}
              required
              className={css.input}
            ></Field>

            <Field
              type="email"
              placeholder="Email*"
              name="email"
              required
              className={css.input}
            ></Field>

            <DatePicker
              selected={values.startDate}
              onChange={dates => {
                const [start, end] = dates;
                setFieldValue('startDate', start);
                setFieldValue('endDate', end);
              }}
              startDate={values.startDate}
              endDate={values.endDate}
              selectsRange
              minDate={new Date()}
              isClearable
              placeholderText="Booking date"
              className={css.input}
              dateFormat="dd/MM/yyyy"
              locale={enGB}
              useWeekdaysShort={false}
              formatWeekDay={weekday =>
                String(weekday).slice(0, 3).toUpperCase()
              }
              showPopperArrow={true}
              popperClassName={css.datePicker}
            />

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              rows={4}
              className={`${css.input} ${css.textarea}`}
            />

            <button type="submit" className={css.btnForm}>
              Send
            </button>
            <ToastContainer
            className={css.toast}
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
