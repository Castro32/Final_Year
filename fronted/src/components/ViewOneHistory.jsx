// // // // import React, { Component} from 'react';

// // // // import {
// // // //     Box,
// // // //     Heading,
// // // //     Grommet,
// // // //     Table,
// // // //     TableBody,
// // // //     TableCell,
// // // //     TableRow
// // // // } from 'mui';

// // // // const theme = {
// // // //     global: {
// // // //         colors: {
// // // //             brand: '#000000',
// // // //             focus: '#000000'
// // // //         },
// // // //         font: {
// // // //             family: 'Lato',
// // // //         },
// // // //     },
// // // // };

// // // // export class ViewOneHistory extends Component {
// // // //     state = { medhiststate: [], medhiststate2: []}
// // // //     componentDidMount() {
// // // //         const { email } = this.props.match.params;
// // // //         this.allDiagnoses(email);
// // // //         this.getHistory(email);
// // // //     }

// // // //     getHistory(value) {
// // // //         let email = "'" + value + "'";
// // // //         fetch('http://localhost:3001/OneHistory?patientEmail='+ email)
// // // //         .then(res => res.json())
// // // //             .then(res => this.setState({ medhiststate: res.data }));
// // // //     }

// // // //     allDiagnoses(value) {
// // // //         let email = "'" + value + "'";
// // // //         fetch('http://localhost:3001/allDiagnoses?patientEmail='+ email)
// // // //         .then(res => res.json())
// // // //         .then(res => this.setState({ medhiststate2: res.data }));
// // // //     }

// // // //     render() {
// // // //         const { medhiststate } = this.state;
// // // //         const { medhiststate2 } = this.state;
// // // //         const Header = () => (
// // // //             <Box
// // // //                 tag='header'
// // // //                 background='brand'
// // // //                 pad='small'
// // // //                 elevation='small'
// // // //                 justify='between'
// // // //                 direction='row'
// // // //                 align='center'
// // // //                 flex={false}
// // // //             >
// // // //                 <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>HMS</Heading></a>
// // // //             </Box>
// // // //         );
// // // //         const Body = () => (
// // // //             <div className="container">
// // // //                 <div className="panel panel-default p50 uth-panel">
// // // //                     {medhiststate.map(patient =>
// // // //                         <Table>
// // // //                             <TableBody>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                         <strong>Name</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.name}</TableCell>
// // // //                                     <TableCell></TableCell>
// // // //                                     <TableCell><strong>Email</strong></TableCell>
// // // //                                     <TableCell>{patient.email}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                         <strong>Gender</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>
// // // //                                         {patient.gender}
// // // //                                     </TableCell>
// // // //                                     <TableCell />
// // // //                                     <TableCell>
// // // //                                         <strong>Address</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.address}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell>
// // // //                                         <strong>Conditions</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.conditions}
// // // //                                         </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell>
// // // //                                         <strong>Surgeries</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.surgeries}
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell>
// // // //                                         <strong>Medications</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.medication}
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                             </TableBody>
// // // //                         </Table>
// // // //                     )}
// // // //                 </div>
// // // //                 <hr />
// // // //             </div>
// // // //         );
// // // //         const Body2 = () => (
// // // //             <div className="container">
// // // //                 <div className="panel panel-default p50 uth-panel">
// // // //                     {medhiststate2.map(patient =>
// // // //                         <div>
// // // //                         <Table>
// // // //                             <TableBody>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                         <strong>Date</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.date.split('T')[0]}</TableCell>
// // // //                                     <TableCell></TableCell>
// // // //                                     <TableCell><strong>Doctor</strong></TableCell>
// // // //                                     <TableCell>{patient.doctor}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                         <strong>Concerns</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>
// // // //                                         {patient.concerns}
// // // //                                     </TableCell>
// // // //                                     <TableCell />
// // // //                                     <TableCell>
// // // //                                         <strong>Symptoms</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.symptoms}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell>
// // // //                                         <strong>Diagnosis</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.diagnosis}
// // // //                                         </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell>
// // // //                                         <strong>Prescription</strong>
// // // //                                     </TableCell>
// // // //                                     <TableCell>{patient.prescription}
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell scope="row">
// // // //                                     </TableCell>
// // // //                                 </TableRow>
// // // //                             </TableBody>
// // // //                         </Table>
// // // //                         <hr />
// // // //                         </div>
// // // //                     )}
// // // //                 </div>
// // // //             </div>
// // // //         );
// // // //         return (
// // // //             <Grommet full={true} theme={theme}>
// // // //                 <Box fill={true}>
// // // //                     <Header />
// // // //                     <Body />
// // // //                     <Body2 />
// // // //                 </Box>
// // // //             </Grommet>
// // // //         );
// // // //     }
// // // // }
// // // // export default ViewOneHistory;
// // // import React, { Component } from 'react';
// // // import {
// // //     Box,
// // //     Typography,
// // //     Table,
// // //     TableBody,
// // //     TableCell,
// // //     TableRow,
// // //     Container,
// // //     Paper,
// // //     AppBar,
// // //     Toolbar
// // // } from '@mui/material';

