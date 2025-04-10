import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  AppBar,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Outlet } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Lato',
  },
});

const SidebarButton = ({ label, ...rest }) => (
  <ListItem button {...rest}>
    <ListItemText primary={label} />
  </ListItem>
);

const SidebarButtons = ({ active, setActive, email }) => {
  const navigate = useNavigate();

  const handleClick = (label) => {
    setActive(label);
    if (label === "Appointments") {
      navigate("/ApptList");
    } else if (label === "Sign Out") {
      fetch("http://localhost:3001/endSession");
      navigate("/");
    } else if (label === "View Patients") {
      navigate("/MedHistView");
    // } else if (label === "View Medical History") {
    //   navigate(`/ViewOneHistory/${email}`);
    } else if (label === "Settings") {
      navigate("/DocSettings");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          height: '100vh',
          backgroundColor: '#f0f0f0',
          position: 'fixed',
          width: '200px',
          top: '64px',
          left: 0,
          overflowY: 'auto',
        }}
      >
        <List>
          {["Appointments", "View Patients", "Settings", "Sign Out"].map(label => (
            <SidebarButton
              key={label}
              style={{ marginTop: "20px" }}
              label={label}
              selected={label === active}
              onClick={() => handleClick(label)}
            />
          ))}
        </List>
      </Paper>
    </ThemeProvider>
  );
};

const DocLayout = () => {
  const [active, setActive] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/userInSession")
      .then(res => res.json())
      .then(res => {
        setEmail(res.email);
      });
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters>
        <Header />
        <Grid container>
          <Grid item xs={2}>
            <SidebarButtons active={active} setActive={setActive} email={email} />
          </Grid>
          <Grid item xs={10} sx={{ marginLeft: '200px', paddingTop: '64px' }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default DocLayout;
