// // // // // import React, { Component } from 'react';
// // // // // import {
// // // // //   Container,
// // // // //   Table,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   TableCell,
// // // // //   TableBody,
// // // // //   Button,
// // // // //   AppBar,
// // // // //   Toolbar,
// // // // //   Typography,
// // // // //   CssBaseline
// // // // // } from '@mui/material';

// // // // // export class PatientsViewAppointments extends Component {
// // // // //   state = { appointmentsState: [] }

// // // // //   componentDidMount() {
// // // // //     this.getNames("");
// // // // //   }

// // // // //   getNames(value) {
// // // // //     let patName = value;
// // // // //     console.log(patName);
// // // // //     fetch("http://localhost:3001/userInSession")
// // // // //       .then(res => res.json())
// // // // //       .then(res => {
// // // // //         var string_json = JSON.stringify(res);
// // // // //         var email_json = JSON.parse(string_json);
// // // // //         let email_in_use = email_json.email;
// // // // //         fetch('http://localhost:3001/patientViewAppt?email=' + email_in_use)
// // // // //           .then(res => res.json())
// // // // //           .then(res => {
// // // // //             this.setState({ appointmentsState: res.data });
// // // // //           });
// // // // //       });
// // // // //   }

// // // // //   render() {
// // // // //     const { appointmentsState } = this.state;

// // // // //     const Body = () => (
// // // // //       <Container className="container">
// // // // //         <div className="panel panel-default p50 uth-panel">
// // // // //           <Table>
// // // // //             <TableHead>
// // // // //               <TableRow>
// // // // //                 <TableCell>Date of Appointment</TableCell>
// // // // //                 <TableCell>Start Time</TableCell>
// // // // //                 <TableCell>End Time</TableCell>
// // // // //                 <TableCell>Concerns</TableCell>
// // // // //                 <TableCell>Symptoms</TableCell>
// // // // //                 <TableCell>Status</TableCell>
// // // // //                 <TableCell>Actions</TableCell>
// // // // //               </TableRow>
// // // // //             </TableHead>
// // // // //             <TableBody>
// // // // //               {appointmentsState.length === 0 ? (
// // // // //                 <TableRow>
// // // // //                   <TableCell colSpan={7} align="center">
// // // // //                     <Typography variant="h6">
// // // // //                       No appointments available.
// // // // //                     </Typography>
// // // // //                   </TableCell>
// // // // //                 </TableRow>
// // // // //               ) : (
// // // // //                 appointmentsState.map(patient => (
// // // // //                   <TableRow key={patient.user}>
// // // // //                     <TableCell align="center">
// // // // //                       {new Date(patient.theDate).toLocaleDateString().substring(0, 10)}
// // // // //                     </TableCell>
// // // // //                     <TableCell align="center">{patient.theStart.substring(0, 5)}</TableCell>
// // // // //                     <TableCell align="center">{patient.theEnd.substring(0, 5)}</TableCell>
// // // // //                     <TableCell align="center">{patient.theConcerns}</TableCell>
// // // // //                     <TableCell align="center">{patient.theSymptoms}</TableCell>
// // // // //                     <TableCell align="center">{patient.status}</TableCell>
// // // // //                     <TableCell align="center">
// // // // //                       <Button
// // // // //                         variant="contained"
// // // // //                         color="primary"
// // // // //                         href={`/showDiagnoses/${patient.ID}`}
// // // // //                       >
// // // // //                         See Diagnosis
// // // // //                       </Button>
// // // // //                     </TableCell>
// // // // //                     <TableCell align="center">
// // // // //                       {patient.status === "NotDone" ? (
// // // // //                         <Button
// // // // //                           variant="contained"
// // // // //                           color="secondary"
// // // // //                           onClick={() => {
// // // // //                             fetch('http://localhost:3001/deleteAppt?uid=' + patient.ID);
// // // // //                             window.location.reload();
// // // // //                           }}
// // // // //                         >
// // // // //                           Cancel
// // // // //                         </Button>
// // // // //                       ) : (
// // // // //                         <Button
// // // // //                           variant="contained"
// // // // //                           color="secondary"
// // // // //                           onClick={() => {
// // // // //                             fetch('http://localhost:3001/deleteAppt?uid=' + patient.ID);
// // // // //                             window.location.reload();
// // // // //                           }}
// // // // //                         >
// // // // //                           Delete
// // // // //                         </Button>
// // // // //                       )}
// // // // //                     </TableCell>
// // // // //                   </TableRow>
// // // // //                 ))
// // // // //               )}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </div>
// // // // //       </Container>
// // // // //     );

// // // // //     return (
// // // // //       <>
// // // // //         <CssBaseline />
// // // // //         {/* <AppBar position="static">
// // // // //           <Toolbar>
// // // // //             <Typography variant="h6">
// // // // //               <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">HMS</a>
// // // // //             </Typography>
// // // // //           </Toolbar>
// // // // //         </AppBar> */}
// // // // //         <Body />
// // // // //       </>
// // // // //     );
// // // // //   }
// // // // // }

