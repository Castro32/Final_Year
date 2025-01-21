import React, { Component } from 'react';
import {
    Box,
    Button,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
// import './App.css';

export class DocViewAppt extends Component {
    state = { apptlist: [] }

    componentDidMount() {
        this.getNames();
    }

    getNames() {
        fetch('http://localhost:3001/doctorViewAppt')
        .then(res => res.json())
        .then(res => this.setState({ apptlist: res.data }));
    }

    render() {
        const { apptlist } = this.state;

        const Header = () => (
            <AppBar position="static">
                {/* <Toolbar>
                    <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        HMS
                    </Typography>
                </Toolbar> */}
            </AppBar>
        );

        const Body = () => (
            <Container>
                <Paper sx={{ mt: 2 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Start Time</TableCell>
                                    <TableCell>Concerns</TableCell>
                                    <TableCell>Symptoms</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apptlist.map(appt => (
                                    <TableRow key={appt.name}>
                                        <TableCell>{appt.id}</TableCell>
                                        <TableCell>{appt.name}</TableCell>
                                        <TableCell>{new Date(appt.date).toLocaleDateString().substring(0,10)}</TableCell>
                                        <TableCell>{appt.starttime}</TableCell>
                                        <TableCell>{appt.concerns}</TableCell>
                                        <TableCell>{appt.symptoms}</TableCell>
                                        <TableCell>{appt.status}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" href={`/Diagnose/${appt.id}`}>
                                                Diagnose
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {appt.status === "NotDone" ? (
                                                <Button variant="contained" color="secondary" onClick={() => {
                                                    fetch('http://localhost:3001/deleteAppt?uid=' + appt.id);
                                                    window.location.reload();
                                                }}>
                                                    Cancel
                                                </Button>
                                            ) : <div></div>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        );

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Header />
                <Body />
            </Box>
        );
    }
}

export default DocViewAppt;
