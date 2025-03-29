import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Logo from '../assets/THIKA (2).jpg';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <img
          src= {Logo}
          alt="Logo"
          style={{ height: '40px',width:"40px", marginRight: '10px' }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            color: '#333333',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          THIKA LEVEL 5 HMS
        </Typography>
        <div style={{ width: '40px' }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
