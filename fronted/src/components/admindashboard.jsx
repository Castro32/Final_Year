// // // // src/AdminDashboard.js
// // import React, { Component } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   AppBar,
// //   Toolbar,
// //   Container,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper
// // } from '@mui/material';

// // class AdminDashboard extends Component {
// //   state = {
// //     doctors: [],
// //     patients: [],
// //     appointments: []
// //   };

// //   componentDidMount() {
// //     // Fetch doctors
// //     fetch('http://localhost:3001/docInfo')
// //       .then(res => res.json())
// //       .then(res => this.setState({ doctors: res.data || [] }))
// //       .catch(error => console.error('Error fetching doctors:', error));

// //     // Fetch patients
// //     fetch('http://localhost:3001/getAllPatients')
// //       .then(res => res.json())
// //       .then(res => this.setState({ patients: res.data || [] }))
// //       .catch(error => console.error('Error fetching patients:', error));

// //     // Fetch appointments
// //     fetch('http://localhost:3001/allDiagnoses')
// //       .then(res => res.json())
// //       .then(res => this.setState({ appointments: res.data || [] }))
// //       .catch(error => console.error('Error fetching appointments:', error));
// //   }

// //   render() {
// //     const { doctors, patients, appointments } = this.state;

// //     const Header = () => (
// //       <AppBar position="static">
// //         <Toolbar>
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             Admin Dashboard
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>
// //     );

// //     const DoctorsTable = () => (
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Name</TableCell>
// //               <TableCell>Email</TableCell>
// //               <TableCell>Gender</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {doctors.map(doctor => (
// //               <TableRow key={doctor.email}>
// //                 <TableCell>{doctor.name}</TableCell>
// //                 <TableCell>{doctor.email}</TableCell>
// //                 <TableCell>{doctor.gender}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     );

// //     const PatientsTable = () => (
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Name</TableCell>
// //               <TableCell>Email</TableCell>
// //               <TableCell>Address</TableCell>
// //               <TableCell>Gender</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {patients.map(patient => (
// //               <TableRow key={patient.email}>
// //                 <TableCell>{patient.name}</TableCell>
// //                 <TableCell>{patient.email}</TableCell>
// //                 <TableCell>{patient.address}</TableCell>
// //                 <TableCell>{patient.gender}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     );

// //     const AppointmentsTable = () => (
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Date</TableCell>
// //               <TableCell>Doctor</TableCell>
// //               <TableCell>Concerns</TableCell>
// //               <TableCell>Symptoms</TableCell>
// //               <TableCell>Diagnosis</TableCell>
// //               <TableCell>Prescription</TableCell>
// //               <TableCell>Status</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {appointments.map(appointment => (
// //               <TableRow key={appointment.appointment_date}>
// //                 <TableCell>{appointment.appointment_date}</TableCell>
// //                 <TableCell>{appointment.doctor}</TableCell>
// //                 <TableCell>{appointment.concerns}</TableCell>
// //                 <TableCell>{appointment.symptoms}</TableCell>
// //                 <TableCell>{appointment.diagnosis}</TableCell>
// //                 <TableCell>{appointment.prescription}</TableCell>
// //                 <TableCell>{appointment.status}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     );

// //     return (
// //       <Box sx={{ flexGrow: 1 }}>
// //         <Header />
// //         <Container>
// //           <Typography variant="h6" gutterBottom>
// //             Doctors
// //           </Typography>
// //           <DoctorsTable />

// //           <Typography variant="h6" gutterBottom>
// //             Patients
// //           </Typography>
// //           <PatientsTable />

// //           <Typography variant="h6" gutterBottom>
// //             Appointments
// //           </Typography>
// //           <AppointmentsTable />
// //         </Container>
// //       </Box>
// //     );
// //   }
// // }

// // export default AdminDashboard;
// import React, { Component } from 'react';
// import {
//   Box,
//   Typography,
//   AppBar,
//   Toolbar,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper
// } from '@mui/material';

// class AdminDashboard extends Component {
//   state = {
//     doctors: [],
//     patients: [],
//     appointments: []
//   };

//   componentDidMount() {
//     // Fetch doctors
//     fetch('http://localhost:3001/docInfo')
//       .then(res => res.json())
//       .then(res => this.setState({ doctors: res.data || [] }))
//       .catch(error => console.error('Error fetching doctors:', error));

//     // Fetch patients
//     fetch('http://localhost:3001/getAllPatients')
//       .then(res => res.json())
//       .then(res => this.setState({ patients: res.data || [] }))
//       .catch(error => console.error('Error fetching patients:', error));

//     // Fetch appointments
//     fetch('http://localhost:3001/allDiagnoses')
//       .then(res => res.json())
//       .then(res => this.setState({ appointments: res.data || [] }))
//       .catch(error => console.error('Error fetching appointments:', error));
//   }

//   render() {
//     const { doctors, patients, appointments } = this.state;

//     const Header = () => (
//       <AppBar position="static">
//         {/* <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Admin Dashboard
//           </Typography>
//         </Toolbar> */}
//       </AppBar>
//     );

//     const DoctorsTable = () => (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Gender</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {doctors.map(doctor => (
//               <TableRow key={doctor.email}>
//                 <TableCell>{doctor.name}</TableCell>
//                 <TableCell>{doctor.email}</TableCell>
//                 <TableCell>{doctor.gender}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );

