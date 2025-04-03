// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Container,
//   Paper,
//   Grid,
//   IconButton,
//   useMediaQuery
// } from '@mui/material';
// import {
//   LocalHospital,
//   Person,
//   CalendarToday,
//   ArrowBack,
//   PieChart,
//   BarChart,
//   Timeline,
//   ShowChart
// } from '@mui/icons-material';
// import { Chart } from 'react-google-charts';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
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

// const AnalyticsPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     doctorsByGender: [],
//     patientsByGender: [],
//     appointmentsByStatus: [],
//     monthlyAppointments: []
//   });

//   const navigate = useNavigate();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch all data
//         const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
//           fetch('http://localhost:3001/docInfo'),
//           fetch('http://localhost:3001/getAllPatients'),
//           fetch('http://localhost:3001/getAllAppointments')
//         ]);

//         const doctors = await doctorsRes.json();
//         const patients = await patientsRes.json();
//         const appointments = await appointmentsRes.json();

//         // Process data for charts
//         const stats = processStats(
//           doctors.data || [],
//           patients.data || [],
//           appointments.data || []
//         );

//         setDoctors(doctors.data || []);
//         setPatients(patients.data || []);
//         setAppointments(appointments.data || []);
//         setStats(stats);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const processStats = (doctors, patients, appointments) => {
//     // Doctors by gender
//     const doctorsByGender = doctors.reduce((acc, doctor) => {
//       const gender = doctor.gender || 'Unknown';
//       acc[gender] = (acc[gender] || 0) + 1;
//       return acc;
//     }, {});

//     const doctorsByGenderChart = [
//       ['Gender', 'Count'],
//       ...Object.entries(doctorsByGender).map(([gender, count]) => [gender, parseInt(count)])
//     ];

//     // Patients by gender
//     const patientsByGender = patients.reduce((acc, patient) => {
//       const gender = patient.gender || 'Unknown';
//       acc[gender] = (acc[gender] || 0) + 1;
//       return acc;
//     }, {});

//     const patientsByGenderChart = [
//       ['Gender', 'Count'],
//       ...Object.entries(patientsByGender).map(([gender, count]) => [gender, parseInt(count)])
//     ];

//     // Appointments by status
//     const appointmentsByStatus = appointments.reduce((acc, app) => {
//       const status = app.status || 'Unknown';
//       acc[status] = (acc[status] || 0) + 1;
//       return acc;
//     }, {});

//     const appointmentsByStatusChart = [
//       ['Status', 'Count'],
//       ...Object.entries(appointmentsByStatus).map(([status, count]) => [status, parseInt(count)])
//     ];

//     // Monthly appointments
//     const monthlyAppointments = appointments.reduce((acc, app) => {
//       if (!app.appointment_date) return acc;

//       const date = new Date(app.appointment_date);
//       const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

//       acc[monthYear] = (acc[monthYear] || 0) + 1;
//       return acc;
//     }, {});

//     const monthlyAppointmentsChart = [
//       ['Month', 'Appointments'],
//       ...Object.entries(monthlyAppointments).sort((a, b) => {
//         const [aMonth, aYear] = a[0].split('/').map(Number);
//         const [bMonth, bYear] = b[0].split('/').map(Number);
//         return aYear - bYear || aMonth - bMonth;
//       }).map(([month, count]) => [month, parseInt(count)])
//     ];

//     return {
//       doctorsByGender: doctorsByGenderChart,
//       patientsByGender: patientsByGenderChart,
//       appointmentsByStatus: appointmentsByStatusChart,
//       monthlyAppointments: monthlyAppointmentsChart
//     };
//   };