// // // export class ViewOneHistory extends Component {
// // //     state = { medhiststate: [], medhiststate2: [] }

// // //     componentDidMount() {
// // //         const { email } = this.props.match.params;
// // //         this.allDiagnoses(email);
// // //         this.getHistory(email);
// // //     }

// // //     getHistory(value) {
// // //         let email = "'" + value + "'";
// // //         fetch('http://localhost:3001/OneHistory?patientEmail=' + email)
// // //             .then(res => res.json())
// // //             .then(res => this.setState({ medhiststate: res.data }));
// // //     }

// // //     allDiagnoses(value) {
// // //         let email = "'" + value + "'";
// // //         fetch('http://localhost:3001/allDiagnoses?patientEmail=' + email)
// // //             .then(res => res.json())
// // //             .then(res => this.setState({ medhiststate2: res.data }));
// // //     }

// // //     render() {
// // //         const { medhiststate } = this.state;
// // //         const { medhiststate2 } = this.state;

// // //         const Header = () => (
// // //             <AppBar position="static">
// // //                 <Toolbar>
// // //                     <Typography variant="h6" component="a" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
// // //                         HMS
// // //                     </Typography>
// // //                 </Toolbar>
// // //             </AppBar>
// // //         );

// // //         const Body = () => (
// // //             <Container>
// // //                 <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
// // //                     {medhiststate.map(patient =>
// // //                         <Table key={patient.email}>
// // //                             <TableBody>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Name</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>{patient.name}</TableCell>
// // //                                     <TableCell></TableCell>
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Email</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>{patient.email}</TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Gender</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>
// // //                                         {patient.gender}
// // //                                     </TableCell>
// // //                                     <TableCell />
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Address</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>{patient.address}</TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Conditions</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>{patient.conditions}
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Surgeries</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>{patient.surgeries}
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell component="th" scope="row">
// // //                                         <strong>Medications</strong>
// // //                                     </TableCell>
// // //                                     <TableCell>{patient.medication}
// // //                                     </TableCell>
// // //                                 </TableRow>
// // //                             </TableBody>
// // //                         </Table>
// // //                     )}
// // //                 </Paper>
// // //                 <hr />
// // //             </Container>
// // //         );

// // //         const Body2 = () => (
// // //             <Container>
// // //                 <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
// // //                     {medhiststate2.map(patient =>
// // //                         <div key={patient.date}>
// // //                             <Table>
// // //                                 <TableBody>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                             <strong>Date</strong>
// // //                                         </TableCell>
// // //                                         <TableCell>{patient.date.split('T')[0]}</TableCell>
// // //                                         <TableCell></TableCell>
// // //                                         <TableCell component="th" scope="row">
// // //                                             <strong>Doctor</strong>
// // //                                         </TableCell>
// // //                                         <TableCell>{patient.doctor}</TableCell>
// // //                                     </TableRow>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                             <strong>Concerns</strong>
// // //                                         </TableCell>
// // //                                         <TableCell>
// // //                                             {patient.concerns}
// // //                                         </TableCell>
// // //                                         <TableCell />
// // //                                         <TableCell component="th" scope="row">
// // //                                             <strong>Symptoms</strong>
// // //                                         </TableCell>
// // //                                         <TableCell>{patient.symptoms}</TableCell>
// // //                                     </TableRow>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                             <strong>Diagnosis</strong>
// // //                                         </TableCell>
// // //                                         <TableCell>{patient.diagnosis}
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                             <strong>Prescription</strong>
// // //                                         </TableCell>
// // //                                         <TableCell>{patient.prescription}
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                     <TableRow>
// // //                                         <TableCell component="th" scope="row">
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                 </TableBody>
// // //                             </Table>
// // //                             <hr />
// // //                         </div>
// // //                     )}
// // //                 </Paper>
// // //             </Container>
// // //         );

// // //         return (
// // //             <Box>
// // //                 <Header />
// // //                 <Body />
// // //                 <Body2 />
// // //             </Box>
// // //         );
// // //     }
// // // }

// // // export default ViewOneHistory;
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
//             //     if (!res.ok) {
//             //         throw new Error('Network response was not ok');
//             //     }
//             //     const data = await res.json();
//             //     setMedhiststate2(data.data);
//             // } catch (error) {
//             //     console.error('Error fetching diagnoses:', error);
//             //     setError('Error fetching diagnoses');
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
//             <Toolbar>
//                 <Typography variant="h6" component="a" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//                     HMS
//                 </Typography>
//             </Toolbar>
//         </AppBar>
//     );

