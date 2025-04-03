// import React, { Component } from 'react';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
//   Badge,
//   LinearProgress
// } from '@mui/material';
// import {
//   Add,
//   Person,
//   LocalHospital,
//   ExpandMore,
//   ExpandLess,
//   Edit,
//   Delete,
//   Close,
//   Dashboard,
//   Group,
//   Assignment,
//   ExitToApp,
//   Menu,
//   Visibility,
//   VisibilityOff,
//   Leaderboard
// } from '@mui/icons-material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Swal from 'sweetalert2';

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
  
//     // Fetch all data
//     Promise.all([
//       fetch('http://localhost:3001/docInfo').then(res => res.json()),
//       fetch('http://localhost:3001/getAllPatients').then(res => res.json()),
//       fetch('http://localhost:3001/getAllAppointments').then(res => res.json()) // New endpoint to fetch all appointments
//     ])
//     .then(([doctorsRes, patientsRes, appointmentsRes]) => {
//       this.setState({
//         doctors: doctorsRes.data || [],
//         patients: patientsRes.data || [],
//         appointments: appointmentsRes.data || [],
//         loading: false
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       this.setState({ loading: false });
//     });
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

//   navigateTo = (path) => {
//     this.props.navigate(path);
//     this.setState({ drawerOpen: false });
//   };

//   handleDelete = async (type, email) => {
//     const confirm = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const response = await fetch(`http://localhost:3001/api/${type}/${email}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) throw new Error(`Failed to delete ${type}`);

//       Swal.fire('Deleted!', `${type === 'doctor' ? 'Doctor' : 'Patient'} has been deleted.`, 'success');
//       this.fetchData();
//     } catch (error) {
//       console.error(`Error deleting ${type}:`, error);
//       Swal.fire('Error!', error.message || `Failed to delete ${type}.`, 'error');
//     }
//   };

//   handleEdit = (item, type) => {
//     this.setState({
//       editDialogOpen: true,
//       currentEditItem: type === 'doctor' ? {
//         name: `${item.name || ''}`.trim(),
//         email: item.email,
//         gender: item.gender,
//         password: ''
//       } : {
//         name: `${item.firstName || ''} ${item.lastName || ''}`.trim(),
//         email: item.email,
//         gender: item.gender,
//         address: item.address,
//         conditions: item.conditions,
//         surgeries: item.surgeries,
//         medication: item.medication,
//         password: ''
//       },
//       editType: type
//     });
//   };

//   handleEditSubmit = async () => {
//     const { currentEditItem, editType } = this.state;
//     if (!currentEditItem?.name) return;

//     try {
//       const endpoint = `/api/${editType}/${currentEditItem.email}`;
//       const body = {
//         ...currentEditItem,
//         ...(editType === 'doctor' ? {} : {
//           firstName: currentEditItem.name.split(' ')[0],
//           lastName: currentEditItem.name.split(' ').slice(1).join(' ') || ''
//         }),
//         ...(currentEditItem.password ? { password: currentEditItem.password } : {})
//       };

//       const response = await fetch(`http://localhost:3001${endpoint}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//       });

//       if (!response.ok) throw new Error('Failed to update');

//       Swal.fire('Updated!', `${editType === 'doctor' ? 'Doctor' : 'Patient'} updated.`, 'success');
//       this.fetchData();
//       this.handleEditDialogClose();
//     } catch (error) {
//       console.error(`Error updating ${editType}:`, error);
//       Swal.fire('Error!', error.message || `Update failed.`, 'error');
//     }
//   };

//   showSnackbar = (message, severity) => {
//     this.setState({
//       snackbarOpen: true,
//       snackbarMessage: message,
//       snackbarSeverity: severity
//     });
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

//     const { location } = this.props;
//     const isMainDashboard = location.pathname === '/admindashboard';

//     const pendingAppointments = appointments.filter(app => app.status === 'Pending').length;
//     const completedAppointments = appointments.filter(app => app.status === 'Completed').length;

