import React, { Component } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline
} from '@mui/material';

export class PatientsViewAppointments extends Component {
  state = { appointmentsState: [] }

  componentDidMount() {
    this.getNames("");
  }

  getNames(value) {
    let patName = value;
    console.log(patName);
    fetch("http://localhost:3001/userInSession")
      .then(res => res.json())
      .then(res => {
        var string_json = JSON.stringify(res);
        var email_json = JSON.parse(string_json);
        let email_in_use = email_json.email;
        fetch('http://localhost:3001/patientViewAppt?email=' + email_in_use)
          .then(res => res.json())
          .then(res => {
            this.setState({ appointmentsState: res.data });
          });
      });
  }

  render() {
    const { appointmentsState } = this.state;

    const Body = () => (
      <Container className="container">
        <div className="panel panel-default p50 uth-panel">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date of Appointment</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Concerns</TableCell>
                <TableCell>Symptoms</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentsState.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="h6">
                      No appointments available.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                appointmentsState.map(patient => (
                  <TableRow key={patient.user}>
                    <TableCell align="center">
                      {new Date(patient.theDate).toLocaleDateString().substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">{patient.theStart.substring(0, 5)}</TableCell>
                    <TableCell align="center">{patient.theEnd.substring(0, 5)}</TableCell>
                    <TableCell align="center">{patient.theConcerns}</TableCell>
                    <TableCell align="center">{patient.theSymptoms}</TableCell>
                    <TableCell align="center">{patient.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/showDiagnoses/${patient.ID}`}
                      >
                        See Diagnosis
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {patient.status === "NotDone" ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            fetch('http://localhost:3001/deleteAppt?uid=' + patient.ID);
                            window.location.reload();
                          }}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            fetch('http://localhost:3001/deleteAppt?uid=' + patient.ID);
                            window.location.reload();
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Container>
    );

    return (
      <>
        <CssBaseline />
        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">HMS</a>
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Body />
      </>
    );
  }
}

export default PatientsViewAppointments;
