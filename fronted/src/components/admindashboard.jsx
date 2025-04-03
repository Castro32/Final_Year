// // import React, { Component } from 'react';
// // import { Outlet } from 'react-router-dom';
// // import {
// //   Box,
// //   Typography,
// //   AppBar,
// //   Container,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Button,
// //   IconButton,
// //   Collapse,
// //   Avatar,
// //   Tooltip,
// //   Chip,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   Snackbar,
// //   Alert,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Divider,
// //   useMediaQuery,
// //   Badge,
// //   LinearProgress
// // } from '@mui/material';
// // import {
// //   Add,
// //   Person,
// //   LocalHospital,
// //   CalendarToday,
// //   ExpandMore,
// //   ExpandLess,
// //   Edit,
// //   Delete,
// //   Close,
// //   Dashboard,
// //   Group,
// //   MedicalServices,
// //   Assignment,
// //   ExitToApp,
// //   Menu,
// //   Visibility,
// //   VisibilityOff,
// //   Chart,
// // } from '@mui/icons-material';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// // import Swal from 'sweetalert2';
// // import { useNavigate } from 'react-router-dom';
// // //npm install jspdf @react-pdf/renderer

// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#1976d2',
// //     },
// //     secondary: {
// //       main: '#f50057',
// //     },
// //     background: {
// //       default: '#f5f5f5',
// //     },
// //   },
// //   typography: {
// //     fontFamily: 'Lato, Arial, sans-serif',
// //     h4: {
// //       fontWeight: 700,
// //     },
// //     h5: {
// //       fontWeight: 600,
// //     },
// //   },
// // });

// // function withNavigation(Component) {
// //   return props => <Component {...props} navigate={useNavigate()} />;
// // }

// // class AdminDashboard extends Component {
// //   state = {
// //     doctors: [],
// //     patients: [],
// //     appointments: [],
// //     selectedPatientHistory: null,
// //     selectedPatientEmail: null,
// //     openHistoryFor: null,
// //     editDialogOpen: false,
// //     currentEditItem: null,
// //     editType: null,
// //     snackbarOpen: false,
// //     snackbarMessage: '',
// //     snackbarSeverity: 'success',
// //     showPassword: false,
// //     drawerOpen: false,
// //     loading: true
// //   };

// //   componentDidMount() {
// //     this.fetchData();
// //   }

// //   fetchData = () => {
// //     this.setState({ loading: true });
    
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
// //       .then(res => this.setState({ 
// //         appointments: res.data || [],
// //         loading: false 
// //       }))
// //       .catch(error => {
// //         console.error('Error fetching appointments:', error);
// //         this.setState({ loading: false });
// //       });
// //   };

// //   toggleDrawer = () => {
// //     this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
// //   };

// //   handlePatientClick = (email) => {
// //     if (this.state.openHistoryFor === email) {
// //       this.setState({ openHistoryFor: null });
// //     } else {
// //       fetch(`http://localhost:3001/OneHistory?patientEmail=${email}`)
// //         .then(res => res.json())
// //         .then(res => this.setState({
// //           selectedPatientHistory: res.data[0] || null,
// //           selectedPatientEmail: email,
// //           openHistoryFor: email
// //         }))
// //         .catch(error => console.error('Error fetching patient history:', error));
// //     }
// //   };

// //   handleAddDoctor = () => {
// //     this.props.navigate('/admindashboard/MakeDoc');
// //   };

// //   handleAddPatient = () => {
// //     this.props.navigate('/admindashboard/createAcc');
// //   };

// //   handleDeleteDoctor = async (email) => {
// //     try {
// //       const confirm = await Swal.fire({
// //         title: 'Are you sure?',
// //         text: "You won't be able to revert this!",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#3085d6',
// //         cancelButtonColor: '#d33',
// //         confirmButtonText: 'Yes, delete it!'
// //       });

// //       if (confirm.isConfirmed) {
// //         const response = await fetch(`http://localhost:3001/api/doctor/${email}`, {
// //           method: 'DELETE'
// //         });
        
// //         if (!response.ok) {
// //           throw new Error('Failed to delete doctor');
// //         }
        
// //         Swal.fire(
// //           'Deleted!',
// //           'Doctor has been deleted.',
// //           'success'
// //         );
// //         this.fetchData();
// //       }
// //     } catch (error) {
// //       console.error('Error deleting doctor:', error);
// //       Swal.fire(
// //         'Error!',
// //         'Failed to delete doctor.',
// //         'error'
// //       );
// //     }
// //   };

// //   handleDeletePatient = async (email) => {
// //     try {
// //       const confirm = await Swal.fire({
// //         title: 'Are you sure?',
// //         text: "You won't be able to revert this!",
// //         icon: 'warning',
// //         showCancelButton: true,
// //         confirmButtonColor: '#3085d6',
// //         cancelButtonColor: '#d33',
// //         confirmButtonText: 'Yes, delete it!'
// //       });

// //       if (confirm.isConfirmed) {
// //         const response = await fetch(`http://localhost:3001/api/patient/${email}`, {
// //           method: 'DELETE'
// //         });
        
// //         if (!response.ok) {
// //           throw new Error('Failed to delete patient');
// //         }
        
// //         Swal.fire(
// //           'Deleted!',
// //           'Patient has been deleted.',
// //           'success'
// //         );
// //         this.fetchData();
// //       }
// //     } catch (error) {
// //       console.error('Error deleting patient:', error);
// //       Swal.fire(
// //         'Error!',
// //         'Failed to delete patient.',
// //         'error'
// //       );
// //     }
// //   };

// //   handleEditDoctor = (doctor) => {
// //     this.setState({
// //       editDialogOpen: true,
// //       currentEditItem: { 
// //         name: `${doctor.name || ''}`.trim(),
// //         email: doctor.email,
// //         gender: doctor.gender,
// //         password: '' 
// //       },
// //       editType: 'doctor'
// //     });
// //   };


// //   handleEditPatient = (patient) => {
// //     this.setState({
// //       editDialogOpen: true,
// //       currentEditItem: { 
// //         name: `${patient.firstName || ''} ${patient.lastName || ''}`.trim(),
// //         email: patient.email,
// //         gender: patient.gender,
// //         address: patient.address,
// //         conditions: patient.conditions,
// //         surgeries: patient.surgeries,
// //         medicatios: patient.medication,
// //         password: '' 
// //       },
// //       editType: 'patient'
// //     });
// //   };


// //   handleEditDialogClose = () => {
// //     this.setState({ 
// //       editDialogOpen: false,
// //       currentEditItem: null,
// //       editType: null,
// //       showPassword: false
// //     });
// //   };

// //   handleEditSubmit = async () => {
// //     const { currentEditItem, editType } = this.state;
    
// //     try {
// //       const endpoint = editType === 'doctor' 
// //         ? `/api/doctor/${currentEditItem.email}`
// //         : `/api/patient/${currentEditItem.email}`;
// //       const dataToSend = { ...currentEditItem };
// //       if (!dataToSend.password) {
// //         delete dataToSend.password;
// //       }
      
// //       const response = await fetch(`http://localhost:3001${endpoint}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(dataToSend)
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to update');
// //       }
      
// //       this.showSnackbar(`${editType === 'doctor' ? 'Doctor' : 'Patient'} updated successfully`, 'success');
// //       this.fetchData();
// //       this.handleEditDialogClose();
// //     } catch (error) {
// //       console.error(`Error updating ${editType}:`, error);
// //       this.showSnackbar(`Failed to update ${editType}`, 'error');
// //     }
// //   };

// //   handleEditFieldChange = (field, value) => {
// //     this.setState(prevState => ({
// //       currentEditItem: {
// //         ...prevState.currentEditItem,
// //         [field]: value
// //       }
// //     }));
// //   };

