// // // // // import React, { Component} from 'react';

// // // // // import {
// // // // //     Box,
// // // // //     Heading,
// // // // //     Grommet,
// // // // //     Table,
// // // // //     TableBody,
// // // // //     TableCell,
// // // // //     TableRow
// // // // // } from 'mui';

// // // // // const theme = {
// // // // //     global: {
// // // // //         colors: {
// // // // //             brand: '#000000',
// // // // //             focus: '#000000'
// // // // //         },
// // // // //         font: {
// // // // //             family: 'Lato',
// // // // //         },
// // // // //     },
// // // // // };

// // // // // export class ViewOneHistory extends Component {
// // // // //     state = { medhiststate: [], medhiststate2: []}
// // // // //     componentDidMount() {
// // // // //         const { email } = this.props.match.params;
// // // // //         this.allDiagnoses(email);
// // // // //         this.getHistory(email);
// // // // //     }

// // // // //     getHistory(value) {
// // // // //         let email = "'" + value + "'";
// // // // //         fetch('http://localhost:3001/OneHistory?patientEmail='+ email)
// // // // //         .then(res => res.json())
// // // // //             .then(res => this.setState({ medhiststate: res.data }));
// // // // //     }

// // // // //     allDiagnoses(value) {
// // // // //         let email = "'" + value + "'";
// // // // //         fetch('http://localhost:3001/allDiagnoses?patientEmail='+ email)
// // // // //         .then(res => res.json())
// // // // //         .then(res => this.setState({ medhiststate2: res.data }));
// // // // //     }

// // // // //     render() {
// // // // //         const { medhiststate } = this.state;
// // // // //         const { medhiststate2 } = this.state;
// // // // //         const Header = () => (
// // // // //             <Box
// // // // //                 tag='header'
// // // // //                 background='brand'
// // // // //                 pad='small'
// // // // //                 elevation='small'
// // // // //                 justify='between'
// // // // //                 direction='row'
// // // // //                 align='center'
// // // // //                 flex={false}
// // // // //             >
// // // // //                 <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>HMS</Heading></a>
// // // // //             </Box>
// // // // //         );
// // // // //         const Body = () => (
// // // // //             <div className="container">
// // // // //                 <div className="panel panel-default p50 uth-panel">
// // // // //                     {medhiststate.map(patient =>
// // // // //                         <Table>
// // // // //                             <TableBody>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                         <strong>Name</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.name}</TableCell>
// // // // //                                     <TableCell></TableCell>
// // // // //                                     <TableCell><strong>Email</strong></TableCell>
// // // // //                                     <TableCell>{patient.email}</TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                         <strong>Gender</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>
// // // // //                                         {patient.gender}
// // // // //                                     </TableCell>
// // // // //                                     <TableCell />
// // // // //                                     <TableCell>
// // // // //                                         <strong>Address</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.address}</TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell>
// // // // //                                         <strong>Conditions</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.conditions}
// // // // //                                         </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell>
// // // // //                                         <strong>Surgeries</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.surgeries}
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell>
// // // // //                                         <strong>Medications</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.medication}
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                             </TableBody>
// // // // //                         </Table>
// // // // //                     )}
// // // // //                 </div>
// // // // //                 <hr />
// // // // //             </div>
// // // // //         );
// // // // //         const Body2 = () => (
// // // // //             <div className="container">
// // // // //                 <div className="panel panel-default p50 uth-panel">
// // // // //                     {medhiststate2.map(patient =>
// // // // //                         <div>
// // // // //                         <Table>
// // // // //                             <TableBody>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                         <strong>Date</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.date.split('T')[0]}</TableCell>
// // // // //                                     <TableCell></TableCell>
// // // // //                                     <TableCell><strong>Doctor</strong></TableCell>
// // // // //                                     <TableCell>{patient.doctor}</TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                         <strong>Concerns</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>
// // // // //                                         {patient.concerns}
// // // // //                                     </TableCell>
// // // // //                                     <TableCell />
// // // // //                                     <TableCell>
// // // // //                                         <strong>Symptoms</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.symptoms}</TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell>
// // // // //                                         <strong>Diagnosis</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.diagnosis}
// // // // //                                         </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell>
// // // // //                                         <strong>Prescription</strong>
// // // // //                                     </TableCell>
// // // // //                                     <TableCell>{patient.prescription}
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                                 <TableRow>
// // // // //                                     <TableCell scope="row">
// // // // //                                     </TableCell>
// // // // //                                 </TableRow>
// // // // //                             </TableBody>
// // // // //                         </Table>
// // // // //                         <hr />
// // // // //                         </div>
// // // // //                     )}
// // // // //                 </div>
// // // // //             </div>
// // // // //         );
// // // // //         return (
// // // // //             <Grommet full={true} theme={theme}>
// // // // //                 <Box fill={true}>
// // // // //                     <Header />
// // // // //                     <Body />
// // // // //                     <Body2 />
// // // // //                 </Box>
// // // // //             </Grommet>
// // // // //         );
// // // // //     }
// // // // // }
// // // // // export default ViewOneHistory;
// // // // import React, { Component } from 'react';
// // // // import {
// // // //     Box,
// // // //     Typography,
// // // //     Table,
// // // //     TableBody,
// // // //     TableCell,
// // // //     TableRow,
// // // //     Container,
// // // //     Paper,
// // // //     AppBar,
// // // //     Toolbar
// // // // } from '@mui/material';

