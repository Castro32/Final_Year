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

export class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      conditions: '',
      surgeries: '',
      medications: '',
      address: '',
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
    const { firstName, lastName, gender, conditions, surgeries, medications, address, email, password } = this.state;

    fetch(`http://localhost:3001/checkIfPatientExists?email=${email}`)
      .then(res => res.json())
      .then(res => {
        if (res.data[0]) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An account is already associated with that email.',
          });
        } else {
          fetch(`http://localhost:3001/makeAccount?name=${firstName}&lastname=${lastName}&email=${email}&password=${password}&address=${address}&gender=${gender}&conditions=${conditions}&medications=${medications}&surgeries=${surgeries}`);
          Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Your account has been created successfully.',
          }).then(() => {
            window.location = "/login";
          });
        }
      });
  };

  render() {
    const { firstName, lastName, gender, conditions, surgeries, medications, address, email, password, showPassword } = this.state;

    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h6" color="textSecondary">
            Patient's registration form:
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              placeholder="First name"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              placeholder="Last Name"
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
              label="Medical History - Conditions"
              name="conditions"
              value={conditions}
              onChange={this.handleChange}
              placeholder="Conditions"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Medical History - Surgeries"
              name="surgeries"
              value={surgeries}
              onChange={this.handleChange}
              placeholder="Surgeries"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Medical History - Medications"
              name="medications"
              value={medications}
              onChange={this.handleChange}
              placeholder="Medications"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={address}
              onChange={this.handleChange}
              placeholder="Address"
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
              placeholder="Enter a valid Email"
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
              placeholder="Password"
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
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">Are you a doctor?</Typography>
              <Button variant="contained" color="primary" href="/MakeDoc">
                I'm a doctor
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    );
  }
}

export default CreateAccount;
// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   Button,
//   TextField,
//   Typography,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   IconButton,
//   InputAdornment,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Swal from 'sweetalert2';
// import Image from '../assets/THIKA (2).jpg';

// const CreateAccount = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('');
//   const [conditions, setConditions] = useState('');
//   const [surgeries, setSurgeries] = useState('');
//   const [medications, setMedications] = useState('');
//   const [address, setAddress] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     switch (name) {
//       case 'firstName':
//         setFirstName(value);
//         break;
//       case 'lastName':
//         setLastName(value);
//         break;
//       case 'gender':
//         setGender(value);
//         break;
//       case 'conditions':
//         setConditions(value);
//         break;
//       case 'surgeries':
//         setSurgeries(value);
//         break;
//       case 'medications':
//         setMedications(value);
//         break;
//       case 'address':
//         setAddress(value);
//         break;
//       case 'email':
//         setEmail(value);
//         break;
//       case 'password':
//         setPassword(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     fetch(`http://localhost:3001/checkIfPatientExists?email=${email}`)
//       .then(res => res.json())
//       .then(res => {
//         if (res.data[0]) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'An account is already associated with that email.',
//           });
//         } else {
//           fetch(`http://localhost:3001/makeAccount?name=${firstName}&lastname=${lastName}&email=${email}&password=${password}&address=${address}&gender=${gender}&conditions=${conditions}&medications=${medications}&surgeries=${surgeries}`);
//           Swal.fire({
//             icon: 'success',
//             title: 'Account Created!',
//             text: 'Your account has been created successfully.',
//           }).then(() => {
//             window.location = "/login";
//           });
//         }
//       });
//   };

//   return (
//     <Container
//       style={{
//         marginTop: '2rem',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: 'center',
//         padding: '1rem',
//         boxSizing: 'border-box',
//       }}
//     >
//       <Box
//         flex={1}
//         mb={isMobile ? 2 : 0}
//         mr={isMobile ? 0 : 2}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <img
//           src={Image}
//           alt="Image"
//           style={{
//             maxWidth: '100%',
//             borderRadius: '8px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             height: 'auto',
//           }}
//         />
//       </Box>
//       <Box
//         flex={1}
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         padding={isMobile ? '1rem' : '2rem'}
//         boxSizing="border-box"
//         maxWidth={isMobile ? '100%' : '400px'}
//       >
//         <Typography variant="h6" color="textSecondary" align="center" mb={2}>
//           Patient's Registration Form:
//         </Typography>
//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
//           <TextField
//             label="First Name"
//             name="firstName"
//             value={firstName}
//             onChange={handleChange}
//             placeholder="First name"
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Last Name"
//             name="lastName"
//             value={lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             required
//             fullWidth
//             margin="normal"
//           />
//           <FormControl component="fieldset" margin="normal" fullWidth>
//             <FormLabel component="legend">Gender</FormLabel>
//             <RadioGroup
//               name="gender"
//               value={gender}
//               onChange={handleChange}
//               row
//             >
//               <FormControlLabel value="Female" control={<Radio />} label="Female" />
//               <FormControlLabel value="Male" control={<Radio />} label="Male" />
//             </RadioGroup>
//           </FormControl>
//           <TextField
//             label="Medical History - Conditions"
//             name="conditions"
//             value={conditions}
//             onChange={handleChange}
//             placeholder="Conditions"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Medical History - Surgeries"
//             name="surgeries"
//             value={surgeries}
//             onChange={handleChange}
//             placeholder="Surgeries"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Medical History - Medications"
//             name="medications"
//             value={medications}
//             onChange={handleChange}
//             placeholder="Medications"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Address"
//             name="address"
//             value={address}
//             onChange={handleChange}
//             placeholder="Address"
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             value={email}
//             onChange={handleChange}
//             placeholder="Enter a valid Email"
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//             fullWidth
//             margin="normal"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               )
//             }}
//           />
//           <Box display="flex" justifyContent="space-between" mt={2}>
//             <Button variant="contained" color="default" href="/">
//               Cancel
//             </Button>
//             <Button variant="contained" color="primary" type="submit">
//               Sign Up
//             </Button>
//           </Box>
//           <Box textAlign="center" mt={2}>
//             <Typography variant="body2">Are you a doctor?</Typography>
//             <Button variant="contained" color="primary" href="/MakeDoc">
//               I'm a doctor
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default CreateAccount;
