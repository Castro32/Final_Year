// // // import React, { Component } from 'react';
// // // import {
// // //   Container,
// // //   Table,
// // //   TableHead,
// // //   TableRow,
// // //   TableCell,
// // //   TableBody,
// // //   Button,
// // //   AppBar,
// // //   Toolbar,
// // //   Typography,
// // //   CssBaseline
// // // } from '@mui/material';

// // // export class PatientsViewAppointments extends Component {
// // //   state = { appointmentsState: [] }

// // //   componentDidMount() {
// // //     this.getNames("");
// // //   }

// // //   getNames(value) {
// // //     let patName = value;
// // //     console.log(patName);
// // //     fetch("http://localhost:3001/userInSession")
// // //       .then(res => res.json())
// // //       .then(res => {
// // //         var string_json = JSON.stringify(res);
// // //         var email_json = JSON.parse(string_json);
// // //         let email_in_use = email_json.email;
// // //         fetch('http://localhost:3001/patientViewAppt?email=' + email_in_use)
// // //           .then(res => res.json())
// // //           .then(res => {
// // //             this.setState({ appointmentsState: res.data });
// // //           });
// // //       });
// // //   }

// // //   render() {
// // //     const { appointmentsState } = this.state;

// // //     const Body = () => (
// // //       <Container className="container">
// // //         <div className="panel panel-default p50 uth-panel">
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>Date of Appointment</TableCell>
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
// // //                     <Typography variant="h6">
// // //                       No appointments available.
// // //                     </Typography>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ) : (
// // //                 appointmentsState.map(patient => (
// // //                   <TableRow key={patient.user}>
// // //                     <TableCell align="center">
// // //                       {new Date(patient.theDate).toLocaleDateString().substring(0, 10)}
// // //                     </TableCell>
// // //                     <TableCell align="center">{patient.theStart.substring(0, 5)}</TableCell>
// // //                     <TableCell align="center">{patient.theEnd.substring(0, 5)}</TableCell>
// // //                     <TableCell align="center">{patient.theConcerns}</TableCell>
// // //                     <TableCell align="center">{patient.theSymptoms}</TableCell>
// // //                     <TableCell align="center">{patient.status}</TableCell>
// // //                     <TableCell align="center">
// // //                       <Button
// // //                         variant="contained"
// // //                         color="primary"
// // //                         href={`/showDiagnoses/${patient.ID}`}
// // //                       >
// // //                         See Diagnosis
// // //                       </Button>
// // //                     </TableCell>
// // //                     <TableCell align="center">
// // //                       {patient.status === "NotDone" ? (
// // //                         <Button
// // //                           variant="contained"
// // //                           color="secondary"
// // //                           onClick={() => {
// // //                             fetch('http://localhost:3001/deleteAppt?uid=' + patient.ID);
// // //                             window.location.reload();
// // //                           }}
// // //                         >
// // //                           Cancel
// // //                         </Button>
// // //                       ) : (
// // //                         <Button
// // //                           variant="contained"
// // //                           color="secondary"
// // //                           onClick={() => {
// // //                             fetch('http://localhost:3001/deleteAppt?uid=' + patient.ID);
// // //                             window.location.reload();
// // //                           }}
// // //                         >
// // //                           Delete
// // //                         </Button>
// // //                       )}
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 ))
// // //               )}
// // //             </TableBody>
// // //           </Table>
// // //         </div>
// // //       </Container>
// // //     );

// // //     return (
// // //       <>
// // //         <CssBaseline />
// // //         {/* <AppBar position="static">
// // //           <Toolbar>
// // //             <Typography variant="h6">
// // //               <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">HMS</a>
// // //             </Typography>
// // //           </Toolbar>
// // //         </AppBar> */}
// // //         <Body />
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

// //   handleCancelOrDelete = (appointmentID, action) => {
// //     console.log('Appointment ID:', appointmentID); // Debugging line
// //     if (!appointmentID) {
// //       this.setState({
// //         snackbarOpen: true,
// //         snackbarMessage: 'Appointment ID is missing',
// //         snackbarSeverity: 'error'
// //       });
// //       return;
// //     }

// //     const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
// //     fetch(`http://localhost:3001/${endpoint}?uid=${appointmentID}`)
// //       .then((res) => res.json())
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
// //           this.fetchAppointments(); // Refresh the appointments list
// //         }
// //       })
// //       .catch((error) => {
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
// //                 <TableCell>ID</TableCell>
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
// //                   console.log('Appointment Object:', appointment); // Debugging line
// //                   return (
// //                     <TableRow key={appointment.ID}>
// //                       <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
// //                       <TableCell>{appointment.theStart.substring(0, 5)}</TableCell>
// //                       <TableCell>{appointment.ID}</TableCell>
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
//   Alert
// } from '@mui/material';

// class PatientsViewAppointments extends Component {
//   state = {
//     appointmentsState: [],
//     loading: true,
//     error: null,
//     snackbarOpen: false,
//     snackbarMessage: '',
//     snackbarSeverity: 'success'
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
//               this.setState({ appointmentsState: apptRes.data, loading: false });
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

