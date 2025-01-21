import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper
} from '@mui/material';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ShowDiagnoses extends Component {
    constructor(props) {
        super(props);
        this.id = props.params.id;
    }

    state = { diagnoses: [] }

    componentDidMount() {
        fetch('http://localhost:3001/showDiagnoses?id=' + this.id)
            .then(res => res.json())
            .then(res => this.setState({ diagnoses: res.data }));
    }

    render() {
        const { diagnoses } = this.state;

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
                <Paper sx={{ mt: 2, p: 2 }}>
                    {diagnoses.map(diagnosis => (
                        <Table key={diagnosis.appt}>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Appointment Id</strong>
                                    </TableCell>
                                    <TableCell>{diagnosis.appt}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Doctor</strong>
                                    </TableCell>
                                    <TableCell>{diagnosis.doctor}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Diagnosis</strong>
                                    </TableCell>
                                    <TableCell>{diagnosis.diagnosis}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Prescription</strong>
                                    </TableCell>
                                    <TableCell>{diagnosis.prescription}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    ))}
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

export default withParams(ShowDiagnoses);
