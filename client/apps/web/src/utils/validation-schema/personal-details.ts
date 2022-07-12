import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('First name it is a required field'),
  secondName: Yup.string().max(15, 'Must be 15 characters or less'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Last name it is a required field'),
  secondLastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Second last name it is a required field'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email it is a required field'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone it is a required field'),
  birhDate: Yup.string().required('Second last name it is a required field'),
});

export default userValidationSchema;
