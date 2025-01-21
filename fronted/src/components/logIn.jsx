import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';


// const AppBarComponent = (props) => (
//   <AppBar position="static">
//     <Toolbar>
//       <Typography variant="h6" style={{ flexGrow: 1 }}>
//         <Link href="/" color="inherit" underline="none">
//           HMS
//         </Link>
//       </Typography>
//     </Toolbar>
//   </AppBar>
// );

class LogIn extends Component {
  state = {
    isDoctor: false,
    email: '',
    password: '',
    showPassword: false
  };

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = '/Home';
    this.props.history.push(path);
  }

  handleChange = (event) => {
    const { name, value, checked } = event.target;
    this.setState({ [name]: name === 'isDoctor' ? checked : value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, isDoctor } = this.state;

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

  render() {
    const { isDoctor, email, password, showPassword } = this.state;

    return (
      <Container maxWidth="sm">
        {/* <AppBarComponent /> */}
        <Box my={4}>
          <Typography variant="h6" color="textSecondary">
            Log In
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              placeholder="Please enter your password."
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
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
                  onChange={this.handleChange}
                  name="isDoctor"
                  color="primary"
                />
              }
              label="I'm a doctor"
            />
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Button variant="contained" color="primary" type="submit" style={{ margin: '1rem' }}>
                Log In
              </Button>
              <Button variant="contained" color="default" href="/createAcc" style={{ margin: '0.5rem' }}>
                Create Account
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    );
  }
}

export default LogIn;