//     const Header = () => (
//       <AppBar position="fixed" sx={{
//         backgroundColor: 'white',
//         color: 'text.primary',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         zIndex: theme.zIndex.drawer + 1
//       }}>
//         <Container maxWidth="xl">
//           <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'space-between' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <IconButton
//                 color="inherit"
//                 onClick={this.toggleDrawer}
//                 sx={{ mr: 2, display: { md: 'none' } }}
//               >
//                 <Menu />
//               </IconButton>
//               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//                 Admin Dashboard
//               </Typography>
//             </Box>
//             <Button
//               color="inherit"
//               startIcon={<ExitToApp />}
//               onClick={() => this.props.navigate('/adminlogin')}
//               sx={{ color: 'text.secondary' }}
//             >
//               Logout
//             </Button>
//           </Box>
//         </Container>
//       </AppBar>
//     );

//     const Sidebar = () => (
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', md: 'block' },
//           '& .MuiDrawer-paper': {
//             width: 240,
//             boxSizing: 'border-box',
//             backgroundColor: '#fafafa'
//           },
//         }}
//         open
//       >
//         <Box sx={{ height: '64px' }} />
//         <List>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard')} selected={isMainDashboard}>
//             <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard/MakeDoc')} selected={location.pathname.includes('MakeDoc')}>
//             <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
//             <ListItemText primary="Add Doctor" />
//           </ListItem>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard/createAcc')} selected={location.pathname.includes('createAcc')}>
//             <ListItemIcon><Person color="primary" /></ListItemIcon>
//             <ListItemText primary="Add Patient" />
//           </ListItem>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard/analytics')} selected={location.pathname.includes('analytics')}>
//             <ListItemIcon><Leaderboard color="primary" /></ListItemIcon>
//             <ListItemText primary="Analytics" />
//           </ListItem>
//         </List>
//         <Divider />
//         <List>
//           <ListItem>
//             <ListItemText primary="Quick Stats" primaryTypographyProps={{ variant: 'subtitle2', color: 'text.secondary' }} />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon><Group color="primary" /></ListItemIcon>
//             <ListItemText primary={`${doctors.length} Doctors`} />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon><Person color="primary" /></ListItemIcon>
//             <ListItemText primary={`${patients.length} Patients`} />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <Badge badgeContent={pendingAppointments} color="warning">
//                 <Assignment color="primary" />
//               </Badge>
//             </ListItemIcon>
//             <ListItemText primary={`${appointments.length} Appointments`} />
//           </ListItem>
//         </List>
//       </Drawer>
//     );

//     const MobileSidebar = () => (
//       <Drawer
//         variant="temporary"
//         open={drawerOpen}
//         onClose={this.toggleDrawer}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
//         }}
//       >
//         <Box sx={{ height: '64px' }} />
//         <List>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard')} selected={isMainDashboard}>
//             <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard/MakeDoc')} selected={location.pathname.includes('MakeDoc')}>
//             <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
//             <ListItemText primary="Add Doctor" />
//           </ListItem>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard/createAcc')} selected={location.pathname.includes('createAcc')}>
//             <ListItemIcon><Person color="primary" /></ListItemIcon>
//             <ListItemText primary="Add Patient" />
//           </ListItem>
//           <ListItem button onClick={() => this.navigateTo('/admindashboard/analytics')} selected={location.pathname.includes('analytics')}>
//             <ListItemIcon><Leaderboard color="primary" /></ListItemIcon>
//             <ListItemText primary="Analytics" />
//           </ListItem>
//         </List>
//       </Drawer>
//     );

