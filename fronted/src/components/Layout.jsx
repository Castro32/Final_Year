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
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar
} from '@mui/material';
import {
  CalendarToday,
  History,
  ListAlt,
  Settings,
  ExitToApp,
  Person
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Outlet } from 'react-router-dom';

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

const SidebarButton = ({ label, icon, ...rest }) => (
  <ListItem 
    button 
    {...rest}
    sx={{
      borderRadius: '8px',
      margin: '4px 8px',
      '&.Mui-selected': {
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
        }
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      }
    }}
  >
    <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
      {icon}
    </ListItemIcon>
    <ListItemText 
      primary={label} 
      primaryTypographyProps={{
        fontWeight: 'medium',
        fontSize: '0.875rem'
      }} 
    />
  </ListItem>
);

const SidebarButtons = ({ active, setActive, email }) => {
  const navigate = useNavigate();

  const handleClick = (label) => {
    setActive(label);
    if (label === "Schedule Appointment") {
      navigate("/scheduleAppt");
    } else if (label === "Sign Out") {
      fetch("http://localhost:3001/endSession");
      navigate("/");
    } else if (label === "View Appointments") {
      navigate("/PatientsViewAppt");
    } else if (label === "View Medical History") {
      navigate(`/ViewOneHistory/${email}`);
    } else if (label === "Settings") {
      navigate("/Settings");
    }
  };

  const menuItems = [
    { label: "View Medical History", icon: <History /> },
    { label: "View Appointments", icon: <ListAlt /> },
    { label: "Schedule Appointment", icon: <CalendarToday /> },
    { label: "Settings", icon: <Settings /> },
    { label: "Sign Out", icon: <ExitToApp /> },
  ];

  return (
    <Paper
      sx={{
        height: '100vh',
        backgroundColor: 'white',
        position: 'fixed',
        width: '240px',
        top: 0,
        left: 0,
        overflowY: 'auto',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        borderRadius: 0,
        borderRight: '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'55px' }}>
        <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: 'black' }}>
          <Person sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="subtitle1" fontWeight="medium">
          {email || 'User'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 1 }} />
      
      <List sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <SidebarButton
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={item.label === active}
            onClick={() => handleClick(item.label)}
          />
        ))}
      </List>
    </Paper>
  );
};

const Layout = () => {
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
    <AppBar 
      position="fixed" 
      sx={{ 
        width: 'calc(100% - 240px)', 
        ml: '240px',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'white',
        color: 'text.primary'
      }}
    >
      {/* <Box sx={{ height: '84px', display: 'flex', alignItems: 'center', px: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Patient Dashboard
        </Typography>
      </Box> */}
    </AppBar>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
        <SidebarButtons active={active} setActive={setActive} email={email} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px', pt: '80px' }}>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;