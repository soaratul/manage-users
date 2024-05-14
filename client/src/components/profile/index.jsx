import { Box, Grid, Typography } from '@mui/material';
import { capitalizeFirstLetter } from '../../utils/common';
import Loading from '../loading';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);

  if (!user.id) return <Loading />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{ flex: '1 1 100%', mb: 1, textAlign: 'center', borderBottom: 1 }}
        variant='h4'
        id='tableTitle'
        component='div'
      >
        My Profile
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant='h6' component='h2'>
            First Name
          </Typography>
          <Typography sx={{ mt: 2 }}>{user.firstName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' component='h2'>
            Last Name
          </Typography>
          <Typography sx={{ mt: 2 }}>{user.lastName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' component='h2'>
            Email
          </Typography>
          <Typography sx={{ mt: 2 }}>{user.email}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