//     const EditDialog = () => (
//       <Dialog open={editDialogOpen} onClose={() => this.setState({ editDialogOpen: false })} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           Edit {editType}
//           <IconButton onClick={() => this.setState({ editDialogOpen: false })} sx={{ position: 'absolute', right: 8, top: 8 }}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
//             <TextField
//               label="Full Name"
//               value={currentEditItem?.name || ''}
//               onChange={(e) => this.setState(prev => ({
//                 currentEditItem: { ...prev.currentEditItem, name: e.target.value }
//               }))}
//               fullWidth
//               margin="dense"
//             />
//             <TextField
//               label="Email"
//               value={currentEditItem?.email || ''}
//               disabled
//               fullWidth
//               margin="dense"
//             />
//             {editType === 'patient' && (
//               <>
//                 <TextField label="Address" value={currentEditItem?.address || ''} onChange={(e) => this.setState(prev => ({
//                   currentEditItem: { ...prev.currentEditItem, address: e.target.value }
//                 }))} fullWidth margin="dense" />
//                 <TextField label="Conditions" value={currentEditItem?.conditions || ''} onChange={(e) => this.setState(prev => ({
//                   currentEditItem: { ...prev.currentEditItem, conditions: e.target.value }
//                 }))} fullWidth margin="dense" multiline rows={2} />
//                 <TextField label="Surgeries" value={currentEditItem?.surgeries || ''} onChange={(e) => this.setState(prev => ({
//                   currentEditItem: { ...prev.currentEditItem, surgeries: e.target.value }
//                 }))} fullWidth margin="dense" multiline rows={2} />
//                 <TextField label="Medication" value={currentEditItem?.medication || ''} onChange={(e) => this.setState(prev => ({
//                   currentEditItem: { ...prev.currentEditItem, medication: e.target.value }
//                 }))} fullWidth margin="dense" multiline rows={2} />
//               </>
//             )}
//             <TextField
//               select
//               label="Gender"
//               value={currentEditItem?.gender || ''}
//               onChange={(e) => this.setState(prev => ({
//                 currentEditItem: { ...prev.currentEditItem, gender: e.target.value }
//               }))}
//               fullWidth
//               margin="dense"
//               SelectProps={{ native: true }}
//             >
//               <option value=""></option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </TextField>
//             <TextField
//               label="Password (leave blank to keep current)"
//               type={showPassword ? 'text' : 'password'}
//               value={currentEditItem?.password || ''}
//               onChange={(e) => this.setState(prev => ({
//                 currentEditItem: { ...prev.currentEditItem, password: e.target.value }
//               }))}
//               fullWidth
//               margin="dense"
//               InputProps={{
//                 endAdornment: (
//                   <IconButton onClick={() => this.setState(prev => ({ showPassword: !prev.showPassword }))} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 )
//               }}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => this.setState({ editDialogOpen: false })}>Cancel</Button>
//           <Button onClick={this.handleEditSubmit} variant="contained" disabled={!currentEditItem?.name}>
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );

//     const DashboardContent = () => (
//       <>
//         <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Total Doctors</Typography>
//             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{doctors.length}</Typography>
//           </Paper>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Total Patients</Typography>
//             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{patients.length}</Typography>
//           </Paper>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Pending Appointments</Typography>
//             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pendingAppointments}</Typography>
//           </Paper>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Completed Appointments</Typography>
//             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{completedAppointments}</Typography>
//           </Paper>
//         </Box>

