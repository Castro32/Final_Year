import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Toolbar,
  Paper,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TableContainer
} from '@mui/material';
import {
  Search,
  Person,
  MedicalInformation,
  CalendarToday,
  FilterList,
  Refresh,
  ArrowForward
} from '@mui/icons-material';
import { deepPurple, green, blue, orange } from '@mui/material/colors';

const ViewMedHist = () => {
  const [medhiststate, setMedhiststate] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  const getNames = async (searchValue = '') => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/MedHistView?name=${encodeURIComponent(searchValue)}&variable=words`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMedhiststate(data.data);
    } catch (err) {
      console.error('Error fetching medical history:', err);
      setError('Failed to load medical history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNames('');
  }, []);

  const handleRefresh = () => {
    getNames(searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getNames(searchTerm);
  };

  const Header = () => (
    <AppBar position="static" sx={{ bgcolor: deepPurple[700] }}>
      {/* <Toolbar>
        <MedicalInformation sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Patient Medical Records
        </Typography>
        <IconButton color="inherit" onClick={handleRefresh}>
          <Refresh />
        </IconButton>
      </Toolbar> */}
    </AppBar>
  );

  const StatsCard = ({ title, value, icon, color }) => (
    <Card sx={{ minWidth: 120, bgcolor: 'black', color: 'white' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
            <Typography variant="body2">
              {title}
            </Typography>
          </div>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );

  const DashboardStats = () => {
    const totalPatients = medhiststate.length;
    const recentPatients = medhiststate.filter(patient => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(patient.lastVisitDate || new Date()) > oneMonthAgo;
    }).length;

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Patient Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard 
              title="Total Patients" 
              value={totalPatients} 
              icon={<Person fontSize="large" />} 
              color="black"
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const SearchBar = () => (
    <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search patients by name, email, or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setFilterActive(!filterActive)}
                color={filterActive ? 'primary' : 'default'}
              >
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {filterActive && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Advanced Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Status"
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Follow-up">Follow-up Required</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Visit Date Range"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );

  const PatientStatusChip = ({ status }) => {
    let color;
    switch(status) {
      case 'Active':
        color = 'success';
        break;
      case 'Follow-up':
        color = 'warning';
        break;
      case 'Inactive':
        color = 'default';
        break;
      default:
        color = 'info';
    }
    
    return <Chip label={status} color={color} size="small" />;
  };

  const Body = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Patient Medical Records
      </Typography>
      
      <DashboardStats />
      <SearchBar />
      
      {error && (
        <Box sx={{ color: 'error.main', mb: 2, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ mb: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Contact Info</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medhiststate.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography color="textSecondary">
                        No patients found matching your criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  medhiststate.map(patient => (
                    <TableRow key={patient.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
                            {patient.Name.charAt(0)}
                          </Avatar>
                          <div>
                            <Typography fontWeight="bold">{patient.Name}</Typography>
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{patient.email}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          href={`/ViewOneHistory/${encodeURIComponent(patient.email)}`}
                          endIcon={<ArrowForward />}
                          sx={{ textTransform: 'none' }}
                        >
                          View Full Record
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="textSecondary" align="center">
        {`Showing ${medhiststate.length} patient records`}
      </Typography>
    </Container>
  );

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      <Body />
    </Box>
  );
};

export default ViewMedHist;