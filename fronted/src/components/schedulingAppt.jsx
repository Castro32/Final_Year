import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Alert,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const SchedulingAppt = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [concerns, setConcerns] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:3001/docInfo");
      if (!res.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await res.json();
      const formattedDoctors = data.data.map(doctor => ({
        name: doctor.name,
        email: doctor.email,
        label: `${doctor.name} (${doctor.email})`
      }));
      setDoctorsList(formattedDoctors);
    } catch (error) {
      setError('Error loading doctors. Please refresh the page.');
      console.error('Error fetching doctors:', error);
    }
  };

  const getFormattedDate = () => selectedDateTime.format('YYYY-MM-DD');
  const getFormattedTime = () => selectedDateTime.format('HH:mm');
  const getFormattedEndTime = () => selectedDateTime.add(1, 'hour').format('HH:mm');

  const validateInputs = () => {
    if (!selectedDoctor) {
      setError('Please select a doctor');
      return false;
    }
    if (!selectedDateTime.isValid()) {
      setError('Please select a valid date and time');
      return false;
    }
    if (!concerns.trim()) {
      setError('Please enter your concerns');
      return false;
    }
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return false;
    }
    return true;
  };


const handleSubmit = async (event) => {
  event.preventDefault();
  setError('');
  setLoading(true);

  try {
    if (!validateInputs()) {
      setLoading(false);
      return;
    }
    const userEmail = await getUserEmail();
    if (!userEmail) {
      throw new Error('User not logged in or session expired');
    }

    const hasConflict = await checkAppointmentConflict(userEmail);
    if (hasConflict) {
      setError("Appointment clash detected! Please select another time or doctor.");
      setLoading(false);
      return;
    }

    const appointmentId = await generateAppointmentId();

    await scheduleAppointment(appointmentId);

    await linkAppointmentToPatient(appointmentId, userEmail);

    resetForm();
    alert("Appointment successfully scheduled!");

  } catch (error) {
    console.error('Error scheduling appointment:', error);
    setError(error.message || 'Failed to schedule appointment. Please try again.');
  } finally {
    setLoading(false);
  }
};

const getUserEmail = async () => {
  const response = await fetch("http://localhost:3001/userInSession");
  if (!response.ok) {
    throw new Error('Failed to get user session');
  }
  const userData = await response.json();
  return userData.email;
};

const checkAppointmentConflict = async (userEmail) => {
  const params = new URLSearchParams({
    email: userEmail,
    startTime: getFormattedTime(),
    date: getFormattedDate(),
    docName: selectedDoctor
  });

  const response = await fetch(`http://localhost:3001/checkIfApptExists?${params}`);
  if (!response.ok) {
    throw new Error('Failed to check appointment availability');
  }

  const data = await response.json();
  return data.data.length > 0;
};

const generateAppointmentId = async () => {
  const response = await fetch("http://localhost:3001/genApptUID");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || 'Failed to generate appointment ID');
  }

  const data = await response.json();
  if (data.id === undefined || data.id === null) {
    throw new Error('Invalid appointment ID received from server');
  }

  return data.id;
};

const scheduleAppointment = async (appointmentId) => {
  console.log('Scheduling appointment with ID:', appointmentId);
  
  const params = new URLSearchParams({
    time: getFormattedTime(),
    endTime: getFormattedEndTime(),
    date: getFormattedDate(),
    concerns: concerns.trim(),
    symptoms: symptoms.trim(),
    id: appointmentId,
    doc: selectedDoctor
  });

  const response = await fetch(`http://localhost:3001/schedule?${params}`);
  
  if (!response.ok) {
    if (response.status === 409) {
      console.log('Appointment ID conflict, generating new ID...');
      const newId = await generateAppointmentId();

      params.set('id', newId);
      const retryResponse = await fetch(`http://localhost:3001/schedule?${params}`);
      if (!retryResponse.ok) {
        const errorData = await retryResponse.json().catch(() => ({}));
        throw new Error(errorData.details || 'Failed to schedule appointment after retry');
      }
      return await retryResponse.json();
    }
    
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || 'Failed to schedule appointment');
  }
  
  return await response.json();
};
const linkAppointmentToPatient = async (appointmentId, userEmail) => {
  const params = new URLSearchParams({
    email: userEmail,
    id: appointmentId,
    concerns: concerns.trim(),
    symptoms: symptoms.trim()
  });

  const response = await fetch(`http://localhost:3001/addToPatientSeeAppt?${params}`);
  if (!response.ok) {
    throw new Error('Failed to link appointment to patient');
  }
};

const resetForm = () => {
  setSelectedDateTime(dayjs());
  setConcerns('');
  setSymptoms('');
  setSelectedDoctor('');
};
  return (
    <Container>
      
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Schedule Appointment
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="doctor-label">Select Doctor</InputLabel>
                <Select
                  labelId="doctor-label"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                  disabled={loading}
                >
                  {doctorsList.map((doctor) => (
                    <MenuItem key={doctor.email} value={doctor.email}>
                      {doctor.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={selectedDateTime}
                  onChange={setSelectedDateTime}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      required: true 
                    } 
                  }}
                  disabled={loading}
                />
              </LocalizationProvider>

              <TextField
                label="Concerns"
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                multiline
                rows={4}
                required
                disabled={loading}
              />

              <TextField
                label="Symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                multiline
                rows={4}
                required
                disabled={loading}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                disabled={loading}
              >
                {loading ? 'Scheduling...' : 'Schedule Appointment'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SchedulingAppt;