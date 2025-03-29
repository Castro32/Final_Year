import React, { Component } from 'react';
import {
  Box,
  Button,
  Typography,
  AppBar,
  Container,
  Table,
  TableBody,
  TableCell,
  Toolbar,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Avatar,
  Chip,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search,
  CalendarToday,
  AccessTime,
  MedicalServices,
  CancelOutlined,
  Done,
  PictureAsPdf,
  Download,
  Refresh
} from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
import { jsPDF } from 'jspdf';

class DocViewAppt extends Component {
  state = {
    apptlist: [],
    searchTerm: '',
    filterStatus: 'all',
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = () => {
    this.setState({ isLoading: true, error: null });
    fetch('http://localhost:3001/doctorViewAppt')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch appointments');
        return res.json();
      })
      .then(res => this.setState({ apptlist: res.data || [], isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleStatusFilter = (event) => {
    this.setState({ filterStatus: event.target.value });
  };

  filterAppointments = () => {
    const { apptlist, searchTerm, filterStatus } = this.state;
    const today = new Date();
    
    return apptlist.filter(appt => {
      const matchesSearch = 
        appt.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.concerns?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.symptoms?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        filterStatus === 'all' || 
        appt.status?.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  };

generatePatientReport = (appointment) => {
    const doc = new jsPDF();
  
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147);
    doc.text('THIKA LEVEL 5 HOSPITAL', 105, 20, { align: 'center' });
  
    doc.setFontSize(16);
    doc.setTextColor(40, 53, 147);
    doc.text('PATIENT MEDICAL REPORT', 105, 30, { align: 'center' });
  
    // Patient Information
    doc.setFontSize(12);
    doc.setTextColor(40, 53, 147);
    doc.text('PATIENT INFORMATION', 20, 45);
    doc.line(20, 47, 60, 47);
  
    doc.setTextColor(0, 0, 0); 
    doc.text(`Name: ${appointment.name || 'N/A'}`, 20, 55);
    doc.text(`Patient ID: ${appointment.id || 'N/A'}`, 20, 65);
    doc.text(`Gender: ${appointment.gender || 'Not specified'}`, 20, 85);
  
    // Appointment Details
    doc.setTextColor(40, 53, 147);
    doc.text('APPOINTMENT DETAILS', 20, 105);
    doc.line(20, 107, 60, 107);
  
    doc.setTextColor(0, 0, 0); 
    doc.text(`Date: ${new Date(appointment.date).toLocaleDateString() || 'N/A'}`, 20, 115);
    doc.text(`Time: ${appointment.starttime || 'N/A'}`, 20, 125);
    doc.text(`Status: ${appointment.status || 'N/A'}`, 20, 135);
  
    // Medical Information
    doc.setTextColor(40, 53, 147);
    doc.text('MEDICAL INFORMATION', 20, 155);
    doc.line(20, 157, 60, 157);
  
    doc.setTextColor(0, 0, 0); 
    doc.text(`Primary Concerns: ${appointment.concerns || 'N/A'}`, 20, 165);
    doc.text(`Symptoms: ${appointment.symptoms || 'N/A'}`, 20, 175);
  
    // Diagnosis & Treatment
    doc.setTextColor(40, 53, 147);
    doc.text('DIAGNOSIS & TREATMENT', 20, 195);
    doc.line(20, 197, 70, 197);
  
    doc.setTextColor(0, 0, 0); 
    if (appointment.diagnosis) {
      doc.text(`Diagnosis: ${appointment.diagnosis}`, 20, 205);
      doc.text(`Prescription: ${appointment.prescription || 'N/A'}`, 20, 215);
      doc.text(`Treatment Plan: ${appointment.treatmentPlan || 'N/A'}`, 20, 225);
      doc.text(`Notes: ${appointment.notes || 'N/A'}`, 20, 235);
    } else {
      doc.text('Diagnosis: Not yet diagnosed', 20, 205);
    }
  
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('This document was generated electronically and is valid without signature', 105, 280, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
  
    doc.save(`Medical_Report_${appointment.name}_${appointment.id}.pdf`);
  };
  render() {
    const { searchTerm, filterStatus, isLoading, error } = this.state;
    const filteredAppointments = this.filterAppointments();

    const appointmentStats = {
      total: this.state.apptlist.length,
      pending: this.state.apptlist.filter(a => a.status === 'NotDone').length,
      completed: this.state.apptlist.filter(a => a.status === 'Done').length,
      cancelled: this.state.apptlist.filter(a => a.status === 'Cancelled').length
    };

    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <AppBar position="static" color="primary">
          {/* <Toolbar>
            <MedicalServices sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Doctor Appointment Dashboard
            </Typography>
            <Tooltip title="Refresh appointments">
              <IconButton color="inherit" onClick={this.fetchAppointments}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Toolbar> */}
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Patient Appointments
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Total Appointments" 
                  value={appointmentStats.total} 
                  icon={<CalendarToday fontSize="large" />}
                  color="black"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Pending" 
                  value={appointmentStats.pending} 
                  icon={<AccessTime fontSize="large" />}
                  color="black"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Completed" 
                  value={appointmentStats.completed} 
                  icon={<Done fontSize="large" />}
                  color="black"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard 
                  title="Cancelled" 
                  value={appointmentStats.cancelled} 
                  icon={<CancelOutlined fontSize="large" />}
                  color="black"
                />
              </Grid>
            </Grid>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Search patients or symptoms"
                    variant="outlined"
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label="Filter by status"
                    value={filterStatus}
                    onChange={this.handleStatusFilter}
                  >
                    <MenuItem value="all">All Appointments</MenuItem>
                    <MenuItem value="NotDone">Pending</MenuItem>
                    <MenuItem value="Done">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={this.fetchAppointments}
                    startIcon={<Refresh />}
                  >
                    Refresh
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Appointments Table */}
            {isLoading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <Typography>Loading appointments...</Typography>
              </Box>
            ) : error ? (
              <Box display="flex" justifyContent="center" py={4}>
                <Typography color="error">{error.message}</Typography>
              </Box>
            ) : filteredAppointments.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  No appointments found matching your criteria
                </Typography>
              </Paper>
            ) : (
              <Paper sx={{ overflow: 'hidden' }}>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'white' }}>Patient</TableCell>
                        <TableCell sx={{ color: 'white' }}>Appointment Details</TableCell>
                        <TableCell sx={{ color: 'white' }}>Medical Information</TableCell>
                        <TableCell sx={{ color: 'white' }}>Status</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAppointments.map((appt) => (
                        <TableRow key={appt.id} hover>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
                                {appt.name?.charAt(0) || 'P'}
                              </Avatar>
                              <Box>
                                <Typography fontWeight="bold">{appt.name || 'Unknown'}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                  ID: {appt.id}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography display="flex" alignItems="center">
                                <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                                {appt.date ? new Date(appt.date).toLocaleDateString() : 'N/A'}
                              </Typography>
                              <Typography display="flex" alignItems="center">
                                <AccessTime fontSize="small" sx={{ mr: 1 }} />
                                {appt.starttime || 'N/A'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography><strong>Concerns:</strong> {appt.concerns || 'Not specified'}</Typography>
                            <Typography><strong>Symptoms:</strong> {appt.symptoms || 'Not specified'}</Typography>
                          </TableCell>
                          <TableCell>
                            <StatusChip status={appt.status} />
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" flexDirection="column" alignItems="center">
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                href={`/Diagnose/${appt.id}`}
                                sx={{ mb: 1, width: '100%' }}
                                disabled={appt.status !== 'NotDone'}
                              >
                                Diagnose
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                startIcon={<PictureAsPdf />}
                                onClick={() => this.generatePatientReport(appt)}
                                sx={{ width: '100%' }}
                              >
                                Report
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}

            <Box mt={3}>
              <Divider />
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Showing {filteredAppointments.length} of {this.state.apptlist.length} appointments
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ bgcolor: color, color: 'white', height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          <Typography variant="body2">{title}</Typography>
        </Box>
        <Box sx={{ opacity: 0.8 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const StatusChip = ({ status }) => {
  const statusMap = {
    'NotDone': { label: 'Pending', color: 'warning' },
    'Done': { label: 'Completed', color: 'success' },
    'Cancelled': { label: 'Cancelled', color: 'error' }
  };

  const statusInfo = statusMap[status] || { label: status, color: 'default' };

  return (
    <Chip
      label={statusInfo.label}
      color={statusInfo.color}
      size="small"
      sx={{ fontWeight: 'bold' }}
    />
  );
};

export default DocViewAppt;