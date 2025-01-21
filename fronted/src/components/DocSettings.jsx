import React, { Component } from 'react';
import {
    Box,
    Button,
    Typography,
    AppBar,
    Toolbar,
    Container,
    TextField,
    FormControl,
    FormLabel,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import './App.css';

export class DocSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            showOldPassword: false,
            showNewPassword: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleToggleVisibility = (field) => {
        this.setState((prevState) => ({
            [field]: !prevState[field]
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { oldPassword, newPassword } = this.state;
        let email_in_use = "";

        fetch("http://localhost:3001/userInSession")
            .then(res => res.json())
            .then(res => {
                var string_json = JSON.stringify(res);
                var email_json = JSON.parse(string_json);
                email_in_use = email_json.email;

                fetch("http://localhost:3001/resetPasswordDoctor?email=" +
                    email_in_use + "&oldPassword=" + oldPassword + "&newPassword=" +
                    newPassword, { method: 'POST' })
                    .then(res => res.json())
                    .then(res => {
                        let didUpdate = res.data.affectedRows;
                        if (didUpdate === 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Old Password is wrong',
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Password Reset Successful',
                            }).then(() => {
                                window.location.href = '/login';
                            });
                        }
                    });
            });
    };

    render() {
        const { oldPassword, newPassword, showOldPassword, showNewPassword } = this.state;

        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    {/* <Toolbar>
                        <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                            HMS
                        </Typography>
                    </Toolbar> */}
                </AppBar>
                <Container>
                    <Box pad="small">
                        <form onSubmit={this.handleSubmit}>
                            <Typography variant="h5" component="h3">
                                Password Change
                            </Typography>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>Old Password</FormLabel>
                                <TextField
                                    type={showOldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={this.handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => this.handleToggleVisibility('showOldPassword')}
                                                >
                                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>New Password</FormLabel>
                                <TextField
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={this.handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => this.handleToggleVisibility('showNewPassword')}
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Change Password
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        );
    }
}

export default DocSettings;
