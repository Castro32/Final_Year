
// import React from 'react';
// import { Box, Typography } from '@mui/material';

// const Home = () => {
//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <Typography variant="h4">Welcome Patient</Typography>
//     </Box>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  CalendarToday,
  MedicalServices,
  Person,
  LocalHospital,
  Notifications,
  Assignment,
  AccessTime,
  EventAvailable,
  EventBusy
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = (email) => {
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient data and appointments
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user session to get email
        const sessionRes = await fetch('http://localhost:3001/userInSession');
        const sessionData = await sessionRes.json();
        const email = sessionData.email;

        // Fetch patient appointments
        const apptRes = await fetch(`http://localhost:3001/patientViewAppt?email=${email}`);
        const apptData = await apptRes.json();
        
        if (apptData.data && apptData.data.length > 0) {
          setPatientData({
            name: apptData.data[0].patient_name,
            email: apptData.data[0].patient_email
          });
          setAppointments(apptData.data.slice(0, 3)); // Show only 3 upcoming appointments
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ 
          bgcolor: 'primary.main',
          width: 64,
          height: 64,
          mr: 3
        }}>
          <Person sx={{ fontSize: 32 }} />
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome, {patientData?.name || 'Patient'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
            onClick={() => navigate('/scheduleAppt')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <EventAvailable color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Book Appointment</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
            onClick={() => navigate('/PatientsViewAppt')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <CalendarToday color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">My Appointments</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
            onClick={() => navigate('/ViewOneHistory/${email}')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <MedicalServices color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Medical History</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
            onClick={() => navigate('/settings')}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Person color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Profile Settings</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Appointments */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarToday sx={{ mr: 1 }} /> Upcoming Appointments
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {appointments.length > 0 ? (
          <Grid container spacing={2}>
            {appointments.map((appointment, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {new Date(appointment.theDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ mr: 1, fontSize: 'small' }} />
                          {appointment.theStart.substring(0, 5)} - {appointment.theEnd.substring(0, 5)}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {appointment.theConcerns || 'General checkup'}
                        </Typography>
                      </Box>
                      <Box>
                        <Chip 
                          label={appointment.status} 
                          color={
                            appointment.status === 'Done' ? 'success' : 
                            appointment.status === 'Cancelled' ? 'error' : 'primary'
                          } 
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No upcoming appointments
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/book-appointment')}
            >
              Book an Appointment
            </Button>
          </Box>
        )}

        {appointments.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="text" 
              color="primary"
              endIcon={<Assignment />}
              onClick={() => navigate('/view-appointments')}
            >
              View All Appointments
            </Button>
          </Box>
        )}
      </Paper>

      {/* Health Tips */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalHospital sx={{ mr: 1 }} /> Health Tips
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>Stay Hydrated</Typography>
                <Typography variant="body2">
                  Drink at least 8 glasses of water daily to maintain proper body function and energy levels.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>Regular Exercise</Typography>
                <Typography variant="body2">
                  Aim for 30 minutes of moderate exercise most days of the week to improve cardiovascular health.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>Balanced Diet</Typography>
                <Typography variant="body2">
                  Eat a variety of fruits, vegetables, lean proteins, and whole grains for optimal nutrition.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;