//   const handleBack = () => {
//     navigate('/admin-dashboard');
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{
//         backgroundColor: 'background.default',
//         minHeight: '100vh',
//         p: 3
//       }}>
//         <Container maxWidth="xl">
//           <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
//             <IconButton onClick={handleBack} sx={{ mr: 2 }}>
//               <ArrowBack />
//             </IconButton>
//             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//               Analytics Dashboard
//             </Typography>
//           </Box>

//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//               <Typography>Loading analytics data...</Typography>
//             </Box>
//           ) : (
//             <Grid container spacing={3}>
//               {/* Summary Cards */}
//               <Grid item xs={12} sm={6} md={3}>
//                 <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <LocalHospital color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="subtitle1">Total Doctors</Typography>
//                   </Box>
//                   <Typography variant="h4">{doctors.length}</Typography>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Person color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="subtitle1">Total Patients</Typography>
//                   </Box>
//                   <Typography variant="h4">{patients.length}</Typography>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <CalendarToday color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="subtitle1">Total Appointments</Typography>
//                   </Box>
//                   <Typography variant="h4">{appointments.length}</Typography>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <ShowChart color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="subtitle1">Completed Appointments</Typography>
//                   </Box>
//                   <Typography variant="h4">
//                     {appointments.filter(a => a.status === 'Completed').length}
//                   </Typography>
//                 </Paper>
//               </Grid>

//               {/* Charts */}
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <PieChart color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="h6">Doctors by Gender</Typography>
//                   </Box>
//                   <Chart
//                     chartType="PieChart"
//                     data={stats.doctorsByGender}
//                     options={{
//                       pieHole: 0.4,
//                       is3D: false,
//                       colors: ['#1976d2', '#f50057', '#4caf50'],
//                       chartArea: { width: '90%', height: '80%' },
//                       legend: { position: isMobile ? 'bottom' : 'right' }
//                     }}
//                     width="100%"
//                     height="300px"
//                   />
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <PieChart color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="h6">Patients by Gender</Typography>
//                   </Box>
//                   <Chart
//                     chartType="PieChart"
//                     data={stats.patientsByGender}
//                     options={{
//                       pieHole: 0.4,
//                       is3D: false,
//                       colors: ['#1976d2', '#f50057', '#4caf50'],
//                       chartArea: { width: '90%', height: '80%' },
//                       legend: { position: isMobile ? 'bottom' : 'right' }
//                     }}
//                     width="100%"
//                     height="300px"
//                   />
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <BarChart color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="h6">Appointments by Status</Typography>
//                   </Box>
//                   <Chart
//                     chartType="BarChart"
//                     data={stats.appointmentsByStatus}
//                     options={{
//                       bars: 'horizontal',
//                       colors: ['#1976d2'],
//                       chartArea: { width: '80%', height: '80%' },
//                       hAxis: { minValue: 0 },
//                       legend: { position: 'none' }
//                     }}
//                     width="100%"
//                     height="300px"
//                   />
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <Timeline color="primary" sx={{ mr: 1 }} />
//                     <Typography variant="h6">Appointments Over Time</Typography>
//                   </Box>
//                   <Chart
//                     chartType="LineChart"
//                     data={stats.monthlyAppointments}
//                     options={{
//                       colors: ['#f50057'],
//                       chartArea: { width: '85%', height: '80%' },
//                       hAxis: { title: 'Month' },
//                       vAxis: { title: 'Appointments', minValue: 0 },
//                       legend: { position: 'none' }
//                     }}
//                     width="100%"
//                     height="300px"
//                   />
//                 </Paper>
//               </Grid>
//             </Grid>
//           )}
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AnalyticsPage;
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
  useMediaQuery
} from '@mui/material';
import {
  LocalHospital,
  Person,
  CalendarToday,
  ArrowBack,
  PieChart,
  BarChart,
  Timeline,
  ShowChart
} from '@mui/icons-material';
import { Chart } from 'react-google-charts';
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

const AnalyticsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    doctorsByGender: [],
    patientsByGender: [],
    appointmentsByStatus: [],
    monthlyAppointments: []
  });

  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data
        const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
          fetch('http://localhost:3001/docInfo'),
          fetch('http://localhost:3001/getAllPatients'),
          fetch('http://localhost:3001/getAllAppointments')
        ]);

        const doctors = await doctorsRes.json();
        const patients = await patientsRes.json();
        const appointments = await appointmentsRes.json();

        // Process data for charts
        const stats = processStats(
          doctors.data || [],
          patients.data || [],
          appointments.data || []
        );

        setDoctors(doctors.data || []);
        setPatients(patients.data || []);
        setAppointments(appointments.data || []);
        setStats(stats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processStats = (doctors, patients, appointments) => {
    // Doctors by gender
    const doctorsByGender = doctors.reduce((acc, doctor) => {
      const gender = doctor.gender || 'Unknown';
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});

    const doctorsByGenderChart = [
      ['Gender', 'Count'],
      ...Object.entries(doctorsByGender).map(([gender, count]) => [gender, parseInt(count)])
    ];

    // Patients by gender
    const patientsByGender = patients.reduce((acc, patient) => {
      const gender = patient.gender || 'Unknown';
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});

    const patientsByGenderChart = [
      ['Gender', 'Count'],
      ...Object.entries(patientsByGender).map(([gender, count]) => [gender, parseInt(count)])
    ];

    // Appointments by status
    const appointmentsByStatus = appointments.reduce((acc, app) => {
      const status = app.status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const appointmentsByStatusChart = [
      ['Status', 'Count'],
      ...Object.entries(appointmentsByStatus).map(([status, count]) => [status, parseInt(count)])
    ];

    // Monthly appointments
    const monthlyAppointments = appointments.reduce((acc, app) => {
      if (!app.date) return acc;

      const date = new Date(app.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});

    const monthlyAppointmentsChart = [
      ['Month', 'Appointments'],
      ...Object.entries(monthlyAppointments).sort((a, b) => {
        const [aMonth, aYear] = a[0].split('/').map(Number);
        const [bMonth, bYear] = b[0].split('/').map(Number);
        return aYear - bYear || aMonth - bMonth;
      }).map(([month, count]) => [month, parseInt(count)])
    ];

    return {
      doctorsByGender: doctorsByGenderChart,
      patientsByGender: patientsByGenderChart,
      appointmentsByStatus: appointmentsByStatusChart,
      monthlyAppointments: monthlyAppointmentsChart
    };
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        p: 3
      }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            {/* <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton> */}
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Analytics Dashboard
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <Typography>Loading analytics data...</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Summary Cards */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocalHospital color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Total Doctors</Typography>
                  </Box>
                  <Typography variant="h4">{doctors.length}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Total Patients</Typography>
                  </Box>
                  <Typography variant="h4">{patients.length}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Total Appointments</Typography>
                  </Box>
                  <Typography variant="h4">{appointments.length}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ShowChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Completed Appointments</Typography>
                  </Box>
                  <Typography variant="h4">
                    {appointments.filter(a => a.status === 'Done').length}
                  </Typography>
                </Paper>
              </Grid>

              {/* Charts */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PieChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Doctors by Gender</Typography>
                  </Box>
                  <Chart
                    chartType="PieChart"
                    data={stats.doctorsByGender}
                    options={{
                      pieHole: 0.4,
                      is3D: false,
                      colors: ['#1976d2', '#f50057', '#4caf50'],
                      chartArea: { width: '90%', height: '80%' },
                      legend: { position: isMobile ? 'bottom' : 'right' },
                      title: 'Doctors by Gender',
                      titleTextStyle: { fontSize: 16 }
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PieChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Patients by Gender</Typography>
                  </Box>
                  <Chart
                    chartType="PieChart"
                    data={stats.patientsByGender}
                    options={{
                      pieHole: 0.4,
                      is3D: false,
                      colors: ['#1976d2', '#f50057', '#4caf50'],
                      chartArea: { width: '90%', height: '80%' },
                      legend: { position: isMobile ? 'bottom' : 'right' },
                      title: 'Patients by Gender',
                      titleTextStyle: { fontSize: 16 }
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BarChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Appointments by Status</Typography>
                  </Box>
                  <Chart
                    chartType="BarChart"
                    data={stats.appointmentsByStatus}
                    options={{
                      bars: 'horizontal',
                      colors: ['#1976d2'],
                      chartArea: { width: '80%', height: '80%' },
                      hAxis: { minValue: 0 },
                      legend: { position: 'none' },
                      title: 'Appointments by Status',
                      titleTextStyle: { fontSize: 16 }
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Timeline color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Appointments Over Time</Typography>
                  </Box>
                  <Chart
                    chartType="LineChart"
                    data={stats.monthlyAppointments}
                    options={{
                      colors: ['#f50057'],
                      chartArea: { width: '85%', height: '80%' },
                      hAxis: { title: 'Month' },
                      vAxis: { title: 'Appointments', minValue: 0 },
                      legend: { position: 'none' },
                      title: 'Monthly Appointments',
                      titleTextStyle: { fontSize: 16 }
                    }}
                    width="100%"
                    height="300px"
                  />
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AnalyticsPage;
