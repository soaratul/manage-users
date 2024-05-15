const Yup = require('yup');
const { isEmailAlreadyExists } = require('./controller');
const { Logger } = require('../../utils');

const userIdParamSchema = Yup.object().shape({
  params: Yup.object().shape({
    id: Yup.number('The must be positive number.')
      .min(1, 'The id should be greater than 0.')
      .required('User id in param required.')
  })
});

const updateProfileSchema = Yup.object().shape({
  params: Yup.object().shape({
    id: Yup.string().required('User id in param required.')
  }),
  body: Yup.object().shape({
    first_name: Yup.string(),
    last_name: Yup.string(),
    email: Yup.string().test(
      'duplicate-email',
      'The given email already exists.',
      async function validateEmail(value, context) {
        try {
          return await isEmailAlreadyExists(
            { email: value, type: 'update' },
            context
          );
        } catch (error) {
          Logger.log('Error while checking email address', error);
        }
      }
    ),
    preferd_payment_method: Yup.string(),
    address_line1: Yup.string(),
    address_line2: Yup.string().optional(),
    state: Yup.string(),
    city: Yup.string(),
    pin_code: Yup.string()
  })
});

module.exports = {
  userIdParamSchema,
  updateProfileSchema
};