//     const PatientsTable = () => (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Gender</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {patients.map(patient => (
//               <TableRow key={patient.email}>
//                 <TableCell>{patient.name}</TableCell>
//                 <TableCell>{patient.email}</TableCell>
//                 <TableCell>{patient.address}</TableCell>
//                 <TableCell>{patient.gender}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );

//     const AppointmentsTable = () => (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Doctor</TableCell>
//               <TableCell>Concerns</TableCell>
//               <TableCell>Symptoms</TableCell>
//               <TableCell>Diagnosis</TableCell>
//               <TableCell>Prescription</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {appointments.map(appointment => (
//               <TableRow key={appointment.appointment_date}>
//                 <TableCell>{appointment.appointment_date}</TableCell>
//                 <TableCell>{appointment.doctor}</TableCell>
//                 <TableCell>{appointment.concerns}</TableCell>
//                 <TableCell>{appointment.symptoms}</TableCell>
//                 <TableCell>{appointment.diagnosis}</TableCell>
//                 <TableCell>{appointment.prescription}</TableCell>
//                 <TableCell>{appointment.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );

//     return (
//       <Box sx={{ flexGrow: 1 }}>
//         <Header />
//         <Container>
//           <Box sx={{ my: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               Doctors
//             </Typography>
//             <DoctorsTable />
//           </Box>

//           <Box sx={{ my: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               Patients
//             </Typography>
//             <PatientsTable />
//           </Box>

//           <Box sx={{ my: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               Appointments
//             </Typography>
//             <AppointmentsTable />
//           </Box>
//         </Container>
//       </Box>
//     );
//   }
// }

// export default AdminDashboard;
import React, { Component } from 'react';
import {
  Box,
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

class AdminDashboard extends Component {
  state = {
    doctors: [],
    patients: [],
    appointments: [],
    selectedPatientHistory: null,
    selectedPatientEmail: null,
    openHistoryFor: null
  };

  componentDidMount() {
    // Fetch doctors
    fetch('http://localhost:3001/docInfo')
      .then(res => res.json())
      .then(res => this.setState({ doctors: res.data || [] }))
      .catch(error => console.error('Error fetching doctors:', error));

    // Fetch patients
    fetch('http://localhost:3001/getAllPatients')
      .then(res => res.json())
      .then(res => this.setState({ patients: res.data || [] }))
      .catch(error => console.error('Error fetching patients:', error));

    // Fetch appointments
    fetch('http://localhost:3001/allDiagnoses')
      .then(res => res.json())
      .then(res => this.setState({ appointments: res.data || [] }))
      .catch(error => console.error('Error fetching appointments:', error));
  }

  handlePatientClick = (email) => {
    if (this.state.openHistoryFor === email) {
      // If the same patient is clicked again, close the history
      this.setState({ openHistoryFor: null });
    } else {
      // Fetch and open the patient's history
      fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`)
        .then(res => res.json())
        .then(res => this.setState({
          selectedPatientHistory: res.data[0] || null,
          selectedPatientEmail: email,
          openHistoryFor: email
        }))
        .catch(error => console.error('Error fetching patient history:', error));
    }
  };

  render() {
    const { doctors, patients, appointments, selectedPatientHistory, openHistoryFor } = this.state;

    const Header = () => (
      <AppBar position="static">
        {/* <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar> */}
      </AppBar>
    );

    const DoctorsTable = () => (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map(doctor => (
              <TableRow key={doctor.email}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    const PatientsTable = () => (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map(patient => (
              <React.Fragment key={patient.email}>
                <TableRow
                  onClick={() => this.handlePatientClick(patient.email)}
                  style={{ cursor: 'pointer', backgroundColor: openHistoryFor === patient.email ? 'lightgrey' : 'transparent' }}
                >
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                </TableRow>
                {openHistoryFor === patient.email && (
                  <TableRow style={{backgroundColor: 'lightgrey'}}>
                    <TableCell colSpan={4}>
                      <PatientHistory history={selectedPatientHistory} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    const AppointmentsTable = () => (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Concerns</TableCell>
              <TableCell>Symptoms</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Prescription</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(appointment => (
              <TableRow key={appointment.appointment_date}>
                <TableCell>{appointment.appointment_date}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.concerns}</TableCell>
                <TableCell>{appointment.symptoms}</TableCell>
                <TableCell>{appointment.diagnosis}</TableCell>
                <TableCell>{appointment.prescription}</TableCell>
                <TableCell>{appointment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    const PatientHistory = ({ history }) => (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Medical History
        </Typography>
        {history ? (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {/* <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{history.patient_name}</TableCell>
                </TableRow> */}
                {/* <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{history.patient_email}</TableCell>
                </TableRow> */}
                {/* <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{history.patient_address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>{history.patient_gender}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell>Conditions</TableCell>
                  <TableCell>{history.conditions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Surgeries</TableCell>
                  <TableCell>{history.surgeries}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medication</TableCell>
                  <TableCell>{history.medication}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No medical history available.</Typography>
        )}
      </Box>
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Container>
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
              Doctors
            </Typography>
            <DoctorsTable />
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
              Patients
            </Typography>
            <PatientsTable />
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
              All Appointments
            </Typography>
            <AppointmentsTable />
          </Box>
        </Container>
      </Box>
    );
  }
}

export default AdminDashboard;
