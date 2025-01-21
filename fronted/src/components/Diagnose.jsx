import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    AppBar,
    Toolbar,
    Container,
    TextField,
    FormControl,
    Paper
} from '@mui/material';

const AppBarComponent = () => (
    <AppBar position="static">
        {/* <Toolbar>
            <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                HMS
            </Typography>
        </Toolbar> */}
    </AppBar>
);

const DiagnosisTextArea = ({ diagnosis, setDiagnosis }) => {
    const [value, setValue] = useState("");

    const onChange = event => {
        setValue(event.target.value);
        setDiagnosis(event.target.value);
    };

    return (
        <FormControl fullWidth margin="normal">
            <Typography variant="h6" component="h4" gutterBottom>
                Diagnosis
            </Typography>
            <TextField
                placeholder="Enter Diagnosis"
                label="Enter Diagnosis"
                value={value}
                onChange={onChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
            />
        </FormControl>
    );
};

const PrescriptionTextArea = ({ prescription, setPrescription }) => {
    const [value, setValue] = useState("");

    const onChange = event => {
        setValue(event.target.value);
        setPrescription(event.target.value);
    };

    return (
        <FormControl fullWidth margin="normal">
            <Typography variant="h6" component="h4" gutterBottom>
                Prescription
            </Typography>
            <TextField
                placeholder="Enter Prescription"
                label="Enter Prescription"
                value={value}
                onChange={onChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
            />
        </FormControl>
    );
};

const Diagnose = () => {
    const { id } = useParams();
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3001/diagnose?diagnosis=${diagnosis}&prescription=${prescription}&id=${id}`)
            .then(() => {
                window.alert("Diagnosis Submitted!");
            });
    };

    return (
        <Box >
            <AppBarComponent />
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <DiagnosisTextArea diagnosis={diagnosis} setDiagnosis={setDiagnosis} />
                        <PrescriptionTextArea prescription={prescription} setPrescription={setPrescription} />
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Submit Diagnosis
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Diagnose;
