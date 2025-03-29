import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    TextField,
    IconButton,
    InputAdornment,
    Paper,
    Grid,
    Avatar,
    Divider,
    Card,
    CardContent,
    Tabs,
    Tab
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Lock,
    Person,
    Email,
    Security,
    Notifications,
    Help
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const [tabValue, setTabValue] = useState(0);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        notifications: true
    });
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else {
            setUserData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleToggleChange = (name) => {
        setUserData(prev => ({ ...prev, [name]: !prev[name] }));
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

    const handleSubmitPassword = (event) => {
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

    const handleSubmitProfile = (event) => {
        event.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated!',
            text: 'Your profile information has been saved',
        });
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        mr: 2
                    }}>
                        <Person sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography variant="h4">Account Settings</Typography>
                </Box>

                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Security" icon={<Security />} />
                    <Tab label="Notifications" icon={<Notifications />} />
                </Tabs>

                <Divider sx={{ mb: 3 }} />

                {tabValue === 0 && (
                    <Box component="form" onSubmit={handleSubmitPassword}>
                        <Card variant="outlined" sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Lock sx={{ mr: 1 }} /> Change Password
                                </Typography>
                                <TextField
                                    type={showOldPassword ? 'text' : 'password'}
                                    label="Current Password"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
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
                                    label="New Password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Security />
                                            </InputAdornment>
                                        ),
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
                                    sx={{ mt: 2 }}
                                >
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Security sx={{ mr: 1 }} /> Security Tips
                                </Typography>
                                <ul>
                                    <li><Typography>Use a strong, unique password</Typography></li>
                                    <li><Typography>Never share your password with anyone</Typography></li>
                                    <li><Typography>Change your password regularly</Typography></li>
                                    <li><Typography>Enable two-factor authentication if available</Typography></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {tabValue === 1 && (
                    <Box>
                        <Card variant="outlined" sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Notifications sx={{ mr: 1 }} /> Notification Preferences
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography>Email Notifications</Typography>
                                    <Button
                                        variant={userData.notifications ? "contained" : "outlined"}
                                        color="primary"
                                        onClick={() => handleToggleChange('notifications')}
                                    >
                                        {userData.notifications ? 'Enabled' : 'Disabled'}
                                    </Button>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Manage how you receive notifications from our service
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Help sx={{ mr: 1 }} /> Help & Support
                                </Typography>
                                <Typography sx={{ mb: 2 }}>
                                    Need help with your account settings? Contact our support team.
                                </Typography>
                                <Button variant="outlined" color="primary">
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Settings;