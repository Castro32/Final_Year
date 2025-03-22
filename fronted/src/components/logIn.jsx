// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import {
//   Container,
//   Box,
//   Button,
//   TextField,
//   Typography,
//   FormControlLabel,
//   Checkbox,
//   Link,
//   AppBar,
//   Toolbar,
//   IconButton,
//   InputAdornment
// } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Swal from 'sweetalert2';
// import Logo from '../assets/THIKA (2).jpg';


// class LogIn extends Component {
//   state = {
//     isDoctor: false,
//     email: '',
//     password: '',
//     showPassword: false
//   };

//   constructor(props) {
//     super(props);
//     this.routeChange = this.routeChange.bind(this);
//   }

//   routeChange() {
//     let path = '/Home';
//     this.props.history.push(path);
//   }

//   handleChange = (event) => {
//     const { name, value, checked } = event.target;
//     this.setState({ [name]: name === 'isDoctor' ? checked : value });
//   };

//   handleClickShowPassword = () => {
//     this.setState({ showPassword: !this.state.showPassword });
//   };

//   handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { email, password, isDoctor } = this.state;

//     const endpoint = isDoctor ? 'checkDoclogin' : 'checklogin';
//     const redirect = isDoctor ? 'DocHome' : '/Home';

//     fetch(`http://localhost:3001/${endpoint}?email=${email}&password=${password}`)
//       .then(res => res.json())
//       .then(res => {
//         if (res.data.length === 0) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Invalid Log In',
//           });
//         } else {
//           Swal.fire({
//             icon: 'success',
//             title: 'Logged In!',
//             text: 'You have successfully logged in.',
//           }).then(() => {
//             window.location = redirect;
//           });
//         }
//       });
//   };

//   render() {
//     const { isDoctor, email, password, showPassword } = this.state;

//     return (
//       <Container maxWidth="sm" style={{marginTop: '2rem', display:'flex', flexDirection:'column', alignItems:'center'}} >
//         {/* <AppBarComponent /> */}
//         <Box>
//         <Box>
//           <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', margin: '1rem' }}>
//             <img
//             src={Logo}
//             />
//           </div>
//         </Box>
//         <Box my={4}>
//           <Typography variant="h6" color="textSecondary">
//             Log In
//           </Typography>
//           <form onSubmit={this.handleSubmit}>
//             <TextField
//               label="Email"
//               name="email"
//               type="email"
//               value={email}
//               onChange={this.handleChange}
//               placeholder="Please enter your email."
//               required
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={this.handleChange}
//               placeholder="Please enter your password."
//               required
//               fullWidth
//               margin="normal"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={this.handleClickShowPassword}
//                       onMouseDown={this.handleMouseDownPassword}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={isDoctor}
//                   onChange={this.handleChange}
//                   name="isDoctor"
//                   color="primary"
//                 />
//               }
//               label="I'm a doctor"
//             />
//             <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
//               <Button variant="contained" color="primary" type="submit" style={{ margin: '1rem' }}>
//                 Log In
//               </Button>
//               <Button variant="contained" color="default" href="/createAcc" style={{ margin: '0.5rem' }}>
//                 Create Account
//               </Button>
//             </Box>
//           </form>
//         </Box>
//         </Box>
//         {/* <Box>
//           <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', margin: '1rem' }}>
//             <img
//             src={Logo}
//             />
//           </div>
//         </Box>
//         <Box my={4}>
//           <Typography variant="h6" color="textSecondary">
//             Log In
//           </Typography>
//           <form onSubmit={this.handleSubmit}>
//             <TextField
//               label="Email"
//               name="email"
//               type="email"
//               value={email}
//               onChange={this.handleChange}
//               placeholder="Please enter your email."
//               required
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={this.handleChange}
//               placeholder="Please enter your password."
//               required
//               fullWidth
//               margin="normal"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={this.handleClickShowPassword}
//                       onMouseDown={this.handleMouseDownPassword}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={isDoctor}
//                   onChange={this.handleChange}
//                   name="isDoctor"
//                   color="primary"
//                 />
//               }
//               label="I'm a doctor"
//             />
//             <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
//               <Button variant="contained" color="primary" type="submit" style={{ margin: '1rem' }}>
//                 Log In
//               </Button>
//               <Button variant="contained" color="default" href="/createAcc" style={{ margin: '0.5rem' }}>
//                 Create Account
//               </Button>
//             </Box>
//           </form>
//         </Box> */}
//       </Container>
//     );
//   }
// }

// export default LogIn;
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
};

export default LogIn;
