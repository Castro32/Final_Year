// // // // // src/AdminDashboard.js
// // // import React, { Component } from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   AppBar,
// // //   Toolbar,
// // //   Container,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper
// // // } from '@mui/material';

// // // class AdminDashboard extends Component {
// // //   state = {
// // //     doctors: [],
// // //     patients: [],
// // //     appointments: []
// // //   };

// // //   componentDidMount() {
// // //     // Fetch doctors
// // //     fetch('http://localhost:3001/docInfo')
// // //       .then(res => res.json())
// // //       .then(res => this.setState({ doctors: res.data || [] }))
// // //       .catch(error => console.error('Error fetching doctors:', error));

// // //     // Fetch patients
// // //     fetch('http://localhost:3001/getAllPatients')
// // //       .then(res => res.json())
// // //       .then(res => this.setState({ patients: res.data || [] }))
// // //       .catch(error => console.error('Error fetching patients:', error));

// // //     // Fetch appointments
// // //     fetch('http://localhost:3001/allDiagnoses')
// // //       .then(res => res.json())
// // //       .then(res => this.setState({ appointments: res.data || [] }))
// // //       .catch(error => console.error('Error fetching appointments:', error));
// // //   }

// // //   render() {
// // //     const { doctors, patients, appointments } = this.state;

// // //     const Header = () => (
// // //       <AppBar position="static">
// // //         <Toolbar>
// // //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// // //             Admin Dashboard
// // //           </Typography>
// // //         </Toolbar>
// // //       </AppBar>
// // //     );

// // //     const DoctorsTable = () => (
// // //       <TableContainer component={Paper}>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Name</TableCell>
// // //               <TableCell>Email</TableCell>
// // //               <TableCell>Gender</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {doctors.map(doctor => (
// // //               <TableRow key={doctor.email}>
// // //                 <TableCell>{doctor.name}</TableCell>
// // //                 <TableCell>{doctor.email}</TableCell>
// // //                 <TableCell>{doctor.gender}</TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     );

// // //     const PatientsTable = () => (
// // //       <TableContainer component={Paper}>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Name</TableCell>
// // //               <TableCell>Email</TableCell>
// // //               <TableCell>Address</TableCell>
// // //               <TableCell>Gender</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {patients.map(patient => (
// // //               <TableRow key={patient.email}>
// // //                 <TableCell>{patient.name}</TableCell>
// // //                 <TableCell>{patient.email}</TableCell>
// // //                 <TableCell>{patient.address}</TableCell>
// // //                 <TableCell>{patient.gender}</TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     );

// // //     const AppointmentsTable = () => (
// // //       <TableContainer component={Paper}>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Date</TableCell>
// // //               <TableCell>Doctor</TableCell>
// // //               <TableCell>Concerns</TableCell>
// // //               <TableCell>Symptoms</TableCell>
// // //               <TableCell>Diagnosis</TableCell>
// // //               <TableCell>Prescription</TableCell>
// // //               <TableCell>Status</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {appointments.map(appointment => (
// // //               <TableRow key={appointment.appointment_date}>
// // //                 <TableCell>{appointment.appointment_date}</TableCell>
// // //                 <TableCell>{appointment.doctor}</TableCell>
// // //                 <TableCell>{appointment.concerns}</TableCell>
// // //                 <TableCell>{appointment.symptoms}</TableCell>
// // //                 <TableCell>{appointment.diagnosis}</TableCell>
// // //                 <TableCell>{appointment.prescription}</TableCell>
// // //                 <TableCell>{appointment.status}</TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     );

// // //     return (
// // //       <Box sx={{ flexGrow: 1 }}>
// // //         <Header />
// // //         <Container>
// // //           <Typography variant="h6" gutterBottom>
// // //             Doctors
// // //           </Typography>
// // //           <DoctorsTable />

// // //           <Typography variant="h6" gutterBottom>
// // //             Patients
// // //           </Typography>
// // //           <PatientsTable />

// // //           <Typography variant="h6" gutterBottom>
// // //             Appointments
// // //           </Typography>
// // //           <AppointmentsTable />
// // //         </Container>
// // //       </Box>
// // //     );
// // //   }
// // // }

// // // export default AdminDashboard;
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
// //         {/* <Toolbar>
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             Admin Dashboard
// //           </Typography>
// //         </Toolbar> */}
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
// //           <Box sx={{ my: 4 }}>
// //             <Typography variant="h6" gutterBottom>
// //               Doctors
// //             </Typography>
// //             <DoctorsTable />
// //           </Box>

// //           <Box sx={{ my: 4 }}>
// //             <Typography variant="h6" gutterBottom>
// //               Patients
// //             </Typography>
// //             <PatientsTable />
// //           </Box>

// //           <Box sx={{ my: 4 }}>
// //             <Typography variant="h6" gutterBottom>
// //               Appointments
// //             </Typography>
// //             <AppointmentsTable />
// //           </Box>
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
//     appointments: [],
//     selectedPatientHistory: null,
//     selectedPatientEmail: null,
//     openHistoryFor: null
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

