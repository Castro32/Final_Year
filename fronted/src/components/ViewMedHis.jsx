import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, CircularProgress, TextField, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Toolbar } from '@mui/material';

const ViewMedHist = () => {
  const [medhiststate, setMedhiststate] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const Header = () => (
    <AppBar position="static">
      {/* <Toolbar>
        <Typography variant="h6" component="a" href="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          HMS
        </Typography>
      </Toolbar> */}
    </AppBar>
  );

  const Body = () => (
    <Container>
      {error && (
        <Box sx={{ color: 'error.main', mb: 2 }}>
          {error}
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Profile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medhiststate.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.Name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/ViewOneHistory/${encodeURIComponent(patient.email)}`}
                    >
                      Medical Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Container>
  );

  return (
    <Box>
      <Header />
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const searchValue = formData.get('email');
            getNames(searchValue);
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Search By Name
          </Typography>
          <TextField name="email" label="Name" fullWidth margin="normal" />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Submit
            </Button>
          </Box>
        </form>
        <Body />
      </Container>
    </Box>
  );
};

export default ViewMedHist;