// // // // // export default PatientsViewAppointments;
// // // // import React, { Component } from 'react';
// // // // import {
// // // //   Container,
// // // //   Table,
// // // //   TableHead,
// // // //   TableRow,
// // // //   TableCell,
// // // //   TableBody,
// // // //   Button,
// // // //   Typography,
// // // //   CssBaseline,
// // // //   CircularProgress,
// // // //   Snackbar,
// // // //   Alert
// // // // } from '@mui/material';

// // // // class PatientsViewAppointments extends Component {
// // // //   state = {
// // // //     appointmentsState: [],
// // // //     loading: true,
// // // //     error: null,
// // // //     snackbarOpen: false,
// // // //     snackbarMessage: '',
// // // //     snackbarSeverity: 'success'
// // // //   };

// // // //   componentDidMount() {
// // // //     this.fetchAppointments();
// // // //   }

// // // //   fetchAppointments = () => {
// // // //     fetch('http://localhost:3001/userInSession')
// // // //       .then((res) => res.json())
// // // //       .then((sessionRes) => {
// // // //         const email_in_use = sessionRes.email;
// // // //         fetch(`http://localhost:3001/patientViewAppt?email=${email_in_use}`)
// // // //           .then((res) => res.json())
// // // //           .then((apptRes) => {
// // // //             if (apptRes.error) {
// // // //               this.setState({ error: apptRes.error, loading: false });
// // // //             } else {
// // // //               this.setState({ appointmentsState: apptRes.data, loading: false });
// // // //             }
// // // //           })
// // // //           .catch((error) => {
// // // //             this.setState({ error: 'Failed to fetch appointments', loading: false });
// // // //           });
// // // //       })
// // // //       .catch((error) => {
// // // //         this.setState({ error: 'Failed to fetch user session', loading: false });
// // // //       });
// // // //   };

// // // //   handleCancelOrDelete = (appointmentID, action) => {
// // // //     console.log('Appointment ID:', appointmentID); // Debugging line
// // // //     if (!appointmentID) {
// // // //       this.setState({
// // // //         snackbarOpen: true,
// // // //         snackbarMessage: 'Appointment ID is missing',
// // // //         snackbarSeverity: 'error'
// // // //       });
// // // //       return;
// // // //     }

// // // //     const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
// // // //     fetch(`http://localhost:3001/${endpoint}?uid=${appointmentID}`)
// // // //       .then((res) => res.json())
// // // //       .then((res) => {
// // // //         if (res.error) {
// // // //           this.setState({
// // // //             snackbarOpen: true,
// // // //             snackbarMessage: res.error,
// // // //             snackbarSeverity: 'error'
// // // //           });
// // // //         } else {
// // // //           this.setState({
// // // //             snackbarOpen: true,
// // // //             snackbarMessage: res.message,
// // // //             snackbarSeverity: 'success'
// // // //           });
// // // //           this.fetchAppointments(); // Refresh the appointments list
// // // //         }
// // // //       })
// // // //       .catch((error) => {
// // // //         this.setState({
// // // //           snackbarOpen: true,
// // // //           snackbarMessage: 'Failed to perform action',
// // // //           snackbarSeverity: 'error'
// // // //         });
// // // //       });
// // // //   };

// // // //   handleSnackbarClose = () => {
// // // //     this.setState({ snackbarOpen: false });
// // // //   };

// // // //   render() {
// // // //     const {
// // // //       appointmentsState,
// // // //       loading,
// // // //       error,
// // // //       snackbarOpen,
// // // //       snackbarMessage,
// // // //       snackbarSeverity
// // // //     } = this.state;

// // // //     if (loading) {
// // // //       return (
// // // //         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
// // // //           <CircularProgress />
// // // //         </Container>
// // // //       );
// // // //     }

// // // //     if (error) {
// // // //       return (
// // // //         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
// // // //           <Typography color="error">{error}</Typography>
// // // //         </Container>
// // // //       );
// // // //     }