//   handleCancelOrDelete = (appointmentId, action) => {
//     console.log('Appointment ID:', appointmentId); // Debugging line
//     if (!appointmentId) {
//       this.setState({
//         snackbarOpen: true,
//         snackbarMessage: 'Appointment ID is missing',
//         snackbarSeverity: 'error'
//       });
//       return;
//     }

//     const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
//     const url = `http://localhost:3001/${endpoint}?uid=${appointmentId}`;
//     console.log('Request URL:', url); // Debugging line

//     fetch(url)
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.error) {
//           this.setState({
//             snackbarOpen: true,
//             snackbarMessage: res.error,
//             snackbarSeverity: 'error'
//           });
//         } else {
//           this.setState({
//             snackbarOpen: true,
//             snackbarMessage: res.message,
//             snackbarSeverity: 'success'
//           });
//           this.fetchAppointments(); // Refresh the appointments list
//         }
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
//       snackbarSeverity
//     } = this.state;

//     if (loading) {
//       return (
//         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
//           <CircularProgress />
//         </Container>
//       );
//     }

//     if (error) {
//       return (
//         <Container style={{ textAlign: 'center', marginTop: '20px' }}>
//           <Typography color="error">{error}</Typography>
//         </Container>
//       );
//     }

//     return (
//       <>
//         <CssBaseline />
//         <Container>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Start Time</TableCell>
//                 <TableCell>End Time</TableCell>
//                 <TableCell>Concerns</TableCell>
//                 <TableCell>Symptoms</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {appointmentsState.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     <Typography variant="h6">No appointments available.</Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 appointmentsState.map((appointment) => {
//                   console.log('Appointment Object:', appointment); // Debugging line
//                   return (
//                     <TableRow key={appointment.ID}> {/* Use appointment.ID */}
//                       <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
//                       <TableCell>{appointment.theStart.substring(0, 5)}</TableCell>
//                       <TableCell>{appointment.theEnd.substring(0, 5)}</TableCell>
//                       <TableCell>{appointment.theConcerns}</TableCell>
//                       <TableCell>{appointment.theSymptoms}</TableCell>
//                       <TableCell>{appointment.status}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           href={`/showDiagnoses/${appointment.ID}`} 
//                           style={{ marginRight: '10px' }}
//                         >
//                           See Diagnosis
//                         </Button>
//                         {appointment.status === 'NotDone' ? (
//                           <Button
//                             variant="contained"
//                             color="secondary"
//                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'cancel')} 
//                           >
//                             Cancel
//                           </Button>
//                         ) : (
//                           <Button
//                             variant="contained"
//                             color="error"
//                             onClick={() => this.handleCancelOrDelete(appointment.ID, 'delete')} 
//                           >
//                             Delete
//                           </Button>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </Container>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={this.handleSnackbarClose}
//         >
//           <Alert onClose={this.handleSnackbarClose} severity={snackbarSeverity}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </>
//     );
//   }
// }

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
  Alert
} from '@mui/material';

class PatientsViewAppointments extends Component {
  state = {
    appointmentsState: [],
    loading: true,
    error: null,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success'
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
            if (apptRes.error) {
              this.setState({ error: apptRes.error, loading: false });
            } else {
              this.setState({ appointmentsState: apptRes.data, loading: false });
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

  handleCancelOrDelete = (appointmentId, action) => {
    console.log('Appointment ID:', appointmentId); 
    if (!appointmentId) {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Appointment ID is missing',
        snackbarSeverity: 'error'
      });
      return;
    }

    const endpoint = action === 'cancel' ? 'cancelAppt' : 'deleteAppt';
    const url = `http://localhost:3001/${endpoint}?uid=${appointmentId}`;
    console.log('Request URL:', url); 
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: res.error,
            snackbarSeverity: 'error'
          });
        } else {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: res.message,
            snackbarSeverity: 'success'
          });
          this.fetchAppointments(); 
        }
      })
      .catch((error) => {
        console.error('Error:', error); 
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
      snackbarSeverity
    } = this.state;

    if (loading) {
      return (
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Container>
      );
    }

    if (error) {
      return (
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography color="error">{error}</Typography>
        </Container>
      );
    }

    return (
      <>
        <CssBaseline />
        <Container>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
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
                    <Typography variant="h6">No appointments available.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                appointmentsState.map((appointment) => {
                  console.log('Appointment Object:', appointment); 
                  return (
                    <TableRow key={appointment.ID}> 
                      <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
                      <TableCell>{appointment.theStart.substring(0, 5)}</TableCell>
                      <TableCell>{appointment.theEnd.substring(0, 5)}</TableCell>
                      <TableCell>{appointment.theConcerns}</TableCell>
                      <TableCell>{appointment.theSymptoms}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          href={`/showDiagnoses/${appointment.ID}`} 
                          style={{ marginRight: '10px' }}
                        >
                          See Diagnosis
                        </Button>
                        {appointment.status === 'NotDone' ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.handleCancelOrDelete(appointment.ID, 'cancel')} 
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => this.handleCancelOrDelete(appointment.ID, 'delete')} 
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Container>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <Alert onClose={this.handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default PatientsViewAppointments;