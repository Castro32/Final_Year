import React, { Component } from 'react';
import {
    Box,
    Button,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    TextField,
    MenuItem,
    Avatar,
    IconButton,
    Chip,
    Divider,
    Card,
    CardContent
} from '@mui/material';
import { Search, Notifications, AccountCircle, CalendarToday, AccessTime, MedicalServices, CancelOutlined, Done } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

export class DocViewAppt extends Component {
    state = { 
        apptlist: [],
        searchTerm: '',
        filterStatus: 'all',
        upcomingOnly: false
    }

    componentDidMount() {
        this.getNames();
    }

    getNames() {
        fetch('http://localhost:3001/doctorViewAppt')
        .then(res => res.json())
        .then(res => this.setState({ apptlist: res.data }));
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleStatusFilter = (event) => {
        this.setState({ filterStatus: event.target.value });
    };

    toggleUpcoming = () => {
        this.setState(prevState => ({ upcomingOnly: !prevState.upcomingOnly }));
    };

    filterAppointments = () => {
        const { apptlist, searchTerm, filterStatus, upcomingOnly } = this.state;
        const today = new Date();
        
        return apptlist.filter(appt => {
            const matchesSearch = 
                appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appt.concerns.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appt.symptoms.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = 
                filterStatus === 'all' || 
                appt.status.toLowerCase() === filterStatus.toLowerCase();

            const isUpcoming = new Date(appt.date) >= today;
            const matchesUpcoming = !upcomingOnly || isUpcoming;
            
            return matchesSearch && matchesStatus && matchesUpcoming;
        });
    };

    render() {
        const { searchTerm, filterStatus, upcomingOnly } = this.state;
        const filteredAppointments = this.filterAppointments();

        const Header = () => (
            <AppBar position="static" >
                {/* <Toolbar>
                    <MedicalServices sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Doctor Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar> */}
            </AppBar>
        );

        const StatsCard = ({ title, value, icon, color }) => (
            <Card sx={{ minWidth: 200, bgcolor: color, color: 'white' }}>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <div>
                            <Typography variant="h5" component="div">
                                <MedicalServices sx={{ mr: 2 }} />
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
            const totalAppointments = this.state.apptlist.length;
            const upcomingAppointments = this.state.apptlist.filter(appt => 
                appt.status === 'NotDone'
            ).length;
            const cancelledAppointments = this.state.apptlist.filter(appt =>
                appt.status === 'Cancelled'
            ).length;
            const completedAppointments = this.state.apptlist.filter(appt => 
                appt.status === 'Done'
            ).length;
            
            return (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Appointment Overview
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item>
                            <StatsCard 
                                title="Total Appointments" 
                                value={totalAppointments} 
                                icon={<CalendarToday fontSize="large" />} 
                                color="black" 
                            />
                        </Grid>
                        <Grid item>
                            <StatsCard 
                                title="Cancelled" 
                                value={cancelledAppointments}
                                // icon={<AccessTime fontSize="large" />} 
                                icon={<CancelOutlined fontSize='large'/>}
                                color="black" 
                            />
                        </Grid>
                        <Grid item>
                            <StatsCard 
                                title="Upcoming" 
                                value={upcomingAppointments}
                                icon={<AccessTime fontSize="large" />} 
                                color="black" 
                            />
                        </Grid>
                        <Grid item>
                            <StatsCard 
                                title="Completed" 
                                value={completedAppointments} 
                                // icon={<MedicalServices fontSize="large" />} 
                                icon={<Done fontSize='large'/>}
                                color="black" 
                            />
                        </Grid>
                    </Grid>
                </Box>
            );
        };

        const Filters = () => (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Search Appointments"
                            variant="outlined"
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                            InputProps={{
                                startAdornment: <Search sx={{ mr: 1 }} />
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            fullWidth
                            label="Filter by Status"
                            value={filterStatus}
                            onChange={this.handleStatusFilter}
                        >
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="NotDone">Pending</MenuItem>
                            <MenuItem value="Done">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </TextField>
                    </Grid>
                    {/* <Grid item xs={12} sm={3}>
                        <Button
                            fullWidth
                            variant={upcomingOnly ? "contained" : "outlined"}
                            color="primary"
                            onClick={this.toggleUpcoming}
                            startIcon={<CalendarToday />}
                        >
                            {upcomingOnly ? "Showing Upcoming" : "Show All"}
                        </Button>
                    </Grid> */}
                </Grid>
            </Box>
        );

        const AppointmentStatusChip = ({ status }) => {
            let color;
            switch(status) {
                case 'Done':
                    color = 'success';
                    break;
                case 'Cancelled':
                    color = 'error';
                    break;
                default:
                    color = 'warning';
            }
            
            return <Chip label={status} color={color} size="small" />;
        };

        const Body = () => (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    My Appointments
                </Typography>
                
                <DashboardStats />
                <Filters />
                
                {filteredAppointments.length === 0 ? (
                    <Box textAlign="center" py={4}>
                        <Typography variant="h6" color="textSecondary">
                            No appointments found matching your criteria
                        </Typography>
                    </Box>
                ) : (
                    <Paper sx={{ mt: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient</TableCell>
                                        <TableCell>Appointment Details</TableCell>
                                        <TableCell>Medical Info</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredAppointments.map(appt => (
                                        <TableRow key={appt.id} hover>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
                                                        {appt.name.charAt(0)}
                                                    </Avatar>
                                                    <div>
                                                        <Typography fontWeight="bold">{appt.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            ID: {appt.id}
                                                        </Typography>
                                                    </div>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    <CalendarToday fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                                    {new Date(appt.date).toLocaleDateString()}
                                                </Typography>
                                                <Typography>
                                                    <AccessTime fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                                    {appt.starttime}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography><strong>Concerns:</strong> {appt.concerns}</Typography>
                                                <Typography><strong>Symptoms:</strong> {appt.symptoms}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <AppointmentStatusChip status={appt.status} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    href={`/Diagnose/${appt.id}`}
                                                    sx={{ mr: 1, mb: 1 }}
                                                    disabled={appt.status !== 'NotDone'}
                                                >
                                                    Diagnose
                                                </Button>
                                                {/* {appt.status === "NotDone" && (
                                                    <Button 
                                                        variant="outlined" 
                                                        color="error" 
                                                        onClick={() => {
                                                            fetch('http://localhost:3001/deleteAppt?uid=' + appt.id);
                                                            window.location.reload();
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                )} */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )}
                
                <Box mt={4}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="textSecondary" align="center">
                        {`Showing ${filteredAppointments.length} of ${this.state.apptlist.length} appointments`}
                    </Typography>
                </Box>
            </Container>
        );

        return (
            <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
                <Header />
                <Body />
            </Box>
        );
    }
}

export default DocViewAppt;