// // // // export class ViewOneHistory extends Component {
// // // //     state = { medhiststate: [], medhiststate2: [] }

// // // //     componentDidMount() {
// // // //         const { email } = this.props.match.params;
// // // //         this.allDiagnoses(email);
// // // //         this.getHistory(email);
// // // //     }

// // // //     getHistory(value) {
// // // //         let email = "'" + value + "'";
// // // //         fetch('http://localhost:3001/OneHistory?patientEmail=' + email)
// // // //             .then(res => res.json())
// // // //             .then(res => this.setState({ medhiststate: res.data }));
// // // //     }

// // // //     allDiagnoses(value) {
// // // //         let email = "'" + value + "'";
// // // //         fetch('http://localhost:3001/allDiagnoses?patientEmail=' + email)
// // // //             .then(res => res.json())
// // // //             .then(res => this.setState({ medhiststate2: res.data }));
// // // //     }

// // // //     render() {
// // // //         const { medhiststate } = this.state;
// // // //         const { medhiststate2 } = this.state;

// // // //         const Header = () => (
// // // //             <AppBar position="static">
// // // //                 <Toolbar>
// // // //                     <Typography variant="h6" component="a" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
// // // //                         HMS
// // // //                     </Typography>
// // // //                 </Toolbar>
// // // //             </AppBar>
// // // //         );

// // // //         const Body = () => (
// // // //             <Container>
// // // //                 <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
// // // //                     {medhiststate.map(patient =>
// // // //                         <Table key={patient.email}>
// // // //                             <TableBody>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Name</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.name}</TableCell>
// // // //                                     <TableCell></TableCell>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Email</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.email}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Gender</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>
// // // //                                         {patient.gender}
// // // //                                     </TableCell>
// // // //                                     <TableCell />
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Address</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.address}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Conditions</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.conditions}
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Surgeries</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.surgeries}
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell component="th" scope="row">
// // // //                                         <strong>Medications</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.medication}
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                             </TableBody>
// // // //                         </Table>
// // // //                     )}
// // // //                 </Paper>
// // // //                 <hr />
// // // //             </Container>
// // // //         );