// //   toggleShowPassword = () => {
// //     this.setState(prevState => ({
// //       showPassword: !prevState.showPassword
// //     }));
// //   };

// //   showSnackbar = (message, severity) => {
// //     this.setState({
// //       snackbarOpen: true,
// //       snackbarMessage: message,
// //       snackbarSeverity: severity
// //     });
// //   };

// //   handleSnackbarClose = () => {
// //     this.setState({ snackbarOpen: false });
// //   };

// //   handleLogout = () => {
  
// //     this.props.navigate('/adminlogin');
// //   };

// //   handleAnalytics = () => {
  
// //     this.props.navigate('/admindashboard/analytics');
// //   };

// //   handleEditSubmit = async () => {
// //     const { currentEditItem, editType } = this.state;
    
// //     try {
// //       let endpoint, body;
      
// //       if (editType === 'doctor') {
// //         endpoint = `/api/doctor/${currentEditItem.email}`;
// //         body = {
// //           name: currentEditItem.name,
// //           email: currentEditItem.email,
// //           gender: currentEditItem.gender,
// //           ...(currentEditItem.password && { password: currentEditItem.password })
// //         };
// //       } else {
// //         endpoint = `/api/patient/${currentEditItem.email}`;
// //         body = {
// //           name: currentEditItem.name,
// //           email: currentEditItem.email,
// //           gender: currentEditItem.gender,
// //           address: currentEditItem.address,
// //           conditions: currentEditItem.conditions,
// //           surgeries: currentEditItem.surgeries,
// //           medication: currentEditItem.medication,
// //           ...(currentEditItem.password && { password: currentEditItem.password })
// //         };
// //       }
      
// //       const response = await fetch(`http://localhost:3001${endpoint}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(body)
// //       });
      
// //       const result = await response.json();
// //       console.log(body)
      
// //       if (!response.ok) {
// //         throw new Error(result.error || 'Failed to update');
// //       }
      
// //       Swal.fire(
// //         'Updated!',
// //         `${editType === 'doctor' ? 'Doctor' : 'Patient'} has been updated.`,
// //         'success'
// //       );
// //       this.fetchData();
// //       this.handleEditDialogClose();
// //     } catch (error) {
// //       console.error(`Error updating ${editType}:`, error);
// //       Swal.fire(
// //         'Error!',
// //         error.message || `Failed to update ${editType}.`,
// //         'error'
// //       );
// //     }
// //   };
  
// //   render() {
// //     const { 
// //       doctors, 
// //       patients, 
// //       appointments, 
// //       selectedPatientHistory, 
// //       openHistoryFor,
// //       editDialogOpen,
// //       currentEditItem,
// //       editType,
// //       snackbarOpen,
// //       snackbarMessage,
// //       snackbarSeverity,
// //       showPassword,
// //       drawerOpen,
// //       loading
// //     } = this.state;

// //     const pendingAppointments = appointments.filter(app => app.status === 'Pending').length;
// //     const completedAppointments = appointments.filter(app => app.status === 'Completed').length;

// //     const Header = () => (
// //       <AppBar position="fixed" sx={{ 
// //         backgroundColor: 'white', 
// //         color: 'text.primary',
// //         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// //         zIndex: theme.zIndex.drawer + 1,
// //         borderBottom: '1px solid #e0e0e0'
// //       }}>
// //         <Container maxWidth="xl">
// //           <Box sx={{ 
// //             display: 'flex', 
// //             alignItems: 'center', 
// //             py: 2,
// //             justifyContent: 'space-between'
// //           }}>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <IconButton 
// //                 color="inherit" 
// //                 onClick={this.toggleDrawer}
// //                 sx={{ mr: 2, display: { sm: 'none' } }}
// //               >
// //                 <Menu />
// //               </IconButton>
// //               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
// //                 Admin Dashboard
// //               </Typography>
// //             </Box>
// //             <Box>
// //               <Button 
// //                 color="inherit" 
// //                 startIcon={<ExitToApp />}
// //                 onClick={this.handleLogout}
// //                 sx={{ color: 'text.secondary' }}
// //               >
// //                 Logout
// //               </Button>
// //             </Box>
// //           </Box>
// //         </Container>
// //       </AppBar>
// //     );

// //     const Sidebar = () => (
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           display: { xs: 'none', sm: 'block' },
// //           '& .MuiDrawer-paper': {
// //             width: 240,
// //             boxSizing: 'border-box',
// //             borderRight: 'none',
// //             backgroundColor: '#fafafa'
// //           },
// //         }}
// //         open
// //       >
// //         <Box sx={{ height: '64px' }} /> {/* Spacer for header */}
// //         <List>
// //           <ListItem button selected>
// //             <ListItemIcon>
// //               <Dashboard color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Dashboard" />
// //           </ListItem>
          
// //           <ListItem button onClick={this.handleAddDoctor}>
// //             <ListItemIcon>
// //               <LocalHospital color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Add Doctor" />
// //           </ListItem>
          
// //           <ListItem button onClick={this.handleAddPatient}>
// //             <ListItemIcon>
// //               <Person color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Add Patient" />
// //           </ListItem>

// //           <ListItem button onClick={this.handleAnalytics}>
// //             <ListItemIcon>
// //               <Person color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Analytics" />
// //           </ListItem>
// //         </List>
        
// //         <Divider />
        
// //         <List>
// //           <ListItem>
// //             <ListItemText 
// //               primary="Quick Stats" 
// //               primaryTypographyProps={{ 
// //                 variant: 'subtitle2',
// //                 color: 'text.secondary'
// //               }} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemIcon>
// //               <Group color="primary" />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary={`${doctors.length} Doctors`} 
// //               primaryTypographyProps={{ variant: 'body2' }} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemIcon>
// //               <Person color="primary" />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary={`${patients.length} Patients`} 
// //               primaryTypographyProps={{ variant: 'body2' }} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemIcon>
// //               <Badge badgeContent={pendingAppointments} color="warning">
// //                 <Assignment color="primary" />
// //               </Badge>
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary={`${appointments.length} Appointments`} 
// //               primaryTypographyProps={{ variant: 'body2' }} 
// //             />
// //           </ListItem>
// //         </List>
// //       </Drawer>
// //     );

// //     const MobileSidebar = () => (
// //       <Drawer
// //         variant="temporary"
// //         open={drawerOpen}
// //         onClose={this.toggleDrawer}
// //         ModalProps={{
// //           keepMounted: true, // Better open performance on mobile.
// //         }}
// //         sx={{
// //           '& .MuiDrawer-paper': {
// //             width: 240,
// //             boxSizing: 'border-box',
// //             backgroundColor: '#fafafa'
// //           },
// //         }}
// //       >
// //         <Box sx={{ height: '64px' }} /> {/* Spacer for header */}
// //         <List>
// //           <ListItem button selected>
// //             <ListItemIcon>
// //               <Dashboard color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Dashboard" />
// //           </ListItem>
          
// //           <ListItem button onClick={this.handleAddDoctor}>
// //             <ListItemIcon>
// //               <LocalHospital color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Add Doctor" />
// //           </ListItem>
          
// //           <ListItem button onClick={this.handleAddPatient}>
// //             <ListItemIcon>
// //               <Person color="primary" />
// //             </ListItemIcon>
// //             <ListItemText primary="Add Patient" />
// //           </ListItem>
// //         </List>
        
// //         <Divider />
        
