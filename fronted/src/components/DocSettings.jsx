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
    FormLabel
} from '@mui/material';
// import './App.css';

export class DocSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
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
                            window.alert("Old Password is wrong");
                        } else {
                            window.alert("Password Reset Successful");
                        }
                    });
            });
    };

    render() {
        const { oldPassword, newPassword } = this.state;

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
                                    type="password"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>New Password</FormLabel>
                                <TextField
                                    type="password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={this.handleChange}
                                    required
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
