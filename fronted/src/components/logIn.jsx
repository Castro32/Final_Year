import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import Image from '../assets/THIKA (2).jpg';

const LogIn = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const routeChange = () => {
    let path = '/Home';
    //history.push(path);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'isDoctor') {
      setIsDoctor(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  ;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = isDoctor ? 'checkDoclogin' : 'checklogin';
    const redirect = isDoctor ? 'DocHome' : '/Home';

    fetch(`http://localhost:3001/${endpoint}?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(res => {
        if (res.data.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Log In',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Logged In!',
            text: 'You have successfully logged in.',
          }).then(() => {
            window.location = redirect;
          });
        }
      });
  };

  return (
    <Container  style={{ marginTop: '2rem', height:'100vh', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
      <Box flex={isMobile ? 1 : 1} mb={isMobile ? 2 : 0} mr={isMobile ? 0 : 2}>
        <img
          src={Image}
          alt="Image"
          style={{ maxWidth: '100%', borderRadius: '8px' }}
        />
      </Box>
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h6" color="textSecondary" align="center" mb={2}>
          Log In
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            placeholder="Please enter your password."
            required
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDoctor}
                onChange={handleChange}
                name="isDoctor"
                color="primary"
              />
            }
            label="I'm a doctor"
          />
          {/* <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Button variant="contained" color="primary" type="submit" style={{ margin: '1rem' }}>
              Log In
            </Button>
            <Button variant="contained" color="default" href="/adminlogin" style={{ margin: '0.5rem' }}>
              Admin
            </Button>
            <p>This is for admin use only!!!</p>
          </Box> */}
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              sx={{ marginBottom: '1.5rem' }}
            >
              Log In
            </Button>

            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#333', 
                color: '#fff', 
                '&:hover': { backgroundColor: '#555' }, 
                padding: '10px 20px', 
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }} 
              href="/adminlogin"
            >
              Admin Panel
            </Button>

            <Typography 
              variant="body2" 
              color="error" 
              fontWeight="bold"
            >
              This section is for admin use only!
            </Typography>
          </Box>

        </form>
      </Box>
    </Container>
  );
};

export default LogIn;