// // // //     return (
// // // //       <>
// // // //         <CssBaseline />
// // // //         <Container>
// // // //           <Table>
// // // //             <TableHead>
// // // //               <TableRow>
// // // //                 <TableCell>Date</TableCell>
// // // //                 <TableCell>Start Time</TableCell>
// // // //                 <TableCell>ID</TableCell>
// // // //                 <TableCell>End Time</TableCell>
// // // //                 <TableCell>Concerns</TableCell>
// // // //                 <TableCell>Symptoms</TableCell>
// // // //                 <TableCell>Status</TableCell>
// // // //                 <TableCell>Actions</TableCell>
// // // //               </TableRow>
// // // //             </TableHead>
// // // //             <TableBody>
// // // //               {appointmentsState.length === 0 ? (
// // // //                 <TableRow>
// // // //                   <TableCell colSpan={7} align="center">
// // // //                     <Typography variant="h6">No appointments available.</Typography>
// // // //                   </TableCell>
// // // //                 </TableRow>
// // // //               ) : (
// // // //                 appointmentsState.map((appointment) => {
// // // //                   console.log('Appointment Object:', appointment); // Debugging line
// // // //                   return (
// // // //                     <TableRow key={appointment.ID}>
// // // //                       <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
// // // //                       <TableCell>{appointment.theStart.substring(0, 5)}</TableCell>
// // // //                       <TableCell>{appointment.ID}</TableCell>
// // // //                       <TableCell>{appointment.theEnd.substring(0, 5)}</TableCell>
// // // //                       <TableCell>{appointment.theConcerns}</TableCell>
// // // //                       <TableCell>{appointment.theSymptoms}</TableCell>
// // // //                       <TableCell>{appointment.status}</TableCell>
// // // //                       <TableCell>
// // // //                         <Button
// // // //                           variant="contained"
// // // //                           color="primary"
// // // //                           href={`/showDiagnoses/${appointment.ID}`}
// // // //                           style={{ marginRight: '10px' }}
// // // //                         >
// // // //                           See Diagnosis
// // // //                         </Button>
// // // //                         {appointment.status === 'NotDone' ? (
// // // //                           <Button
// // // //                             variant="contained"
// // // //                             color="secondary"
// // // //                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'cancel')}
// // // //                           >
// // // //                             Cancel
// // // //                           </Button>
// // // //                         ) : (
// // // //                           <Button
// // // //                             variant="contained"
// // // //                             color="error"
// // // //                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'delete')}
// // // //                           >
// // // //                             Delete
// // // //                           </Button>
// // // //                         )}
// // // //                       </TableCell>
// // // //                     </TableRow>
// // // //                   );
// // // //                 })
// // // //               )}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </Container>

// // // //         <Snackbar
// // // //           open={snackbarOpen}
// // // //           autoHideDuration={6000}
// // // //           onClose={this.handleSnackbarClose}
// // // //         >
// // // //           <Alert onClose={this.handleSnackbarClose} severity={snackbarSeverity}>
// // // //             {snackbarMessage}
// // // //           </Alert>
// // // //         </Snackbar>
// // // //       </>
// // // //     );
// // // //   }
// // // // }

// // // // export default PatientsViewAppointments;
// // // import React, { Component } from 'react';
// // // import {
// // //   Container,
// // //   Table,
// // //   TableHead,
// // //   TableRow,
// // //   TableCell,
// // //   TableBody,
// // //   Button,
// // //   Typography,
// // //   CssBaseline,
// // //   CircularProgress,
// // //   Snackbar,
// // //   Alert
// // // } from '@mui/material';

// // // class PatientsViewAppointments extends Component {
// // //   state = {
// // //     appointmentsState: [],
// // //     loading: true,
// // //     error: null,
// // //     snackbarOpen: false,
// // //     snackbarMessage: '',
// // //     snackbarSeverity: 'success'
// // //   };

// // //   componentDidMount() {
// // //     this.fetchAppointments();
// // //   }

// // //   fetchAppointments = () => {
// // //     fetch('http://localhost:3001/userInSession')
// // //       .then((res) => res.json())
// // //       .then((sessionRes) => {
// // //         const email_in_use = sessionRes.email;
// // //         fetch(`http://localhost:3001/patientViewAppt?email=${email_in_use}`)
// // //           .then((res) => res.json())
// // //           .then((apptRes) => {
// // //             if (apptRes.error) {
// // //               this.setState({ error: apptRes.error, loading: false });
// // //             } else {
// // //               this.setState({ appointmentsState: apptRes.data, loading: false });
// // //             }
// // //           })
// // //           .catch((error) => {
// // //             this.setState({ error: 'Failed to fetch appointments', loading: false });
// // //           });
// // //       })
// // //       .catch((error) => {
// // //         this.setState({ error: 'Failed to fetch user session', loading: false });
// // //       });
// // //   };

// // //   handleCancelOrDelete = (appointmentId, action) => {
// // //     console.log('Appointment ID:', appointmentId); // Debugging line
// // //     if (!appointmentId) {
// // //       this.setState({
// // //         snackbarOpen: true,
// // //         snackbarMessage: 'Appointment ID is missing',
// // //         snackbarSeverity: 'error'
// // //       });
// // //       return;
// // //     }

// // //     const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
// // //     const url = `http://localhost:3001/${endpoint}?uid=${appointmentId}`;
// // //     console.log('Request URL:', url); // Debugging line

