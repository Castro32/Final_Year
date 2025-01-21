import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const theme = {
    palette: {
        primary: {
            main: '#000000',
        },
    },
    typography: {
        fontFamily: 'Lato',
    },
};

const Settings = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        }
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let email_in_use = "";

        fetch("http://localhost:3001/userInSession")
            .then(res => res.json())
            .then(res => {
                var string_json = JSON.stringify(res);
                var email_json = JSON.parse(string_json);
                email_in_use = email_json.email;

                fetch("http://localhost:3001/resetPasswordPatient?email=" +
                email_in_use + "&oldPassword=" + oldPassword + "&newPassword=" +
                newPassword, { method: 'POST' })
                    .then(res => res.json())
                    .then(res => {
                        let didUpdate = res.data.affectedRows;
                        if (didUpdate === 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Entered your old password incorrectly',
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Password Reset Successful',
                            }).then(() => {
                                navigate('/login');
                            });
                        }
                    });
            });
    };

    return (
        <Container>
            <Box pad="small">
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5">Password Change</Typography>
                    <TextField
                        type={showOldPassword ? 'text' : 'password'}
                        label="Old password"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowOldPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type={showNewPassword ? 'text' : 'password'}
                        label="New password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
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
    );
};

export default Settings;