// //         <List>
// //           <ListItem>
// //             <ListItemText 
// //               primary="Quick Stats" 
// //               primaryTypographyProps={{ 
// //                 variant: 'subtitle2',
// //                 color: 'text.secondary'
// //               }} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemIcon>
// //               <Group color="primary" />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary={`${doctors.length} Doctors`} 
// //               primaryTypographyProps={{ variant: 'body2' }} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemIcon>
// //               <Person color="primary" />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary={`${patients.length} Patients`} 
// //               primaryTypographyProps={{ variant: 'body2' }} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemIcon>
// //               <Badge badgeContent={pendingAppointments} color="warning">
// //                 <Assignment color="primary" />
// //               </Badge>
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary={`${appointments.length} Appointments`} 
// //               primaryTypographyProps={{ variant: 'body2' }} 
// //             />
// //           </ListItem>
// //         </List>
// //       </Drawer>
// //     );

// //     const EditDialog = () => (
// //       <Dialog open={editDialogOpen} onClose={this.handleEditDialogClose} maxWidth="sm" fullWidth>
// //         <DialogTitle>
// //           Edit {editType === 'doctor' ? 'Doctor' : 'Patient'}
// //           <IconButton onClick={this.handleEditDialogClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
// //             <Close />
// //           </IconButton>
// //         </DialogTitle>
// //         <DialogContent dividers>
// //           {currentEditItem && (
// //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
// //               <TextField
// //                 label="Full Name"
// //                 value={currentEditItem.name || ''}
// //                 onChange={(e) => this.handleEditFieldChange('name', e.target.value)}
// //                 fullWidth
// //                 margin="dense"
// //               />
              
// //               <TextField
// //                 label="Email"
// //                 value={currentEditItem.email || ''}
// //                 disabled
// //                 fullWidth
// //                 margin="dense"
// //               />
              
// //               {editType === 'patient' && (
// //                 <>
// //                   <TextField
// //                     label="Address"
// //                     value={currentEditItem.address || ''}
// //                     onChange={(e) => this.handleEditFieldChange('address', e.target.value)}
// //                     fullWidth
// //                     margin="dense"
// //                   />
// //                   <TextField
// //                     label="Medical Conditions"
// //                     value={currentEditItem.conditions || ''}
// //                     onChange={(e) => this.handleEditFieldChange('conditions', e.target.value)}
// //                     fullWidth
// //                     margin="dense"
// //                     multiline
// //                     rows={2}
// //                   />
// //                   <TextField
// //                     label="Surgeries"
// //                     value={currentEditItem.surgeries || ''}
// //                     onChange={(e) => this.handleEditFieldChange('surgeries', e.target.value)}
// //                     fullWidth
// //                     margin="dense"
// //                     multiline
// //                     rows={2}
// //                   />
// //                   <TextField
// //                     label="Medication"
// //                     value={currentEditItem.medication || ''}
// //                     onChange={(e) => this.handleEditFieldChange('medication', e.target.value)}
// //                     fullWidth
// //                     margin="dense"
// //                     multiline
// //                     rows={2}
// //                   />
// //                 </>
// //               )}
              
// //               <TextField
// //                 select
// //                 label="Gender"
// //                 value={currentEditItem.gender || ''}
// //                 onChange={(e) => this.handleEditFieldChange('gender', e.target.value)}
// //                 fullWidth
// //                 margin="dense"
// //                 SelectProps={{ native: true }}
// //               >
// //                 <option value=""></option>
// //                 <option value="Male">Male</option>
// //                 <option value="Female">Female</option>
// //                 <option value="Other">Other</option>
// //               </TextField>
              
// //               <TextField
// //                 label="Password (leave blank to keep current)"
// //                 type={showPassword ? 'text' : 'password'}
// //                 value={currentEditItem.password || ''}
// //                 onChange={(e) => this.handleEditFieldChange('password', e.target.value)}
// //                 fullWidth
// //                 margin="dense"
// //                 InputProps={{
// //                   endAdornment: (
// //                     <IconButton onClick={this.toggleShowPassword} edge="end">
// //                       {showPassword ? <VisibilityOff /> : <Visibility />}
// //                     </IconButton>
// //                   )
// //                 }}
// //               />
// //             </Box>
// //           )}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={this.handleEditDialogClose}>Cancel</Button>
// //           <Button 
// //             onClick={this.handleEditSubmit}
// //             variant="contained"
// //             disabled={!currentEditItem?.name}
// //           >
// //             Save Changes
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     );

// //     const StatsCards = () => (
// //       <Box sx={{ 
// //         display: 'grid', 
// //         gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
// //         gap: 3,
// //         mb: 4
// //       }}>
// //         <Paper sx={{ p: 3, borderRadius: 2 }}>
// //           <Typography variant="subtitle2" color="text.secondary">Total Doctors</Typography>
// //           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{doctors.length}</Typography>
// //         </Paper>
        
// //         <Paper sx={{ p: 3, borderRadius: 2 }}>
// //           <Typography variant="subtitle2" color="text.secondary">Total Patients</Typography>
// //           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{patients.length}</Typography>
// //         </Paper>
        
// //         <Paper sx={{ p: 3, borderRadius: 2 }}>
// //           <Typography variant="subtitle2" color="text.secondary">Pending Appointments</Typography>
// //           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pendingAppointments}</Typography>
// //         </Paper>
        
// //         <Paper sx={{ p: 3, borderRadius: 2 }}>
// //           <Typography variant="subtitle2" color="text.secondary">Completed Appointments</Typography>
// //           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{completedAppointments}</Typography>
// //         </Paper>
// //       </Box>
// //     );

// //     const DoctorsTable = () => (
// //       <Box sx={{ mb: 4 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Doctors Management</Typography>
// //           <Button 
// //             variant="contained" 
// //             startIcon={<Add />} 
// //             onClick={this.handleAddDoctor}
// //             sx={{ 
// //               mb: 2,
// //               backgroundColor: 'primary.main',
// //               '&:hover': { backgroundColor: 'primary.dark' }
// //             }}
// //           >
// //             Add Doctor
// //           </Button>
// //         </Box>
// //         <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
// //           <TableContainer>
// //             <Table>
// //               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
// //                 <TableRow>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {doctors.map(doctor => (
// //                   <TableRow key={doctor.email} hover>
// //                     <TableCell>
// //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                         <Avatar sx={{ 
// //                           bgcolor: 'primary.main', 
// //                           mr: 2,
// //                           width: 36, 
// //                           height: 36 
// //                         }}>
// //                           <LocalHospital sx={{ fontSize: 20 }} />
// //                         </Avatar>
// //                         {doctor.name}
// //                       </Box>
// //                     </TableCell>
// //                     <TableCell>{doctor.email}</TableCell>
// //                     <TableCell>{doctor.gender}</TableCell>
// //                     <TableCell>
// //                       <Tooltip title="Edit">
// //                         <IconButton 
// //                           size="small" 
// //                           sx={{ mr: 1 }} 
// //                           onClick={() => this.handleEditDoctor(doctor)}
// //                           color="primary"
// //                         >
// //                           <Edit fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Delete">
// //                         <IconButton 
// //                           size="small" 
// //                           onClick={() => this.handleDeleteDoctor(doctor.email)}
// //                           color="error"
// //                         >
// //                           <Delete fontSize="small" />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Paper>
// //       </Box>
// //     );

