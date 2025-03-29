import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';

export class MakeDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      schedule: '',
      email: '',
      password: '',
      showPassword: false
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, gender, email, password } = this.state;
    const schedule = '5'; 

    fetch(`http://localhost:3001/checkIfDocExists?email=${email}`)
      .then(res => res.json())
      .then(res => {
        if (res.data[0]) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A doctor is already associated with that email.',
          });
        } else {
          fetch(`http://localhost:3001/makeDocAccount?name=${firstName}&lastname=${lastName}&email=${email}&password=${password}&gender=${gender}&schedule=${schedule}`);
          Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Your account has been created successfully.',
          }).then(() => {
            window.location = "/admindashboard";
          });
        }
      });
  };

  render() {
    const { firstName, lastName, gender, schedule, email, password, showPassword } = this.state;

    return (
      <Container maxWidth="sm">
        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link href="/" color="inherit" underline="none">
                HMS
              </Link>
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Box my={4}>
          <Typography variant="h6" color="textSecondary">
            Doctor's registration form:
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              placeholder="Please enter your first name."
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              placeholder="Please enter your last name."
              required
              fullWidth
              margin="normal"
            />
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
              label="Schedule No"
              name="schedule"
              value={schedule}
              onChange={this.handleChange}
              placeholder="Please enter schedule number"
              required
              fullWidth
              margin="normal"
            />
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={gender}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
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
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="default" href="/">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    );
  }
}

export default MakeDoc;
