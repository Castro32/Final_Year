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