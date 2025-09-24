import { useDispatch } from 'react-redux';

const BookingForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    date: null,
    comment: null,
  };

  const handleSubmit = (values, actions) => {
    dispatch()
    actions.resetForm();
    console.log(values);
  };

  return <div>BookingForm</div>;
};

export default BookingForm;
