// import React, { Component } from 'react';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box
// } from '@mui/material';

// class ScheduleManagementForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: '',
//       starttime: '',
//       endtime: '',
//       breaktime: '',
//       day: ''
//     };
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { id, starttime, endtime, breaktime, day } = this.state;

//     fetch("http://localhost:3001/createSchedule", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ id, starttime, endtime, breaktime, day })
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         alert('Schedule created successfully!');
//       } else {
//         alert('Error creating schedule');
//       }
//     })
//     .catch(error => {
//       console.error('Error creating schedule:', error);
//       alert('Error creating schedule');
//     });
//   };

//   render() {
//     return (
//       <Container>
//         <Typography variant="h4">Create Schedule</Typography>
//         <form onSubmit={this.handleSubmit}>
//           <TextField
//             label="Schedule ID"
//             name="id"
//             value={this.state.id}
//             onChange={this.handleChange}
//             margin="normal"
//             fullWidth
//             required
//           />
//           <TextField
//             label="Start Time"
//             name="starttime"
//             value={this.state.starttime}
//             onChange={this.handleChange}
//             margin="normal"
//             fullWidth
//             required
//           />
//           <TextField
//             label="End Time"
//             name="endtime"
//             value={this.state.endtime}
//             onChange={this.handleChange}
//             margin="normal"
//             fullWidth
//             required
//           />
//           <TextField
//             label="Break Time"
//             name="breaktime"
//             value={this.state.breaktime}
//             onChange={this.handleChange}
//             margin="normal"
//             fullWidth
//             required
//           />
//           <TextField
//             label="Day"
//             name="day"
//             value={this.state.day}
//             onChange={this.handleChange}
//             margin="normal"
//             fullWidth
//             required
//           />
//           <Box mt={2}>
//             <Button type="submit" variant="contained" color="primary">
//               Create Schedule
//             </Button>
//           </Box>
//         </form>
//       </Container>
//     );
//   }
// }

// export default ScheduleManagementForm;
import React, { Component } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Avatar,
  Chip
} from '@mui/material';
import {
  Schedule,
  AccessTime,
  CalendarToday,
  FreeBreakfast,
  Edit,
  Add,
  CheckCircle,
  Error
} from '@mui/icons-material';

class ScheduleManagementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      starttime: '',
      endtime: '',
      breaktime: '',
      day: '',
      loading: false,
      success: false,
      error: null,
      existingSchedules: []
    };
  }

  componentDidMount() {
    this.fetchExistingSchedules();
  }

  fetchExistingSchedules = () => {
    fetch("http://localhost:3001/getSchedules")
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({ existingSchedules: data.data });
        }
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, success: false, error: null });
    
    const { id, starttime, endtime, breaktime, day } = this.state;

    fetch("http://localhost:3001/createSchedule", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, starttime, endtime, breaktime, day })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.setState({ 
          success: true,
          id: '',
          starttime: '',
          endtime: '',
          breaktime: '',
          day: ''
        });
        this.fetchExistingSchedules();
      } else {
        this.setState({ error: data.message || 'Error creating schedule' });
      }
    })
    .catch(error => {
      this.setState({ error: 'Error creating schedule' });
    })
    .finally(() => {
      this.setState({ loading: false });
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ success: false, error: null });
  };

  render() {
    const { 
      id, 
      starttime, 
      endtime, 
      breaktime, 
      day, 
      loading, 
      success, 
      error,
      existingSchedules 
    } = this.state;

    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          gap: 2
        }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main',
            width: 56,
            height: 56
          }}>
            <Schedule sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" component="h1">
            Schedule Management
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Edit fontSize="small" /> Create New Schedule
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Schedule ID"
                      name="id"
                      value={id}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      required
                      helperText="Unique identifier for the schedule"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Start Time"
                      name="starttime"
                      type="time"
                      value={starttime}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300 // 5 min
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="End Time"
                      name="endtime"
                      type="time"
                      value={endtime}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300 // 5 min
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Break Duration (minutes)"
                      name="breaktime"
                      type="number"
                      value={breaktime}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      required
                      inputProps={{
                        min: 0,
                        max: 120
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Day</InputLabel>
                      <Select
                        name="day"
                        value={day}
                        label="Day"
                        onChange={this.handleChange}
                      >
                        {daysOfWeek.map(day => (
                          <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'flex-end',
                      gap: 2,
                      mt: 2
                    }}>
                      <Button
                        type="reset"
                        variant="outlined"
                        onClick={() => this.setState({
                          id: '',
                          starttime: '',
                          endtime: '',
                          breaktime: '',
                          day: ''
                        })}
                      >
                        Clear
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                      >
                        {loading ? 'Creating...' : 'Create Schedule'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Existing Schedules Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <CalendarToday fontSize="small" /> Existing Schedules
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {existingSchedules.length === 0 ? (
                <Alert severity="info">
                  No schedules found. Create your first schedule above.
                </Alert>
              ) : (
                <Grid container spacing={2}>
                  {existingSchedules.map(schedule => (
                    <Grid item xs={12} key={schedule.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {schedule.day}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                <AccessTime fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                {schedule.starttime} - {schedule.endtime}
                              </Typography>
                            </Box>
                            <Chip 
                              label={`Break: ${schedule.breaktime} min`} 
                              icon={<FreeBreakfast />}
                              variant="outlined"
                              size="small"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Help Section */}
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Schedule Management Guidelines
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Working Hours:</strong> Ensure your schedule aligns with standard working hours (8am-6pm).
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Break Times:</strong> Typical breaks range from 30-60 minutes.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Overlapping:</strong> Avoid creating overlapping schedules for the same day.
                  </Typography>
                  <Typography variant="body1">
                    <strong>Editing:</strong> Contact admin to modify existing schedules.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Notifications */}
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert 
            onClose={this.handleCloseSnackbar} 
            severity="success"
            icon={<CheckCircle fontSize="inherit" />}
          >
            Schedule created successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert 
            onClose={this.handleCloseSnackbar} 
            severity="error"
            icon={<Error fontSize="inherit" />}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default ScheduleManagementForm;