// // // //         const Body2 = () => (
// // // //             <Container>
// // // //                 <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
// // // //                     {medhiststate2.map(patient =>
// // // //                         <div key={patient.date}>
// // // //                             <Table>
// // // //                                 <TableBody>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                             <strong>Date</strong>
// // // //                                         </TableCell>
// // // //                                         <TableCell>{patient.date.split('T')[0]}</TableCell>
// // // //                                         <TableCell></TableCell>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                             <strong>Doctor</strong>
// // // //                                         </TableCell>
// // // //                                         <TableCell>{patient.doctor}</TableCell>
// // // //                                     </TableRow>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                             <strong>Concerns</strong>
// // // //                                         </TableCell>
// // // //                                         <TableCell>
// // // //                                             {patient.concerns}
// // // //                                         </TableCell>
// // // //                                         <TableCell />
// // // //                                         <TableCell component="th" scope="row">
// // // //                                             <strong>Symptoms</strong>
// // // //                                         </TableCell>
// // // //                                         <TableCell>{patient.symptoms}</TableCell>
// // // //                                     </TableRow>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                             <strong>Diagnosis</strong>
// // // //                                         </TableCell>
// // // //                                         <TableCell>{patient.diagnosis}
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                             <strong>Prescription</strong>
// // // //                                         </TableCell>
// // // //                                         <TableCell>{patient.prescription}
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                     <TableRow>
// // // //                                         <TableCell component="th" scope="row">
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                 </TableBody>
// // // //                             </Table>
// // // //                             <hr />
// // // //                         </div>
// // // //                     )}
// // // //                 </Paper>
// // // //             </Container>
// // // //         );

// // // //         return (
// // // //             <Box>
// // // //                 <Header />
// // // //                 <Body />
// // // //                 <Body2 />
// // // //             </Box>
// // // //         );
// // // //     }
// // // // }

// // // // export default ViewOneHistory;
// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import {
// //     Box,
// //     Typography,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableRow,
// //     Container,
// //     Paper,
// //     AppBar,
// //     Toolbar
// // } from '@mui/material';

// // const ViewOneHistory = () => {
// //     const { email } = useParams();
// //     const [medhiststate, setMedhiststate] = useState([]);
// //     const [medhiststate2, setMedhiststate2] = useState([]);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchHistory = async () => {
// //             try {
// //                 const res = await fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`);
// //                 if (!res.ok) {
// //                     throw new Error('Network response was not ok');
// //                 }
// //                 const data = await res.json();
// //                 setMedhiststate(data.data);
// //             } catch (error) {
// //                 console.error('Error fetching history:', error);
// //                 setError('Error fetching history');
// //             }
// //         };

// //         const fetchDiagnoses = async () => {
// //             // try {
// //             //     const res = await fetch(`http://localhost:3001/allDiagnoses?patientEmail=${email}`);
// //             //     if (!res.ok) {
// //             //         throw new Error('Network response was not ok');
// //             //     }
// //             //     const data = await res.json();
// //             //     setMedhiststate2(data.data);
// //             // } catch (error) {
// //             //     console.error('Error fetching diagnoses:', error);
// //             //     setError('Error fetching diagnoses');
// //             // }
// //         };

// //         fetchHistory();
// //         fetchDiagnoses();
// //     }, [email]);

// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     const Header = () => (
// //         <AppBar position="static">
// //             <Toolbar>
// //                 <Typography variant="h6" component="a" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
// //                     HMS
// //                 </Typography>
// //             </Toolbar>
// //         </AppBar>
// //     );

// //     const Body = () => (
// //         <Container>
// //             <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
// //                 {medhiststate && medhiststate.length > 0 ? (
// //                     medhiststate.map((patient, index) => (
// //                         <Table key={index}>
// //                             <TableBody>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Name</strong>
// //                                     </TableCell>
// //                                     <TableCell>{patient.name}</TableCell>
// //                                     <TableCell></TableCell>
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Email</strong>
// //                                     </TableCell>
// //                                     <TableCell>{patient.email}</TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Gender</strong>
// //                                     </TableCell>
// //                                     <TableCell>
// //                                         {patient.gender}
// //                                     </TableCell>
// //                                     <TableCell />
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Address</strong>
// //                                     </TableCell>
// //                                     <TableCell>{patient.address}</TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                     </TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Conditions</strong>
// //                                     </TableCell>
// //                                     <TableCell>{patient.conditions}
// //                                     </TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                     </TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Surgeries</strong>
// //                                     </TableCell>
// //                                     <TableCell>{patient.surgeries}
// //                                     </TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                     </TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell component="th" scope="row">
// //                                         <strong>Medications</strong>
// //                                     </TableCell>
// //                                     <TableCell>{patient.medication}
// //                                     </TableCell>
// //                                 </TableRow>
// //                             </TableBody>
// //                         </Table>
// //                     ))
// //                 ) : (
// //                     <Typography>No medical history available.</Typography>
// //                 )}
// //             </Paper>
// //             <hr />
// //         </Container>
// //     );

