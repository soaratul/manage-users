import { Box, ListItemIcon, SvgIcon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { stringToColor } from '../../../../../utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../../store/user/actions';

const pages = [
  {
    path: '/login',
    text: 'Login'
  }
];

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

const UserNavs = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, first_name, last_name } = useSelector(
    (state) => state.user
  );
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    try {
      dispatch(logout());
    } catch (error) {
      console.log(`Error occured while logging out, ${error}`);
    }
  };

  return (
    <Box
      sx={{
        flexDirection: 'row',
        flexGrow: 0,
        display: 'flex'
      }}
    >
      {isLoggedIn ? (
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar {...stringAvatar(`${first_name} ${last_name}`)} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              disableRipple
              component={Link}
              to='/profile'
              onClick={handleCloseUserMenu}
            >
              <ListItemIcon>
                <AccountCircle fontSize='small' />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem disableRipple onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button
            component={Link}
            to='/login'
            sx={{
              my: 2,
              color: 'white',
              display: { md: 'block', xs: 'none' }
            }}
          >
            Login
          </Button>
          <IconButton
            sx={{
              p: 0,
              display: { xs: 'block', md: 'none' }
            }}
            onClick={handleOpenUserMenu}
          >
            <SvgIcon component={AccountCircleIcon} inheritViewBox />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.text}
                component={Link}
                to={page.path}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign='center'>{page.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};
export default UserNavs;
