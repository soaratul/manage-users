import { TextField, Grid } from '@mui/material';

const Address = (props) => {
  const { errors, values, touched, handleChange } = props;

  return (
    <>
      <Grid item xs={12} lg={6}>
        <TextField
          required
          name='address_line1'
          label='Address Line 1'
          variant='outlined'
          type='text'
          fullWidth
          onChange={handleChange}
          value={values.address_line1}
          error={!!(touched.address_line1 && errors.address_line1)}
          helperText={touched.address_line1 && errors.address_line1}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          name='address_line2'
          label='Address Line 2'
          variant='outlined'
          type='text'
          fullWidth
          onChange={handleChange}
          value={values.address_line2}
          error={!!(touched.address_line2 && errors.address_line2)}
          helperText={touched.address_line2 && errors.address_line2}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          name='state'
          label='State'
          variant='outlined'
          type='text'
          fullWidth
          onChange={handleChange}
          value={values.state}
          error={!!(touched.state && errors.state)}
          helperText={touched.state && errors.state}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          name='city'
          label='City'
          variant='outlined'
          type='text'
          fullWidth
          onChange={handleChange}
          value={values.city}
          error={!!(touched.city && errors.city)}
          helperText={touched.city && errors.city}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          required
          name='pin_code'
          id='pin_code'
          label='Pin Code'
          variant='outlined'
          type='text'
          fullWidth
          onChange={handleChange}
          value={values.pin_code}
          error={!!(touched.pin_code && errors.pin_code)}
          helperText={touched.pin_code && errors.pin_code}
        />
      </Grid>
    </>
  );
};

export default Address;