// //     const Body2 = () => (
// //         <Container>
// //             <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
// //                 {medhiststate2 && medhiststate2.length > 0 ? (
// //                     medhiststate2.map((patient, index) => (
// //                         <div key={index}>
// //                             <Table>
// //                                 <TableBody>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                             <strong>Date</strong>
// //                                         </TableCell>
// //                                         <TableCell>{patient.date.split('T')[0]}</TableCell>
// //                                         <TableCell></TableCell>
// //                                         <TableCell component="th" scope="row">
// //                                             <strong>Doctor</strong>
// //                                         </TableCell>
// //                                         <TableCell>{patient.doctor}</TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                             <strong>Concerns</strong>
// //                                         </TableCell>
// //                                         <TableCell>
// //                                             {patient.concerns}
// //                                         </TableCell>
// //                                         <TableCell />
// //                                         <TableCell component="th" scope="row">
// //                                             <strong>Symptoms</strong>
// //                                         </TableCell>
// //                                         <TableCell>{patient.symptoms}</TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                         </TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                             <strong>Diagnosis</strong>
// //                                         </TableCell>
// //                                         <TableCell>{patient.diagnosis}
// //                                         </TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                         </TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                             <strong>Prescription</strong>
// //                                         </TableCell>
// //                                         <TableCell>{patient.prescription}
// //                                         </TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 </TableBody>
// //                             </Table>
// //                             <hr />
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <Typography>No diagnoses available.</Typography>
// //                 )}
// //             </Paper>
// //         </Container>
// //     );

// //     return (
// //         <Box>
// //             <Header />
// //             <Body />
// //             <Body2 />
// //         </Box>
// //     );
// // };

// // export default ViewOneHistory;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableRow,
//     Container,
//     Paper,
//     AppBar,
//     Toolbar
// } from '@mui/material';

// const ViewOneHistory = () => {
//     const { email } = useParams();
//     const [medhiststate, setMedhiststate] = useState([]);
//     const [medhiststate2, setMedhiststate2] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 const res = await fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`);
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await res.json();
//                 setMedhiststate(data.data);
//             } catch (error) {
//                 console.error('Error fetching history:', error);
//                 setError('Error fetching history');
//             }
//         };

//         const fetchDiagnoses = async () => {
//             // try {
//             //     const res = await fetch(`http://localhost:3001/allDiagnoses?patientEmail=${email}`);

//             //     // Log the full response for debugging
//             //     console.log('Response status:', res.status);

//             //     if (!res.ok) {
//             //         const errorData = await res.json().catch(e => ({ error: 'Could not parse error response' }));
//             //         console.log('Error response:', errorData);
//             //         throw new Error(errorData.error || `Server error: ${res.status}`);
//             //     }

//             //     const data = await res.json();
//             //     setMedhiststate2(data.data);
//             // } catch (error) {
//             //     console.error('Detailed error:', {
//             //         message: error.message,
//             //         stack: error.stack
//             //     });
//             //     setError(`Error fetching diagnoses: ${error.message}`);
//             // }
//         };

//         fetchHistory();
//         fetchDiagnoses();
//     }, [email]);

//     if (error) {
//         return <div>{error}</div>;
//     }

//     const Header = () => (
//         <AppBar position="static">
//             {/* <Toolbar>
//                 <Typography variant="h6" component="a" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//                     HMS
//                 </Typography>
//             </Toolbar> */}
//         </AppBar>
//     );

//     const Body = () => (
//         <Container>
//             <div style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             }}>
//             <Typography style={{ fontWeight:"bolder" }}>My Details</Typography>
//             </div>

//             <Box elevation={10} >
//                 {medhiststate && medhiststate.length > 0 ? (
//                     medhiststate.map((patient, index) => (
                        