// //     const PatientsTable = () => (
// //       <Box sx={{ mb: 4 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Patients Management</Typography>
// //           <Button 
// //             variant="contained" 
// //             startIcon={<Add />} 
// //             onClick={this.handleAddPatient}
// //             sx={{ 
// //               mb: 2,
// //               backgroundColor: 'primary.main',
// //               '&:hover': { backgroundColor: 'primary.dark' }
// //             }}
// //           >
// //             Add Patient
// //           </Button>
// //         </Box>
// //         <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
// //           <TableContainer>
// //             <Table>
// //               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
// //                 <TableRow>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {patients.map(patient => (
// //                   <React.Fragment key={patient.email}>
// //                     <TableRow hover onClick={() => this.handlePatientClick(patient.email)}
// //                       sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f9f9f9' } }}>
// //                       <TableCell>
// //                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                           <Avatar sx={{ 
// //                             bgcolor: 'secondary.main', 
// //                             mr: 2,
// //                             width: 36, 
// //                             height: 36 
// //                           }}>
// //                             <Person sx={{ fontSize: 20 }} />
// //                           </Avatar>
// //                           {patient.name}
// //                         </Box>
// //                       </TableCell>
// //                       <TableCell>{patient.email}</TableCell>
// //                       <TableCell>{patient.address}</TableCell>
// //                       <TableCell>{patient.gender}</TableCell>
// //                       <TableCell>
// //                         <Tooltip title="View History">
// //                           <IconButton size="small">
// //                             {openHistoryFor === patient.email ? <ExpandLess /> : <ExpandMore />}
// //                           </IconButton>
// //                         </Tooltip>
// //                         <Tooltip title="Edit">
// //                           <IconButton 
// //                             size="small" 
// //                             sx={{ mr: 1 }} 
// //                             onClick={(e) => {
// //                               e.stopPropagation();
// //                               this.handleEditPatient(patient);
// //                             }}
// //                             color="primary"
// //                           >
// //                             <Edit fontSize="small" />
// //                           </IconButton>
// //                         </Tooltip>
// //                         <Tooltip title="Delete">
// //                           <IconButton 
// //                             size="small" 
// //                             onClick={(e) => {
// //                               e.stopPropagation();
// //                               this.handleDeletePatient(patient.email);
// //                             }}
// //                             color="error"
// //                           >
// //                             <Delete fontSize="small" />
// //                           </IconButton>
// //                         </Tooltip>
// //                       </TableCell>
// //                     </TableRow>
// //                     <TableRow>
// //                       <TableCell colSpan={5} sx={{ p: 0 }}>
// //                         <Collapse in={openHistoryFor === patient.email} timeout="auto" unmountOnExit>
// //                           <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
// //                             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
// //                               Medical History
// //                             </Typography>
// //                             {selectedPatientHistory ? (
// //                               <Box>
// //                                 <Typography variant="subtitle2" color="text.secondary">Conditions: {selectedPatientHistory.conditions || 'None recorded'}</Typography>
// //                                 <Typography variant="subtitle2" color="text.secondary">Surgeries: {selectedPatientHistory.surgeries || 'None recorded'}</Typography>
// //                                 <Typography variant="subtitle2" color="text.secondary">Medication: {selectedPatientHistory.medication || 'None recorded'}</Typography>
// //                               </Box>
// //                             ) : (
// //                               <Typography color="text.secondary">No medical history available.</Typography>
// //                             )}
// //                           </Box>
// //                         </Collapse>
// //                       </TableCell>
// //                     </TableRow>
// //                   </React.Fragment>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Paper>
// //       </Box>
// //     );

// //     const AppointmentsTable = () => (
// //       <Box>
// //         <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Appointments Overview</Typography>
// //         <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
// //           <TableContainer>
// //             <Table>
// //               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
// //                 <TableRow>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
// //                   <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {appointments.map((appointment, index) => (
// //                   <TableRow key={`${appointment.appointment_date}-${index}`} hover>
// //                     <TableCell>
// //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                         <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
// //                         {appointment.appointment_date}
// //                       </Box>
// //                     </TableCell>
// //                     <TableCell>{appointment.doctor}</TableCell>
// //                     <TableCell>{appointment.patient_name}</TableCell>
// //                     <TableCell>
// //                       <Tooltip title={appointment.diagnosis || 'No diagnosis yet'}>
// //                         <span>{appointment.diagnosis ? `${appointment.diagnosis.substring(0, 30)}...` : '-'}</span>
// //                       </Tooltip>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Chip 
// //                         label={appointment.status} 
// //                         color={
// //                           appointment.status === 'Completed' ? 'success' : 
// //                           appointment.status === 'Pending' ? 'warning' : 'default'
// //                         } 
// //                         size="small" 
// //                       />
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Paper>
// //       </Box>
// //     );

// //     return (
// //       <ThemeProvider theme={theme}>
// //         <Box sx={{ 
// //           display: 'flex', 
// //           backgroundColor: 'background.default', 
// //           minHeight: '100vh' 
// //         }}>
// //           <Header />
// //           <Sidebar />
// //           <MobileSidebar />
          
// //           <Box 
// //             component="main" 
// //             sx={{ 
// //               flexGrow: 1, 
// //               marginLeft:"204px",
// //               p: 3,
// //               width: { sm: `calc(100% - 240px)` },
// //               marginTop: '64px'
// //             }}
// //           >
// //             <Container maxWidth="xl" sx={{ py: 2 }}>
// //               {loading && <LinearProgress sx={{ mb: 2 }} />}
              
// //               <StatsCards />
// //               <DoctorsTable />
// //               <PatientsTable />
// //               <AppointmentsTable />
              
// //               <EditDialog />
              
// //               <Snackbar 
// //                 open={snackbarOpen} 
// //                 autoHideDuration={6000} 
// //                 onClose={this.handleSnackbarClose}
// //                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //               >
// //                 <Alert 
// //                   onClose={this.handleSnackbarClose} 
// //                   severity={snackbarSeverity} 
// //                   sx={{ width: '100%' }}
// //                   elevation={6}
// //                   variant="filled"
// //                 >
// //                   {snackbarMessage}
// //                 </Alert>
// //               </Snackbar>
// //             </Container>
// //           </Box>
// //         </Box>
// //       </ThemeProvider>
// //     );
// //   }
// // }

// // export default withNavigation(AdminDashboard);

// import React, { Component } from 'react';
// import { Outlet } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   AppBar,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   IconButton,
//   Collapse,
//   Avatar,
//   Tooltip,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
//   Alert,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useMediaQuery,
//   Badge,
//   LinearProgress
// } from '@mui/material';
// import {
//   Add,
//   Person,
//   LocalHospital,
//   CalendarToday,
//   ExpandMore,
//   ExpandLess,
//   Edit,
//   Delete,
//   Close,
//   Dashboard,
//   Group,
//   MedicalServices,
//   Assignment,
//   ExitToApp,
//   Menu,
//   Visibility,
//   VisibilityOff,
//   Chart,
// } from '@mui/icons-material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//   },
//   typography: {
//     fontFamily: 'Lato, Arial, sans-serif',
//     h4: {
//       fontWeight: 700,
//     },
//     h5: {
//       fontWeight: 600,
//     },
//   },
// });

// function withNavigation(Component) {
//   return props => <Component {...props} navigate={useNavigate()} />;
// }

