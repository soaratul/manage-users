import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/user/actions';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const submitError = useSelector((state) => state.user.loginError);
  const [showPassword, setShowPassword] = useState(false);
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting
  } = useFormik({
    initialValues: {
      email: 'soaratul@gmail.com',
      password: 'Atul@012345'
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required()
    }),
    onSubmit: (values) => {
      try {
        dispatch(login(values));
      } catch (error) {
        console.log('login error', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
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
      <Typography
        mt={5}
        variant='h3'
        noWrap
        sx={{
          fontFamily: 'monospace'
        }}
      >
        Log In
      </Typography>
      <Typography mt={2} variant='h5' noWrap>
        Simplify your workflow in minutes.
      </Typography>
      <Typography mb={5} variant='body2' noWrap>
        Don't have an account? <Link to='/register'>Click here</Link>
      </Typography>

      {submitError && (
        <Alert sx={{ mb: 2 }} severity='error'>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ m: 1 }}
          id='email'
          type='text'
          value={values.email}
          onChange={handleChange}
          fullWidth
          label='Email'
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        <TextField
          sx={{ m: 1 }}
          id='password'
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          label='Password'
        />

        <LoadingButton
          disabled={isSubmitting}
          variant='contained'
          size='large'
          type='submit'
          sx={{ m: 1 }}
          endIcon={<LoginIcon />}
          loadingPosition='end'
          loading={isSubmitting}
        >
          Sign in
        </LoadingButton>
      </form>
    </Grid>
  );
};

export default Login;
