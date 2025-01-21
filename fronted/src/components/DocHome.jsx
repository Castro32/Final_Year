import React, { Component, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from '@mui/material';


const SidebarButton = ({ label, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemText primary={label} />
  </ListItem>
);

const SidebarButtons = () => {
  const [active, setActive] = useState();

  const handleClick = (label) => {
    setActive(label);
    if (label === "Appointments") {
      window.location = "/ApptList";
    } else if (label === "Sign Out") {
      fetch("http://localhost:3001/endSession");
      window.location = "/";
    } else if (label === "Settings") {
      window.location = "/DocSettings";
    } else if (label === "View Patients") {
      window.location = "/MedHistView";
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {["Appointments", "View Patients", "Settings", "Sign Out"].map((label) => (
          <SidebarButton key={label} label={label} onClick={() => handleClick(label)} />
        ))}
      </List>
    </Drawer>
  );
};

export class DocHome extends Component {
  render() {
    const Header = () => (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
              HMS
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    );

    return (
      <Box sx={{ display: 'flex' }}>
        <Header />
        <SidebarButtons />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
          }}
        >
          <Container>
            <Grid container justifyContent="center" alignItems="center" direction="column" style={{ minHeight: '80vh' }}>
              <Typography variant="h4" color="textPrimary">
                Welcome Doctor
              </Typography>
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  }
}

export default DocHome;