//   handlePatientClick = (email) => {
//     if (this.state.openHistoryFor === email) {
//       // If the same patient is clicked again, close the history
//       this.setState({ openHistoryFor: null });
//     } else {
//       // Fetch and open the patient's history
//       fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`)
//         .then(res => res.json())
//         .then(res => this.setState({
//           selectedPatientHistory: res.data[0] || null,
//           selectedPatientEmail: email,
//           openHistoryFor: email
//         }))
//         .catch(error => console.error('Error fetching patient history:', error));
//     }
//   };

//   render() {
//     const { doctors, patients, appointments, selectedPatientHistory, openHistoryFor } = this.state;

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
//               <React.Fragment key={patient.email}>
//                 <TableRow
//                   onClick={() => this.handlePatientClick(patient.email)}
//                   style={{ cursor: 'pointer', backgroundColor: openHistoryFor === patient.email ? 'lightgrey' : 'transparent' }}
//                 >
//                   <TableCell>{patient.name}</TableCell>
//                   <TableCell>{patient.email}</TableCell>
//                   <TableCell>{patient.address}</TableCell>
//                   <TableCell>{patient.gender}</TableCell>
//                 </TableRow>
//                 {openHistoryFor === patient.email && (
//                   <TableRow style={{backgroundColor: 'lightgrey'}}>
//                     <TableCell colSpan={4}>
//                       <PatientHistory history={selectedPatientHistory} />
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </React.Fragment>
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

