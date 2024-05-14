import { Container, Grid } from '@mui/material';
import AppRoutes from '../../routes';
import Header from './header';

const Layout = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
      <Container maxWidth={false} sx={{ boxShadow: 2, padding: '16px' }}>
        <Grid item>
          <AppRoutes />
        </Grid>
      </Container>
    </>
  );
};

export default Layout;