//     const Body = () => (
//         <Container>
//             <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//                 {medhiststate && medhiststate.length > 0 ? (
//                     medhiststate.map((patient, index) => (
//                         <Table key={index}>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Name</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.name}</TableCell>
//                                     <TableCell></TableCell>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Email</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.email}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Gender</strong>
//                                     </TableCell>
//                                     <TableCell>
//                                         {patient.gender}
//                                     </TableCell>
//                                     <TableCell />
//                                     <TableCell component="th" scope="row">
//                                         <strong>Address</strong>
//                                     </TableCell>
//                                     <TableCell>{patient.address}</TableCell>
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
//             </Paper>
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
//                                         <TableCell>{patient.date.split('T')[0]}</TableCell>
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
//             <Body2 />
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
    Toolbar
} from '@mui/material';

const ViewOneHistory = () => {
    const { email } = useParams();
    const [medhiststate, setMedhiststate] = useState([]);
    const [medhiststate2, setMedhiststate2] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setMedhiststate(data.data);
            } catch (error) {
                console.error('Error fetching history:', error);
                setError('Error fetching history');
            }
        };

        const fetchDiagnoses = async () => {
            // try {
            //     const res = await fetch(`http://localhost:3001/allDiagnoses?patientEmail=${email}`);

            //     // Log the full response for debugging
            //     console.log('Response status:', res.status);

            //     if (!res.ok) {
            //         const errorData = await res.json().catch(e => ({ error: 'Could not parse error response' }));
            //         console.log('Error response:', errorData);
            //         throw new Error(errorData.error || `Server error: ${res.status}`);
            //     }

            //     const data = await res.json();
            //     setMedhiststate2(data.data);
            // } catch (error) {
            //     console.error('Detailed error:', {
            //         message: error.message,
            //         stack: error.stack
            //     });
            //     setError(`Error fetching diagnoses: ${error.message}`);
            // }
        };

        fetchHistory();
        fetchDiagnoses();
    }, [email]);

    if (error) {
        return <div>{error}</div>;
    }

    const Header = () => (
        <AppBar position="static">
            {/* <Toolbar>
                <Typography variant="h6" component="a" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    HMS
                </Typography>
            </Toolbar> */}
        </AppBar>
    );

    const Body = () => (
        <Container>
            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
            <Typography style={{ fontWeight:"bolder" }}>My Details</Typography>
            </div>

            <Box elevation={10} >
                {medhiststate && medhiststate.length > 0 ? (
                    medhiststate.map((patient, index) => (
                        
                        <Table key={index}>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>{patient.patient_name}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell component="th" scope="row">
                                        <strong>Email</strong>
                                    </TableCell>
                                    <TableCell>{patient.patient_email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Gender</strong>
                                    </TableCell>
                                    <TableCell>
                                        {patient.patient_gender}
                                    </TableCell>
                                    <TableCell />
                                    <TableCell component="th" scope="row">
                                        <strong>Address</strong>
                                    </TableCell>
                                    <TableCell>{patient.patient_address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Conditions</strong>
                                    </TableCell>
                                    <TableCell>{patient.conditions}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Surgeries</strong>
                                    </TableCell>
                                    <TableCell>{patient.surgeries}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <strong>Medications</strong>
                                    </TableCell>
                                    <TableCell>{patient.medication}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    ))
                ) : (
                    <Typography>No medical history available.</Typography>
                )}
            </Box>
            <hr />
        </Container>
    );

    const Body2 = () => (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                {medhiststate2 && medhiststate2.length > 0 ? (
                    medhiststate2.map((patient, index) => (
                        <div key={index}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Date</strong>
                                        </TableCell>
                                        <TableCell>{patient.appointment_date.split('T')[0]}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell component="th" scope="row">
                                            <strong>Doctor</strong>
                                        </TableCell>
                                        <TableCell>{patient.doctor}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Concerns</strong>
                                        </TableCell>
                                        <TableCell>
                                            {patient.concerns}
                                        </TableCell>
                                        <TableCell />
                                        <TableCell component="th" scope="row">
                                            <strong>Symptoms</strong>
                                        </TableCell>
                                        <TableCell>{patient.symptoms}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Diagnosis</strong>
                                        </TableCell>
                                        <TableCell>{patient.diagnosis}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <strong>Prescription</strong>
                                        </TableCell>
                                        <TableCell>{patient.prescription}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <hr />
                        </div>
                    ))
                ) : (
                    <Typography>No diagnoses available.</Typography>
                )}
            </Paper>
        </Container>
    );

    return (
        <Box>
            <Header />
            <Body />
            {medhiststate2.length > 0 ? <Body2 /> : null}
        </Box>
    );
};

export default ViewOneHistory;
