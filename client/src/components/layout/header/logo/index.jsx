import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { WorkOutlined } from '@mui/icons-material';

const LogoMd = () => {
  return (
    <>
      <WorkOutlined
        fontSize='large'
        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
      />
      <Typography
        variant='h6'
        component={Link}
        to='/'
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant='h5' component='div'>
          Altimetrik
        </Typography>
        <Typography component='div'>Coding Round</Typography>
      </Typography>
    </>
  );
};

const LogoSm = () => {
  return (
    <>
      <Typography
        variant='h6'
        component={Link}
        to='/'
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 400,
          color: 'inherit',
          textDecoration: 'none',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <WorkOutlined
            fontSize='medium'
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          Altimetrik
        </span>
        <Typography component='div'>Coding Round</Typography>
      </Typography>
    </>
  );
};

export { LogoMd, LogoSm };
