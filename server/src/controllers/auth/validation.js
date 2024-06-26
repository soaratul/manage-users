const Yup = require('yup');
const { Logger } = require('../../utils');
const { isEmailAlreadyExists } = require('../user/controller');

const loginSchema = Yup.object().shape({
  body: Yup.object().shape({
    email: Yup.string().required('Email is required field.'),
    password: Yup.string().required('Password is required.').min(3)
  })
});

const registerSchema = Yup.object().shape({
  body: Yup.object().shape({
    first_name: Yup.string().required('First name is required.'),
    last_name: Yup.string().required('Last name is required.'),
    email: Yup.string()
      .required('Email is required field.')
      .email('Please enter a valid email address.')
      .test(
        'duplicate-email',
        'The given email already exists.',
        async function validateEmail(value, context) {
          try {
            return await isEmailAlreadyExists(
              { email: value, type: 'create' },
              context
            );
          } catch (error) {
            Logger.log('Error while checking email address', error);
          }
        }
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters.')
      .max(16, 'Password must not contain more than 16 characters.'),
    confirm_password: Yup.string()
      .required('Confirm password is required field.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    preferd_payment_method: Yup.string().required('Payment method is required'),
    address_line1: Yup.string().required('Address line 1 is required'),
    address_line2: Yup.string().optional(),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pin_code: Yup.string().required('Pin code is required')
  })
});

const refreshTokenShema = Yup.object().shape({
  cookies: Yup.object().shape({
    refreshToken: Yup.string().required('Refresh token required.')
  })
});

module.exports = { registerSchema, loginSchema, refreshTokenShema };