// class AdminDashboard extends Component {
//   state = {
//     doctors: [],
//     patients: [],
//     appointments: [],
//     selectedPatientHistory: null,
//     selectedPatientEmail: null,
//     openHistoryFor: null,
//     editDialogOpen: false,
//     currentEditItem: null,
//     editType: null,
//     snackbarOpen: false,
//     snackbarMessage: '',
//     snackbarSeverity: 'success',
//     showPassword: false,
//     drawerOpen: false,
//     loading: true
//   };

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = () => {
//     this.setState({ loading: true });

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
//       .then(res => this.setState({
//         appointments: res.data || [],
//         loading: false
//       }))
//       .catch(error => {
//         console.error('Error fetching appointments:', error);
//         this.setState({ loading: false });
//       });
//   };

//   toggleDrawer = () => {
//     this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
//   };

//   handlePatientClick = (email) => {
//     if (this.state.openHistoryFor === email) {
//       this.setState({ openHistoryFor: null });
//     } else {
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

//   handleAddDoctor = () => {
//     this.props.navigate('/admindashboard/MakeDoc');
//   };

//   handleAddPatient = () => {
//     this.props.navigate('/admindashboard/createAcc');
//   };

//   handleDeleteDoctor = async (email) => {
//     try {
//       const confirm = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       });

//       if (confirm.isConfirmed) {
//         const response = await fetch(`http://localhost:3001/api/doctor/${email}`, {
//           method: 'DELETE'
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete doctor');
//         }

//         Swal.fire(
//           'Deleted!',
//           'Doctor has been deleted.',
//           'success'
//         );
//         this.fetchData();
//       }
//     } catch (error) {
//       console.error('Error deleting doctor:', error);
//       Swal.fire(
//         'Error!',
//         'Failed to delete doctor.',
//         'error'
//       );
//     }
//   };

//   handleDeletePatient = async (email) => {
//     try {
//       const confirm = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       });

//       if (confirm.isConfirmed) {
//         const response = await fetch(`http://localhost:3001/api/patient/${email}`, {
//           method: 'DELETE'
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete patient');
//         }

//         Swal.fire(
//           'Deleted!',
//           'Patient has been deleted.',
//           'success'
//         );
//         this.fetchData();
//       }
//     } catch (error) {
//       console.error('Error deleting patient:', error);
//       Swal.fire(
//         'Error!',
//         'Failed to delete patient.',
//         'error'
//       );
//     }
//   };

//   handleEditDoctor = (doctor) => {
//     this.setState({
//       editDialogOpen: true,
//       currentEditItem: {
//         name: `${doctor.name || ''}`.trim(),
//         email: doctor.email,
//         gender: doctor.gender,
//         password: ''
//       },
//       editType: 'doctor'
//     });
//   };

//   handleEditPatient = (patient) => {
//     this.setState({
//       editDialogOpen: true,
//       currentEditItem: {
//         name: `${patient.firstName || ''} ${patient.lastName || ''}`.trim(),
//         email: patient.email,
//         gender: patient.gender,
//         address: patient.address,
//         conditions: patient.conditions,
//         surgeries: patient.surgeries,
//         medicatios: patient.medication,
//         password: ''
//       },
//       editType: 'patient'
//     });
//   };

//   handleEditDialogClose = () => {
//     this.setState({
//       editDialogOpen: false,
//       currentEditItem: null,
//       editType: null,
//       showPassword: false
//     });
//   };

//   handleEditSubmit = async () => {
//     const { currentEditItem, editType } = this.state;

//     try {
//       let endpoint, body;

//       if (editType === 'doctor') {
//         endpoint = `/api/doctor/${currentEditItem.email}`;
//         body = {
//           name: currentEditItem.name,
//           email: currentEditItem.email,
//           gender: currentEditItem.gender,
//           ...(currentEditItem.password && { password: currentEditItem.password })
//         };
//       } else {
//         endpoint = `/api/patient/${currentEditItem.email}`;
//         body = {
//           name: currentEditItem.name,
//           email: currentEditItem.email,
//           gender: currentEditItem.gender,
//           address: currentEditItem.address,
//           conditions: currentEditItem.conditions,
//           surgeries: currentEditItem.surgeries,
//           medication: currentEditItem.medication,
//           ...(currentEditItem.password && { password: currentEditItem.password })
//         };
//       }

//       const response = await fetch(`http://localhost:3001${endpoint}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)
//       });

//       const result = await response.json();
//       console.log(body)

//       if (!response.ok) {
//         throw new Error(result.error || 'Failed to update');
//       }

//       Swal.fire(
//         'Updated!',
//         `${editType === 'doctor' ? 'Doctor' : 'Patient'} has been updated.`,
//         'success'
//       );
//       this.fetchData();
//       this.handleEditDialogClose();
//     } catch (error) {
//       console.error(`Error updating ${editType}:`, error);
//       Swal.fire(
//         'Error!',
//         error.message || `Failed to update ${editType}.`,
//         'error'
//       );
//     }
//   };

//   handleEditFieldChange = (field, value) => {
//     this.setState(prevState => ({
//       currentEditItem: {
//         ...prevState.currentEditItem,
//         [field]: value
//       }
//     }));
//   };

//   toggleShowPassword = () => {
//     this.setState(prevState => ({
//       showPassword: !prevState.showPassword
//     }));
//   };

//   showSnackbar = (message, severity) => {
//     this.setState({
//       snackbarOpen: true,
//       snackbarMessage: message,
//       snackbarSeverity: severity
//     });
//   };

//   handleSnackbarClose = () => {
//     this.setState({ snackbarOpen: false });
//   };

//   handleLogout = () => {
//     this.props.navigate('/adminlogin');
//   };

//   handleAnalytics = () => {
//     this.props.navigate('/admindashboard/analytics');
//   };

//   render() {
//     const {
//       doctors,
//       patients,
//       appointments,
//       selectedPatientHistory,
//       openHistoryFor,
//       editDialogOpen,
//       currentEditItem,
//       editType,
//       snackbarOpen,
//       snackbarMessage,
//       snackbarSeverity,
//       showPassword,
//       drawerOpen,
//       loading
//     } = this.state;

//     const pendingAppointments = appointments.filter(app => app.status === 'Pending').length;
//     const completedAppointments = appointments.filter(app => app.status === 'Completed').length;

//     const Header = () => (
//       <AppBar position="fixed" sx={{
//         backgroundColor: 'white',
//         color: 'text.primary',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         zIndex: theme.zIndex.drawer + 1,
//         borderBottom: '1px solid #e0e0e0'
//       }}>
//         <Container maxWidth="xl">
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             py: 2,
//             justifyContent: 'space-between'
//           }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <IconButton
//                 color="inherit"
//                 onClick={this.toggleDrawer}
//                 sx={{ mr: 2, display: { sm: 'none' } }}
//               >
//                 <Menu />
//               </IconButton>
//               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//                 Admin Dashboard
//               </Typography>
//             </Box>
//             <Box>
//               <Button
//                 color="inherit"
//                 startIcon={<ExitToApp />}
//                 onClick={this.handleLogout}
//                 sx={{ color: 'text.secondary' }}
//               >
//                 Logout
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </AppBar>
//     );

//     const Sidebar = () => (
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', sm: 'block' },
//           '& .MuiDrawer-paper': {
//             width: 240,
//             boxSizing: 'border-box',
//             borderRight: 'none',
//             backgroundColor: '#fafafa'
//           },
//         }}
//         open
//       >
//         <Box sx={{ height: '64px' }} /> {/* Spacer for header */}
//         <List>
//           <ListItem button selected>
//             <ListItemIcon>
//               <Dashboard color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>

//           <ListItem button onClick={this.handleAddDoctor}>
//             <ListItemIcon>
//               <LocalHospital color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Add Doctor" />
//           </ListItem>

//           <ListItem button onClick={this.handleAddPatient}>
//             <ListItemIcon>
//               <Person color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Add Patient" />
//           </ListItem>

//           <ListItem button onClick={this.handleAnalytics}>
//             <ListItemIcon>
//               <Person color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Analytics" />
//           </ListItem>
//         </List>

//         <Divider />

//         <List>
//           <ListItem>
//             <ListItemText
//               primary="Quick Stats"
//               primaryTypographyProps={{
//                 variant: 'subtitle2',
//                 color: 'text.secondary'
//               }}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Group color="primary" />
//             </ListItemIcon>
//             <ListItemText
//               primary={`${doctors.length} Doctors`}
//               primaryTypographyProps={{ variant: 'body2' }}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Person color="primary" />
//             </ListItemIcon>
//             <ListItemText
//               primary={`${patients.length} Patients`}
//               primaryTypographyProps={{ variant: 'body2' }}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Badge badgeContent={pendingAppointments} color="warning">
//                 <Assignment color="primary" />
//               </Badge>
//             </ListItemIcon>
//             <ListItemText
//               primary={`${appointments.length} Appointments`}
//               primaryTypographyProps={{ variant: 'body2' }}
//             />
//           </ListItem>
//         </List>
//       </Drawer>
//     );

//     const MobileSidebar = () => (
//       <Drawer
//         variant="temporary"
//         open={drawerOpen}
//         onClose={this.toggleDrawer}
//         ModalProps={{
//           keepMounted: true, 
//         }}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 240,
//             boxSizing: 'border-box',
//             backgroundColor: '#fafafa'
//           },
//         }}
//       >
//         <Box sx={{ height: '64px' }} /> {/* Spacer for header */}
//         <List>
//           <ListItem button selected>
//             <ListItemIcon>
//               <Dashboard color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>

//           <ListItem button onClick={this.handleAddDoctor}>
//             <ListItemIcon>
//               <LocalHospital color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Add Doctor" />
//           </ListItem>

//           <ListItem button onClick={this.handleAddPatient}>
//             <ListItemIcon>
//               <Person color="primary" />
//             </ListItemIcon>
//             <ListItemText primary="Add Patient" />
//           </ListItem>
//         </List>

//         <Divider />

//         <List>
//           <ListItem>
//             <ListItemText
//               primary="Quick Stats"
//               primaryTypographyProps={{
//                 variant: 'subtitle2',
//                 color: 'text.secondary'
//               }}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Group color="primary" />
//             </ListItemIcon>
//             <ListItemText
//               primary={`${doctors.length} Doctors`}
//               primaryTypographyProps={{ variant: 'body2' }}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Person color="primary" />
//             </ListItemIcon>
//             <ListItemText
//               primary={`${patients.length} Patients`}
//               primaryTypographyProps={{ variant: 'body2' }}
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Badge badgeContent={pendingAppointments} color="warning">
//                 <Assignment color="primary" />
//               </Badge>
//             </ListItemIcon>
//             <ListItemText
//               primary={`${appointments.length} Appointments`}
//               primaryTypographyProps={{ variant: 'body2' }}
//             />
//           </ListItem>
//         </List>
//       </Drawer>
//     );

//     const EditDialog = () => (
//       <Dialog open={editDialogOpen} onClose={this.handleEditDialogClose} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           Edit {editType === 'doctor' ? 'Doctor' : 'Patient'}
//           <IconButton onClick={this.handleEditDialogClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {currentEditItem && (
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
//               <TextField
//                 label="Full Name"
//                 value={currentEditItem.name || ''}
//                 onChange={(e) => this.handleEditFieldChange('name', e.target.value)}
//                 fullWidth
//                 margin="dense"
//               />

//               <TextField
//                 label="Email"
//                 value={currentEditItem.email || ''}
//                 disabled
//                 fullWidth
//                 margin="dense"
//               />

//               {editType === 'patient' && (
//                 <>
//                   <TextField
//                     label="Address"
//                     value={currentEditItem.address || ''}
//                     onChange={(e) => this.handleEditFieldChange('address', e.target.value)}
//                     fullWidth
//                     margin="dense"
//                   />
//                   <TextField
//                     label="Medical Conditions"
//                     value={currentEditItem.conditions || ''}
//                     onChange={(e) => this.handleEditFieldChange('conditions', e.target.value)}
//                     fullWidth
//                     margin="dense"
//                     multiline
//                     rows={2}
//                   />
//                   <TextField
//                     label="Surgeries"
//                     value={currentEditItem.surgeries || ''}
//                     onChange={(e) => this.handleEditFieldChange('surgeries', e.target.value)}
//                     fullWidth
//                     margin="dense"
//                     multiline
//                     rows={2}
//                   />
//                   <TextField
//                     label="Medication"
//                     value={currentEditItem.medication || ''}
//                     onChange={(e) => this.handleEditFieldChange('medication', e.target.value)}
//                     fullWidth
//                     margin="dense"
//                     multiline
//                     rows={2}
//                   />
//                 </>
//               )}

//               <TextField
//                 select
//                 label="Gender"
//                 value={currentEditItem.gender || ''}
//                 onChange={(e) => this.handleEditFieldChange('gender', e.target.value)}
//                 fullWidth
//                 margin="dense"
//                 SelectProps={{ native: true }}
//               >
//                 <option value=""></option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </TextField>

//               <TextField
//                 label="Password (leave blank to keep current)"
//                 type={showPassword ? 'text' : 'password'}
//                 value={currentEditItem.password || ''}
//                 onChange={(e) => this.handleEditFieldChange('password', e.target.value)}
//                 fullWidth
//                 margin="dense"
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton onClick={this.toggleShowPassword} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   )
//                 }}
//               />
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={this.handleEditDialogClose}>Cancel</Button>
//           <Button
//             onClick={this.handleEditSubmit}
//             variant="contained"
//             disabled={!currentEditItem?.name}
//           >
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );

//     const StatsCards = () => (
//       <Box sx={{
//         display: 'grid',
//         gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
//         gap: 3,
//         mb: 4
//       }}>
//         <Paper sx={{ p: 3, borderRadius: 2 }}>
//           <Typography variant="subtitle2" color="text.secondary">Total Doctors</Typography>
//           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{doctors.length}</Typography>
//         </Paper>

//         <Paper sx={{ p: 3, borderRadius: 2 }}>
//           <Typography variant="subtitle2" color="text.secondary">Total Patients</Typography>
//           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{patients.length}</Typography>
//         </Paper>

//         <Paper sx={{ p: 3, borderRadius: 2 }}>
//           <Typography variant="subtitle2" color="text.secondary">Pending Appointments</Typography>
//           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pendingAppointments}</Typography>
//         </Paper>

//         <Paper sx={{ p: 3, borderRadius: 2 }}>
//           <Typography variant="subtitle2" color="text.secondary">Completed Appointments</Typography>
//           <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{completedAppointments}</Typography>
//         </Paper>
//       </Box>
//     );

//     const DoctorsTable = () => (
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Doctors Management</Typography>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={this.handleAddDoctor}
//             sx={{
//               mb: 2,
//               backgroundColor: 'primary.main',
//               '&:hover': { backgroundColor: 'primary.dark' }
//             }}
//           >
//             Add Doctor
//           </Button>
//         </Box>
//         <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {doctors.map(doctor => (
//                   <TableRow key={doctor.email} hover>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Avatar sx={{
//                           bgcolor: 'primary.main',
//                           mr: 2,
//                           width: 36,
//                           height: 36
//                         }}>
//                           <LocalHospital sx={{ fontSize: 20 }} />
//                         </Avatar>
//                         {doctor.name}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{doctor.email}</TableCell>
//                     <TableCell>{doctor.gender}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Edit">
//                         <IconButton
//                           size="small"
//                           sx={{ mr: 1 }}
//                           onClick={() => this.handleEditDoctor(doctor)}
//                           color="primary"
//                         >
//                           <Edit fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton
//                           size="small"
//                           onClick={() => this.handleDeleteDoctor(doctor.email)}
//                           color="error"
//                         >
//                           <Delete fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//     );

