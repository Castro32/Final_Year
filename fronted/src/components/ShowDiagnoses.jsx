// import React, { Component } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     Box,
//     Typography,
//     AppBar,
//     Toolbar,
//     Container,
//     Table,
//     TableBody,
//     TableCell,
//     TableRow,
//     Paper
// } from '@mui/material';

// function withParams(Component) {
//     return props => <Component {...props} params={useParams()} />;
// }

// class ShowDiagnoses extends Component {
//     constructor(props) {
//         super(props);
//         this.id = props.params.id;
//     }

//     state = { diagnoses: [] }

//     componentDidMount() {
//         fetch('http://localhost:3001/showDiagnoses?id=' + this.id)
//             .then(res => res.json())
//             .then(res => this.setState({ diagnoses: res.data }));
//     }

//     render() {
//         const { diagnoses } = this.state;

//         const Header = () => (
//             <AppBar position="static">
//                 {/* <Toolbar>
//                     <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
//                         HMS
//                     </Typography>
//                 </Toolbar> */}
//             </AppBar>
//         );

//         const Body = () => (
//             <Container>
//                 <Paper sx={{ mt: 2, p: 2 }}>
//                     {diagnoses.map(diagnosis => (
//                         <Table key={diagnosis.appt}>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Appointment Id</strong>
//                                     </TableCell>
//                                     <TableCell>{diagnosis.appt}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Doctor</strong>
//                                     </TableCell>
//                                     <TableCell>{diagnosis.doctor}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Diagnosis</strong>
//                                     </TableCell>
//                                     <TableCell>{diagnosis.diagnosis}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell component="th" scope="row">
//                                         <strong>Prescription</strong>
//                                     </TableCell>
//                                     <TableCell>{diagnosis.prescription}</TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     ))}
//                 </Paper>
//             </Container>
//         );

//         return (
//             <Box sx={{ flexGrow: 1 }}>
//                 <Header />
//                 <Body />
//             </Box>
//         );
//     }
// }

// export default withParams(ShowDiagnoses);
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    AppBar,
    Container,
    Paper,
    Card,
    CardContent,
    Divider,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
import {
    MedicalServices,
    Person,
    LocalHospital,
    Medication,
    CalendarToday
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    },
});

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ShowDiagnoses extends Component {
    constructor(props) {
        super(props);
        this.id = props.params.id;
    }

    state = { diagnoses: [] }

    componentDidMount() {
        fetch('http://localhost:3001/showDiagnoses?id=' + this.id)
            .then(res => res.json())
            .then(res => this.setState({ diagnoses: res.data }));
    }

    render() {
        const { diagnoses } = this.state;

        const Header = () => (
            <AppBar 
                position="static"
                sx={{ 
                    backgroundColor: 'white', 
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ py: 2 }}>
                        <Typography variant="h4" fontWeight="bold">
                            Medical Diagnoses
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Complete medical history and treatment records
                        </Typography>
                    </Box>
                </Container>
            </AppBar>
        );

        const DiagnosisCard = ({ diagnosis }) => (
            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip 
                            icon={<CalendarToday />}
                            label={`Appointment #${diagnosis.appt}`}
                            color="primary"
                            variant="outlined"
                            sx={{ mr: 2 }}
                        />
                        Doctor:
                        
                        <Chip 
                            icon={<LocalHospital />}
                            label={diagnosis.doctor}
                            color="secondary"
                            variant="outlined"
                        />
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Diagnosis
                        </Typography>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                            <Typography>{diagnosis.diagnosis}</Typography>
                        </Paper>
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Prescription
                        </Typography>
                        <List dense>
                            {diagnosis.prescription.split('\n').map((item, index) => (
                                item.trim() && (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                                                <Medication sx={{ fontSize: 14 }} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                )
                            ))}
                        </List>
                    </Box>
                </CardContent>
            </Card>
        );

        const Body = () => (
            <Container maxWidth="lg" sx={{ py: 3 }}>
                {diagnoses.length > 0 ? (
                    diagnoses.map(diagnosis => (
                        <DiagnosisCard key={diagnosis.appt} diagnosis={diagnosis} />
                    ))
                ) : (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <MedicalServices sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h5" color="text.secondary">
                            No diagnosis records found
                        </Typography>
                    </Paper>
                )}
            </Container>
        );

        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                    <Header />
                    <Body />
                </Box>
            </ThemeProvider>
        );
    }
}

export default withParams(ShowDiagnoses);