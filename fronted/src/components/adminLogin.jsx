import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Admin login successful') {
        Swal.fire({
          icon: 'success',
          title: 'Logged In!',
          text: 'You have successfully logged in.'
        }).then(() => {
          navigate('/admindashboard');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: data.message || 'Invalid admin credentials',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/');
        });
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during login',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        navigate('/');
      });
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <Container style={{ marginTop: '2rem', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box display="flex" flexDirection="column" justifyContent="center" width={400}>
        

        <Typography variant="h6" align="center" mb={2}>
          Admin Login
        </Typography>
        <Typography variant="body2" color="error" align="center" mb={2}>
          For admin use only. Unauthorized access is prohibited.
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Admin email"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            placeholder="Admin password"
            required
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box bgcolor="#f5f5f5" p={2} mb={3} borderRadius={2}>
          <Typography variant="body1" align="center" color="textSecondary">
            Are you a regular user?
          </Typography>
          <Typography variant="body2" align="center" mt={1}>
            <Link href="/" color="primary" underline="always">
              Go to the homepage
            </Link>
          </Typography>
        </Box>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            size="large"
            style={{ margin: '1rem 0', padding: '10px' }}
          >
            Admin Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;