//     const PatientHistory = ({ history }) => (
//       <Box sx={{ mt: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Medical History
//         </Typography>
//         {history ? (
//           <TableContainer component={Paper}>
//             <Table>
//               <TableBody>
//                 {/* <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>{history.patient_name}</TableCell>
//                 </TableRow> */}
//                 {/* <TableRow>
//                   <TableCell>Email</TableCell>
//                   <TableCell>{history.patient_email}</TableCell>
//                 </TableRow> */}
//                 {/* <TableRow>
//                   <TableCell>Address</TableCell>
//                   <TableCell>{history.patient_address}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Gender</TableCell>
//                   <TableCell>{history.patient_gender}</TableCell>
//                 </TableRow> */}
//                 <TableRow>
//                   <TableCell>Conditions</TableCell>
//                   <TableCell>{history.conditions}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Surgeries</TableCell>
//                   <TableCell>{history.surgeries}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Medication</TableCell>
//                   <TableCell>{history.medication}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Typography>No medical history available.</Typography>
//         )}
//       </Box>
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
//               All Appointments
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
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Collapse,
  Avatar,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add,
  Person,
  LocalHospital,
  CalendarToday,
  ExpandMore,
  ExpandLess,
  Edit,
  Delete,
  Close
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Lato, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class AdminDashboard extends Component {
  state = {
    doctors: [],
    patients: [],
    appointments: [],
    selectedPatientHistory: null,
    selectedPatientEmail: null,
    openHistoryFor: null,
    editDialogOpen: false,
    currentEditItem: null,
    editType: null, // 'doctor' or 'patient'
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success',
    showPassword: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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
  };

  handlePatientClick = (email) => {
    if (this.state.openHistoryFor === email) {
      this.setState({ openHistoryFor: null });
    } else {
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

  handleAddDoctor = () => {
    this.props.navigate('/MakeDoc');
  };

  handleAddPatient = () => {
    this.props.navigate('/createAcc');
  };

  handleDeleteDoctor = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/api/doctors/${email}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }
      
      this.showSnackbar('Doctor deleted successfully', 'success');
      this.fetchData();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      this.showSnackbar('Failed to delete doctor', 'error');
    }
  };

  handleDeletePatient = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/api/patients/${email}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }
      
      this.showSnackbar('Patient deleted successfully', 'success');
      this.fetchData();
    } catch (error) {
      console.error('Error deleting patient:', error);
      this.showSnackbar('Failed to delete patient', 'error');
    }
  };

  handleEditDoctor = (doctor) => {
    this.setState({
      editDialogOpen: true,
      currentEditItem: { ...doctor, password: '' },
      editType: 'doctor'
    });
  };

  handleEditPatient = (patient) => {
    this.setState({
      editDialogOpen: true,
      currentEditItem: { ...patient, password: '' },
      editType: 'patient'
    });
  };

  handleEditDialogClose = () => {
    this.setState({ 
      editDialogOpen: false,
      currentEditItem: null,
      editType: null,
      showPassword: false
    });
  };

  handleEditSubmit = async () => {
    const { currentEditItem, editType } = this.state;
    
    try {
      const endpoint = editType === 'doctor' 
        ? `/api/doctors/${currentEditItem.email}`
        : `/api/patients/${currentEditItem.email}`;
      
      // Remove empty password field if not changed
      const dataToSend = { ...currentEditItem };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }
      
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      
      this.showSnackbar(`${editType === 'doctor' ? 'Doctor' : 'Patient'} updated successfully`, 'success');
      this.fetchData();
      this.handleEditDialogClose();
    } catch (error) {
      console.error(`Error updating ${editType}:`, error);
      this.showSnackbar(`Failed to update ${editType}`, 'error');
    }
  };

  handleEditFieldChange = (field, value) => {
    this.setState(prevState => ({
      currentEditItem: {
        ...prevState.currentEditItem,
        [field]: value
      }
    }));
  };

  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  showSnackbar = (message, severity) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
      snackbarSeverity: severity
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { 
      doctors, 
      patients, 
      appointments, 
      selectedPatientHistory, 
      openHistoryFor,
      editDialogOpen,
      currentEditItem,
      editType,
      snackbarOpen,
      snackbarMessage,
      snackbarSeverity,
      showPassword
    } = this.state;

    const Header = () => (
      <AppBar position="static" sx={{ 
        backgroundColor: 'white', 
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        mb: 4
      }}>
        <Container maxWidth="xl">
          <Box sx={{ py: 3 }}>
            <Typography variant="h4">Admin Dashboard</Typography>
          </Box>
        </Container>
      </AppBar>
    );

    const EditDialog = () => (
      <Dialog open={editDialogOpen} onClose={this.handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit {editType === 'doctor' ? 'Doctor' : 'Patient'}
          <IconButton onClick={this.handleEditDialogClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {currentEditItem && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Name"
                value={currentEditItem.name || ''}
                onChange={(e) => this.handleEditFieldChange('name', e.target.value)}
                fullWidth
                margin="dense"
              />
              
              <TextField
                label="Email"
                value={currentEditItem.email || ''}
                disabled
                fullWidth
                margin="dense"
              />
              
              {editType === 'patient' && (
                <TextField
                  label="Address"
                  value={currentEditItem.address || ''}
                  onChange={(e) => this.handleEditFieldChange('address', e.target.value)}
                  fullWidth
                  margin="dense"
                />
              )}
              
              <TextField
                select
                label="Gender"
                value={currentEditItem.gender || ''}
                onChange={(e) => this.handleEditFieldChange('gender', e.target.value)}
                fullWidth
                margin="dense"
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </TextField>
              
              <TextField
                label="Password (leave blank to keep current)"
                type={showPassword ? 'text' : 'password'}
                value={currentEditItem.password || ''}
                onChange={(e) => this.handleEditFieldChange('password', e.target.value)}
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={this.toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleEditDialogClose}>Cancel</Button>
          <Button 
            onClick={this.handleEditSubmit}
            variant="contained"
            disabled={!currentEditItem?.name}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    );

    const DoctorsTable = () => (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Doctors Management</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={this.handleAddDoctor} sx={{ mb: 2 }}>
            Add Doctor
          </Button>
        </Box>
        <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.map(doctor => (
                  <TableRow key={doctor.email} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <LocalHospital />
                        </Avatar>
                        {doctor.name}
                      </Box>
                    </TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.gender}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton size="small" sx={{ mr: 1 }} onClick={() => this.handleEditDoctor(doctor)}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => this.handleDeleteDoctor(doctor.email)}>
                          <Delete fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );

    const PatientsTable = () => (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Patients Management</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={this.handleAddPatient} sx={{ mb: 2 }}>
            Add Patient
          </Button>
        </Box>
        <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map(patient => (
                  <React.Fragment key={patient.email}>
                    <TableRow hover onClick={() => this.handlePatientClick(patient.email)}
                      sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f9f9f9' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                            <Person />
                          </Avatar>
                          {patient.name}
                        </Box>
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.address}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>
                        <Tooltip title="View History">
                          <IconButton size="small">
                            {openHistoryFor === patient.email ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" sx={{ mr: 1 }} onClick={(e) => {
                            e.stopPropagation();
                            this.handleEditPatient(patient);
                          }}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={(e) => {
                            e.stopPropagation();
                            this.handleDeletePatient(patient.email);
                          }}>
                            <Delete fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} sx={{ p: 0 }}>
                        <Collapse in={openHistoryFor === patient.email} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                              Medical History
                            </Typography>
                            {selectedPatientHistory ? (
                              <Box>
                                <Typography variant="subtitle2" color="text.secondary">Conditions: {selectedPatientHistory.conditions || 'None recorded'}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">Surgeries: {selectedPatientHistory.surgeries || 'None recorded'}</Typography>
                                <Typography variant="subtitle2" color="text.secondary">Medication: {selectedPatientHistory.medication || 'None recorded'}</Typography>
                              </Box>
                            ) : (
                              <Typography color="text.secondary">No medical history available.</Typography>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );

    const AppointmentsTable = () => (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Appointments Overview</Typography>
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(appointment => (
                  <TableRow key={appointment.appointment_date} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        {appointment.appointment_date}
                      </Box>
                    </TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.patient_name}</TableCell>
                    <TableCell>
                      <Tooltip title={appointment.diagnosis || 'No diagnosis yet'}>
                        <span>{appointment.diagnosis ? `${appointment.diagnosis.substring(0, 30)}...` : '-'}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={appointment.status} 
                        color={
                          appointment.status === 'Completed' ? 'success' : 
                          appointment.status === 'Pending' ? 'warning' : 'default'
                        } 
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
          <Header />
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <DoctorsTable />
            <PatientsTable />
            <AppointmentsTable />
            
            <EditDialog />
            
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
              <Alert onClose={this.handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default withNavigation(AdminDashboard);