//     const PatientsTable = () => (
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Patients Management</Typography>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={this.handleAddPatient}
//             sx={{
//               mb: 2,
//               backgroundColor: 'primary.main',
//               '&:hover': { backgroundColor: 'primary.dark' }
//             }}
//           >
//             Add Patient
//           </Button>
//         </Box>
//         <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {patients.map(patient => (
//                   <React.Fragment key={patient.email}>
//                     <TableRow hover onClick={() => this.handlePatientClick(patient.email)}
//                       sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f9f9f9' } }}>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar sx={{
//                             bgcolor: 'secondary.main',
//                             mr: 2,
//                             width: 36,
//                             height: 36
//                           }}>
//                             <Person sx={{ fontSize: 20 }} />
//                           </Avatar>
//                           {patient.name}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{patient.email}</TableCell>
//                       <TableCell>{patient.address}</TableCell>
//                       <TableCell>{patient.gender}</TableCell>
//                       <TableCell>
//                         <Tooltip title="View History">
//                           <IconButton size="small">
//                             {openHistoryFor === patient.email ? <ExpandLess /> : <ExpandMore />}
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Edit">
//                           <IconButton
//                             size="small"
//                             sx={{ mr: 1 }}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               this.handleEditPatient(patient);
//                             }}
//                             color="primary"
//                           >
//                             <Edit fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               this.handleDeletePatient(patient.email);
//                             }}
//                             color="error"
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell colSpan={5} sx={{ p: 0 }}>
//                         <Collapse in={openHistoryFor === patient.email} timeout="auto" unmountOnExit>
//                           <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
//                             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//                               Medical History
//                             </Typography>
//                             {selectedPatientHistory ? (
//                               <Box>
//                                 <Typography variant="subtitle2" color="text.secondary">Conditions: {selectedPatientHistory.conditions || 'None recorded'}</Typography>
//                                 <Typography variant="subtitle2" color="text.secondary">Surgeries: {selectedPatientHistory.surgeries || 'None recorded'}</Typography>
//                                 <Typography variant="subtitle2" color="text.secondary">Medication: {selectedPatientHistory.medication || 'None recorded'}</Typography>
//                               </Box>
//                             ) : (
//                               <Typography color="text.secondary">No medical history available.</Typography>
//                             )}
//                           </Box>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//     );

//     const AppointmentsTable = () => (
//       <Box>
//         <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Appointments Overview</Typography>
//         <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {appointments.map((appointment, index) => (
//                   <TableRow key={`${appointment.appointment_date}-${index}`} hover>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
//                         {appointment.appointment_date}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{appointment.doctor}</TableCell>
//                     <TableCell>{appointment.patient_name}</TableCell>
//                     <TableCell>
//                       <Tooltip title={appointment.diagnosis || 'No diagnosis yet'}>
//                         <span>{appointment.diagnosis ? `${appointment.diagnosis.substring(0, 30)}...` : '-'}</span>
//                       </Tooltip>
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={appointment.status}
//                         color={
//                           appointment.status === 'Completed' ? 'success' :
//                           appointment.status === 'Pending' ? 'warning' : 'default'
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//     );

//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{
//           display: 'flex',
//           backgroundColor: 'background.default',
//           minHeight: '100vh'
//         }}>
//           <Header />
//           <Sidebar />
//           <MobileSidebar />

//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               marginLeft:"204px",
//               p: 3,
//               width: { sm: `calc(100% - 240px)` },
//               marginTop: '64px'
//             }}
//           >
//             <Container maxWidth="xl" sx={{ py: 2 }}>
//               {loading && <LinearProgress sx={{ mb: 2 }} />}

//               <StatsCards />
//               <DoctorsTable />
//               <PatientsTable />
//               <AppointmentsTable />

//               <EditDialog />

//               <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={this.handleSnackbarClose}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//               >
//                 <Alert
//                   onClose={this.handleSnackbarClose}
//                   severity={snackbarSeverity}
//                   sx={{ width: '100%' }}
//                   elevation={6}
//                   variant="filled"
//                 >
//                   {snackbarMessage}
//                 </Alert>
//               </Snackbar>

//               {/* Render nested routes */}
//               <Outlet />
//             </Container>
//           </Box>
//         </Box>
//       </ThemeProvider>
//     );
//   }
// }