//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Doctors Management</Typography>
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={() => this.navigateTo('/admindashboard/MakeDoc')}
//               sx={{ mb: 2 }}
//             >
//               Add Doctor
//             </Button>
//           </Box>
//           <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
//             <TableContainer>
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {doctors.map(doctor => (
//                     <TableRow key={doctor.email} hover>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 36, height: 36 }}>
//                             <LocalHospital sx={{ fontSize: 20 }} />
//                           </Avatar>
//                           {doctor.name}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{doctor.email}</TableCell>
//                       <TableCell>{doctor.gender}</TableCell>
//                       <TableCell>
//                         <Tooltip title="Edit">
//                           <IconButton size="small" sx={{ mr: 1 }} onClick={() => this.handleEdit(doctor, 'doctor')} color="primary">
//                             <Edit fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton size="small" onClick={() => this.handleDelete('doctor', doctor.email)} color="error">
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>

//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Patients Management</Typography>
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={() => this.navigateTo('/admindashboard/createAcc')}
//               sx={{ mb: 2 }}
//             >
//               Add Patient
//             </Button>
//           </Box>
//           <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
//             <TableContainer>
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {patients.map(patient => (
//                     <React.Fragment key={patient.email}>
//                       <TableRow hover onClick={() => this.handlePatientClick(patient.email)} sx={{ cursor: 'pointer' }}>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 36, height: 36 }}>
//                               <Person sx={{ fontSize: 20 }} />
//                             </Avatar>
//                             {patient.name}
//                           </Box>
//                         </TableCell>
//                         <TableCell>{patient.email}</TableCell>
//                         <TableCell>{patient.address}</TableCell>
//                         <TableCell>{patient.gender}</TableCell>
//                         <TableCell>
//                           <Tooltip title="View History">
//                             <IconButton size="small">
//                               {openHistoryFor === patient.email ? <ExpandLess /> : <ExpandMore />}
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Edit">
//                             <IconButton size="small" sx={{ mr: 1 }} onClick={(e) => { e.stopPropagation(); this.handleEdit(patient, 'patient'); }} color="primary">
//                               <Edit fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <IconButton size="small" onClick={(e) => { e.stopPropagation(); this.handleDelete('patient', patient.email); }} color="error">
//                               <Delete fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell colSpan={5} sx={{ p: 0 }}>
//                           <Collapse in={openHistoryFor === patient.email} timeout="auto" unmountOnExit>
//                             <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
//                               <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Medical History</Typography>
//                               {selectedPatientHistory ? (
//                                 <Box>
//                                   <Typography variant="subtitle2" color="text.secondary">Conditions: {selectedPatientHistory.conditions || 'None'}</Typography>
//                                   <Typography variant="subtitle2" color="text.secondary">Surgeries: {selectedPatientHistory.surgeries || 'None'}</Typography>
//                                   <Typography variant="subtitle2" color="text.secondary">Medication: {selectedPatientHistory.medication || 'None'}</Typography>
//                                 </Box>
//                               ) : (
//                                 <Typography variant="body2">Loading history...</Typography>
//                               )}
//                             </Box>
//                           </Collapse>
//                         </TableCell>
//                       </TableRow>
//                     </React.Fragment>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>

//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Recent Appointments</Typography>
//           <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
//             <TableContainer>
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Symptoms</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {appointments.slice(0, 5).map(appointment => (
//                     <TableRow key={appointment.ID} hover>
//                       <TableCell>{appointment.user}</TableCell>
//                       <TableCell>{appointment.doctor}</TableCell>
//                       <TableCell>{new Date(appointment.theDate).toLocaleDateString()}</TableCell>
//                       <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                         {appointment.theSymptoms || 'None'}
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={appointment.status}
//                           color={appointment.status === 'Completed' ? 'success' : 'warning'}
//                           size="small"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>
//       </>
//     );

//     return (
//       <ThemeProvider theme={theme}>
//         <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
//           <Header />
//           <Sidebar />
//           <MobileSidebar />

//           <Box component="main" sx={{
//             flexGrow: 1,
//             pt: { xs: 10, sm: 10 },
//             pb: 4,
//             px: { xs: 2, sm: 4 },
//             ml: { md: '240px' }
//           }}>
//             {loading && <LinearProgress />}

//             {isMainDashboard ? <DashboardContent /> : <Outlet />}
//           </Box>

//           <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={6000}
//             onClose={() => this.setState({ snackbarOpen: false })}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           >
//             <Alert onClose={() => this.setState({ snackbarOpen: false })} severity={snackbarSeverity} variant="filled">
//               {snackbarMessage}
//             </Alert>
//           </Snackbar>

//           <EditDialog />
//         </Box>
//       </ThemeProvider>
//     );
//   }
// }

// // Wrap the component with withRouter equivalent for React Router v6
// const withNavigationAndLocation = (Component) => {
//   return (props) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     return <Component {...props} navigate={navigate} location={location} />;
//   };
// };

// export default withNavigationAndLocation(AdminDashboard);
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
      fetch('http://localhost:3001/getAllAppointments').then(res => res.json()) // New endpoint to fetch all appointments
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
    const completedAppointments = appointments.filter(app => app.status === 'Done').length;

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
                    <TableCell sx={{ fontWeight: 'bold' }}>Start Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>End Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.slice(0, 5).map(appointment => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>{appointment.user}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{appointment.starttime}</TableCell>
                      <TableCell>{appointment.endtime}</TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          color={appointment.status === 'Done' ? 'success' : 'warning'}
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
