import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          window.location = '/admindashboard';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid credentials'
        });
      }
    });
  };

  return (
    <Container style={{ marginTop: '2rem', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h6" color="textSecondary" align="center" mb={2}>
          Admin Log In
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Please enter your email."
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Please enter your password."
            required
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" style={{ margin: '1rem' }}>
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