//                         <Table key={index}>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Name</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.patient_name}</TableCell>
//                                     <TableCell></TableCell>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Email</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.patient_email}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Gender</strong>
//                                     </TableCell>
//                                     <TableCell>
//                                         {patient.patient_gender}
//                                     </TableCell>
//                                     <TableCell />
//                                     <TableCell component="th" scope="row">
//                                         <strong>Address</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.patient_address}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Conditions</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.conditions}
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Surgeries</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.surgeries}
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Medications</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.medication}
//                                     </TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     ))
//                 ) : (
//                     <Typography>No medical history available.</Typography>
//                 )}
//             </Box>
//             <hr />
//         </Container>
//     );

//     const Body2 = () => (
//         <Container>
//             <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//                 {medhiststate2 && medhiststate2.length > 0 ? (
//                     medhiststate2.map((patient, index) => (
//                         <div key={index}>
//                             <Table>
//                                 <TableBody>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             <strong>Date</strong>
//                                         </TableCell>
//                                         <TableCell>{patient.appointment_date.split('T')[0]}</TableCell>
//                                         <TableCell></TableCell>
//                                         <TableCell component="th" scope="row">
//                                             <strong>Doctor</strong>
//                                         </TableCell>
//                                         <TableCell>{patient.doctor}</TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             <strong>Concerns</strong>
//                                         </TableCell>
//                                         <TableCell>
//                                             {patient.concerns}
//                                         </TableCell>
//                                         <TableCell />
//                                         <TableCell component="th" scope="row">
//                                             <strong>Symptoms</strong>
//                                         </TableCell>
//                                         <TableCell>{patient.symptoms}</TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                         </TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             <strong>Diagnosis</strong>
//                                         </TableCell>
//                                         <TableCell>{patient.diagnosis}
//                                         </TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                         </TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             <strong>Prescription</strong>
//                                         </TableCell>
//                                         <TableCell>{patient.prescription}
//                                         </TableCell>
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableBody>
//                             </Table>
//                             <hr />
//                         </div>
//                     ))
//                 ) : (
//                     <Typography>No diagnoses available.</Typography>
//                 )}
//             </Paper>
//         </Container>
//     );

//     return (
//         <Box>
//             <Header />
//             <Body />
//             {medhiststate2.length > 0 ? <Body2 /> : null}
//         </Box>
//     );
// };

// export default ViewOneHistory;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Container,
    Paper,
    AppBar,
    Toolbar,
    Avatar,
    Divider,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Chip
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Home as HomeIcon,
    MedicalServices as MedicalServicesIcon,
    LocalHospital as LocalHospitalIcon,
    Medication as MedicationIcon,
    CalendarToday as CalendarTodayIcon,
    Work as WorkIcon,
    Accessibility as AccessibilityIcon,
    Favorite as FavoriteIcon,
    Bloodtype as BloodtypeIcon,
    Height as HeightIcon,
    MonitorWeight as MonitorWeightIcon
} from '@mui/icons-material';