// export default withNavigation(AdminDashboard);
import React, { Component } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  LinearProgress
} from '@mui/material';
import {
  Add,
  Person,
  LocalHospital,
  ExpandMore,
  ExpandLess,
  Edit,
  Delete,
  Close,
  Dashboard,
  Group,
  Assignment,
  ExitToApp,
  Menu,
  Visibility,
  VisibilityOff,
  Leaderboard
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';

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
    editType: null,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success',
    showPassword: false,
    drawerOpen: false,
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });

    // Fetch all data
    Promise.all([
      fetch('http://localhost:3001/docInfo').then(res => res.json()),
      fetch('http://localhost:3001/getAllPatients').then(res => res.json()),
      fetch('http://localhost:3001/allDiagnoses').then(res => res.json())
    ])
    .then(([doctorsRes, patientsRes, appointmentsRes]) => {
      this.setState({
        doctors: doctorsRes.data || [],
        patients: patientsRes.data || [],
        appointments: appointmentsRes.data || [],
        loading: false
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    });
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
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

  navigateTo = (path) => {
    this.props.navigate(path);
    this.setState({ drawerOpen: false });
  };

  handleDelete = async (type, email) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3001/api/${type}/${email}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error(`Failed to delete ${type}`);

      Swal.fire('Deleted!', `${type === 'doctor' ? 'Doctor' : 'Patient'} has been deleted.`, 'success');
      this.fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      Swal.fire('Error!', error.message || `Failed to delete ${type}.`, 'error');
    }
  };

  handleEdit = (item, type) => {
    this.setState({
      editDialogOpen: true,
      currentEditItem: type === 'doctor' ? {
        name: `${item.name || ''}`.trim(),
        email: item.email,
        gender: item.gender,
        password: ''
      } : {
        name: `${item.firstName || ''} ${item.lastName || ''}`.trim(),
        email: item.email,
        gender: item.gender,
        address: item.address,
        conditions: item.conditions,
        surgeries: item.surgeries,
        medication: item.medication,
        password: ''
      },
      editType: type
    });
  };

  handleEditSubmit = async () => {
    const { currentEditItem, editType } = this.state;
    if (!currentEditItem?.name) return;

    try {
      const endpoint = `/api/${editType}/${currentEditItem.email}`;
      const body = {
        ...currentEditItem,
        ...(editType === 'doctor' ? {} : {
          firstName: currentEditItem.name.split(' ')[0],
          lastName: currentEditItem.name.split(' ').slice(1).join(' ') || ''
        }),
        ...(currentEditItem.password ? { password: currentEditItem.password } : {})
      };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to update');

      Swal.fire('Updated!', `${editType === 'doctor' ? 'Doctor' : 'Patient'} updated.`, 'success');
      this.fetchData();
      this.handleEditDialogClose();
    } catch (error) {
      console.error(`Error updating ${editType}:`, error);
      Swal.fire('Error!', error.message || `Update failed.`, 'error');
    }
  };

  showSnackbar = (message, severity) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
      snackbarSeverity: severity
    });
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
      showPassword,
      drawerOpen,
      loading
    } = this.state;

    const { location } = this.props;
    const isMainDashboard = location.pathname === '/admindashboard';

    const pendingAppointments = appointments.filter(app => app.status === 'Pending').length;
    const completedAppointments = appointments.filter(app => app.status === 'Completed').length;

    const Header = () => (
      <AppBar position="fixed" sx={{
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: theme.zIndex.drawer + 1
      }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                onClick={this.toggleDrawer}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Admin Dashboard
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={() => this.props.navigate('/adminlogin')}
              sx={{ color: 'text.secondary' }}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </AppBar>
    );

    const Sidebar = () => (
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#fafafa'
          },
        }}
        open
      >
        <Box sx={{ height: '64px' }} />
        <List>
          <ListItem button onClick={() => this.navigateTo('/admindashboard')} selected={isMainDashboard}>
            <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/admindashboard/MakeDoc')} selected={location.pathname.includes('MakeDoc')}>
            <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
            <ListItemText primary="Add Doctor" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/admindashboard/createAcc')} selected={location.pathname.includes('createAcc')}>
            <ListItemIcon><Person color="primary" /></ListItemIcon>
            <ListItemText primary="Add Patient" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/admindashboard/analytics')} selected={location.pathname.includes('analytics')}>
            <ListItemIcon><Leaderboard color="primary" /></ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Quick Stats" primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon><Group color="primary" /></ListItemIcon>
            <ListItemText primary={`${doctors.length} Doctors`} />
          </ListItem>
          <ListItem>
            <ListItemIcon><Person color="primary" /></ListItemIcon>
            <ListItemText primary={`${patients.length} Patients`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Badge badgeContent={pendingAppointments} color="warning">
                <Assignment color="primary" />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={`${appointments.length} Appointments`} />
          </ListItem>
        </List>
      </Drawer>
    );

    const MobileSidebar = () => (
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={this.toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ height: '64px' }} />
        <List>
          <ListItem button onClick={() => this.navigateTo('/admindashboard')} selected={isMainDashboard}>
            <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/admindashboard/MakeDoc')} selected={location.pathname.includes('MakeDoc')}>
            <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
            <ListItemText primary="Add Doctor" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/admindashboard/createAcc')} selected={location.pathname.includes('createAcc')}>
            <ListItemIcon><Person color="primary" /></ListItemIcon>
            <ListItemText primary="Add Patient" />
          </ListItem>
          <ListItem button onClick={() => this.navigateTo('/admindashboard/analytics')} selected={location.pathname.includes('analytics')}>
            <ListItemIcon><Leaderboard color="primary" /></ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </List>
      </Drawer>
    );

    const EditDialog = () => (
      <Dialog open={editDialogOpen} onClose={() => this.setState({ editDialogOpen: false })} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit {editType}
          <IconButton onClick={() => this.setState({ editDialogOpen: false })} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Full Name"
              value={currentEditItem?.name || ''}
              onChange={(e) => this.setState(prev => ({
                currentEditItem: { ...prev.currentEditItem, name: e.target.value }
              }))}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Email"
              value={currentEditItem?.email || ''}
              disabled
              fullWidth
              margin="dense"
            />
            {editType === 'patient' && (
              <>
                <TextField label="Address" value={currentEditItem?.address || ''} onChange={(e) => this.setState(prev => ({
                  currentEditItem: { ...prev.currentEditItem, address: e.target.value }
                }))} fullWidth margin="dense" />
                <TextField label="Conditions" value={currentEditItem?.conditions || ''} onChange={(e) => this.setState(prev => ({
                  currentEditItem: { ...prev.currentEditItem, conditions: e.target.value }
                }))} fullWidth margin="dense" multiline rows={2} />
                <TextField label="Surgeries" value={currentEditItem?.surgeries || ''} onChange={(e) => this.setState(prev => ({
                  currentEditItem: { ...prev.currentEditItem, surgeries: e.target.value }
                }))} fullWidth margin="dense" multiline rows={2} />
                <TextField label="Medication" value={currentEditItem?.medication || ''} onChange={(e) => this.setState(prev => ({
                  currentEditItem: { ...prev.currentEditItem, medication: e.target.value }
                }))} fullWidth margin="dense" multiline rows={2} />
              </>
            )}
            <TextField
              select
              label="Gender"
              value={currentEditItem?.gender || ''}
              onChange={(e) => this.setState(prev => ({
                currentEditItem: { ...prev.currentEditItem, gender: e.target.value }
              }))}
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
              value={currentEditItem?.password || ''}
              onChange={(e) => this.setState(prev => ({
                currentEditItem: { ...prev.currentEditItem, password: e.target.value }
              }))}
              fullWidth
              margin="dense"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => this.setState(prev => ({ showPassword: !prev.showPassword }))} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({ editDialogOpen: false })}>Cancel</Button>
          <Button onClick={this.handleEditSubmit} variant="contained" disabled={!currentEditItem?.name}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    );

    const DashboardContent = () => (
      <>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Total Doctors</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{doctors.length}</Typography>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Total Patients</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{patients.length}</Typography>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Pending Appointments</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pendingAppointments}</Typography>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Completed Appointments</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{completedAppointments}</Typography>
          </Paper>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Doctors Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => this.navigateTo('/admindashboard/MakeDoc')}
              sx={{ mb: 2 }}
            >
              Add Doctor
            </Button>
          </Box>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 36, height: 36 }}>
                            <LocalHospital sx={{ fontSize: 20 }} />
                          </Avatar>
                          {doctor.name}
                        </Box>
                      </TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>{doctor.gender}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton size="small" sx={{ mr: 1 }} onClick={() => this.handleEdit(doctor, 'doctor')} color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => this.handleDelete('doctor', doctor.email)} color="error">
                            <Delete fontSize="small" />
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

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Patients Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => this.navigateTo('/admindashboard/createAcc')}
              sx={{ mb: 2 }}
            >
              Add Patient
            </Button>
          </Box>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
                      <TableRow hover onClick={() => this.handlePatientClick(patient.email)} sx={{ cursor: 'pointer' }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 36, height: 36 }}>
                              <Person sx={{ fontSize: 20 }} />
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
                            <IconButton size="small" sx={{ mr: 1 }} onClick={(e) => { e.stopPropagation(); this.handleEdit(patient, 'patient'); }} color="primary">
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); this.handleDelete('patient', patient.email); }} color="error">
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5} sx={{ p: 0 }}>
                          <Collapse in={openHistoryFor === patient.email} timeout="auto" unmountOnExit>
                            <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Medical History</Typography>
                              {selectedPatientHistory ? (
                                <Box>
                                  <Typography variant="subtitle2" color="text.secondary">Conditions: {selectedPatientHistory.conditions || 'None'}</Typography>
                                  <Typography variant="subtitle2" color="text.secondary">Surgeries: {selectedPatientHistory.surgeries || 'None'}</Typography>
                                  <Typography variant="subtitle2" color="text.secondary">Medication: {selectedPatientHistory.medication || 'None'}</Typography>
                                </Box>
                              ) : (
                                <Typography variant="body2">Loading history...</Typography>
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

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Recent Appointments</Typography>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Symptoms</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.slice(0, 5).map(appointment => (
                    <TableRow key={appointment._id} hover>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                      <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {appointment.symptoms || 'None'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          color={appointment.status === 'Completed' ? 'success' : 'warning'}
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
      </>
    );

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Sidebar />
          <MobileSidebar />
          
          <Box component="main" sx={{
            flexGrow: 1,
            pt: { xs: 10, sm: 10 },
            pb: 4,
            px: { xs: 2, sm: 4 },
            ml: { md: '240px' }
          }}>
            {loading && <LinearProgress />}
            
            {isMainDashboard ? <DashboardContent /> : <Outlet />}
          </Box>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => this.setState({ snackbarOpen: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={() => this.setState({ snackbarOpen: false })} severity={snackbarSeverity} variant="filled">
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <EditDialog />
        </Box>
      </ThemeProvider>
    );
  }
}

// Wrap the component with withRouter equivalent for React Router v6
const withNavigationAndLocation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} navigate={navigate} location={location} />;
  };
};

export default withNavigationAndLocation(AdminDashboard);