// // //     fetch(url)
// // //       .then((res) => res.json())
// // //       .then((res) => {
// // //         if (res.error) {
// // //           this.setState({
// // //             snackbarOpen: true,
// // //             snackbarMessage: res.error,
// // //             snackbarSeverity: 'error'
// // //           });
// // //         } else {
// // //           this.setState({
// // //             snackbarOpen: true,
// // //             snackbarMessage: res.message,
// // //             snackbarSeverity: 'success'
// // //           });
// // //           this.fetchAppointments(); // Refresh the appointments list
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         this.setState({
// // //           snackbarOpen: true,
// // //           snackbarMessage: 'Failed to perform action',
// // //           snackbarSeverity: 'error'
// // //         });
// // //       });
// // //   };

// // //   handleSnackbarClose = () => {
// // //     this.setState({ snackbarOpen: false });
// // //   };

// // //   render() {
// // //     const {
// // //       appointmentsState,
// // //       loading,
// // //       error,
// // //       snackbarOpen,
// // //       snackbarMessage,
// // //       snackbarSeverity
// // //     } = this.state;

// // //     if (loading) {
// // //       return (
// // //         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
// // //           <CircularProgress />
// // //         </Container>
// // //       );
// // //     }

// // //     if (error) {
// // //       return (
// // //         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
// // //           <Typography color="error">{error}</Typography>
// // //         </Container>
// // //       );
// // //     }

// // //     return (
// // //       <>
// // //         <CssBaseline />
// // //         <Container>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>Date</TableCell>
// // //                 <TableCell>Start Time</TableCell>
// // //                 <TableCell>End Time</TableCell>
// // //                 <TableCell>Concerns</TableCell>
// // //                 <TableCell>Symptoms</TableCell>
// // //                 <TableCell>Status</TableCell>
// // //                 <TableCell>Actions</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {appointmentsState.length === 0 ? (
// // //                 <TableRow>
// // //                   <TableCell colSpan={7} align="center">
// // //                     <Typography variant="h6">No appointments available.</Typography>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ) : (
// // //                 appointmentsState.map((appointment) => {
// // //                   console.log('Appointment Object:', appointment); // Debugging line
// // //                   return (
// // //                     <TableRow key={appointment.ID}> {/* Use appointment.ID */}
// // //                       <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
// // //                       <TableCell>{appointment.theStart.substring(0, 5)}</TableCell>
// // //                       <TableCell>{appointment.theEnd.substring(0, 5)}</TableCell>
// // //                       <TableCell>{appointment.theConcerns}</TableCell>
// // //                       <TableCell>{appointment.theSymptoms}</TableCell>
// // //                       <TableCell>{appointment.status}</TableCell>
// // //                       <TableCell>
// // //                         <Button
// // //                           variant="contained"
// // //                           color="primary"
// // //                           href={`/showDiagnoses/${appointment.ID}`} 
// // //                           style={{ marginRight: '10px' }}
// // //                         >
// // //                           See Diagnosis
// // //                         </Button>
// // //                         {appointment.status === 'NotDone' ? (
// // //                           <Button
// // //                             variant="contained"
// // //                             color="secondary"
// // //                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'cancel')} 
// // //                           >
// // //                             Cancel
// // //                           </Button>
// // //                         ) : (
// // //                           <Button
// // //                             variant="contained"
// // //                             color="error"
// // //                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'delete')} 
// // //                           >
// // //                             Delete
// // //                           </Button>
// // //                         )}
// // //                       </TableCell>
// // //                     </TableRow>
// // //                   );
// // //                 })
// // //               )}
// // //             </TableBody>
// // //           </Table>
// // //         </Container>

// // //         <Snackbar
// // //           open={snackbarOpen}
// // //           autoHideDuration={6000}
// // //           onClose={this.handleSnackbarClose}
// // //         >
// // //           <Alert onClose={this.handleSnackbarClose} severity={snackbarSeverity}>
// // //             {snackbarMessage}
// // //           </Alert>
// // //         </Snackbar>
// // //       </>
// // //     );
// // //   }
// // // }

// // // export default PatientsViewAppointments;
// // import React, { Component } from 'react';
// // import {
// //   Container,
// //   Table,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   Button,
// //   Typography,
// //   CssBaseline,
// //   CircularProgress,
// //   Snackbar,
// //   Alert
// // } from '@mui/material';

// // class PatientsViewAppointments extends Component {
// //   state = {
// //     appointmentsState: [],
// //     loading: true,
// //     error: null,
// //     snackbarOpen: false,
// //     snackbarMessage: '',
// //     snackbarSeverity: 'success'
// //   };

// //   componentDidMount() {
// //     this.fetchAppointments();
// //   }

// //   fetchAppointments = () => {
// //     fetch('http://localhost:3001/userInSession')
// //       .then((res) => res.json())
// //       .then((sessionRes) => {
// //         const email_in_use = sessionRes.email;
// //         fetch(`http://localhost:3001/patientViewAppt?email=${email_in_use}`)
// //           .then((res) => res.json())
// //           .then((apptRes) => {
// //             if (apptRes.error) {
// //               this.setState({ error: apptRes.error, loading: false });
// //             } else {
// //               this.setState({ appointmentsState: apptRes.data, loading: false });
// //             }
// //           })
// //           .catch((error) => {
// //             this.setState({ error: 'Failed to fetch appointments', loading: false });
// //           });
// //       })
// //       .catch((error) => {
// //         this.setState({ error: 'Failed to fetch user session', loading: false });
// //       });
// //   };

// //   handleCancelOrDelete = (appointmentId, action) => {
// //     console.log('Appointment ID:', appointmentId); 
// //     if (!appointmentId) {
// //       this.setState({
// //         snackbarOpen: true,
// //         snackbarMessage: 'Appointment ID is missing',
// //         snackbarSeverity: 'error'
// //       });
// //       return;
// //     }

// //     const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
// //     const url = `http://localhost:3001/${endpoint}?uid=${appointmentId}`;
// //     console.log('Request URL:', url); 
// //     fetch(url)
// //       .then((res) => {
// //         if (!res.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return res.json();
// //       })
// //       .then((res) => {
// //         if (res.error) {
// //           this.setState({
// //             snackbarOpen: true,
// //             snackbarMessage: res.error,
// //             snackbarSeverity: 'error'
// //           });
// //         } else {
// //           this.setState({
// //             snackbarOpen: true,
// //             snackbarMessage: res.message,
// //             snackbarSeverity: 'success'
// //           });
// //           this.fetchAppointments(); 
// //         }
// //       })
// //       .catch((error) => {
// //         console.error('Error:', error); 
// //         this.setState({
// //           snackbarOpen: true,
// //           snackbarMessage: 'Failed to perform action',
// //           snackbarSeverity: 'error'
// //         });
// //       });
// //   };

// //   handleSnackbarClose = () => {
// //     this.setState({ snackbarOpen: false });
// //   };

// //   render() {
// //     const {
// //       appointmentsState,
// //       loading,
// //       error,
// //       snackbarOpen,
// //       snackbarMessage,
// //       snackbarSeverity
// //     } = this.state;

// //     if (loading) {
// //       return (
// //         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
// //           <CircularProgress />
// //         </Container>
// //       );
// //     }

// //     if (error) {
// //       return (
// //         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
// //           <Typography color="error">{error}</Typography>
// //         </Container>
// //       );
// //     }

// //     return (
// //       <>
// //         <CssBaseline />
// //         <Container>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>Date</TableCell>
// //                 <TableCell>Start Time</TableCell>
// //                 <TableCell>End Time</TableCell>
// //                 <TableCell>Concerns</TableCell>
// //                 <TableCell>Symptoms</TableCell>
// //                 <TableCell>Status</TableCell>
// //                 <TableCell>Actions</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {appointmentsState.length === 0 ? (
// //                 <TableRow>
// //                   <TableCell colSpan={7} align="center">
// //                     <Typography variant="h6">No appointments available.</Typography>
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 appointmentsState.map((appointment) => {
// //                   console.log('Appointment Object:', appointment); 
// //                   return (
// //                     <TableRow key={appointment.ID}> 
// //                       <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
// //                       <TableCell>{appointment.theStart.substring(0, 5)}</TableCell>
// //                       <TableCell>{appointment.theEnd.substring(0, 5)}</TableCell>
// //                       <TableCell>{appointment.theConcerns}</TableCell>
// //                       <TableCell>{appointment.theSymptoms}</TableCell>
// //                       <TableCell>{appointment.status}</TableCell>
// //                       <TableCell>
// //                         <Button
// //                           variant="contained"
// //                           color="primary"
// //                           href={`/showDiagnoses/${appointment.ID}`} 
// //                           style={{ marginRight: '10px' }}
// //                         >
// //                           See Diagnosis
// //                         </Button>
// //                         {appointment.status === 'NotDone' ? (
// //                           <Button
// //                             variant="contained"
// //                             color="secondary"
// //                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'cancel')} 
// //                           >
// //                             Cancel
// //                           </Button>
// //                         ) : (
// //                           <Button
// //                             variant="contained"
// //                             color="error"
// //                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'delete')} 
// //                           >
// //                             Delete
// //                           </Button>
// //                         )}
// //                       </TableCell>
// //                     </TableRow>
// //                   );
// //                 })
// //               )}
// //             </TableBody>
// //           </Table>
// //         </Container>

// //         <Snackbar
// //           open={snackbarOpen}
// //           autoHideDuration={6000}
// //           onClose={this.handleSnackbarClose}
// //         >
// //           <Alert onClose={this.handleSnackbarClose} severity={snackbarSeverity}>
// //             {snackbarMessage}
// //           </Alert>
// //         </Snackbar>
// //       </>
// //     );
// //   }
// // }

// // export default PatientsViewAppointments;
// import React, { Component } from 'react';
// import {
//   Container,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Typography,
//   CssBaseline,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Divider,
//   Chip,
//   Box,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import {
//   CalendarToday,
//   AccessTime,
//   MedicalServices,
//   Cancel,
//   Delete,
//   Assignment,
//   Person,
//   EventAvailable,
//   EventBusy,
//   Info,
//   LocalHospital
// } from '@mui/icons-material';

// class PatientsViewAppointments extends Component {
//   state = {
//     appointmentsState: [],
//     loading: true,
//     error: null,
//     snackbarOpen: false,
//     snackbarMessage: '',
//     snackbarSeverity: 'success',
//     stats: {
//       total: 0,
//       upcoming: 0,
//       completed: 0,
//       cancelled: 0
//     }
//   };

//   componentDidMount() {
//     this.fetchAppointments();
//   }

//   fetchAppointments = () => {
//     fetch('http://localhost:3001/userInSession')
//       .then((res) => res.json())
//       .then((sessionRes) => {
//         const email_in_use = sessionRes.email;
//         fetch(`http://localhost:3001/patientViewAppt?email=${email_in_use}`)
//           .then((res) => res.json())
//           .then((apptRes) => {
//             if (apptRes.error) {
//               this.setState({ error: apptRes.error, loading: false });
//             } else {
//               const stats = this.calculateStats(apptRes.data);
//               this.setState({ 
//                 appointmentsState: apptRes.data, 
//                 loading: false,
//                 stats 
//               });
//             }
//           })
//           .catch((error) => {
//             this.setState({ error: 'Failed to fetch appointments', loading: false });
//           });
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch user session', loading: false });
//       });
//   };

//   calculateStats = (appointments) => {
//     const now = new Date();
//     return {
//       total: appointments.length,
//       upcoming: appointments.filter(appt => 
//         appt.status === 'NotDone' && 
//         new Date(appt.theDate) > now
//       ).length,
//       completed: appointments.filter(appt => 
//         appt.status === 'Done'
//       ).length,
//       cancelled: appointments.filter(appt => 
//         appt.status === 'Cancelled'
//       ).length
//     };
//   };

//   handleCancelOrDelete = (appointmentId, action) => {
//     if (!appointmentId) {
//       this.setState({
//         snackbarOpen: true,
//         snackbarMessage: 'Appointment ID is missing',
//         snackbarSeverity: 'error'
//       });
//       return;
//     }

//     const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
//     fetch(`http://localhost:3001/${endpoint}?uid=${appointmentId}`)
//       .then((res) => {
//         if (!res.ok) throw new Error('Network response was not ok');
//         return res.json();
//       })
//       .then((res) => {
//         this.setState({
//           snackbarOpen: true,
//           snackbarMessage: res.error ? res.error : res.message,
//           snackbarSeverity: res.error ? 'error' : 'success'
//         });
//         if (!res.error) this.fetchAppointments();
//       })
//       .catch((error) => {
//         this.setState({
//           snackbarOpen: true,
//           snackbarMessage: 'Failed to perform action',
//           snackbarSeverity: 'error'
//         });
//       });
//   };

//   handleSnackbarClose = () => {
//     this.setState({ snackbarOpen: false });
//   };

//   render() {
//     const {
//       appointmentsState,
//       loading,
//       error,
//       snackbarOpen,
//       snackbarMessage,
//       snackbarSeverity,
//       stats
//     } = this.state;

//     if (loading) {
//       return (
//         <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//           <CircularProgress size={60} />
//         </Container>
//       );
//     }

//     if (error) {
//       return (
//         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
//           <Alert severity="error">{error}</Alert>
//         </Container>
//       );
//     }

//     return (
//       <>
//         <CssBaseline />
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           {/* Header Section */}
//           <Typography variant="h4" gutterBottom sx={{ 
//             fontWeight: 'bold',
//             color: 'primary.main',
//             display: 'flex',
//             alignItems: 'center',
//             mb: 3
//           }}>
//             <MedicalServices sx={{ mr: 2, fontSize: 'inherit' }} />
//             My Appointments
//           </Typography>

//           {/* Stats Cards */}
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatCard 
//                 title="Total Appointments"
//                 value={stats.total}
//                 icon={<EventAvailable color="primary" />}
//                 color="#1976d2"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatCard 
//                 title="Upcoming"
//                 value={stats.upcoming}
//                 icon={<CalendarToday color="success" />}
//                 color="#2e7d32"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatCard 
//                 title="Completed"
//                 value={stats.completed}
//                 icon={<Assignment color="action" />}
//                 color="#757575"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <StatCard 
//                 title="Cancelled"
//                 value={stats.cancelled}
//                 icon={<EventBusy color="error" />}
//                 color="#d32f2f"
//               />
//             </Grid>
//           </Grid>

//           {/* Main Content */}
//           <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
//             <Typography variant="h6" gutterBottom sx={{ 
//               display: 'flex',
//               alignItems: 'center',
//               mb: 2
//             }}>
//               <LocalHospital sx={{ mr: 1 }} />
//               Appointment Details
//             </Typography>
            
//             {appointmentsState.length === 0 ? (
//               <Card sx={{ textAlign: 'center', p: 4 }}>
//                 <Typography variant="h6" color="text.secondary">
//                   You don't have any appointments yet.
//                 </Typography>
//                 <Button 
//                   variant="contained" 
//                   color="primary" 
//                   sx={{ mt: 2 }}
//                   href="/book-appointment"
//                 >
//                   Book Your First Appointment
//                 </Button>
//               </Card>
//             ) : (
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {appointmentsState.map((appointment) => (
//                     <TableRow key={appointment.ID} hover>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <CalendarToday color="action" sx={{ mr: 1 }} />
//                           {new Date(appointment.theDate).toLocaleDateString()}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <AccessTime color="action" sx={{ mr: 1 }} />
//                           {appointment.theStart.substring(0, 5)} - {appointment.theEnd.substring(0, 5)}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box>
//                           <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                             {appointment.theConcerns || 'No concerns specified'}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             Symptoms: {appointment.theSymptoms || 'None'}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={appointment.status} 
//                           color={
//                             appointment.status === 'Done' ? 'success' : 
//                             appointment.status === 'Cancelled' ? 'error' : 'primary'
//                           } 
//                           variant="outlined"
//                           size="small"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Tooltip title="View Diagnosis">
//                             <IconButton
//                               color="primary"
//                               href={`/showDiagnoses/${appointment.ID}`}
//                             >
//                               <Assignment />
//                             </IconButton>
//                           </Tooltip>
                          
//                           {appointment.status === 'NotDone' ? (
//                             <Tooltip title="Cancel Appointment">
//                               <IconButton
//                                 color="warning"
//                                 onClick={() => this.handleCancelOrDelete(appointment.ID, 'cancel')}
//                               >
//                                 <Cancel />
//                               </IconButton>
//                             </Tooltip>
//                           ) : (
//                             <Tooltip title="Delete Record">
//                               <IconButton
//                                 color="error"
//                                 onClick={() => this.handleCancelOrDelete(appointment.ID, 'delete')}
//                               >
//                                 <Delete />
//                               </IconButton>
//                             </Tooltip>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </Paper>

//           {/* Help Section */}
//           <Card sx={{ mb: 4 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Info color="primary" sx={{ mr: 1 }} />
//                 Need Help With Appointments?
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="body1" gutterBottom>
//                     <strong>Booking:</strong> You can book new appointments through our online portal.
//                   </Typography>
//                   <Button 
//                     variant="outlined" 
//                     color="primary" 
//                     href="/scheduleAppt"
//                     sx={{ mt: 1 }}
//                   >
//                     Book Appointment
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="body1" gutterBottom>
//                     <strong>Cancellation Policy:</strong> Appointments can be cancelled up to 24 hours in advance.
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     For urgent cancellations, please call our office via 0114096574.
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Container>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={this.handleSnackbarClose}
//         >
//           <Alert 
//             onClose={this.handleSnackbarClose} 
//             severity={snackbarSeverity}
//             sx={{ width: '100%' }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </>
//     );
//   }
// }

// // StatCard Component
// const StatCard = ({ title, value, icon, color }) => (
//   <Card sx={{ 
//     height: '100%',
//     borderLeft: `4px solid ${color}`,
//     transition: 'transform 0.3s',
//     '&:hover': {
//       transform: 'translateY(-5px)'
//     }
//   }}>
//     <CardContent>
//       <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//         {title}
//       </Typography>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         {React.cloneElement(icon, { sx: { fontSize: 40, mr: 2 } })}
//         <Typography variant="h4" component="div">
//           {value}
//         </Typography>
//       </Box>
//     </CardContent>
//   </Card>
// );

// export default PatientsViewAppointments;
import React, { Component } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  CssBaseline,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  MedicalServices,
  Cancel,
  Delete,
  Assignment,
  EventAvailable,
  EventBusy,
  Info,
  LocalHospital,
  CheckCircle,
  Error
} from '@mui/icons-material';

class PatientsViewAppointments extends Component {
  state = {
    appointmentsState: [],
    loading: true,
    error: null,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success',
    stats: {
      total: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0
    },
    openCancelDialog: false,
    openDeleteDialog: false,
    selectedAppointmentId: null
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    fetch('http://localhost:3001/userInSession')
      .then((res) => res.json())
      .then((sessionRes) => {
        const email_in_use = sessionRes.email;
        fetch(`http://localhost:3001/patientViewAppt?email=${email_in_use}`)
          .then((res) => res.json())
          .then((apptRes) => {
            console.log("Fetched appointments:", apptRes);
            if (apptRes.error) {
              this.setState({ error: apptRes.error, loading: false });
            } else {
              const stats = this.calculateStats(apptRes.data);
              this.setState({ 
                appointmentsState: apptRes.data, 
                loading: false,
                stats 
              });
            }
          })
          .catch((error) => {
            this.setState({ error: 'Failed to fetch appointments', loading: false });
          });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch user session', loading: false });
      });
  };

  calculateStats = (appointments) => {
    const now = new Date();
    return {
      total: appointments.length,
      upcoming: appointments.filter(appt => 
        appt.status === 'NotDone'
      ).length,
      completed: appointments.filter(appt => 
        appt.status === 'Done'
      ).length,
      cancelled: appointments.filter(appt => 
        appt.status === 'Cancelled'
      ).length
    };
  };

  handleCancelClick = (appointmentId) => {
    this.setState({
      openCancelDialog: true,
      selectedAppointmentId: appointmentId
    });
  };

  handleDeleteClick = (appointmentId) => {
    this.setState({
      openDeleteDialog: true,
      selectedAppointmentId: appointmentId
    });
  };

  handleCancelConfirm = () => {
    this.handleCancelOrDelete(this.state.selectedAppointmentId, 'cancel');
    this.setState({ openCancelDialog: false });
  };

  handleDeleteConfirm = () => {
    this.handleCancelOrDelete(this.state.selectedAppointmentId, 'delete');
    this.setState({ openDeleteDialog: false });
  };

  handleDialogClose = () => {
    this.setState({ 
      openCancelDialog: false,
      openDeleteDialog: false,
      selectedAppointmentId: null
    });
  };

  handleCancelOrDelete = (appointmentId, action) => {
    if (!appointmentId) {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Appointment ID is missing',
        snackbarSeverity: 'error'
      });
      return;
    }

    const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
    fetch(`http://localhost:3001/${endpoint}?uid=${appointmentId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((res) => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: res.error ? res.error : res.message,
          snackbarSeverity: res.error ? 'error' : 'success'
        });
        if (!res.error) this.fetchAppointments();
      })
      .catch((error) => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage: 'Failed to perform action',
          snackbarSeverity: 'error'
        });
      });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const {
      appointmentsState,
      loading,
      error,
      snackbarOpen,
      snackbarMessage,
      snackbarSeverity,
      stats,
      openCancelDialog,
      openDeleteDialog
    } = this.state;

    if (loading) {
      return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress size={60} />
        </Container>
      );
    }

    if (error) {
      return (
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      );
    }

    return (
      <>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header Section */}
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            mb: 3
          }}>
            <MedicalServices sx={{ mr: 2, fontSize: 'inherit' }} />
            My Appointments
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Appointments"
                value={stats.total}
                icon={<EventAvailable color="primary" />}
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Upcoming"
                value={stats.upcoming}
                icon={<CalendarToday color="success" />}
                color="#2e7d32"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Completed"
                value={stats.completed}
                icon={<Assignment color="action" />}
                color="#757575"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Cancelled"
                value={stats.cancelled}
                icon={<EventBusy color="error" />}
                color="#d32f2f"
              />
            </Grid>
          </Grid>

          {/* Main Content */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <LocalHospital sx={{ mr: 1 }} />
              Appointment Details
            </Typography>
            
            {appointmentsState.length === 0 ? (
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  You don't have any appointments yet.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  href="/book-appointment"
                >
                  Book Your First Appointment
                </Button>
              </Card>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointmentsState.map((appointment) => (
                    <TableRow key={appointment.ID} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday color="action" sx={{ mr: 1 }} />
                          {new Date(appointment.theDate).toLocaleDateString()}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime color="action" sx={{ mr: 1 }} />
                          {appointment.theStart.substring(0, 5)} - {appointment.theEnd.substring(0, 5)}
                        </Box>
                      </TableCell>
                      <TableCell>{appointment.doctor || 'NO Doctor'}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {appointment.theConcerns || 'No concerns specified'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Symptoms: {appointment.theSymptoms || 'None'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.status} 
                          color={
                            appointment.status === 'Done' ? 'success' : 
                            appointment.status === 'Cancelled' ? 'error' : 'primary'
                          } 
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Diagnosis">
                            <IconButton
                              color="primary"
                              href={`/showDiagnoses/${appointment.ID}`}
                            >
                              <Assignment />
                            </IconButton>
                          </Tooltip>
                          
                          {appointment.status === 'NotDone' ? (
                            <Tooltip title="Cancel Appointment">
                              <IconButton
                                color="warning"
                                onClick={() => this.handleCancelClick(appointment.ID)}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Delete Record">
                              <IconButton
                                color="error"
                                onClick={() => this.handleDeleteClick(appointment.ID)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>

          {/* Help Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Info color="primary" sx={{ mr: 1 }} />
                Need Help With Appointments?
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Booking:</strong> You can book new appointments through our online portal.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    href="/scheduleAppt"
                    sx={{ mt: 1 }}
                  >
                    Book Appointment
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Cancellation Policy:</strong> Appointments can be cancelled up to 24 hours in advance.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    For urgent cancellations, please call our office.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>

        {/* Cancel Confirmation Dialog */}
        <Dialog
          open={openCancelDialog}
          onClose={this.handleDialogClose}
          aria-labelledby="cancel-dialog-title"
        >
          <DialogTitle id="cancel-dialog-title">Cancel Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel this appointment? 
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              No, Keep It
            </Button>
            <Button 
              onClick={this.handleCancelConfirm} 
              color="warning"
              variant="contained"
              startIcon={<Cancel />}
            >
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={this.handleDialogClose}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">Delete Appointment Record</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to permanently delete this appointment record?
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              No, Keep It
            </Button>
            <Button 
              onClick={this.handleDeleteConfirm} 
              color="error"
              variant="contained"
              startIcon={<Delete />}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <Alert 
            onClose={this.handleSnackbarClose} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
            iconMapping={{
              success: <CheckCircle fontSize="inherit" />,
              error: <Error fontSize="inherit" />
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

// StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ 
    height: '100%',
    borderLeft: `4px solid ${color}`,
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {React.cloneElement(icon, { sx: { fontSize: 40, mr: 2 } })}
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default PatientsViewAppointments;