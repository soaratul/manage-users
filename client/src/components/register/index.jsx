import { useState } from 'react';
import { TextField, Grid, Button, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiService from '../../utils/axios';
import { ApiPaths } from '../../constants';
import ConfirmDialog from '../dialogs/confirm-dialog';
import { Link, useNavigate } from 'react-router-dom';
import Address from '../address';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../store/user/actions';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const paymentMethods = [
    {
      name: 'UPI'
    },
    {
      name: 'Internet Banking'
    },
    {
      name: 'COD'
    }
  ];
  const addressList = useSelector((state) => state.address.list);
  const randomAdderss =
    addressList[Math.floor(Math.random() * addressList.length)];

  const navigate = useNavigate();
  const {
    resetForm,
    errors,
    values,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue
  } = useFormik({
    initialValues: {
      first_name: 'Atul',
      last_name: 'Dubey',
      email: 'soaratul@gmail.com',
      password: 'Atul@012345',
      confirm_password: 'Atul@012345',
      preferd_payment_method: '',
      address_line1: '',
      address_line2: '',
      state: '',
      city: '',
      pin_code: '',
      ...randomAdderss
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string()
        .min(2, 'First name is too short')
        .max(50, 'First name is too long')
        .required('First name is required'),
      last_name: Yup.string()
        .min(2, 'Last name is too short')
        .max(50, 'Last name is too long')
        .required('Last name is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email'),
      preferd_payment_method: Yup.string().required(
        'Prefered payment method is required'
      ),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters.')
        .max(16, 'Password must not contain more than 16 characters.'),
      confirm_password: Yup.string()
        .required('Confirm password is required field.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      address_line1: Yup.string().required('Address line 1 is required'),
      address_line2: Yup.string().optional(),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      pin_code: Yup.string()
        .matches(/^[0-9]{6}$/, 'Pin code must be of 6 digits only')
        .required('Pin code is required')
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        await ApiService.post(ApiPaths.REGISTER, values);
        dispatch(getMe());
        toast.success('User registered successfully!');
        navigate(`/users`);
      } catch (error) {
        if (error?.error?.errors) {
          const errors = {};
          error.error.errors.forEach((error) => {
            errors[error.path] = error.message;
          });
          setErrors(errors);
        }
      }
    }
  });

  const resetHandler = () => {
    resetForm();
    setShouldOpen(false);
  };

  const [shouldOpen, setShouldOpen] = useState(false);

  return (
    <>
      <ConfirmDialog
        title='Are you sure want to reset the form?'
        onClose={() => setShouldOpen(false)}
        okHandler={resetHandler}
        shouldOpen={shouldOpen}
      />
      <Grid
        item
        xs={12}
        lg={6}
        xl={4}
        md={4}
        textAlign='center'
        ml={'auto'}
        mr={'auto'}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Typography
            mt={5}
            variant='h3'
            noWrap
            sx={{
              fontFamily: 'monospace'
            }}
          >
            Register
          </Typography>
          <Typography mb={5} variant='body2' noWrap>
            Already have an account? <Link to='/login'>Click here</Link>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                name='first_name'
                label='First Name'
                variant='outlined'
                type='text'
                fullWidth
                size='small'
                onChange={handleChange}
                value={values.first_name}
                error={!!(touched.first_name && errors.first_name)}
                helperText={touched.first_name && errors.first_name}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name='last_name'
                label='Last Name'
                variant='outlined'
                type='text'
                fullWidth
                size='small'
                onChange={handleChange}
                value={values.last_name}
                error={!!(touched.last_name && errors.last_name)}
                helperText={touched.last_name && errors.last_name}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name='email'
                label='Email'
                variant='outlined'
                type='text'
                fullWidth
                size='small'
                onChange={handleChange}
                value={values.email}
                error={!!(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                required
                id='preferd_payment_method'
                name='preferd_payment_method'
                type='text'
                value={values.preferd_payment_method}
                onChange={(e) =>
                  setFieldValue('preferd_payment_method', e.target.value)
                }
                label='Preferd Payment Method'
                select
                fullWidth
                error={
                  !!(
                    touched.preferd_payment_method &&
                    errors.preferd_payment_method
                  )
                }
                helperText={
                  touched.preferd_payment_method &&
                  errors.preferd_payment_method
                }
              >
                <MenuItem value=''>
                  <em>Select Payment Method</em>
                </MenuItem>
                {paymentMethods.map((pm) => {
                  return (
                    <MenuItem key={pm.name} value={pm.name}>
                      {pm.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name='password'
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                size='small'
                onChange={handleChange}
                value={values.password}
                error={!!(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name='confirm_password'
                label='Confirm Password'
                variant='outlined'
                type='password'
                fullWidth
                size='small'
                onChange={handleChange}
                value={values.confirm_password}
                error={!!(touched.confirm_password && errors.confirm_password)}
                helperText={touched.confirm_password && errors.confirm_password}
                required
              />
            </Grid>
            <Address
              errors={errors}
              values={values}
              handleChange={handleChange}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid container spacing={2} mt={2} sx={{ textAlign: 'center' }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={8} lg={4}>
              <Button
                variant='outlined'
                type='button'
                fullWidth
                onClick={() => setShouldOpen(true)}
              >
                Reset Form
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} lg={4}>
              <Button
                variant='contained'
                fullWidth
                color='primary'
                type='submit'
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default RegisterForm;