const ViewOneHistory = () => {
    const { email } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [vitalSigns, setVitalSigns] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch basic patient info
                const patientRes = await fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`);
                console.log(patientRes);
                if (!patientRes.ok) throw new Error('Failed to fetch patient data');
                const patientData = await patientRes.json();
                setPatientData(patientData.data[0]);
                setMedicalHistory(patientData.data);

                // Fetch diagnoses (uncomment when ready)
                // const diagRes = await fetch(`http://localhost:3001/allDiagnoses?patientEmail=${email}`);
                // if (!diagRes.ok) throw new Error('Failed to fetch diagnoses');
                // const diagData = await diagRes.json();
                // setDiagnoses(diagData.data);

                // Mock vital signs (replace with actual API call)
                setVitalSigns({
                    bloodPressure: '120/80 mmHg',
                    heartRate: '72 bpm',
                    temperature: '98.6°F',
                    respiratoryRate: '16 breaths/min',
                    bloodType: 'A+',
                    height: '175 cm',
                    weight: '70 kg',
                    bmi: '22.9',
                    lastUpdated: new Date().toLocaleDateString()
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    if (loading) return <div>Loading patient data...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!patientData) return <div>No patient data found</div>;

    const Header = () => (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {patientData.patient_name}
                </Typography>
                <Typography variant="subtitle1">
                    {new Date().toLocaleDateString()}
                </Typography>
            </Toolbar>
        </AppBar>
    );

    const PatientProfileSection = () => (
        <Card sx={{ mb: 4 }} elevation={3}>
            <CardContent>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main' }}>
                            <PersonIcon sx={{ fontSize: 60 }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h4" gutterBottom>
                            {patientData.patient_name}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" gutterBottom>
                                    <EmailIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    {patientData.patient_email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <HomeIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    {patientData.patient_address || 'Not specified'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body1" gutterBottom>
                                    <AccessibilityIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    Gender: {patientData.patient_gender || 'Not specified'}
                                </Typography>
                                <Typography variant="body1">
                                    <CalendarTodayIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    Date Registered: {patientData.history_date || 'Not specified'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    const VitalSignsSection = () => (
        <Card sx={{ mb: 4 }} elevation={3}>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <FavoriteIcon color="primary" sx={{ mr: 1 }} /> Vital Signs
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <strong>Blood Pressure:</strong> {vitalSigns.bloodPressure}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <strong>Heart Rate:</strong> {vitalSigns.heartRate}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <strong>Temperature:</strong> {vitalSigns.temperature}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <strong>Respiratory Rate:</strong> {vitalSigns.respiratoryRate}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <BloodtypeIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            <strong>Blood Type:</strong> {vitalSigns.bloodType}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <HeightIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            <strong>Height:</strong> {vitalSigns.height}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <MonitorWeightIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            <strong>Weight:</strong> {vitalSigns.weight}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="body1">
                            <strong>BMI:</strong> {vitalSigns.bmi}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'right' }}>
                    Last updated: {vitalSigns.lastUpdated}
                </Typography>
            </CardContent>
        </Card>
    );

    const MedicalHistorySection = () => (
        <Card sx={{ mb: 4 }} elevation={3}>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <MedicalServicesIcon color="primary" sx={{ mr: 1 }} /> Medical History
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            <LocalHospitalIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Conditions
                        </Typography>
                        {patientData.conditions ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {patientData.conditions.split(',').map((condition, index) => (
                                    <Chip key={index} label={condition.trim()} color="primary" variant="outlined" />
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No conditions recorded
                            </Typography>
                        )}
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            <WorkIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Surgeries
                        </Typography>
                        {patientData.surgeries ? (
                            <List dense>
                                {patientData.surgeries.split(',').map((surgery, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={surgery.trim()} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No surgeries recorded
                            </Typography>
                        )}
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            <MedicationIcon color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Current Medications
                        </Typography>
                        {patientData.medication ? (
                            <Table size="small">
                                <TableBody>
                                    {patientData.medication.split(',').map((med, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{med.trim()}</TableCell>
                                            {/* <TableCell>1 tablet daily</TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No current medications
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    const AllergiesSection = () => (
        <Card sx={{ mb: 4 }} elevation={3}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Allergies
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {patientData.allergies ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {patientData.allergies.split(',').map((allergy, index) => (
                            <Chip key={index} label={allergy.trim()} color="error" variant="outlined" />
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No known allergies
                    </Typography>
                )}
            </CardContent>
        </Card>
    );

    const DiagnosesSection = () => (
        diagnoses.length > 0 ? (
            <Card sx={{ mb: 4 }} elevation={3}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Recent Diagnoses
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {diagnoses.map((diagnosis, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" color="primary">
                                {diagnosis.appointment_date.split('T')[0]} - {diagnosis.doctor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Concerns: {diagnosis.concerns}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>Diagnosis:</strong> {diagnosis.diagnosis}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Prescription:</strong> {diagnosis.prescription}
                            </Typography>
                            {index < diagnoses.length - 1 && <Divider sx={{ my: 2 }} />}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        ) : (
            <Card sx={{ mb: 4 }} elevation={3}>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        No diagnosis records available
                    </Typography>
                </CardContent>
            </Card>
        )
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <PatientProfileSection />
                <VitalSignsSection />
                <MedicalHistorySection />
                <AllergiesSection />
                {/* <DiagnosesSection /> */}
            </Container>
        </Box>
    );
};

export default ViewOneHistory;